/*
 * @Author: Lin Yunhe
 * @Date: 2023-07-04 20:25:32
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-10 14:04:24
 */

import { UploadFile, UploadProps } from 'antd';
import _ from 'lodash';

// 根据过滤条件过滤树形结构数据
export function filterTree(node: any, filter: any, nodeName = 'children') {
    let res = false;
    if (filter(node)) {
        res = true;
    } else if (node[nodeName] instanceof Array) {
        const _data = node[nodeName].filter((node: any) =>
            filterTree(node, filter),
        );
        node[nodeName] = _data;
        if (node[nodeName].length > 0) {
            res = true;
        }
    }
    return res;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */

interface TreeNode {
    id: string;
    parentId: string;
    children: TreeNode[];
    [key: string]: any; // 其他属性，根据实际情况进行定义
}

export const convertToTree = <T extends Record<string, any>>(
    data: T[],
    idKey: keyof T = 'id',
    parentKey: keyof T = 'parentId',
    childrenKey: keyof T = 'children',
): TreeNode[] => {
    const idMap: Record<any, any> = {};
    const roots: TreeNode[] = [];

    // 构建ID与数据项的映射关系
    data.forEach((item) => {
        const id = item[idKey];
        const parentId = item[parentKey];
        if (!idMap[id]) {
            idMap[id] = { [childrenKey]: [] } as TreeNode;
        }
        idMap[id] = { ...item, [childrenKey]: idMap[id][childrenKey] };
        const treeItem = idMap[id];
        if (!parentId || !idMap[parentId]) {
            roots.push(treeItem);
        } else {
            if (!idMap[parentId][childrenKey]) {
                idMap[parentId][childrenKey] = [];
            }
            idMap[parentId][childrenKey].push(treeItem);
        }
    });

    return roots;
};

/**
 * @name 对象数组提取key数组
 *
 * @param {Array<object>} arr 源数组
 * @param {String} key 要提取的key
 * @returns {Array} result key数组
 */
export function objectArrToKeyArr<T = any>(arr: T[], key: string): React.Key[] {
    if (!arr?.length) return [];
    return arr?.reduce<React.Key[]>((sum, cur) => sum.concat([cur?.[key]]), []);
}

export function transformDict2Enum(
    data: any[] = [],
    callback?: (data: { desc: string; code: string }) => boolean,
    valueNames: string[] = [],
    transform?: (current: any) => any,
) {
    return data?.reduce<Record<string, any>>((prev, next) => {
        if (callback?.(next) ?? true) {
            prev[next[valueNames[1] ?? 'code']] = {
                text: next[valueNames[0] ?? 'desc'],
            };
        }

        return transform?.(prev) ?? prev;
    }, {});
}

/**
 * @name 将指定枚举转换为文字
 * @param data 枚举数据
 * @param key 需要翻译的key值
 * @returns 枚举翻译
 */
export function transformDictEnumToText(enumType: string, key?: any) {
    if (!key) return '';

    const cache = JSON.parse(window.sessionStorage.getItem('initData') || '{}');

    return transformDict2Enum(cache?.dict?.[enumType])?.[key]?.text;
}

export const transformUploadValue = ({
    data,
    picker,
    transform,
}: {
    data?: UploadProps['fileList'];
    picker?: string[];
    transform?: (params: any) => UploadFile;
}) =>
    data?.reduce<any[]>((prev, next) => {
        if (next?.status === 'done') {
            const current = next?.response ?? next;

            const value = transform?.(current) ?? current;

            prev.push({
                ..._.pick(value, picker ?? Object.keys(value)),
            });
        }

        return prev;
    }, []);

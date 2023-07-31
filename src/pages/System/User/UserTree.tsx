import { getAllOrgTree } from '@/services/user';
import { filterTree } from '@/utils';
import { useRequest } from '@umijs/max';
import { Input, Tree, TreeProps } from 'antd';
import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useState,
} from 'react';
const { Search } = Input;

interface UserTreeType {
    onSelectChange: (id: number) => void;
}

const UserTree = (props: UserTreeType, ref: any) => {
    const { onSelectChange } = props;
    const [inputKeyWord, setInputKeyWord] = useState<string>('');
    const [expandedKeys, setExpandedKeys] = useState<any[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

    const { data: treeData } = useRequest(getAllOrgTree);

    // 根据搜索条件过滤树
    const newData = useMemo(() => {
        return (
            treeData &&
            JSON.parse(JSON.stringify(treeData))?.filter((node: User.OrgTree) =>
                filterTree(node, (node: User.OrgTree) =>
                    node.orgName.includes(inputKeyWord),
                ),
            )
        );
    }, [inputKeyWord, treeData]);

    // 递归遍历源数据，匹配关键字并展开节点
    const expandNodesByKeyword = (
        data: User.OrgTree[],
        keyword: string,
        parentKeys: number[] = [],
    ) => {
        data.forEach((node) => {
            const nodeKeys: number[] = [...parentKeys, node.orgId];
            if (node.orgName.includes(keyword)) {
                setExpandedKeys((prevExpandedKeys: number[]) => [
                    ...new Set([...prevExpandedKeys, nodeKeys].flat(Infinity)),
                ]);
            }
            if (node.children) {
                expandNodesByKeyword(node.children, keyword, nodeKeys);
            }
        });
    };

    const onExpand = (newExpandedKeys: React.Key[]) => {
        setExpandedKeys(newExpandedKeys);
    };

    const onSearch = (e: string) => {
        if (e) {
            setInputKeyWord(e);
            expandNodesByKeyword(treeData, e);
        } else {
            setExpandedKeys([]);
        }
    };
    const onSelect: TreeProps['onSelect'] = (selectedKeys) => {
        setSelectedKeys(selectedKeys);
        onSelectChange(selectedKeys[0] as number);
    };
    const resetSelectKeys = useCallback(() => {
        setSelectedKeys([]);
    }, []);
    useImperativeHandle(
        ref,
        () => ({
            resetSelectKeys,
        }),
        [resetSelectKeys],
    );
    return (
        <>
            <Search
                style={{ marginBottom: 8 }}
                placeholder="搜索"
                onSearch={onSearch}
            />
            <Tree
                treeData={newData}
                onExpand={onExpand}
                selectedKeys={selectedKeys}
                expandedKeys={expandedKeys.flat(Infinity)}
                onSelect={onSelect}
                height={400}
                fieldNames={{
                    key: 'orgId',
                    title: 'orgName',
                }}
            />
        </>
    );
};
export default forwardRef(UserTree);

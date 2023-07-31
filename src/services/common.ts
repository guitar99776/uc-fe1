/*
 * @Author: Lin Yunhe
 * @Date: 2023-07-05 20:59:01
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-25 15:49:33
 */
import { request } from '@umijs/max';
import { DictBo } from './interface';

/** 获取枚举字典  */
export const getDicts = async () => request('/hr/resume/enums');

/** 组织树查询(当前用户板块下用户有权限的)  */
export const getOrgCodeUserTree = async () =>
    request('/main/org/getOrgCodeUserTree');

/** 组织树查询(当前用户板块下-获取所有)  */
export const getOrgCodeTree = async () => request('/main/org/getOrgCodeTree');

/** 获取部门岗位列表  */
export const getPositions = async (orgId: string) =>
    request(`/main/post/getByOrgId/${orgId}`);

/** 获取岗位下用户列表  */
export const getUsers = async (positionId: string) =>
    request(`/main/staff/getByPostId/${positionId}`);

/** 获取部门下用户列表  */
export const getByOrg = async (params: any) =>
    request('/main/staff/getByOrg', {
        method: 'POST',
        data: params,
    });

/** 上传 */
export const upload = (params: any) =>
    request('/hr/file/upload', {
        method: 'POST',
        data: params.data,
        signal: params.signal,
        headers: params.headers,
    });

/** 字典 */
export const getDict = (): Promise<DictBo> =>
    request('/hr/common/dict/listAll', { method: 'GET' });

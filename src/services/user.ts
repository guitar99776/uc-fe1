/*
 * @Author: liushuhui
 * @Date: 2023-07-17 13:53:37
 * @Last Modified by: liushuhui
 * @Last Modified time: 2023-07-19 17:54:27
 */
import { request } from '@umijs/max';

// 获取当前用户组织架构
export const getOrgTreeByUser = async () =>
    request('/main/user/getOrgTreeByUser');

// 所有组织架构
export const getAllOrgTree = async () => request('/main/org/getAllOrgTree');

// 获取当前用户岗位架构
export const getPostTreeByUser = async () =>
    request('/main/user/getPostTreeByUser');

//获取用户列表
export const getStaffs = async (params: User.StaffsParmasBo) =>
    request('/main/staff/web/getStaffs', {
        method: 'GET',
        params,
    });

//获取当前用户基础信息
export const getUserInfo = async () =>
    request('/main/user/base', {
        method: 'GET',
    });

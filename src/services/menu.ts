/*
 * @Author: liushuhui
 * @Date: 2023-07-18 14:38:08
 * @Last Modified by: liushuhui
 * @Last Modified time: 2023-07-19 14:03:14
 */

import { request } from '@umijs/max';

//获取菜单列表
export const getMenuList = async (params?: { menuName?: string }) =>
    request('/main/menu/getMenuList', {
        method: 'GET',
        params,
    });

//获取菜单详情
export const getMenuById = async (params: { menuId: number }) =>
    request('/main/menu/getMenuById', {
        method: 'GET',
        params,
    });

//获取当前用户菜单列表
export const getMenuListByUser = async () =>
    request('/main/menu/getMenuListByUser', {
        method: 'GET',
    });

// 保存
export const saveMenu = async (data: User.MenuFormRequestBo) =>
    request('/main/menu/saveMenu', {
        method: 'POST',
        data,
    });

// 删除菜单
export const deleteMenuById = async (menuId: number) =>
    request(`/main/menu/deleteMenuById/${menuId}`, {
        method: 'DELETE',
    });

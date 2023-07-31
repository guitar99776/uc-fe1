/*
 * @Author: liushuhui
 * @Date: 2023-07-18 20:21:12
 * @Last Modified by: liushuhui
 * @Last Modified time: 2023-07-19 14:18:07
 */
import { request } from '@umijs/max';

//保存角色
export const roleSave = async (data: any) =>
    request('/main/role/save', {
        method: 'POST',
        data,
    });

//删除角色
export const deleteRole = async (data: any) =>
    request('/main/role/delete', {
        method: 'POST',
        data,
    });

//新增角色与员工数据
export const addRole = async (data: any) =>
    request('/main/role/staff/add', {
        method: 'POST',
        data,
    });

//解绑角色与员工数据
export const cancelRole = async (data: any) =>
    request('/main/role/staff/cancel', {
        method: 'POST',
        data,
    });
//保存角色组织数据
export const saveRoleOrg = async (data: any) =>
    request('/main/role/org', {
        method: 'POST',
        data,
    });

//角色分页查询
export const getRole = async (params: any) =>
    request('/main/role/page', {
        method: 'GET',
        params,
    });

//获取角色组织数据
export const getRoleOrg = async (params: any) =>
    request('/main/role/org', {
        method: 'GET',
        params,
    });

//角色编辑
export const editRole = async (params: any) =>
    request('/main/role/get', {
        method: 'GET',
        params,
    });

//获取角色员工数据
export const getRoleStaffs = async (params: any) =>
    request('/main/role/staff', {
        method: 'GET',
        params,
    });

//获取未关联角色的员工数据
export const getUnRoleStaffs = async (params: any) =>
    request('/main/role/un_staff', {
        method: 'GET',
        params,
    });

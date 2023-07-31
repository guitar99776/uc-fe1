/*
 * @Author: Lin Yunhe
 * @Date: 2023-07-03 09:59:16
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-26 11:31:07
 */
import { request } from '@umijs/max';

/** 获取员工简历列表  */
export const getResumeList = async (params: any) =>
    request('/hr/resume/list', { params });

/** 获取待审批列表  */
export const getAuditList = async (params: any) =>
    request('/hr/resume/pending-approval', { params });

/** 获取某条更新信息  */
export const getUpdateInfo = async (params: any) =>
    request('/hr/resume/update/detail', {
        params,
    });

/** 审批员工简历信息  */
export const auditInfo = async (params: any) =>
    request('/hr/resume/approve', {
        method: 'POST',
        data: params,
    });

/** 获取当前用户转正信息 */
export const getEmploymentConfirmInfo = async () =>
    request('/hr/staff/regular/get');

/** 提交当前用户转正信息 */
export const updateEmploymentConfirmInfo = async (params: any) =>
    request('/hr/staff/regular/save', {
        method: 'POST',
        data: params,
    });

/** 获取当前用户辞职信息 */
export const getResignationApplyInfo = async () =>
    request('/hr/staff/resignation/get');

/** 提交当前用户辞职信息 */
export const updateResignationApplyInfo = async (params: any) =>
    request('/hr/staff/resignation/save', {
        method: 'POST',
        data: params,
    });

/** 获取员工奖励申请列表  */
export const getRewardList = async (params: any) =>
    request('/hr/personnel/award-apply/list', {
        method: 'GET',
        params,
    });

/** 获取员工调岗申请列表  */
export const getJobTransferList = async (params: any) =>
    request('/hr/personnel/position-transfer/list', {
        method: 'GET',
        params,
    });

/** 获取员工返聘申请列表  */
export const getRehireList = async (params: any) =>
    request('/hr/personnel/rehire-apply/list', {
        method: 'GET',
        params,
    });

/** 获取员工合同续签申请列表  */
export const getContractRenewal = async (params: any) =>
    request('/hr/personnel/contract-renewal/list', {
        method: 'GET',
        params,
    });

/** 新增调岗申请  */
export const setTransfer = async (params: any) =>
    request('/hr/personnel/position-transfer/add', {
        method: 'POST',
        data: params,
    });

/** 查询调岗申请详情  */
export const getTransferDetail = async (params: any) =>
    request('/hr/personnel/position-transfer/detail', {
        method: 'GET',
        params,
    });

/** 去SAP查询合同到期员工列表  */
export const getContractRenewalExpire = async (params: any) =>
    request('/hr/personnel/contract-expire/detail', {
        method: 'GET',
        params,
    });

/** 新增返聘申请  */
export const setRehire = async (params: any) =>
    request('/hr/personnel/rehire-apply/add', {
        method: 'POST',
        data: params,
    });

/** 查询返聘申请详情  */
export const getRehireDetail = async (params: any) =>
    request('/hr/personnel/rehire-apply/detail', {
        method: 'GET',
        params,
    });

/** 查询合同续签详情  */
export const getContractRenewalDetail = async (params: any) =>
    request('/hr//personnel/contract-renewal/detail', {
        method: 'GET',
        params,
    });

/** 新增奖励申请  */
export const setRewards = async (params: any) =>
    request('/hr/personnel/award-apply/add', {
        method: 'POST',
        data: params,
    });

/** 新增合同续签申请  */
export const addContractRenewal = async (data: any) =>
    request('/hr/personnel/contract-renewal/add', {
        method: 'POST',
        data,
    });

/** 查询奖励申请详情  */
export const getRewardsDetail = async (params: any) =>
    request('/hr/personnel/award-apply/detail', {
        method: 'GET',
        params,
    });

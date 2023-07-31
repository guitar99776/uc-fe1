/*
 * @Author: Lin Yunhe
 * @Date: 2023-07-03 09:59:16
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-17 19:14:48
 */
import { request } from '@umijs/max';

/** 获取员工基本信息  */
export const getStaffInfo = async (sapStaffId = '') =>
    request(`/hr/resume/base/info?sapStaffId=${sapStaffId}`);

/** 修改员工基本信息  */
export const updateStaffInfo = async (params: any) =>
    request('/hr/resume/base/info/modify', {
        method: 'POST',
        data: params,
    });

/** 获取员工教育经历  */
export const getEducationalExperience = async (sapStaffId = '') =>
    request(`/hr/resume/edu/experience?sapStaffId=${sapStaffId}`);

/** 修改员工教育经历  */
export const updateEducationalExperience = async (params: any) =>
    request('/hr/resume/edu/experience/modify', {
        method: 'POST',
        data: params,
    });

/** 获取员工工作经历  */
export const getWorkExperience = async (sapStaffId = '') =>
    request(`/hr/resume/social/experience?sapStaffId=${sapStaffId}`);

/** 修改员工工作经历  */
export const updateWorkExperience = async (params: any) =>
    request('/hr/resume/social/experience/modify', {
        method: 'POST',
        data: params,
    });

/** 获取员工培训经历  */
export const getTrainingExperience = async (sapStaffId = '') =>
    request(`/hr/resume/training/experience?sapStaffId=${sapStaffId}`);

/** 修改员工培训经历  */
export const updateTrainingExperience = async (params: any) =>
    request('/hr/resume/training/experience/modify', {
        method: 'POST',
        data: params,
    });

/** 获取讲师任职记录  */
export const getLecturerRecord = async (sapStaffId = '') =>
    request(`/hr/resume/lecturer?sapStaffId=${sapStaffId}`);

/** 获取资质证书  */
export const getCertificate = async (sapStaffId = '') =>
    request(`/hr/resume/certificate?sapStaffId=${sapStaffId}`, {
        method: 'GET',
    });

/** 修改资质证书  */
export const updateCertificate = async (params: any) =>
    request('/hr/resume/certificate/modify', {
        method: 'POST',
        data: params,
    });

/** 获取绩效表现  */
export const getPerformance = async (sapStaffId = '') =>
    request(`/hr/resume/performance?sapStaffId=${sapStaffId}`, {
        method: 'GET',
    });

/** 获取语言能力  */
export const getLanguageAbility = async (sapStaffId = '') =>
    request(`/hr/resume/language/ability?sapStaffId=${sapStaffId}`, {
        methos: 'GET',
    });

/** 修改语言能力  */
export const updateLanguageAbility = async (params: any) =>
    request('/hr/resume/language/ability/modify', {
        method: 'POST',
        data: params,
    });

/** 获取家庭成员  */
export const getFamilyMember = async (sapStaffId = '') =>
    request(`/hr/resume/family/member?sapStaffId=${sapStaffId}`, {
        methos: 'GET',
    });

/** 修改家庭成员  */
export const updateFamilyMember = async (params: any) =>
    request('/hr/resume/family/member/modify', {
        method: 'POST',
        data: params,
    });

/** 获取项目经历  */
export const getProjectExperience = async (sapStaffId = '') =>
    request(`/hr/resume/projects?sapStaffId=${sapStaffId}`);

/** 获取奖惩经历  */
export const getRewardPunishment = async (sapStaffId = '') =>
    request(`/hr/resume/rewards-punish?sapStaffId=${sapStaffId}`);

/** 获取身份信息  */
export const getIdentityInfo = async (sapStaffId = '') =>
    request(`/hr/resume/identity?sapStaffId=${sapStaffId}`);

/** 获取地址信息  */
export const getAddressInfo = async (sapStaffId = '') =>
    request(`/hr/resume/address?sapStaffId=${sapStaffId}`);

/** 修改地址信息  */
export const updateAddressInfo = async (params: any) =>
    request('/hr/resume/address/modify', {
        method: 'POST',
        data: params,
    });

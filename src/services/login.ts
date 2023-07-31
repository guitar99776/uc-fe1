// @ts-ignore

import { request } from '@umijs/max';

export interface IBaseResponse<T = any> {
    success: true;
    message: string;
    code: string;
    data?: T;
}

export interface IUserInfoObject {
    mail: string | null;
    name: string;
    phone?: string | null;
    userName: string;
    isFirstTimeLogin?: boolean;
    isAdmin?: 'true' | 'false';
    userApps: string[];
}

export interface ILoginRespObject {
    phone: string;
    signKey: string;
    userName: string;
}

export interface IPasswordLoginReqObject {
    // code: string;
    userName: string;
    password: string;
}

/**
 * 登陆账号
 * @param info
 * @returns
 */
export function login(
    data: IPasswordLoginReqObject,
): Promise<IBaseResponse<ILoginRespObject>> {
    return request(`/main/login/passwordLogin`, {
        method: 'POST',
        data,
    });
}

export interface INewUserPhoneLoginReqObject {
    code: string;
    phone: string;
}

/**
 * 通过手机验证码登陆
 */
export function loginBySmsCode(
    info: INewUserPhoneLoginReqObject,
): Promise<IBaseResponse<{ token: string; userName: string }>> {
    return request(`/oldApi/login/newUserSMSLogin`, {
        method: 'POST',
        params: info,
    });
}

/**
 * 老用户获取验证码
 */
export async function getSmsCode(data: {
    signKey: string;
}): Promise<IBaseResponse<any>> {
    return request(`/main/login/passwordLoginSms`, {
        method: 'POST',
        data,
    });
}

/**
 * 新用户获取验证码
 * @param phone
 * @returns
 */
export async function getNewUserVerifyCode(phone: string) {
    return request(`/oldApi/login/getNewUserVerifyCode`, {
        method: 'get',
        params: { phone },
    });
}

export interface IChangePasswordReqObject {
    newPassword: string;
    oldPassword: string;
}

/**
 * 修改账号
 */
export function changePassword({
    newPassword,
    oldPassword,
}: IChangePasswordReqObject): Promise<IBaseResponse> {
    return request(`/oldApi/user/changePassword`, {
        method: 'post',
        params: { newPassword, oldPassword },
    });
}

export interface IChangePasswordFirstReqObject {
    newPassword: string;
}

/**
 * 第一次修改密码
 */
export function changePasswordFirst(
    info: IChangePasswordFirstReqObject,
): Promise<IBaseResponse<boolean>> {
    return request(`/oldApi/user/changePasswordFirst`, {
        method: 'POST',
        params: info,
    });
}

/**
 * 登出系统
 * @param info
 * @returns
 */
export async function logout(): Promise<IBaseResponse<boolean>> {
    return request(`/main/login/doLogout`, {
        method: 'POST',
    });
}

/**
 * 获取用户信息
 */
export async function getUserInfoByName(userName: string) {
    return request(`/oldApi/user/getUserInfoBy`, {
        method: 'get',
        params: { userName },
    });
}

/**
 * 获取忘记密码手机验证码
 * @param phone
 * @returns
 */
export async function getFindPasswordSmsCode(phone: string) {
    return request(`/oldApi/login/getFindPasswordVerifyCode`, {
        method: 'get',
        params: { phone },
    });
}

/**
 * 验证获取忘记密码手机验证码
 * @param phone
 * @returns
 */
export async function checkFindPasswordVerifyCode(phone: string, code: string) {
    return request(`/oldApi/login/checkFindPasswordVerifyCode`, {
        method: 'get',
        params: { phone, code },
    });
}

/**
 * 重置忘记密码
 * @param phone
 * @returns
 */
export async function changePasswordForFind(
    newPassword: string,
    phone: string,
    sign: string,
) {
    return request(`/oldApi/user/changePasswordForFind`, {
        method: 'POST',
        params: { phone, newPassword, sign },
    });
}

/**
 * 验证登陆用户的短信验证码
 */
export async function verifyLoginSmsCode(data: {
    signKey: string;
    smsCode: string;
}): Promise<any> {
    return request(`/main/login/doLogin`, {
        method: 'POST',
        data,
    });
}

/**
 * 获取金蝶的token数据
 * @returns
 */
export async function getKingdeeToken(): Promise<IBaseResponse<string>> {
    return request(`/oldApi/login/getKingDeeToken`, {
        method: 'get',
    });
}

/**
 * 模拟心跳
 */
export async function heartBeat(userName: string) {
    return request(`/oldApi/user/getUserInfoBy`, {
        method: 'get',
        params: { userName },
        options: {
            noAlert: true,
        },
    });
}

export interface IUserObject {
    c: string; // 国家简写，例： CN US
    co: string; // 国家名称，例：中国 美国
    company: string; // 公司，例：四川盛屯锂业有限公司
    department: string; // 部门，例：行政人事部
    departmentNumber: string; // 部门ID，例：G02D001
    description: string; // 身份证号码
    displayName: string; // 屏幕显示名称，例：张三
    employeeType: string; // 员工类型，例：合同制员工
    givenName: string; // 名
    mail: string; // 电子邮件地址
    mobile: string; // 手机号
    msDS1: string; // 中文姓全拼
    msDS2: string; // 中文名全拼
    msDS3: string; // 中文姓名全拼 msDS2 + msDS1
    msDS4: string; // 金蝶用户同步控制项
    msDS5: string; // 蓝凌用户同步控制项
    msDS6: string; // 用友用户同步控制项
    msDS7: string; // 公司ID
    msDS8: string; // 出生日期
    msDS10: string; // 是否高层
    password: string; // 密码
    postalCode: string; // 邮政编码
    sn: string; // 姓
    streetAddress: string; // 地址
    title: string; // 职务，例：主任
    userPrincipalName: string; // 用户登录名2，例：zhansan@cxlithium.com
}

/**
 * 获取用户列表
 */
export async function getUserList(): Promise<IBaseResponse<IUserObject[]>> {
    return request(`/user/getUserList`, {
        method: 'get',
    });
}

/**
 * 添加用户
 * 通过表单添加用户到系统
 */
export async function addUser(
    user: IUserObject,
): Promise<IBaseResponse<{ userName: string; path: string }>> {
    return request(`/user/addUser`, {
        method: 'post',
        data: user,
    });
}

/**
 * 批量上传
 */
export async function batchUpload(
    file: Blob,
): Promise<IBaseResponse<string[]>> {
    const fd = new FormData();
    fd.append(`file`, file);
    return request(`/user/importExcel`, {
        method: 'post',
        data: fd,
    });
}

export interface ILandrayApiAuthRespObject {
    result: string;
    errorMsg: string | null;
    sessionId?: string;
}

/**
 * 蓝凌系统的单点登陆 sessionID 获取，以实现单点登陆的需求
 */
export async function landrayVerify(
    url: string, // 请求转发的接口
    mobileNo: string, // 单点用户的手机号或者用户名
    authUserName: string, // 鉴权用户名
    authPassword: string, // 鉴权用户密码
): Promise<IBaseResponse<string>> {
    return request(`/login/getLanLinToken`, {
        method: 'get',
        params: { url, mobileNo, authUserName, authPassword },
    });
}

export async function getSsoApps() {
    const res = await request(`/oldApi/sso/ssoApps`, {
        method: 'get',
    });
    if (res.status === 200) {
        return res.data.appConfig;
    }
}

//   /sso/ssoLogin

export function ssoLogin(appKey: string) {
    return request(`/oldApi/sso/ssoLogin`, {
        method: 'POST',
        params: { appKey },
    });
}

// /user/getMydept

export async function getMydept() {
    const res = await request(`/oldApi/user/getMydept`, {
        method: 'POST',
    });
    if (res.status === 200) {
        return res.data;
    }
}

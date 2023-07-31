export const LoginUserCacheKey = 'loginUserKey';
export const LoginUserTokenCacheKey = 'loginUserToken';
export const UserCacheKey = `UserCacheKey`;

/**
 * 设置登陆用户信息，用于跳转
 * @param info
 * @returns
 */
export async function setLoginUser(info?: string) {
    if (!info) {
        return localStorage.removeItem(LoginUserCacheKey);
    }

    return localStorage.setItem(LoginUserCacheKey, info);
}

export function getLoginUser() {
    return localStorage.getItem(LoginUserCacheKey);
}

/**
 * 移除登陆用户的信息
 */
export async function removeLoginUserInfo() {
    await localStorage.removeItem(UserCacheKey);
}

/**
 * 设置登陆的 token
 * @param token
 */
export function setToken(token?: string) {
    if (!token) {
        localStorage.removeItem(LoginUserTokenCacheKey);
    } else {
        localStorage.setItem(LoginUserTokenCacheKey, token);
    }
}

export function removeToken() {
    localStorage.removeItem(LoginUserTokenCacheKey);
}

/**
 *获取登陆的 token
 */
export function getToken(): string | null {
    return localStorage.getItem(LoginUserTokenCacheKey);
}

/**
 * 设置用户登陆信息
 */
export function setLoginUserInfo(data: string) {
    return localStorage.setItem(UserCacheKey, data);
}

/**
 * 获取用户信息
 */
export function getLoginUserInfo() {
    return JSON.parse(localStorage.getItem(UserCacheKey) as any);
}

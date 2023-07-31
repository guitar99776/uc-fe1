/*
 * @Author: Xue XingChen
 * @Date: 2023-03-13 11:39:01
 * @LastEditors: Xue XingChen
 * @LastEditTime: 2023-07-11 00:31:55
 */
// 公用是否枚举
// export enum YES_OR_NO {
//     'X' = '是',
//     '' = '否',
// }
export enum GENDER {
    '1' = '男',
    '2' = '女',
}

export const AUDIT_EDIT_STATES = ['-1', '2', '3'];

export const NORMAL_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const NORMAL_MINUTE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

export const NORMAL_DAY_FORMAT = 'YYYY-MM-DD';

export const USER_INFO = 'userInfo';

export const TYPE_PDF = 'application/pdf';

export const TYPE_IMAGES = 'image/*';

export const TYPE_WORD = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-word',
    'application/msword',
];

export const TYPE_EXCEL = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
];

export const TYPE_ZIP = [
    'application/zip',
    'application/x-gzip',
    'application/x-tar',
    'application/x-7z-compressed',
    'application/x-rar-compressed',
];

export const AREA_MAX_LENGTH = 500;

export const TEXT_MAX_LENGTH = 50;

export const IS_EMAIL = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;

export const DEFAULT_TEXT = '-';

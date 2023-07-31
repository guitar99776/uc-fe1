import { Rule } from 'antd/lib/form';

// 正则规则
export const PATTERNS: Record<string, RegExp> = {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    idCard: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
};

export const passwordPattern: Rule = {
    pattern: PATTERNS.password,
    message:
        '提醒：密码为字母数字组合，至少八位且至少一个大写字母，一个小写字母',
};

export const isIdCard = (idCard: string) => PATTERNS.idCard.test(idCard);

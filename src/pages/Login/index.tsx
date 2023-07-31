import {
    changePasswordForFind,
    checkFindPasswordVerifyCode,
    getFindPasswordSmsCode,
    getNewUserVerifyCode,
    getSmsCode,
    login,
    loginBySmsCode,
    verifyLoginSmsCode,
} from '@/services/login';
import { setLoginUser, setToken } from '@/utils/storage';
import { history } from '@umijs/max';
import { useRequest } from 'cmt-utils';

import {
    Button,
    Form,
    FormInstance,
    Tabs,
    Typography,
    notification,
} from 'antd';
import { useCallback, useRef, useState } from 'react';
import Account from './account';
import Forget from './forget';
import chengtunLogoUrl from './images/chengtunLogo.png';
import './index.less';
import Phone from './phone';
import Reset from './reset';
import SmsCode from './smsCode';
type LoginType = 'phone' | 'account' | 'forget' | 'reset' | 'smsCode';

const Login = () => {
    const [loginType, setLoginType] = useState<LoginType>('account');
    const [buttonText, setButtonText] = useState('登陆');
    const [signKey, setSignKey] = useState(``);
    const [loginUserPhone, setLoginUserPhone] = useState<string | null>(null);
    const formRef = useRef<
        FormInstance<
            LoginType.INewUserPhoneLoginReqObject &
                LoginType.IPasswordLoginReqObject & {
                    autoLogin: boolean;
                    newPassword?: string;
                }
        >
    >(null);
    const loginSuccess = () =>
        notification.success({
            message: '登陆成功',
        });
    const { run: getNewUserSmsCode } = useRequest(getNewUserVerifyCode, {
        manual: true,
    });

    const {
        run: loginByNameAndPassword,
        loading: loginByNameAndPasswordLoading,
    } = useRequest(login, {
        manual: true,
        onSuccess: (res: any) => {
            if (res) {
                const { phone, signKey, userName } = res;
                if (phone) {
                    setLoginType(`smsCode`);
                    setLoginUserPhone(`*******${phone.slice(-4)}`);
                    setSignKey(signKey);
                    setLoginUser(userName);
                } else {
                    notification.error({
                        message: '该用户暂未设置手机号',
                    });
                }
            }
        },
    });

    // 手机页登录
    const { run: loginByPhoneCode, loading: loginByPhoneCodeLoading } =
        useRequest(loginBySmsCode, {
            manual: true,
            onSuccess: async (res: any) => {
                const { data } = res;
                if (res.status === 200) {
                    setToken(data?.token);
                    loginSuccess();
                    history.push(`/`);
                }
            },
        });
    // 修改密码确认
    const { run: checkFindPasswordVerifyCodeFn } = useRequest(
        (phone: string, code: string) =>
            checkFindPasswordVerifyCode(phone, code),
        {
            manual: true,
            onSuccess(res) {
                if (res.status === 200) {
                    setSignKey(res.data);
                    setLoginType('reset');
                }
            },
        },
    );

    const { run: getSmsCodeFn } = useRequest(getSmsCode, {
        manual: true,
    });
    // 重置密码页确认
    const changePasswordForFindFn = async (
        phone: string,
        code: string,
        sign: string,
    ) => {
        const res = await changePasswordForFind(phone, code, sign);
        if (res.status === 200) {
            notification.success({
                message: `修改密码成功`,
            });
            // 清理数据
            formRef.current?.resetFields();
            //   fillLoginForm();
            // 跳到密码登录
            setLoginType('account');
        }
    };

    const forgetClick = () => {
        formRef.current?.resetFields(['code']);
        setLoginType('forget');
        setButtonText('确认');
    };
    // TODO 待优化，抽成公共方法
    const onGetCaptcha = async () => {
        const phone = formRef.current?.getFieldValue(`phone`);
        if (!phone) {
            formRef.current?.validateFields([`phone`]);
            // throw new Error(``);
        } else {
            const res = await getNewUserSmsCode(phone);
            if (res.data.status !== 200) {
                throw new Error(res.data.message);
            }
        }
    };
    // 忘记密码页面获取验证码
    const forgetOnGetCaptcha = async () => {
        const phone = formRef.current?.getFieldValue(`phone`);
        if (!phone) {
            formRef.current?.validateFields([`phone`]);
        } else {
            const { status, message } = await getFindPasswordSmsCode(phone);
            if (status !== 200) {
                throw new Error(message);
            }
        }
    };
    // 登录成功后验证码页面
    const SmsCodeOnGetCaptcha = async () => {
        getSmsCodeFn({ signKey });
    };

    // 验证登陆用户的短信
    const { run: verifyLoginSmsCodeFn, loading: verifyLoginSmsCodeLoading } =
        useRequest(verifyLoginSmsCode, {
            manual: true,
            onSuccess(res) {
                if (res) {
                    const { token } = res;
                    setToken(token);
                    loginSuccess();
                    window.location.href = `/`;
                }
            },
        });

    const retunToLoginFn = () => {
        setLoginType('account');
        setButtonText('登陆');
        setLoginUserPhone(null);
        formRef.current?.resetFields([`code`]);
    };
    const onFinish = useCallback(
        async (
            formData: LoginType.INewUserPhoneLoginReqObject &
                LoginType.IPasswordLoginReqObject & {
                    autoLogin: boolean;
                    newPassword?: string;
                },
        ) => {
            const { phone, code, password, userName, newPassword } = formData;

            if (loginType === 'phone') {
                await loginByPhoneCode({ phone, code });
            } else if (loginType === 'account') {
                // await updateAutoLogin(formData);
                await loginByNameAndPassword({ password, userName });
            } else if (loginType === 'forget') {
                await checkFindPasswordVerifyCodeFn(phone, code);
            } else if (loginType === 'reset') {
                await changePasswordForFindFn(newPassword!, phone, signKey);
            } else if (loginType === 'smsCode') {
                await verifyLoginSmsCodeFn({ signKey, smsCode: code });
            }
            return true;
        },
        [loginType],
    );
    return (
        <div className="login-page">
            <img alt="Chengtun Logo" src={chengtunLogoUrl} className="logo" />
            <div className="login-content">
                <Typography.Title className="login-title">
                    盛屯集团内部统一门户
                </Typography.Title>
                <Form ref={formRef} onFinish={onFinish} className="login-form">
                    <Tabs
                        centered
                        activeKey={loginType}
                        onChange={(activeKey) => {
                            if (activeKey.endsWith('_')) {
                                return;
                            }

                            setLoginType(activeKey as LoginType);
                            if (
                                activeKey === 'phone' ||
                                activeKey === 'account'
                            ) {
                                formRef.current?.resetFields();

                                if (activeKey === 'account') {
                                    // fillLoginForm();
                                }
                            }
                        }}
                    >
                        {(loginType === 'account' || loginType === 'phone') && (
                            <>
                                <Tabs.TabPane
                                    key={'account'}
                                    tab={'密码登录'}
                                />
                                <Tabs.TabPane
                                    key={'phone'}
                                    tab={'新用户短信登录'}
                                />
                            </>
                        )}
                        {loginType === 'forget' && (
                            <Tabs.TabPane key={'forget_'} tab={'忘记密码'} />
                        )}
                        {loginType === 'reset' && (
                            <Tabs.TabPane key={'reset_'} tab={'重置密码'} />
                        )}
                        {loginType === 'smsCode' && (
                            <Tabs.TabPane key={'smsCode_'} tab={'验证码'} />
                        )}
                    </Tabs>
                    {loginType === 'account' && (
                        <Account forgetClick={forgetClick} />
                    )}
                    {loginType === 'phone' && (
                        <Phone onGetCaptcha={onGetCaptcha} />
                    )}
                    {loginType === 'forget' && (
                        <Forget
                            forgetOnGetCaptcha={forgetOnGetCaptcha}
                            retunToLoginFn={retunToLoginFn}
                        />
                    )}
                    {loginType === 'reset' && (
                        <Reset
                            formRef={formRef.current}
                            retunToLoginFn={retunToLoginFn}
                        />
                    )}
                    {loginType === 'smsCode' && (
                        <SmsCode
                            onGetCaptcha={SmsCodeOnGetCaptcha}
                            loginUserPhone={loginUserPhone}
                            retunToLoginFn={retunToLoginFn}
                        />
                    )}

                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        block
                        loading={
                            loginByNameAndPasswordLoading ||
                            loginByPhoneCodeLoading ||
                            verifyLoginSmsCodeLoading
                        }
                    >
                        {buttonText}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;

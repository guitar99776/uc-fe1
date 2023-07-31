import {
    IChangePasswordReqObject,
    changePassword,
    logout,
} from '@/services/login';
import { removeLoginUserInfo, setToken } from '@/utils/storage';
import { passwordPattern } from '@/utils/validator';
import { ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import {
    Button,
    Form,
    FormInstance,
    Space,
    Typography,
    notification,
} from 'antd';
import { useRequest } from 'cmt-utils';
import { useRef } from 'react';
import styles from './index.less';

export default () => {
    const formRef = useRef<FormInstance<IChangePasswordReqObject>>(null);
    const { runAsync: changePasswordFn, loading } = useRequest(
        (info: IChangePasswordReqObject) => {
            return changePassword(info);
        },
        {
            manual: true,
            onSuccess(res) {
                if (res.status === 200) {
                    notification.success({
                        message: `修改密码成功`,
                    });

                    logout().then(async ({ status }) => {
                        console.log('status', status);
                        if (status) {
                            await removeLoginUserInfo();
                            setToken();
                            history.push(`/auth/login`);
                        }
                    });
                }
            },
        },
    );

    return (
        <div className={styles.changePasswordContent}>
            <Typography.Title level={4}>修改密码</Typography.Title>
            <Form<IChangePasswordReqObject>
                onFinish={async (data) => {
                    await changePasswordFn(data);
                    return true;
                }}
                ref={formRef}
                className={styles.proForm}
            >
                <ProFormText.Password
                    name="oldPassword"
                    fieldProps={{ size: 'large', placeholder: '当前密码' }}
                    rules={[
                        {
                            required: true,
                            message: '请输入当前密码！',
                        },
                        passwordPattern,
                    ]}
                />
                <ProFormText.Password
                    name="newPassword"
                    fieldProps={{
                        size: 'large',
                        placeholder: '新密码',
                    }}
                    rules={[
                        { required: true, message: '请输入新密码！' },
                        passwordPattern,
                        {
                            validator(_: any, value: any) {
                                const confirmPassword =
                                    formRef.current?.getFieldValue(
                                        `confirmPassword`,
                                    );

                                if (value && confirmPassword) {
                                    if (value !== confirmPassword) {
                                        return Promise.reject(
                                            `新密码与确认新密码不一致`,
                                        );
                                    } else {
                                        formRef.current?.setFields([
                                            {
                                                name: 'confirmPassword',
                                                errors: [],
                                            },
                                        ]);
                                    }
                                }

                                return Promise.resolve();
                            },
                        },
                    ]}
                />
                <ProFormText.Password
                    name="confirmPassword"
                    fieldProps={{ size: 'large', placeholder: '确认新密码' }}
                    rules={[
                        { required: true, message: '请输入新密码！' },
                        passwordPattern,
                        {
                            validator(_: any, value: any) {
                                const newPassword =
                                    formRef.current?.getFieldValue(
                                        `newPassword`,
                                    );

                                if (
                                    value &&
                                    newPassword &&
                                    value !== newPassword
                                ) {
                                    if (value !== newPassword) {
                                        return Promise.reject(
                                            `新密码与确认新密码不一致`,
                                        );
                                    } else {
                                        formRef.current?.setFields([
                                            {
                                                name: 'newPassword',
                                                errors: [],
                                            },
                                        ]);

                                        return Promise.resolve();
                                    }
                                }

                                return Promise.resolve();
                            },
                        },
                    ]}
                />
                <Space>
                    <Button
                        size="small"
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        提交
                    </Button>
                    <Button
                        size="small"
                        type="default"
                        htmlType="reset"
                        loading={loading}
                    >
                        重置
                    </Button>
                </Space>
            </Form>
        </div>
    );
};

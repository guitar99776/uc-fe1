import { passwordPattern } from '@/utils/validator';
import { InfoCircleOutlined, LockOutlined } from '@ant-design/icons/lib';
import { ProFormText } from '@ant-design/pro-components/es';
import { Form } from 'antd/es';

interface ResetType {
    retunToLoginFn: () => void;
    formRef: any;
}
const Reset = (props: ResetType) => {
    const { formRef, retunToLoginFn } = props;
    return (
        <>
            <Form.Item noStyle name="phone"></Form.Item>
            <ProFormText.Password
                name="newPassword"
                fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                    placeholder: '新密码',
                }}
                rules={[
                    {
                        required: true,
                        message: '请输入密码！',
                    },
                    passwordPattern,
                    {
                        validator(rule, value) {
                            const confirmPassword =
                                formRef?.getFieldValue(`confirmPassword`);

                            if (value && confirmPassword) {
                                if (value !== confirmPassword) {
                                    return Promise.reject(
                                        `新密码与确认新密码不一致`,
                                    );
                                } else {
                                    formRef?.setFields([
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
                fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                    placeholder: '确认新密码',
                }}
                rules={[
                    {
                        required: true,
                        message: '请输入密码！',
                    },
                    passwordPattern,
                    {
                        validator(rule, value) {
                            const newPassword =
                                formRef?.getFieldValue(`newPassword`);

                            if (value && newPassword) {
                                if (value !== newPassword) {
                                    return Promise.reject(
                                        `新密码与确认新密码不一致`,
                                    );
                                } else {
                                    formRef?.setFields([
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
            <p style={{ color: 'rgb(216, 0, 24)' }}>
                {' '}
                <InfoCircleOutlined /> 请在三分钟内完成密码修改
            </p>
            <div style={{ marginBlockEnd: 24 }}>
                <a
                    style={{
                        color: 'rgb(216, 0, 24)',
                        textDecoration: 'underline',
                    }}
                    onClick={retunToLoginFn}
                >
                    返回登陆
                </a>
            </div>
        </>
    );
};
export default Reset;

import { LockOutlined } from '@ant-design/icons';
import { ProFormCaptcha } from '@ant-design/pro-components';
import { Form, Typography } from 'antd';

interface SmsCodeType {
    loginUserPhone: string | null;
    onGetCaptcha: () => void;
    retunToLoginFn: () => void;
}

const SmsCode = (props: SmsCodeType) => {
    const { loginUserPhone, onGetCaptcha, retunToLoginFn } = props;
    return (
        <>
            <Form.Item noStyle name="userName"></Form.Item>
            <Form.Item noStyle name="sign"></Form.Item>
            <Typography
                style={{
                    marginBottom: 24,
                }}
            >
                手机号：{`${loginUserPhone}`}
            </Typography>
            <ProFormCaptcha
                fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                    placeholder: '请输入验证码',
                }}
                captchaProps={{
                    size: 'large',
                }}
                name="code"
                rules={[{ required: true, message: '请输入验证码！' }]}
                onGetCaptcha={async () => onGetCaptcha()}
            />
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

export default SmsCode;

import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-components';

interface ForgetType {
    forgetOnGetCaptcha: () => void;
    retunToLoginFn: () => void;
}
const Forget = (props: ForgetType) => {
    const { forgetOnGetCaptcha, retunToLoginFn } = props;
    return (
        <>
            <ProFormText
                fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={'prefixIcon'} />,
                    placeholder: '手机号',
                }}
                name="phone"
                rules={[
                    { required: true, message: '请输入手机号！' },
                    { pattern: /^1\d{10}$/, message: '手机号格式错误！' },
                ]}
            />
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
                rules={[
                    {
                        required: true,
                        message: '请输入验证码！',
                    },
                ]}
                onGetCaptcha={async () => forgetOnGetCaptcha()}
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
export default Forget;

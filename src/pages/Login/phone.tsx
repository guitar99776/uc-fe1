import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-components';

interface onGetCaptchaType {
    onGetCaptcha: () => void;
}

const Phone = (props: onGetCaptchaType) => {
    const { onGetCaptcha } = props;
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
                    placeholder: `请输入验证码`,
                }}
                captchaProps={{
                    size: 'large',
                }}
                name="code"
                rules={[{ required: true, message: '请输入验证码！' }]}
                onGetCaptcha={async () => onGetCaptcha()}
            />
        </>
    );
};

export default Phone;

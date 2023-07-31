import { UserOutlined } from '@ant-design/icons/lib';
import { ProFormText } from '@ant-design/pro-components/es';
import './index.less';
interface AccountType {
    forgetClick: () => void;
}
const Account = (props: AccountType) => {
    const { forgetClick } = props;
    return (
        <>
            <ProFormText
                name="userName"
                fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={'prefixIcon'} />,
                    placeholder: '用户名',
                }}
                rules={[{ required: true, message: '请输入用户名!' }]}
            />
            <ProFormText.Password
                name="password"
                fieldProps={{
                    size: 'large',
                    placeholder: '密码',
                }}
                rules={[
                    {
                        required: true,
                        message: '请输入密码！',
                    },
                    // passwordPattern,
                ]}
            />
            <div style={{ marginBlockEnd: 24 }}>
                {/* <ProFormCheckbox
                    noStyle
                    name="autoLogin"
                    initialValue={true}
                    valuePropName="checked"
                >
                    记住密码
                </ProFormCheckbox> */}
                <a className="forget-text" onClick={forgetClick}>
                    忘记密码
                </a>
            </div>
        </>
    );
};
export default Account;

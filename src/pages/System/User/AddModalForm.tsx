import { userTreeData } from '@/pages/data';
import {
    ModalForm,
    ProForm,
    ProFormRadio,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button } from 'antd';

interface AddModalFormType {
    initFormValues: object;
    buttonTitle: string;
}
const AddModalForm = (props: AddModalFormType) => {
    const { initFormValues, buttonTitle } = props;
    const onFinish = (formdata: any) => {
        console.log('formdata', formdata);
    };
    return (
        <ModalForm
            title={buttonTitle}
            initialValues={initFormValues}
            modalProps={{ destroyOnClose: true }}
            onFinish={async (values) => {
                await onFinish(values);
                return true;
            }}
            trigger={
                <Button
                    size="small"
                    type={buttonTitle === '编辑' ? 'link' : 'primary'}
                >
                    {buttonTitle}
                </Button>
            }
        >
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="nickName"
                    label="用户昵称"
                    placeholder="请输入用户昵称"
                    required
                />

                <ProFormTreeSelect
                    name={'deptId'}
                    label="归属部门"
                    width="md"
                    placeholder="请选择归属部门"
                    fieldProps={{
                        showSearch: true,
                        // value={value}
                        dropdownStyle: { maxHeight: 400, overflow: 'auto' },
                        allowClear: true,
                        treeDefaultExpandAll: true,
                        // onChange={onChange}
                        treeData: userTreeData,
                        fieldNames: {
                            value: 'id',
                        },
                    }}
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="phonenumber"
                    label="手机号码"
                    placeholder="请选择手机号码"
                />
                <ProFormText
                    width="md"
                    name="email"
                    label="邮箱"
                    placeholder="请输入邮箱"
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="userName"
                    label="用户名称"
                    placeholder="请选择用户名称"
                    required
                />
                <ProFormText.Password
                    width="md"
                    name="password"
                    label="用户密码"
                    placeholder="请输入用户密码"
                    required
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormSelect
                    width="md"
                    name="sex"
                    label="用户性别"
                    placeholder="请选择用户性别"
                    valueEnum={{
                        1: '男',
                        2: '女',
                    }}
                />
                <ProFormRadio.Group
                    name="status"
                    label="状态"
                    options={[
                        {
                            label: '正常',
                            value: '1',
                        },
                        {
                            label: '停用',
                            value: '2',
                        },
                    ]}
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormSelect
                    width="md"
                    name="postIds"
                    label="岗位"
                    placeholder="请选择岗位"
                    valueEnum={{
                        1: '董事长',
                        2: '项目经理',
                        3: '人力资源',
                        4: '普通员工',
                    }}
                />
                <ProFormSelect
                    width="md"
                    name="roleIds"
                    label="角色"
                    placeholder="请选择角色"
                    valueEnum={{
                        1: '普通角色',
                    }}
                />
            </ProForm.Group>
            <ProFormTextArea
                name="remark"
                label="备注"
                placeholder="请输入内容"
            />
        </ModalForm>
    );
};

export default AddModalForm;

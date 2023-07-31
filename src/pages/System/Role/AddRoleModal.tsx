import { editRole, roleSave } from '@/services/role';
import {
    ModalForm,
    ProForm,
    ProFormDigit,
    ProFormInstance,
    ProFormRadio,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Tree, message } from 'antd';
import { useRef } from 'react';
interface AddRoleModalType {
    buttonTitle: string;
    roleId?: number | string;
    treeData: any[];
    refresh: () => void;
    onOpenChange?: () => void;
}
const AddRoleModal = (props: AddRoleModalType) => {
    const formRef = useRef<ProFormInstance<any>>();
    const { buttonTitle, refresh, roleId, treeData } = props;

    const { run, loading } = useRequest(roleSave, {
        manual: true,
        onSuccess: () => {
            message.success(`${buttonTitle}成功`);
            refresh();
        },
    });

    const onFinish = (formdata: any) => {
        formdata.roleId = roleId;
        run({ ...formdata });
    };

    return (
        <ModalForm
            title={buttonTitle}
            formRef={formRef}
            request={async () => {
                return buttonTitle === '编辑'
                    ? await editRole({ roleId })
                    : { status: '0' };
            }}
            width={500}
            layout="horizontal"
            modalProps={{ destroyOnClose: true }}
            submitter={{ submitButtonProps: { loading } }}
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
            <ProFormText
                width="md"
                name="roleName"
                label="角色名称"
                placeholder="请输入角色名称"
                rules={[{ required: true, message: '请输入角色名称' }]}
            />

            <ProFormText
                name="roleKey"
                label="权限字符"
                width="md"
                placeholder="请输入权限字符"
                rules={[{ required: true, message: '请输入权限字符' }]}
            />

            <ProFormDigit
                width="md"
                name="roleSort"
                label="角色顺序"
                placeholder="请输入角色顺序"
                rules={[{ required: true, message: '请输入角色顺序' }]}
            />
            <ProFormRadio.Group
                name="status"
                label="状态"
                options={[
                    {
                        label: '正常',
                        value: '0',
                    },
                    {
                        label: '停用',
                        value: '1',
                    },
                ]}
            />
            <ProForm.Item
                name="menuIds"
                label="菜单权限"
                valuePropName="checkedKeys"
                trigger="onCheck"
                rules={[{ required: true, message: '请选择菜单权限' }]}
            >
                <Tree
                    checkable
                    fieldNames={{
                        key: 'menuId',
                        title: 'menuName',
                    }}
                    treeData={treeData}
                />
            </ProForm.Item>
            <ProFormTextArea
                name="remark"
                label="备注"
                placeholder="请输入内容"
            />
        </ModalForm>
    );
};

export default AddRoleModal;

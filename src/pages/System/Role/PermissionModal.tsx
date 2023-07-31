import { getRoleOrg, saveRoleOrg } from '@/services/role';
import {
    ModalForm,
    ProForm,
    ProFormInstance,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Tree, message } from 'antd';
import { useRef } from 'react';

interface PermissionModalType {
    roleId: string | number;
    treeData: any[];
    refresh: () => void;
}
const PermissionModal = (props: PermissionModalType) => {
    const { roleId, treeData, refresh } = props;

    const formRef = useRef<ProFormInstance<any>>();

    const { run, loading } = useRequest(saveRoleOrg, {
        manual: true,
        onSuccess: () => {
            message.success(`保存成功`);
            refresh();
        },
    });

    const onFinish = (formdata: any) => {
        formdata.roleId = roleId;
        run(formdata);
    };
    return (
        <ModalForm
            formRef={formRef}
            title="分配数据权限"
            width={500}
            layout="horizontal"
            modalProps={{ destroyOnClose: true }}
            submitter={{ submitButtonProps: { loading } }}
            onFinish={async (values) => {
                await onFinish(values);
                return true;
            }}
            request={async () => {
                return await getRoleOrg({ roleId });
            }}
            trigger={
                <Button size="small" type={'link'}>
                    数据权限
                </Button>
            }
        >
            <ProFormText width="md" name="roleName" label="角色名称" readonly />

            <ProFormText name="roleKey" label="权限字符" width="md" readonly />
            <ProForm.Item
                name="orgIds"
                label="数据权限"
                valuePropName="checkedKeys"
                trigger="onCheck"
                rules={[{ required: true, message: '请选择数据权限' }]}
            >
                <Tree
                    checkable
                    height={300}
                    fieldNames={{
                        key: 'orgId',
                        title: 'orgName',
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

export default PermissionModal;

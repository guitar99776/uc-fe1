import { getMenuList, saveMenu } from '@/services/menu';
import {
    ModalForm,
    ProFormDigit,
    ProFormRadio,
    ProFormText,
    ProFormTreeSelect,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, message } from 'antd';
interface AddMenuModalType {
    buttonTitle: string;
    initFormValues: object;
    refresh: () => void;
}
const AddMenuModal = (props: AddMenuModalType) => {
    const { initFormValues, buttonTitle, refresh } = props;
    const { run, loading } = useRequest(saveMenu, {
        manual: true,
        onSuccess: () => {
            message.success(`${buttonTitle}成功`);
            refresh();
        },
    });

    const onFinish = (formdata: any) => {
        run({ ...initFormValues, ...formdata });
    };
    return (
        <ModalForm
            title={buttonTitle}
            initialValues={initFormValues}
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
            <ProFormTreeSelect
                name="parentId"
                label="上级菜单"
                width="md"
                placeholder="请选择上级菜单"
                request={getMenuList}
                fieldProps={{
                    showSearch: true,
                    dropdownStyle: { maxHeight: 400, overflow: 'auto' },
                    allowClear: true,
                    fieldNames: {
                        value: 'menuId',
                        label: 'menuName',
                    },
                }}
            />
            <ProFormRadio.Group
                name="menuType"
                label="菜单类型"
                options={[
                    {
                        label: '目录',
                        value: 'menu',
                    },
                    {
                        label: '菜单',
                        value: 'page',
                    },
                    {
                        label: '按钮',
                        value: 'button',
                    },
                ]}
            />
            <ProFormText
                name="menuName"
                label="菜单名称"
                width="md"
                placeholder="请输入菜单名称"
                rules={[{ required: true, message: '请输入菜单名称' }]}
            />

            <ProFormDigit
                width="md"
                name="menuSort"
                label="显示排序"
                placeholder="请输入显示排序"
                rules={[{ required: true, message: '请输入显示排序' }]}
            />
            <ProFormText
                name="path"
                label="路由地址"
                width="md"
                placeholder="请输入路由地址"
                rules={[{ required: true, message: '请输入路由地址' }]}
            />
            <ProFormRadio.Group
                name="visible"
                label="显示状态"
                options={[
                    {
                        label: '显示',
                        value: true,
                    },
                    {
                        label: '隐藏',
                        value: false,
                    },
                ]}
            />
            <ProFormText
                name="perms"
                label="权限标识"
                width="md"
                placeholder="请输入权限标识"
            />
        </ModalForm>
    );
};
export default AddMenuModal;

import { addRole, getUnRoleStaffs } from '@/services/role';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Modal, message } from 'antd';
import { omit } from 'lodash';
import { useMemo, useState } from 'react';

interface AddUserModalType {
    roleId: number | string;
    refresh: () => void;
}

const AddUserModal = (props: AddUserModalType) => {
    const { roleId, refresh } = props;
    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'name',
                title: '员工名称',
                align: 'center',
                key: 'name',
            },
            {
                dataIndex: 'staffId',
                title: '员工ID',
                align: 'center',
                key: 'staffId',
                hideInSearch: true,
            },
            {
                dataIndex: 'email',
                title: '邮箱',
                align: 'center',
                key: 'email',
                hideInSearch: true,
            },
            {
                dataIndex: 'phone',
                title: '手机号码',
                align: 'center',
                key: 'phone',
            },
        ],
        [],
    );
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [open, setOpen] = useState(false);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const { run, loading } = useRequest(addRole, {
        manual: true,
        onSuccess: () => {
            message.success(`新增成功`);
            setOpen(false);
            refresh();
        },
    });
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const handleOk = () => {
        if (selectedRowKeys.length === 0) {
            message.error('请选择需要绑定角色的员工');
            return;
        }
        run({ roleId, staffIds: selectedRowKeys });
    };
    return (
        <>
            <Modal
                width={800}
                title="添加用户"
                open={open}
                destroyOnClose
                confirmLoading={loading}
                onOk={handleOk}
                onCancel={() => {
                    setOpen(false);
                    setSelectedRowKeys([]);
                }}
            >
                <ProTable
                    rowKey="staffId"
                    scroll={{ x: 'max-content' }}
                    options={false}
                    columns={columns}
                    rowSelection={rowSelection}
                    tableAlertRender={false}
                    request={async (params: any) => {
                        const result = await getUnRoleStaffs({
                            ...omit(params, ['current']),
                            pageNum: params.current as number,
                            roleId,
                        });
                        return {
                            data: result?.records ?? [],
                            total: result?.total ?? 0,
                        };
                    }}
                />
            </Modal>
            <Button type="primary" onClick={() => setOpen(true)}>
                添加用户
            </Button>
        </>
    );
};

export default AddUserModal;

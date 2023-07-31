import { cancelRole, getRoleStaffs } from '@/services/role';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { Button, Modal, message } from 'antd';
import { omit } from 'lodash';
import { useMemo, useRef, useState } from 'react';
import AddUserModal from './AddUserModal';

const AssignUser = () => {
    const { roleId } = useParams();
    const actionRef = useRef<ActionType>(null);

    const { run, loading } = useRequest(cancelRole, {
        manual: true,
        onSuccess: () => {
            message.success(`成功`);
            actionRef.current?.reload();
        },
    });
    const cancelRoleFn = (staffIds: number[]) => {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '确认取消授权?',
            okText: '确定',
            cancelText: '取消',
            onOk: async (close) => {
                run({ roleId, staffIds });
                close();
            },
        });
    };

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
            {
                title: '操作',
                valueType: 'option',
                fixed: 'right',
                align: 'center',
                render: (_: any, record: any) => {
                    return (
                        <Button
                            type="link"
                            size="small"
                            loading={loading}
                            onClick={() => cancelRoleFn([record.staffId])}
                        >
                            取消授权
                        </Button>
                    );
                },
            },
        ],
        [],
    );
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
        <>
            <ProTable
                actionRef={actionRef}
                tableAlertRender={false}
                rowKey="staffId"
                scroll={{ x: 'max-content' }}
                options={false}
                columns={columns}
                rowSelection={rowSelection}
                toolBarRender={() => [
                    <AddUserModal
                        key="add"
                        roleId={roleId as string}
                        refresh={() => actionRef.current?.reload()}
                    />,
                    <Button
                        key="cancel"
                        type="primary"
                        loading={loading}
                        style={{ backgroundColor: '#ff9292' }}
                        disabled={selectedRowKeys.length === 0}
                        onClick={() =>
                            cancelRoleFn(selectedRowKeys as number[])
                        }
                    >
                        批量取消授权
                    </Button>,
                    <Button
                        key="close"
                        type="primary"
                        style={{ backgroundColor: 'orange' }}
                        onClick={() => history.go(-1)}
                    >
                        关闭
                    </Button>,
                ]}
                request={async (params: any) => {
                    const result = await getRoleStaffs({
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
        </>
    );
};

export default AssignUser;

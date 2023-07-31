import { getMenuList } from '@/services/menu';
import { deleteRole, getRole } from '@/services/role';
import { getAllOrgTree } from '@/services/user';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { history, useRequest } from '@umijs/max';
import { Button, Modal, Space, message } from 'antd';
import { useGetState } from 'cmt-utils';
import { omit } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';
import AddRoleModal from './AddRoleModal';
import PermissionModal from './PermissionModal';

const Role = () => {
    const actionRef = useRef<ActionType>(null);
    const { run, loading } = useRequest(deleteRole, {
        manual: true,
        onSuccess: () => {
            message.success('删除成功');
            actionRef.current?.reload();
        },
    });

    const [, setTreeData, getTreeData] = useGetState([]);
    const [, setPermissionData, getPermissionData] = useGetState([]);

    const getTreeDataFn = async () => {
        const res = await getMenuList();
        setTreeData(res);
    };

    const getPermissionDataFn = async () => {
        const res = await getAllOrgTree();
        setPermissionData(res);
    };

    const deleteData = (roleId: number) => {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '确认删除?',
            okText: '确定',
            cancelText: '取消',
            onOk: async (close) => {
                run({ roleId });
                close();
            },
        });
    };
    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'roleId',
                title: '角色编号',
                align: 'center',
                key: 'roleId',
                hideInSearch: true,
            },
            {
                dataIndex: 'roleName',
                title: '角色名称',
                align: 'center',
                key: 'roleName',
            },
            {
                dataIndex: 'roleKey',
                title: '权限字符',
                align: 'center',
                key: 'roleKey',
                hideInSearch: true,
            },
            {
                dataIndex: 'roleSort',
                title: '显示顺序',
                align: 'center',
                key: 'roleSort',
                hideInSearch: true,
            },
            {
                dataIndex: 'status',
                title: '状态',
                align: 'center',
                key: 'status',
                valueEnum: {
                    0: {
                        text: '正常',
                        status: 'Success',
                    },
                    1: {
                        text: '停用',
                        status: 'Error',
                    },
                },
            },
            {
                dataIndex: 'createTime',
                title: '创建时间',
                align: 'center',
                // valueType: 'dateRange',
                key: 'createTime',
                hideInSearch: false,
            },
            {
                title: '操作',
                valueType: 'option',
                fixed: 'right',
                align: 'center',
                render: (_: any, record: any) => {
                    return (
                        <Space size="small">
                            <AddRoleModal
                                treeData={getTreeData()}
                                buttonTitle="编辑"
                                refresh={() => actionRef.current?.reload()}
                                roleId={record.roleId}
                            />
                            <Button
                                type="link"
                                size="small"
                                loading={loading}
                                onClick={() => deleteData(record.roleId)}
                            >
                                删除
                            </Button>
                            <PermissionModal
                                treeData={getPermissionData()}
                                roleId={record.roleId}
                                refresh={() => actionRef.current?.reload()}
                            />
                            <Button
                                type="link"
                                size="small"
                                onClick={() =>
                                    history.push(
                                        `/system/assignUser/${record.roleId}`,
                                    )
                                }
                            >
                                分配用户
                            </Button>
                        </Space>
                    );
                },
            },
        ],
        [],
    );

    useEffect(() => {
        getTreeDataFn();
        getPermissionDataFn();
    }, []);
    return (
        <ProTable
            rowKey="roleId"
            scroll={{ x: 'max-content' }}
            options={false}
            columns={columns}
            actionRef={actionRef}
            request={async (params: any) => {
                const result = await getRole({
                    ...omit(params, ['current']),
                    pageNum: params.current as number,
                });
                return {
                    data: result?.records ?? [],
                    total: result?.total ?? 0,
                };
            }}
            toolBarRender={() => [
                <AddRoleModal
                    key="add"
                    treeData={getTreeData()}
                    refresh={() => actionRef.current?.reload()}
                    buttonTitle="新增"
                />,
                // <Button key="delete" size="small">
                //     删除
                // </Button>,
                // <Button key="export" size="small">
                //     导出
                // </Button>,
            ]}
        />
    );
};
export default Role;

import { deleteMenuById, getMenuList } from '@/services/menu';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Modal, Space, message } from 'antd';
import { useMemo, useRef } from 'react';
import AddMenuModal from './AddMenuModal';

const MenuPage = () => {
    const actionRef = useRef<ActionType>(null);
    const { run, loading } = useRequest(deleteMenuById, {
        manual: true,
        onSuccess: () => {
            message.success('删除成功');
            actionRef.current?.reload();
        },
    });
    const deleteData = (menuId: number) => {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '确认删除?',
            okText: '确定',
            cancelText: '取消',
            onOk: async (close) => {
                run(menuId);
                close();
            },
        });
    };
    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'menuName',
                title: '菜单名称',
                align: 'center',
                key: 'menuName',
            },
            {
                dataIndex: 'menuSort',
                title: '排序',
                align: 'center',
                key: 'menuSort',
                hideInSearch: true,
            },
            {
                dataIndex: 'perms',
                title: '权限标识',
                align: 'center',
                key: 'perms',
                hideInSearch: true,
            },
            {
                dataIndex: 'path',
                title: '组件路径',
                align: 'center',
                key: 'path',
                hideInSearch: true,
            },
            {
                dataIndex: 'createTime',
                title: '创建时间',
                align: 'center',
                key: 'createTime',
                hideInSearch: true,
            },
            {
                title: '操作',
                valueType: 'option',
                fixed: 'right',
                align: 'center',
                render: (_: any, record: any) => {
                    return (
                        <Space size="small">
                            <AddMenuModal
                                key="edit"
                                buttonTitle="编辑"
                                initFormValues={record}
                                refresh={() => actionRef.current?.reload()}
                            />
                            <Button
                                type="link"
                                size="small"
                                loading={loading}
                                onClick={() => deleteData(record.menuId)}
                            >
                                删除
                            </Button>
                        </Space>
                    );
                },
            },
        ],
        [],
    );

    return (
        <ProTable
            revalidateOnFocus={false}
            bordered
            actionRef={actionRef}
            toolBarRender={() => [
                <AddMenuModal
                    key="add"
                    buttonTitle="新建"
                    refresh={() => actionRef.current?.reload()}
                    initFormValues={{ menuType: 'menu', visible: true }}
                />,
            ]}
            request={async (params: { menuName?: string }) => {
                const result = await getMenuList(params);
                return {
                    data: result ?? [],
                };
            }}
            rowKey={'menuId'}
            columns={columns}
            options={false}
            pagination={false}
        />
    );
};

export default MenuPage;

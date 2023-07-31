import { getStaffs } from '@/services/user';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Col, Row } from 'antd';
import { omit } from 'lodash';
import { useMemo, useRef, useState } from 'react';
import UserTree from './UserTree';

const User: React.FC = () => {
    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'staffId',
                title: '用户编号',
                align: 'center',
                key: 'staffId',
                hideInSearch: true,
            },
            {
                dataIndex: 'name',
                title: '用户名称',
                align: 'center',
                key: 'name',
            },
            // {
            //     dataIndex: 'nickName',
            //     title: '用户昵称',
            //     align: 'center',
            //     key: 'nickName',
            //     hideInSearch: true,
            // },
            {
                dataIndex: 'deptName',
                title: '部门',
                align: 'center',
                key: 'deptName',
                hideInSearch: true,
                // render: (_, record: any) => <span>{record.dept.deptName}</span>,
            },
            {
                dataIndex: 'phone',
                title: '手机号码',
                align: 'center',
                key: 'phone',
            },
            {
                dataIndex: 'status',
                title: '状态',
                align: 'center',
                key: 'status',
                hideInSearch: true,
                valueEnum: {
                    0: {
                        text: '离职',
                        status: 'Error',
                    },
                    2: {
                        text: '退休',
                        status: 'Processing',
                    },
                    3: {
                        text: '在职',
                        status: 'Success',
                    },
                },
            },
            {
                dataIndex: 'createTime',
                title: '创建时间',
                align: 'center',
                valueType: 'dateRange',
                key: 'createTime',
                hideInSearch: true,
                render: (_, record) => record.createTime,
            },
            // {
            //     title: '操作',
            //     valueType: 'option',
            //     fixed: 'right',
            //     align: 'center',
            //     render: (_: any, record: any) => {
            //         // record.deptId = record.dept.dept;
            //         return (
            //             <Space size="small">
            //                 <AddModalForm
            //                     initFormValues={record}
            //                     buttonTitle="编辑"
            //                 />
            //                 <Button type="link" size="small">
            //                     删除
            //                 </Button>
            //                 <Button type="link" size="small">
            //                     重置密码
            //                 </Button>
            //                 <Button
            //                     type="link"
            //                     size="small"
            //                     onClick={() =>
            //                         history.push(
            //                             `/system/assignRole/${record.userId}`,
            //                         )
            //                     }
            //                 >
            //                     分配角色
            //                 </Button>
            //             </Space>
            //         );
            //     },
            // },
        ],
        [],
    );
    const [orgId, setOrgId] = useState<number>();
    const { run } = useRequest(getStaffs, { manual: true });
    const actionRef = useRef<ActionType>(null);
    const treeRef = useRef<any>(null);

    const getTableData = async (params: any) => {
        const result: any = await run({
            ...omit(params, ['current']),
            orgId,
            pageNum: params.current as number,
            pageSize: params.pageSize as number,
        });
        return {
            total: result?.total ?? 0,
            data: result?.records ?? [],
        };
    };
    return (
        <Row gutter={16}>
            <Col span={6}>
                <UserTree
                    ref={treeRef}
                    onSelectChange={(orgId) => {
                        setOrgId(orgId);
                        actionRef?.current?.reload();
                    }}
                />
            </Col>
            <Col span={18}>
                <ProTable
                    rowKey="staffId"
                    actionRef={actionRef}
                    scroll={{ x: 'max-content' }}
                    options={false}
                    onReset={() => {
                        setOrgId(undefined);
                        treeRef?.current?.resetSelectKeys();
                        actionRef?.current?.reload();
                    }}
                    bordered
                    columns={columns}
                    request={getTableData}
                    // toolBarRender={() => [
                    //     <AddModalForm
                    //         key="add"
                    //         initFormValues={{}}
                    //         buttonTitle="新增"
                    //     />,
                    //     <Button key="delete" size="small">
                    //         删除
                    //     </Button>,
                    //     <Button key="import" size="small">
                    //         导入
                    //     </Button>,
                    //     <Button key="export" size="small">
                    //         导出
                    //     </Button>,
                    // ]}
                />
            </Col>
        </Row>
    );
};

export default User;

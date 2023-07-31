import { getContractRenewal } from '@/services/hrManage';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button } from 'antd';
import { omit } from 'lodash';
import { useMemo, useRef } from 'react';
import './index.less';

const LaborRenewal = () => {
    const actionRef = useRef<ActionType>(null);
    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'applyPerson',
                title: '申请人',
                align: 'center',
                key: 'applyPerson',
            },
            {
                dataIndex: 'renewalStaff',
                title: '申请续签员工',
                align: 'center',
                key: 'renewalStaff',
                hideInSearch: true,
            },
            {
                dataIndex: 'staffOrg',
                title: '部门',
                align: 'center',
                key: 'staffOrg',
            },
            {
                dataIndex: 'commitDate',
                title: '提交时间',
                align: 'center',
                key: 'commitDate',
                hideInSearch: true,
            },
            {
                dataIndex: 'state',
                title: '状态',
                align: 'center',
                key: 'state',
                hideInSearch: true,
                valueEnum: {
                    0: {
                        text: '审核通过',
                        status: 'Success',
                    },
                    1: {
                        text: '审核中',
                        status: 'Processing',
                    },
                    2: {
                        text: '审核未通过',
                        status: 'Error',
                    },
                },
            },
            {
                title: '操作',
                valueType: 'option',
                fixed: 'right',
                align: 'center',
                render: (_, records) => {
                    return (
                        <Button
                            type="link"
                            onClick={() =>
                                history.push(
                                    `/hr-manage/labor-renewal-detail/${records.contractRenewalApplyId}`,
                                )
                            }
                        >
                            查看
                        </Button>
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
            search={{
                labelWidth: 'auto',
            }}
            toolBarRender={() => [
                <Button
                    key="add"
                    type="primary"
                    onClick={() =>
                        history.push('/hr-manage/labor-renewal-edit')
                    }
                >
                    提交劳动合同续签申请
                </Button>,
            ]}
            request={async (params) => {
                const result = await getContractRenewal({
                    ...omit(params, ['current']),
                    pageNum: params.current as number,
                });
                return {
                    data: result?.records ?? [],
                    total: result?.total,
                };
            }}
            scroll={{ x: 'max-content' }}
            rowKey="contractRenewalApplyId"
            columns={columns}
            options={false}
        />
    );
};

export default LaborRenewal;

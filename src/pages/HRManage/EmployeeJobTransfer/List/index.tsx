import SelectOrg from '@/components/SelectOrg';
import { getJobTransferList } from '@/services/hrManage';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useNavigate, useRequest } from '@umijs/max';
import { Button } from 'antd';
import { omit } from 'lodash';
import { useMemo } from 'react';

const EmployeeJobTransfer = () => {
    const navigate = useNavigate();

    const { run } = useRequest(getJobTransferList, { manual: true });

    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'applyPerson',
                title: '申请人',
            },
            {
                dataIndex: 'transferStaff',
                title: '申请调岗员工',
            },
            {
                dataIndex: 'staffOrg',
                title: '员工所在公司',
                search: {
                    transform: (oldOrg) => ({ oldOrg }),
                },
                renderFormItem: () => <SelectOrg offFormMode />,
            },
            {
                dataIndex: 'transferOrg',
                title: '员工调入公司',
                search: {
                    transform: (newOrg) => ({ newOrg }),
                },
            },
            {
                dataIndex: 'startDate',
                title: '提交时间',
                valueType: 'dateRange',
                search: {
                    transform: (value) => ({
                        startDate: value?.[0],
                        endDate: value?.[1],
                    }),
                },
                render: (_text, record) => record.startDate,
            },
            {
                dataIndex: 'state',
                title: '状态',
                valueType: 'select',
            },
            {
                title: '操作',
                valueType: 'option',
                fixed: 'right',
                width: 80,
                render: () => <a>查看</a>,
            },
        ],
        [],
    );

    return (
        <ProTable
            rowKey={(_, index) => `EmployeeJobTransfer-${index}`}
            columns={columns}
            scroll={{ x: 'max-content' }}
            revalidateOnFocus
            toolBarRender={() => {
                return [
                    <Button
                        type="primary"
                        key="add"
                        onClick={() =>
                            navigate('/hr-manage/employee-job-transfer/add')
                        }
                    >
                        调岗申请
                    </Button>,
                ];
            }}
            request={async (params) => {
                const result = await run({
                    ...omit(params, ['current']),
                    pageNum: params.current,
                });

                return {
                    total: result?.total ?? 0,
                    data: result?.records ?? [],
                };
            }}
            options={false}
            search={{ span: 8, defaultCollapsed: false, labelWidth: 100 }}
        />
    );
};

export default EmployeeJobTransfer;

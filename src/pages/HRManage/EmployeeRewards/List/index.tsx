import { getRewardList } from '@/services/hrManage';
import { transformDict2Enum } from '@/utils';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Link, useModel, useNavigate, useRequest } from '@umijs/max';
import { Button } from 'antd';
import { omit } from 'lodash';
import { useMemo } from 'react';

const EmployeeRewards = () => {
    const navigate = useNavigate();

    const { initialState } = useModel('@@initialState');

    const { run } = useRequest(getRewardList, { manual: true });

    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'applyPerson',
                title: '申请人',
            },
            {
                dataIndex: 'awardStaff',
                title: '拟奖励员工',
            },
            {
                dataIndex: 'startDate',
                title: '发起时间',
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
                valueEnum: transformDict2Enum(
                    initialState?.hrDict?.auditState,
                    undefined,
                    ['dictDesc', 'dictCode'],
                ),
            },
            {
                dataIndex: 'hrHandleState',
                title: 'HR系统处理状态',
                hideInSearch: true,
            },
            {
                title: '操作',
                valueType: 'option',
                fixed: 'right',
                width: 80,
                render: (_, record) => (
                    <Link
                        to={`/hr-manage/employee-rewards/detail/${record.awardApplyId}`}
                    >
                        查看
                    </Link>
                ),
            },
        ],
        [initialState?.hrDict?.auditState],
    );

    return (
        <ProTable
            rowKey={(_, index) => `EmployeeRewards-${index}`}
            columns={columns}
            scroll={{ x: 'max-content' }}
            revalidateOnFocus
            toolBarRender={() => {
                return [
                    <Button
                        type="primary"
                        key="add"
                        onClick={() =>
                            navigate('/hr-manage/employee-rewards/add')
                        }
                    >
                        员工奖励申请
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

export default EmployeeRewards;

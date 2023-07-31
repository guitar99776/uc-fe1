import { getRehireList } from '@/services/hrManage';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useNavigate, useRequest } from '@umijs/max';
import { Button } from 'antd';
import { omit } from 'lodash';
import { useMemo } from 'react';

const EmployeeRehiring = () => {
    const navigate = useNavigate();

    const { run } = useRequest(getRehireList, { manual: true });

    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'applyPerson',
                title: '申请人',
            },
            {
                dataIndex: 'rehireStaff',
                title: '返聘人员',
            },
            {
                dataIndex: 'joinDepart',
                title: '待入职部门',
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
            },
            {
                dataIndex: 'state',
                title: '状态',
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
            rowKey={'id'}
            columns={columns}
            scroll={{ x: 'max-content' }}
            revalidateOnFocus
            toolBarRender={() => {
                return [
                    <Button
                        type="primary"
                        key="add"
                        onClick={() =>
                            navigate('/hr-manage/employee-rehiring/add')
                        }
                    >
                        员工返聘申请
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

export default EmployeeRehiring;

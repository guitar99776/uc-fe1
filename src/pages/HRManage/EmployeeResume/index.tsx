/*
 * @Author: Lin Yunhe
 * @Date: 2023-07-03 20:28:29
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-17 17:54:22
 */
import { getResumeList } from '@/services/hrManage';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Link, useRequest } from '@umijs/max';
import { omit } from 'lodash';
import { useMemo } from 'react';

const EmployeeResume = () => {
    const { run } = useRequest(getResumeList, { manual: true });

    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                title: '员工ID',
                dataIndex: 'sapStaffId',
            },
            {
                title: '姓名',
                dataIndex: 'staffName',
            },
            {
                title: '公司',
                dataIndex: 'companyName',
                hideInSearch: true,
            },
            {
                title: '部门',
                dataIndex: 'department',
                hideInSearch: true,
            },
            {
                title: '岗位',
                dataIndex: 'position',
                hideInSearch: true,
            },
            {
                title: '操作',
                key: 'option',
                valueType: 'option',
                fixed: 'right',
                width: 180,
                render: (_text, record) => {
                    return (
                        <Link
                            to={`/hr-manage/employee-resume/HR_MANAGE/${record?.sapStaffId}`}
                        >
                            查看简历
                        </Link>
                    );
                },
            },
        ],
        [],
    );

    return (
        <ProTable
            rowKey={'fkUser'}
            columns={columns}
            scroll={{ x: 'max-content' }}
            headerTitle=" "
            revalidateOnFocus
            request={async (params: any) => {
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
            search={{ span: 8, defaultCollapsed: false, labelWidth: 85 }}
        />
    );
};

export default EmployeeResume;

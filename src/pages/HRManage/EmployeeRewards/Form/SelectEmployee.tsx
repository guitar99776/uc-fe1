import SelectOrg from '@/components/SelectOrg';
import { getByOrg } from '@/services/common';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { TableRowSelection } from 'antd/es/table/interface';
import { omit } from 'lodash';
import { FC, useMemo } from 'react';

interface SelectEmployeeProps {
    onChange?: TableRowSelection<any>['onChange'];
}

const SelectEmployee: FC<SelectEmployeeProps> = (props) => {
    const { onChange } = props;

    const { run } = useRequest(getByOrg, { manual: true });

    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'staffId',
                title: '员工编号',
                hideInSearch: true,
            },
            {
                dataIndex: 'name',
                title: '员工姓名',
                hideInSearch: true,
            },
            {
                dataIndex: 'orgPathName',
                title: '员工所在组织',
                search: {
                    transform: (orgIds: any[][]) => ({
                        orgIds: orgIds
                            ?.map((item) => item[item.length - 1])
                            .flat(),
                    }),
                },
                renderFormItem: () => <SelectOrg offFormMode multiple />,
            },
            {
                dataIndex: 'postName',
                title: '岗位',
                hideInSearch: true,
            },
            {
                dataIndex: 'positionName',
                title: '职务',
                hideInSearch: true,
            },
        ],
        [],
    );

    return (
        <ProTable
            rowKey="staffId"
            options={false}
            columns={columns}
            search={{ span: 8, labelWidth: 100 }}
            rowSelection={{
                preserveSelectedRowKeys: true,
                onChange,
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
            scroll={{ x: 'max-content' }}
        />
    );
};

export default SelectEmployee;

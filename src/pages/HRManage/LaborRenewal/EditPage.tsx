import SelectOrg from '@/components/SelectOrg';
import { getContractRenewalExpire } from '@/services/hrManage';
import { ProColumns, ProForm, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Tooltip } from 'antd';
import { omit } from 'lodash';
import { useMemo, useState } from 'react';
import './index.less';

const EditPage = () => {
    const { initialState } = useModel('@@initialState');
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

    const onSelectChange = (selectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'org',
                title: '请选择组织单位层级',
                align: 'center',
                key: 'org',
                hideInTable: true,
                renderFormItem: () => {
                    return <SelectOrg offFormMode />;
                },
            },
            {
                dataIndex: 'endDate',
                title: '合同日期',
                align: 'center',
                key: 'endDate',
                valueType: 'select',
                hideInTable: true,
                valueEnum: {
                    1: '近10天到期',
                    2: '近15天到期',
                    3: '近20天到期',
                    4: '近25天到期',
                    5: '近30天到期',
                },
            },
            {
                dataIndex: 'staffNum',
                title: '员工编号',
                align: 'center',
                key: 'staffNum',
                hideInSearch: true,
            },
            {
                dataIndex: 'staffName',
                title: '姓名',
                align: 'center',
                key: 'staffName',
                hideInSearch: true,
            },
            {
                dataIndex: 'gender',
                title: '性别',
                align: 'center',
                key: 'gender',
                hideInSearch: true,
            },
            {
                dataIndex: 'age',
                title: '年龄',
                align: 'center',
                key: 'age',
                hideInSearch: true,
            },
            {
                dataIndex: 'idNum',
                title: '身份证号',
                align: 'center',
                key: 'idNum',
                hideInSearch: true,
            },
            {
                dataIndex: 'joinDate',
                title: '入职时间',
                align: 'center',
                key: 'joinDate',
                hideInSearch: true,
            },
            {
                dataIndex: 'staffOrg',
                title: '部门',
                align: 'center',
                key: 'staffOrg',
                hideInSearch: true,
            },
            {
                dataIndex: 'position',
                title: '岗位',
                align: 'center',
                key: 'position',
                hideInSearch: true,
            },
            {
                dataIndex: 'contractNum',
                title: '合同编号',
                align: 'center',
                key: 'contractNum',
                hideInSearch: true,
            },
            {
                dataIndex: 'contractEndDate',
                title: '合同结束日期',
                align: 'center',
                key: 'contractEndDate',
                hideInSearch: true,
            },
            {
                dataIndex: 'signCount',
                title: '已签订次数',
                align: 'center',
                key: 'signCount',
                hideInSearch: true,
            },
            {
                dataIndex: 'contractType',
                title: '合同类型',
                align: 'center',
                key: 'contractType',
                hideInSearch: true,
            },
        ],
        [],
    );

    return (
        <div className="labor-edit-page">
            <Card title="申请人信息" className="detail-card">
                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <span>
                        申请人: {initialState?.userInfo?.staffName ?? '--'}
                    </span>
                    <span>
                        申请人所属公司:{' '}
                        {initialState?.userInfo?.orgPathName ?? '-'}
                    </span>
                </div>
            </Card>
            <Card title="提交名单">
                <ProForm
                    submitter={{ resetButtonProps: false }}
                    onFinish={async () => {
                        console.log('selectedRowKeys', selectedRowKeys);
                    }}
                >
                    <ProTable
                        bordered
                        rowKey="id"
                        columns={columns}
                        revalidateOnFocus={false}
                        options={false}
                        rowSelection={rowSelection}
                        scroll={{ x: 'max-content' }}
                        search={{
                            labelWidth: 'auto',
                        }}
                        tableAlertRender={({ selectedRows }) => {
                            const selectedRowsStr = selectedRows
                                ?.map((im) => im.b)
                                .join('、');
                            return (
                                <div className="table-left-header">
                                    请勾选需要提交续签的员工名单。已选中
                                    <Tooltip title={selectedRowsStr}>
                                        <span className="table-alert">
                                            {' '}
                                            {selectedRowsStr}
                                        </span>
                                    </Tooltip>
                                </div>
                            );
                        }}
                        request={async (params: any) => {
                            const result = await getContractRenewalExpire({
                                ...omit(params, ['current', 'pageSize']),
                                org: params?.org ?? '',
                                endDate: params?.endDate ?? '',
                            });
                            return {
                                data: result?.records ?? [],
                                total: result?.total,
                            };
                        }}
                    />
                </ProForm>
            </Card>
        </div>
    );
};

export default EditPage;

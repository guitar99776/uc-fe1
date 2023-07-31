import { ProColumns, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button } from 'antd';
import { useMemo } from 'react';

const Remuneration = () => {
    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'a',
                title: '申请人',
                align: 'center',
                key: 'a',
            },
            {
                dataIndex: 'b',
                title: '调薪员工',
                align: 'center',
                key: 'b',
            },
            {
                dataIndex: 'c',
                title: '员工所在组织',
                align: 'center',
                key: 'c',
            },
            {
                dataIndex: 'd',
                title: '发起时间',
                align: 'center',
                key: 'd',
                valueType: 'dateTimeRange',
                render: (_, record) => {
                    return <span>{record.d}</span>;
                },
            },
            {
                dataIndex: 'e',
                title: '状态',
                align: 'center',
                key: 'e',
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
                width: 100,
                render: () => {
                    return (
                        <Button
                            type="link"
                            onClick={() => history.push('/remuneration/detail')}
                        >
                            查看
                        </Button>
                    );
                },
            },
        ],
        [],
    );
    const data = [
        {
            a: '王一',
            b: '吴青峰1、吴青峰2、吴青峰3、吴青峰4',
            c: '技术部',
            d: '2023-09-21  08:50:08',
            e: 0,
        },
        {
            a: '李一',
            b: '吴青峰1、吴青峰2、吴青峰3、吴青峰4',
            c: '技术部',
            d: '2023-09-21  08:50:08',
            e: 1,
        },
        {
            a: '张一',
            b: '吴青峰1、吴青峰2、吴青峰3、吴青峰4',
            c: '技术部',
            d: '2023-09-21  08:50:08',
            e: 2,
        },
        {
            a: '何一',
            b: '吴青峰1、吴青峰2、吴青峰3、吴青峰4',
            c: '技术部',
            d: '2023-09-21  08:50:08',
            e: 0,
        },
    ];
    return (
        <ProTable
            revalidateOnFocus={false}
            bordered
            search={{
                labelWidth: 'auto',
            }}
            toolBarRender={() => [
                <Button
                    key="add"
                    type="primary"
                    onClick={() => history.push('/remuneration/edit')}
                >
                    提交员工调薪申请
                </Button>,
            ]}
            request={async () => {
                return {
                    data,
                };
            }}
            scroll={{ x: 'max-content' }}
            rowKey={'menuId'}
            columns={columns}
            options={false}
        />
    );
};

export default Remuneration;

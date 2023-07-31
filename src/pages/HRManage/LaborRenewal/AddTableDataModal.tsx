import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import React, { useMemo, useState } from 'react';

interface AddModalType {
    emitSelectChange: (key: any[]) => void;
}

const AddTableDataModal = (props: AddModalType) => {
    const { emitSelectChange } = props;
    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'aa',
                title: '请选择组织单位层级',
                align: 'center',
                key: 'aa',
                hideInTable: true,
                valueType: 'treeSelect',
                request: async () => {
                    return await [
                        {
                            value: 'zhejiang',
                            label: 'Zhejiang',
                            children: [
                                {
                                    value: 'hangzhou',
                                    label: 'Hangzhou',
                                    children: [
                                        {
                                            value: 'xihu',
                                            label: 'West Lake',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            value: 'jiangsu',
                            label: 'Jiangsu',
                            children: [
                                {
                                    value: 'nanjing',
                                    label: 'Nanjing',
                                    children: [
                                        {
                                            value: 'zhonghuamen',
                                            label: 'Zhong Hua Men',
                                        },
                                    ],
                                },
                            ],
                        },
                    ];
                },
            },
            {
                dataIndex: 'bb',
                title: '合同日期',
                align: 'center',
                key: 'bb',
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
                dataIndex: 'a',
                title: '员工编号',
                align: 'center',
                key: 'a',
                hideInSearch: true,
            },
            {
                dataIndex: 'b',
                title: '姓名',
                align: 'center',
                key: 'b',
                hideInSearch: true,
            },
            {
                dataIndex: 'c',
                title: '性别',
                align: 'center',
                key: 'c',
                hideInSearch: true,
            },
            {
                dataIndex: 'd',
                title: '年龄',
                align: 'center',
                key: 'd',
                hideInSearch: true,
            },
            {
                dataIndex: 'e',
                title: '身份证号',
                align: 'center',
                key: 'e',
                hideInSearch: true,
            },
            {
                dataIndex: 'f',
                title: '入职时间',
                align: 'center',
                key: 'f',
                hideInSearch: true,
            },
            {
                dataIndex: 'h',
                title: '岗位',
                align: 'center',
                key: 'h',
                hideInSearch: true,
            },
            {
                dataIndex: 'i',
                title: '合同编号',
                align: 'center',
                key: 'i',
                hideInSearch: true,
            },
            {
                dataIndex: 'j',
                title: '合同结束日期',
                align: 'center',
                key: 'j',
                hideInSearch: true,
            },
            {
                dataIndex: 'k',
                title: '已签订次数',
                align: 'center',
                key: 'k',
                hideInSearch: true,
            },
            {
                dataIndex: 'l',
                title: '合同类型',
                align: 'center',
                key: 'l',
                hideInSearch: true,
            },
        ],
        [],
    );
    const data = [
        {
            id: 1,
            a: '12345678',
            b: '王一',
            c: '男',
            d: 322,
            e: '123****8901',
            f: '2023-01-01',
            h: '人事经理',
            i: 'xxxxxxxxxxxx',
            j: '2023-01-01',
            k: '1',
            l: '劳动合同(普通)',
        },
        {
            id: 2,
            a: '12345678',
            b: '王一',
            c: '男',
            d: 322,
            e: '123****8901',
            f: '2023-01-01',
            h: '人事经理',
            i: 'xxxxxxxxxxxx',
            j: '2023-01-01',
            k: '1',
            l: '劳动合同(普通)',
        },
        {
            id: 3,
            a: '12345678',
            b: '王一',
            c: '男',
            d: 322,
            e: '123****8901',
            f: '2023-01-01',
            h: '人事经理',
            i: 'xxxxxxxxxxxx',
            j: '2023-01-01',
            k: '1',
            l: '劳动合同(普通)',
        },
        {
            id: 4,
            a: '12345678',
            b: '王一',
            c: '男',
            d: 322,
            e: '123****8901',
            f: '2023-01-01',
            h: '人事经理',
            i: 'xxxxxxxxxxxx',
            j: '2023-01-01',
            k: '1',
            l: '劳动合同(普通)',
        },
    ];
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
    const [selectedRowData, setSelectedRowData] = useState<any[]>([]);
    const [open, setOpen] = useState(false);

    const onSelectChange = (
        selectedRowKeys: React.Key[],
        selectedRows: any[],
    ) => {
        setSelectedRowData(selectedRows);
        setSelectedRowKeys(selectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const handleOk = () => {
        console.log('selectedRowData', selectedRowData);
        emitSelectChange(selectedRowData);
        setOpen(false);
    };
    return (
        <>
            <Modal
                width="100%"
                title="添加用户"
                open={open}
                destroyOnClose
                // confirmLoading={loading}
                onOk={handleOk}
                onCancel={() => {
                    setOpen(false);
                    // setSelectedRowKeys([]);
                }}
            >
                <ProTable
                    rowKey="id"
                    scroll={{ x: 'max-content' }}
                    options={false}
                    columns={columns}
                    rowSelection={rowSelection}
                    tableAlertRender={false}
                    search={{ labelWidth: 'auto' }}
                    request={async (params: any) => {
                        console.log('params', params);
                        // const result = await getUnRoleStaffs({
                        //     ...omit(params, ['current']),
                        //     pageNum: params.current as number,
                        //     roleId,
                        // });
                        return {
                            data,
                        };
                    }}
                />
            </Modal>
            <Button type="primary" onClick={() => setOpen(true)}>
                选择提交名单
            </Button>
        </>
    );
};

export default AddTableDataModal;

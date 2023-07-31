/*
 * @Author: Xue XingChen
 * @Date: 2023-07-05 11:02:57
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-21 15:38:01
 */
import { AnchorEnum } from '@/components/Mine/index.d';
import { getPerformance } from '@/services/myInfo';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { Card } from 'antd';
import { useMemo } from 'react';

export default function Performance() {
    const { id } = useParams();
    const { data } = useRequest(getPerformance, {
        defaultParams: [id],
        refreshDeps: [id],
    });

    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'startDate',
                title: '开始日期',
                align: 'center',
                valueType: 'date',
            },
            {
                dataIndex: 'endDate',
                title: '结束日期',
                align: 'center',
                valueType: 'date',
            },
            {
                dataIndex: 'performanceResult',
                title: '绩效结果',
                align: 'center',
                search: false,
            },
            {
                dataIndex: 'performanceRemark',
                title: '考核评语',
                align: 'center',
                search: false,
            },
            {
                dataIndex: 'file',
                title: '绩效附件',
                align: 'center',
                search: false,
                render: (_, record) => {
                    return (
                        <a href={record?.attachUrl} rel="noreferrer">
                            {record.attachName}
                        </a>
                    );
                },
            },
        ],
        [data],
    );

    return (
        <Card id={AnchorEnum?.PERFORMANCE} title="绩效表现">
            <ProTable
                rowKey={'guid'}
                options={false}
                toolBarRender={false}
                pagination={false}
                dataSource={data}
                search={false}
                columns={columns}
                style={{ width: '100%' }}
            />
        </Card>
    );
}

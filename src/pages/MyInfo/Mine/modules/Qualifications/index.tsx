/*
 * @Author: Xue XingChen
 * @Date: 2023-07-05 11:02:57
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-17 19:29:26
 */
import OptionsActions from '@/components/Mine/OptionsActions';
import { AnchorEnum } from '@/components/Mine/index.d';
import { getCertificate } from '@/services/myInfo';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { Card } from 'antd';
import { useMemo } from 'react';

export default function Qualifications() {
    const { id, fromPage } = useParams();
    const { data, refresh, loading } = useRequest(getCertificate, {
        defaultParams: [id],
        refreshDeps: [id],
    });

    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'startDate',
                title: '获得日期',
                align: 'center',
            },
            {
                dataIndex: 'endDate',
                title: '到期日期',
                align: 'center',
            },
            {
                dataIndex: 'certificateName',
                title: '名称',
                align: 'center',
            },
            {
                dataIndex: 'assessUnit',
                title: '评定单位',
                align: 'center',
            },
            {
                dataIndex: 'certificateNum',
                title: '证书编号',
                align: 'center',
            },
            {
                dataIndex: 'file',
                title: '证书附件',
                align: 'center',
                render: (_, record) => {
                    return (
                        <a href={record.certificateAttachUrl}>
                            {record.certificateAttachName}
                        </a>
                    );
                },
            },
        ],
        [],
    );

    return (
        <Card
            id={AnchorEnum?.QUALIFICATION_CERTIFICATE}
            title="资质证书"
            loading={loading}
            extra={
                fromPage !== 'HR_MANAGE' && (
                    <OptionsActions
                        isAuditing={data?.hasApproving}
                        title="资质证书修改"
                        moduleName={AnchorEnum?.QUALIFICATION_CERTIFICATE}
                        refresh={refresh}
                        extraParams={{ historyId: data?.modifyHistoryId }}
                    />
                )
            }
        >
            <ProTable
                rowKey={'guid'}
                search={false}
                options={false}
                toolBarRender={false}
                pagination={false}
                dataSource={data?.certificateVOs ?? []}
                columns={columns}
                style={{ width: '100%' }}
            />
        </Card>
    );
}

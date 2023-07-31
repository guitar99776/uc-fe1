/*
 * @Author: Xue XingChen
 * @Date: 2023-07-05 11:02:57
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-17 19:25:34
 */
import OptionsActions from '@/components/Mine/OptionsActions';
import { AnchorEnum } from '@/components/Mine/index.d';
import { getLanguageAbility } from '@/services/myInfo';
import { transformDict2Enum } from '@/utils';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel, useParams, useRequest } from '@umijs/max';
import { Card } from 'antd';
import { useMemo } from 'react';

export default function Qualifications() {
    const { id, fromPage } = useParams();
    const { initialState } = useModel('@@initialState');
    const { data, refresh, loading } = useRequest(getLanguageAbility, {
        defaultParams: [id],
        refreshDeps: [id],
    });

    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'language',
                title: '语言种类',
                align: 'center',
            },
            {
                dataIndex: 'level',
                title: '语言能力',
                align: 'center',
                valueEnum: transformDict2Enum(
                    initialState?.dict?.LANGUAGE_LEVEL,
                ),
            },
        ],
        [data],
    );

    return (
        <Card
            id={AnchorEnum?.LANGUAGE_ABILITY}
            title="语言能力"
            loading={loading}
            extra={
                fromPage !== 'HR_MANAGE' && (
                    <OptionsActions
                        isAuditing={data?.hasApproving}
                        title="语言能力修改"
                        moduleName={AnchorEnum?.LANGUAGE_ABILITY}
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
                dataSource={data?.languageVOs ?? []}
                columns={columns}
                style={{ width: '100%' }}
            />
        </Card>
    );
}

/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 14:16:09
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-18 14:16:24
 */
import OptionsActions from '@/components/Mine/OptionsActions';
import { AnchorEnum } from '@/components/Mine/index.d';
import { getStaffInfo } from '@/services/myInfo';
import { useParams } from '@umijs/max';
import { Card, Empty } from 'antd';
import { useRequest } from 'cmt-utils';
import BaseInfoView from './View';

/**
 * @name 个人信息-基础信息
 */
function BaseInfo() {
    const { id, fromPage } = useParams();
    const { data, refresh, loading } = useRequest(getStaffInfo, {
        defaultParams: [id],
        refreshDeps: [id],
    });

    return (
        <Card
            id={AnchorEnum.BASE_INFO}
            loading={loading}
            title="基本信息"
            extra={
                fromPage !== 'HR_MANAGE' && (
                    <OptionsActions
                        isAuditing={data?.hasApproving}
                        title="基本信息修改"
                        moduleName={AnchorEnum?.BASE_INFO}
                        refresh={refresh}
                        extraParams={{ historyId: data?.modifyHistoryId }}
                    />
                )
            }
        >
            {!data ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                <BaseInfoView value={data} />
            )}
        </Card>
    );
}

export default BaseInfo;

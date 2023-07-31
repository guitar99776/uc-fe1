/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 14:16:09
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-17 19:20:43
 */
import OptionsActions from '@/components/Mine/OptionsActions';
import { AnchorEnum } from '@/components/Mine/index.d';
import { getAddressInfo } from '@/services/myInfo';
import { useParams } from '@umijs/max';
import { Card, Empty } from 'antd';
import { useRequest } from 'cmt-utils';
import ViewList from './ViewList';

import './index.less';

/**
 * @name 个人信息-联系地址
 */
function ContactAddress() {
    const { id, fromPage } = useParams();
    const { data, refresh, loading } = useRequest(getAddressInfo, {
        defaultParams: [id],
        refreshDeps: [id],
    });

    return (
        <Card
            id={AnchorEnum.CONTACT_ADDRESS}
            title="联系地址"
            loading={loading}
            extra={
                fromPage !== 'HR_MANAGE' && (
                    <OptionsActions
                        title="联系地址修改"
                        isAuditing={data?.hasApproving}
                        moduleName={AnchorEnum?.CONTACT_ADDRESS}
                        refresh={refresh}
                        extraParams={{ historyId: data?.modifyHistoryId }}
                    />
                )
            }
        >
            {Boolean(!data?.addressVOs?.length) ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                <ViewList value={data?.addressVOs || []} />
            )}
        </Card>
    );
}

export default ContactAddress;

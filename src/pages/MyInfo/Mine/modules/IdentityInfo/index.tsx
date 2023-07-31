/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 14:16:09
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-17 19:24:16
 */
import { AnchorEnum } from '@/components/Mine/index.d';
import { getIdentityInfo } from '@/services/myInfo';
import { transformDictEnumToText } from '@/utils';
import { ProDescriptions } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { Card } from 'antd';

/**
 * @name 个人信息-身份信息
 */
function IdentityInfo() {
    const { id } = useParams();
    const { data: info, loading } = useRequest(getIdentityInfo, {
        defaultParams: [id],
        refreshDeps: [id],
    });

    const descriptionsItems = (
        <ProDescriptions column={2}>
            <ProDescriptions.Item label="证件类型">
                {transformDictEnumToText('IDENTITY', info?.certificateType)}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="发行国家">
                {transformDictEnumToText('COUNTRY', info?.issuingCountry)}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="证件号码">
                {info?.certificateNum}
            </ProDescriptions.Item>
        </ProDescriptions>
    );

    return (
        <Card id={AnchorEnum.IDENTITY_INFO} title="身份信息" loading={loading}>
            {descriptionsItems}
        </Card>
    );
}

export default IdentityInfo;

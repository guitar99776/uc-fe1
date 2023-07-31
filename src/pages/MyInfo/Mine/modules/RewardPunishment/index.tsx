/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 14:16:09
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-17 19:29:55
 */
import { AnchorEnum } from '@/components/Mine/index.d';
import { getRewardPunishment } from '@/services/myInfo';
import { useParams, useRequest } from '@umijs/max';
import { Card } from 'antd';
import RewardPunishments from './List';

/**
 * @name 个人信息-奖惩信息
 */
function RewardPunishmentWrapper() {
    const { id } = useParams();
    const { data, loading } = useRequest(getRewardPunishment, {
        defaultParams: [id],
        refreshDeps: [id],
    });

    return (
        <Card
            id={AnchorEnum.REWARD_PUNISHMENT}
            title="奖惩信息"
            loading={loading}
        >
            <RewardPunishments value={data || []} />
        </Card>
    );
}

export default RewardPunishmentWrapper;

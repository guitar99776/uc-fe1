/*
 * @Author: Lin Yunhe
 * @Date: 2023-07-10 10:59:44
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-20 13:58:12
 */
import { transformDict2Enum } from '@/utils';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useMemo } from 'react';

interface RewardPunishmentsProps {
    value: any[];
}

/**
 * @name 奖惩信息
 */
const RewardPunishments = ({ value }: RewardPunishmentsProps) => {
    const { initialState } = useModel('@@initialState');
    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'issueDate',
                title: '执行日期',
            },
            {
                dataIndex: 'rewardPunishType',
                title: '奖惩类型',
                valueEnum: transformDict2Enum(
                    initialState?.dict?.REWARD_PUNISH_TYPE,
                ),
            },
            {
                dataIndex: 'initiateDepart',
                title: '奖惩发起部门',
            },
            {
                dataIndex: 'reason',
                title: '奖惩原因',
            },
        ],
        [],
    );

    return (
        <ProTable
            rowKey="invitationCode"
            columns={columns}
            scroll={{ x: 'max-content' }}
            revalidateOnFocus
            pagination={false}
            dataSource={value}
            options={false}
            search={false}
        />
    );
};

export default RewardPunishments;

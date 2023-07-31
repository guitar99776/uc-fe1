/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 14:16:09
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-17 19:26:46
 */
import { AnchorEnum } from '@/components/Mine/index.d';
import { getLecturerRecord } from '@/services/myInfo';
import { useParams, useRequest } from '@umijs/max';
import { Card, Empty } from 'antd';
import ViewList from './ViewList';

/**
 * @name 个人信息-讲师任职记录
 */
function LecturerRecord() {
    const { id } = useParams();
    const { data, loading } = useRequest(getLecturerRecord, {
        defaultParams: [id],
        refreshDeps: [id],
    });

    return (
        <Card
            id={AnchorEnum.LECTURER_RECORD}
            title="讲师任职记录"
            loading={loading}
        >
            {Boolean(!data?.length) ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                <ViewList value={data || []} />
            )}
        </Card>
    );
}

export default LecturerRecord;

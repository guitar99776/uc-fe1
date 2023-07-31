/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 14:16:09
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-17 19:31:56
 */
import OptionsActions from '@/components/Mine/OptionsActions';
import { AnchorEnum } from '@/components/Mine/index.d';
import { getTrainingExperience } from '@/services/myInfo';
import { useParams, useRequest } from '@umijs/max';
import { Card, Empty } from 'antd';
import ViewList from './ViewList';

/**
 * @name 个人信息-培训经历
 */
function TrainingExperience() {
    const { id, fromPage } = useParams();
    const { data, refresh, loading } = useRequest(getTrainingExperience, {
        defaultParams: [id],
        refreshDeps: [id],
    });

    return (
        <Card
            id={AnchorEnum.TRAINING_EXPERIENCE}
            title="培训经历"
            loading={loading}
            extra={
                fromPage !== 'HR_MANAGE' && (
                    <OptionsActions
                        isAuditing={data?.hasApproving}
                        title="培训经历修改"
                        moduleName={AnchorEnum?.TRAINING_EXPERIENCE}
                        refresh={refresh}
                        extraParams={{ historyId: data?.modifyHistoryId }}
                    />
                )
            }
            className="training-experience"
        >
            {Boolean(!data?.trainingExperienceVOs?.length) ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                <ViewList value={data?.trainingExperienceVOs || []} />
            )}
        </Card>
    );
}

export default TrainingExperience;

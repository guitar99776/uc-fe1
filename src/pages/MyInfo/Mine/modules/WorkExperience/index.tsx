/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 14:16:09
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-17 19:32:44
 */
import OptionsActions from '@/components/Mine/OptionsActions';
import { AnchorEnum } from '@/components/Mine/index.d';
import { getWorkExperience } from '@/services/myInfo';
import { useParams, useRequest } from '@umijs/max';
import { Card, Empty } from 'antd';
import ViewList from './ViewList';

import './index.less';

/**
 * @name 个人信息-工作经历
 */
function WorkExperience() {
    const { id, fromPage } = useParams();
    const { data, refresh, loading } = useRequest(getWorkExperience, {
        defaultParams: [id],
        refreshDeps: [id],
    });

    return (
        <Card
            id={AnchorEnum.WORK_EXPERIENCE}
            title="工作经历"
            loading={loading}
            extra={
                fromPage !== 'HR_MANAGE' && (
                    <OptionsActions
                        title="工作经历修改"
                        isAuditing={data?.hasApproving}
                        moduleName={AnchorEnum?.WORK_EXPERIENCE}
                        refresh={refresh}
                        extraParams={{ historyId: data?.modifyHistoryId }}
                    />
                )
            }
            className="work-experience"
        >
            {Boolean(!data?.socialExperienceVOs?.length) ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                <ViewList value={data?.socialExperienceVOs || []} />
            )}
        </Card>
    );
}

export default WorkExperience;

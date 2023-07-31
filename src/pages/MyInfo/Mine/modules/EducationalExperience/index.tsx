/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 14:16:09
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-17 19:22:33
 */
import OptionsActions from '@/components/Mine/OptionsActions';
import { AnchorEnum } from '@/components/Mine/index.d';
import { getEducationalExperience } from '@/services/myInfo';
import { useParams } from '@umijs/max';
import { Card, Empty } from 'antd';
import { useRequest } from 'cmt-utils';
import ViewList from './ViewList';

/**
 * @name 个人信息-教育经历
 */
function EducationalExperience() {
    const { id, fromPage } = useParams();
    const { data, refresh, loading } = useRequest(getEducationalExperience, {
        defaultParams: [id],
        refreshDeps: [id],
    });

    return (
        <Card
            id={AnchorEnum.EDUCATION_EXPERIENCE}
            title="教育经历"
            loading={loading}
            extra={
                fromPage !== 'HR_MANAGE' && (
                    <OptionsActions
                        isAuditing={data?.hasApproving}
                        title="教育经历修改"
                        moduleName={AnchorEnum?.EDUCATION_EXPERIENCE}
                        refresh={refresh}
                        extraParams={{ historyId: data?.modifyHistoryId }}
                    />
                )
            }
        >
            {Boolean(!data?.resumeEduExperienceVOs?.length) ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                <ViewList value={data?.resumeEduExperienceVOs || []} />
            )}
        </Card>
    );
}

export default EducationalExperience;

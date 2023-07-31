/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 14:16:09
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-17 19:28:30
 */
import { AnchorEnum } from '@/components/Mine/index.d';
import { getProjectExperience } from '@/services/myInfo';
import { useParams, useRequest } from '@umijs/max';
import { Card } from 'antd';
import ProjectExperiences from './List';

/**
 * @name 个人信息-项目经历
 */
function ProjectExperienceWrapper() {
    const { id } = useParams();
    const { data, loading } = useRequest(getProjectExperience, {
        defaultParams: [id],
        refreshDeps: [id],
    });

    return (
        <Card
            id={AnchorEnum.PROJECT_EXPERIENCE}
            title="项目经历"
            loading={loading}
        >
            <ProjectExperiences value={data || []} />
        </Card>
    );
}

export default ProjectExperienceWrapper;

/*
 * @Author: Lin Yunhe
 * @Date: 2023-07-10 10:59:44
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-10 15:57:01
 */
import LoadMoreAndFold from '@/components/Mine/LoadMoreAndFold';
import { transformDict2Enum } from '@/utils';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useMemo, useState } from 'react';

interface ProjectExperiencesProps {
    value: any[];
}

/**
 * @name 项目经历
 */
const ProjectExperiences = ({ value: sourceList }: ProjectExperiencesProps) => {
    const { initialState } = useModel('@@initialState');
    const [expand, setExpand] = useState(false);
    const newList = expand ? sourceList || [] : sourceList?.slice(0, 2);

    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'startDate',
                title: '开始日期',
            },
            {
                dataIndex: 'endDate',
                title: '结束日期',
            },
            {
                dataIndex: 'projectType',
                title: '项目类型',
                valueEnum: transformDict2Enum(initialState?.dict?.PROJECT_TYPE),
            },
            {
                dataIndex: 'projectName',
                title: '项目名称',
            },
        ],
        [],
    );

    return (
        <>
            <ProTable
                rowKey="invitationCode"
                columns={columns}
                scroll={{ x: 'max-content' }}
                revalidateOnFocus
                pagination={false}
                dataSource={newList}
                options={false}
                search={false}
            />
            {sourceList && sourceList?.length > 2 && (
                <LoadMoreAndFold defaultValue={expand} onChange={setExpand} />
            )}
        </>
    );
};

export default ProjectExperiences;

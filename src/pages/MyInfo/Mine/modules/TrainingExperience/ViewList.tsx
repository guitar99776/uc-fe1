/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 17:11:30
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-21 15:53:14
 */
import LoadMoreAndFold from '@/components/Mine/LoadMoreAndFold';
import { TrainingExperience } from '@/components/Mine/index.d';
import { transformDictEnumToText } from '@/utils';
import { Descriptions, Timeline } from 'antd';
import React, { useMemo, useState } from 'react';

interface ViewListProps {
    value?: TrainingExperience[];
}

const ViewList: React.FC<ViewListProps> = ({ value: sourceList }) => {
    const [expand, setExpand] = useState(false);

    const newList = expand ? sourceList || [] : sourceList?.slice(0, 2);

    const timelineItems = useMemo(() => {
        if (!newList?.length) return [];

        return newList?.map((item: TrainingExperience) => {
            return {
                children: (
                    <div key={item?.guid} className="timeline">
                        <p
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span>{item?.trainingCourse}</span>
                            <span style={{ color: '#999' }}>
                                {item?.startDate}-{item?.endDate}
                            </span>
                        </p>
                        <p>
                            {item?.trainingInstitution}
                            <span style={{ marginLeft: 30 }}>
                                授课老师：{item?.teacher}
                            </span>
                        </p>
                        <Descriptions column={2}>
                            <Descriptions.Item label="培训时长">
                                {item?.trainingDuration}
                                {transformDictEnumToText(
                                    'TRAINING_DURATION_TYPE',
                                    item?.durationUnit,
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="发证机构">
                                {item?.certifyingAuthority}
                            </Descriptions.Item>
                            <Descriptions.Item label="获得证书">
                                {item?.certificate}
                            </Descriptions.Item>
                            <Descriptions.Item label="培训成绩">
                                {item?.trainingScore ?? '暂无数据'}
                            </Descriptions.Item>
                            <Descriptions.Item label="证书编号">
                                {item?.certificateNum}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                ),
            };
        });
    }, [expand, newList]);

    return (
        <div>
            <Timeline items={timelineItems} />
            {sourceList && sourceList?.length > 2 && (
                <LoadMoreAndFold defaultValue={expand} onChange={setExpand} />
            )}
        </div>
    );
};

export default ViewList;

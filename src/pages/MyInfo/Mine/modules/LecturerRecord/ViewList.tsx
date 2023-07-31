/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 17:11:30
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-20 14:00:11
 */
import LoadMoreAndFold from '@/components/Mine/LoadMoreAndFold';
import { LecturerRecord } from '@/components/Mine/index.d';
import { transformDictEnumToText } from '@/utils';
import { Descriptions, Timeline } from 'antd';
import React, { useMemo, useState } from 'react';

interface ViewListProps {
    value?: LecturerRecord[];
}

const ViewList: React.FC<ViewListProps> = ({ value: sourceList }) => {
    const [expand, setExpand] = useState(false);

    const newList = expand ? sourceList || [] : sourceList?.slice(0, 2);

    const timelineItems = useMemo(() => {
        if (!newList?.length) return [];

        return newList?.map((item: LecturerRecord) => {
            return {
                children: (
                    <div key={item?.guid} className="timeline">
                        <p
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span>{item?.trainingClass}</span>
                            <span style={{ color: '#999' }}>
                                {item?.startDate}-{item?.endDate}
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
                                {item?.licenseAgency}
                            </Descriptions.Item>
                            <Descriptions.Item label="证书名称">
                                {item?.certificateName}
                            </Descriptions.Item>
                            <Descriptions.Item label="学员培训评价">
                                {item?.trainingRemark}
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

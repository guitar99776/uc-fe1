/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 17:11:30
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-10 14:22:58
 */
import LoadMoreAndFold from '@/components/Mine/LoadMoreAndFold';
import { WorkExperience } from '@/components/Mine/index.d';
import { transformDictEnumToText } from '@/utils';
import { Timeline } from 'antd';
import React, { useMemo, useState } from 'react';

import './index.less';

interface ViewListProps {
    value?: WorkExperience[];
}

const ViewList: React.FC<ViewListProps> = ({ value: sourceList }) => {
    const [expand, setExpand] = useState(false);

    const newList = expand ? sourceList || [] : sourceList?.slice(0, 2);

    const timelineItems = useMemo(() => {
        if (!newList?.length) return [];

        return newList?.map((item: WorkExperience) => {
            return {
                children: (
                    <div key={item?.guid} className="timeline">
                        <p
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span>
                                {item?.employerName}-
                                {transformDictEnumToText(
                                    'COUNTRY',
                                    item?.country,
                                )}
                                -{item?.city}
                            </span>
                            <span style={{ color: '#999' }}>
                                {item?.startDate}-{item?.endDate}
                            </span>
                        </p>
                        <p>
                            {item?.department}-{item?.previousPosition}
                        </p>
                        <p>{item?.workPerformance}</p>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <p>离职原因：{item?.leavingReason}</p>
                            <div>
                                <p>证明人：{item?.certifier}</p>
                                <p>证明人联系方式：{item?.certifierPhone}</p>
                            </div>
                        </div>
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

/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 17:11:30
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-07 15:15:04
 */
import LoadMoreAndFold from '@/components/Mine/LoadMoreAndFold';
import { EducationalExperience } from '@/components/Mine/index.d';
import { transformDictEnumToText } from '@/utils';
// import { useModel } from '@umijs/max';
import { Descriptions, Timeline } from 'antd';
import React, { useMemo, useState } from 'react';

interface ViewListProps {
    value?: EducationalExperience[];
}

const ViewList: React.FC<ViewListProps> = ({ value: sourceList }) => {
    // const { initialState } = useModel('@@initialState');
    const [expand, setExpand] = useState(false);

    const newList = expand ? sourceList || [] : sourceList?.slice(0, 2);

    const timelineItems = useMemo(() => {
        if (!newList?.length) return [];

        return newList?.map((item: EducationalExperience) => {
            return {
                children: (
                    <div key={item?.guid}>
                        <p
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span>
                                {item?.graduationSchool}-
                                {transformDictEnumToText(
                                    'COUNTRY',
                                    item?.country,
                                )}
                            </span>
                            <span style={{ color: '#999' }}>
                                {item?.startDate}-{item?.endDate}
                            </span>
                        </p>
                        <p>
                            {item?.major}-
                            {transformDictEnumToText(
                                'LEARN_STYLE',
                                item?.learningStyle,
                            )}
                            -
                            {transformDictEnumToText(
                                'LEARN_FORM',
                                item?.learningForm,
                            )}
                            -{item?.educationalSystem}年-
                            {transformDictEnumToText(
                                'ACADEMIC',
                                item?.academic,
                            )}
                            -{transformDictEnumToText('DEGREE', item?.degree)}
                        </p>
                        <Descriptions column={2}>
                            <Descriptions.Item label="学历证书编号">
                                {item?.academicCertificateNum}
                            </Descriptions.Item>
                            <Descriptions.Item label="学位证书编号">
                                {item?.degreeCertificatesNum}
                            </Descriptions.Item>
                            <Descriptions.Item label="学历授予日期">
                                {item?.academicDate}
                            </Descriptions.Item>
                            <Descriptions.Item label="学位授予日期">
                                {item?.degreeDate}
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

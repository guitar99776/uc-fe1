/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 17:11:30
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-11 14:11:29
 */
import { WorkExperience } from '@/components/Mine/index.d';
import { transformDictEnumToText } from '@/utils';
import { Descriptions, Space } from 'antd';
import React, { useMemo } from 'react';

import './index.less';

interface ViewListProps {
    value?: WorkExperience[];
}

const defaultValue = [
    {
        title: '通讯地址',
        addressType: '5',
        country: '',
        postCode: '',
        address: '',
        isLegal: '',
    },
    {
        title: '家庭地址',
        addressType: '3',
        country: '',
        postCode: '',
        address: '',
        isLegal: '',
    },
    {
        title: '户口地址',
        addressType: '6',
        country: '',
        postCode: '',
        address: '',
        isLegal: '',
    },
];

const ViewList: React.FC<ViewListProps> = ({ value: sourceList }) => {
    const newList = useMemo(() => {
        if (!sourceList) return defaultValue;

        const addressMap = sourceList?.reduce((prev: any, item: any) => {
            return {
                ...prev,
                [item?.addressType]: item,
            };
        }, {});

        return defaultValue.map(({ title, addressType }: any) => ({
            title,
            ...(addressMap?.[addressType] || {}),
        }));
    }, [sourceList]);

    const descriptionsItems = useMemo(() => {
        return newList.map((item: any) => {
            return (
                <Descriptions
                    key={item?.addressType}
                    title={item?.title}
                    column={1}
                >
                    <Descriptions.Item label="国家/地区">
                        {transformDictEnumToText('COUNTRY', item?.country)}
                    </Descriptions.Item>
                    <Descriptions.Item label="邮政编码">
                        {item?.postCode}
                    </Descriptions.Item>
                    <Descriptions.Item label="地址">
                        {item?.address}
                    </Descriptions.Item>
                    {item?.isLegal && <p>📍该地址为法定通知地址</p>}
                </Descriptions>
            );
        });
    }, [newList]);

    return (
        <Space align="start" direction="horizontal">
            {descriptionsItems}
        </Space>
    );
};

export default ViewList;

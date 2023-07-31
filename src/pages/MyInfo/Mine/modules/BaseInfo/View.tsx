import { transformDict2Enum } from '@/utils';
import { ProDescriptions } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

/*
 * @Author: Lin Yunhe
 * @Date: 2023-07-04 16:49:32
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-20 15:02:48
 */

interface BaseInfoViewProps {
    value?: any;
}

function BaseInfoView({ value: info }: BaseInfoViewProps) {
    const { initialState } = useModel('@@initialState');

    const fileds = [
        {
            label: '员工ID',
            value: 'staffId',
        },
        {
            label: '民族',
            value: 'ethnicity',
            valueEnum: transformDict2Enum(initialState?.dict?.ETHNICITY),
        },
        {
            label: '入职日期',
            value: 'entryDate',
        },
        {
            label: '出生日期',
            value: 'birthDate',
        },
        {
            label: '籍贯',
            value: 'nativePlace',
        },
        {
            label: '司龄(年)',
            value: 'entryAge',
        },
        {
            label: '婚姻情况',
            value: 'marriage',
            valueEnum: transformDict2Enum(initialState?.dict?.MARRIAGE_STATUS),
        },
        {
            label: '户籍',
            value: 'censusRegister',
        },
        {
            label: '盛屯体系司龄(年)',
            value: 'ctEntryAge',
        },
        {
            label: '政治面貌',
            value: 'politicalStatus',
            valueEnum: transformDict2Enum(initialState?.dict?.POLITICAL),
        },
        {
            label: '手机号码',
            value: 'phoneNum',
        },
        {
            label: '社会工龄（年）',
            value: 'socialSeniority',
        },
        {
            label: '出生国',
            value: 'birthCountry',
            valueEnum: transformDict2Enum(initialState?.dict?.COUNTRY),
        },
        {
            label: '公司邮箱',
            value: 'companyEmail',
        },
        {
            label: '国籍',
            value: 'nationality',
            valueEnum: transformDict2Enum(initialState?.dict?.COUNTRY),
        },
        {
            label: '个人邮箱',
            value: 'personalEmail',
        },
    ];

    const items = fileds?.map((item) => (
        <ProDescriptions.Item
            key={item?.value}
            label={item?.label}
            valueEnum={item?.valueEnum}
        >
            {info?.[item?.value] || '-'}
        </ProDescriptions.Item>
    ));

    return (
        <div style={{ display: 'flex' }}>
            <img
                style={{
                    width: 136,
                    height: 180,
                    flexShrink: 0,
                    marginRight: 20,
                    background: '#999',
                }}
                src={info?.iconUrl}
            />
            <div>
                <p style={{ marginBottom: 20 }}>
                    <span style={{ marginRight: 20 }}>{info?.name}</span>
                    <span style={{ marginRight: 20, fontSize: 20 }}>
                        {/* {info?.gender === '1' ? '🚹' : '🚺'} */}
                        {info?.gender === '1' ? '👦' : '🧒'}
                        {/* {info?.gender === '1' ? (
                            <ManOutlined
                                style={{ fontSize: 18, color: '#D80018' }}
                            />
                        ) : (
                            <WomanOutlined
                                // style={{ fontSize: 18, color: '#D80018' }}
                                style={{ fontSize: 18 }}
                            />
                        )} */}
                    </span>
                    <span>
                        {info?.org}-{info?.position}
                    </span>
                </p>
                <ProDescriptions column={3}>{items}</ProDescriptions>
            </div>
        </div>
    );
}

export default BaseInfoView;

import { ProDescriptions } from '@ant-design/pro-components';

interface SubmitterInfoProps {
    value?: any;
}

function SubmitterInfo({ value: info }: SubmitterInfoProps) {
    const fileds = [
        {
            label: '申请人',
            value: 'applyPerson',
        },
        {
            label: '申请人所在组织',
            value: 'applyPersonOrg',
        },
        {
            label: '岗位',
            value: 'trialPost',
        },
        {
            label: '性别',
            value: 'sex',
        },
        {
            label: '入职日期',
            value: 'joinDate',
        },
        {
            label: '学 历',
            value: 'education',
        },
        {
            label: '毕业院校',
            value: 'school',
        },
        {
            label: '专业',
            value: 'speciality',
        },
        {
            label: '出生年月',
            value: 'birthday',
        },
        {
            label: '试用期结束日期',
            value: 'trialDeadDate',
        },
    ];

    const items = fileds?.map((item) => (
        <ProDescriptions.Item key={item?.value} label={item?.label}>
            {info?.[item?.value] || '-'}
        </ProDescriptions.Item>
    ));

    return <ProDescriptions column={3}>{items}</ProDescriptions>;
}

export default SubmitterInfo;

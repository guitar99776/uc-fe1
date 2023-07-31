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
            value: 'postName',
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
            label: '合同截止日期',
            value: 'contractDeadlineDate',
        },
        {
            label: '员工类别',
            value: 'staffTypeName',
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

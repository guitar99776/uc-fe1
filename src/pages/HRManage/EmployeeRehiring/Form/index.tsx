import ProForm from '@/components/ProForm';
import SelectOrg from '@/components/SelectOrg';
import { setRehire } from '@/services/hrManage';
import {
    ProCard,
    ProDescriptions,
    ProFormDateRangePicker,
    ProFormDigit,
    ProFormMoney,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Space } from 'antd';
import { FC, memo, useCallback } from 'react';

interface FormProps {
    type: 'add' | 'readonly';
    data?: any;
}

const Form: FC<FormProps> = (props) => {
    const { type, data } = props;

    const readonly = type === 'readonly';

    const { run, loading } = useRequest(setRehire, { manual: true });

    const onFinish = useCallback(
        async (value: any) => {
            await run(value);

            return true;
        },
        [run],
    );

    return (
        <ProForm
            readonly={readonly}
            onFinish={onFinish}
            initialValues={data}
            layout="horizontal"
            labelCol={{ span: 8 }}
            grid
            submitter={
                readonly
                    ? false
                    : {
                          submitButtonProps: { loading },
                          resetButtonProps: false,
                      }
            }
        >
            <Space direction="vertical">
                <ProCard title="基本信息">
                    <ProDescriptions />
                </ProCard>

                <ProCard title="返聘人员信息">
                    <ProFormText label="返聘人员" name="rehireStaff" />
                    <ProFormSelect label="性别" name="gender" />
                    <ProFormDigit
                        label="年龄"
                        name="age"
                        fieldProps={{
                            precision: 0,
                        }}
                    />
                </ProCard>

                <ProCard title="返聘申请信息">
                    <SelectOrg />
                    <ProFormText label="入职职务" name="joinJob" />
                    <ProFormDateRangePicker
                        label="返聘入职及截止日期"
                        name="date"
                        transform={(value) => ({
                            joinDate: value?.[0],
                            endDate: value?.[1],
                        })}
                    />
                    <ProFormSelect label="返聘事件" name="rehireEvent" />
                    <ProFormMoney
                        label="调整后月薪（税前）"
                        name="transferSalary"
                    />
                    <ProFormTextArea label="申请事由" name="applyReason" />
                </ProCard>
            </Space>
        </ProForm>
    );
};

export default memo(Form);

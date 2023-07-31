import ProForm from '@/components/ProForm';
import SelectOrg from '@/components/SelectOrg';
import SelectUserOrPosition from '@/components/SelectUserOrPosition';
import { setTransfer } from '@/services/hrManage';
import {
    ProCard,
    ProDescriptions,
    ProFormDatePicker,
    ProFormMoney,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Space } from 'antd';
import dayjs from 'dayjs';
import { FC, memo, useCallback } from 'react';

interface FormProps {
    type: 'add' | 'readonly';
    data?: any;
}

const Form: FC<FormProps> = (props) => {
    const { type, data } = props;

    const readonly = type === 'readonly';

    const { run, loading } = useRequest(setTransfer, { manual: true });

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
                <ProCard title="提交人信息">
                    <ProDescriptions />
                </ProCard>

                <ProCard title="调岗员工信息">
                    <SelectUserOrPosition />
                    <ProFormText readonly label="员工编号" name="staffNum" />
                    <ProFormText readonly label="入职时间" name="joinDate" />
                    <ProFormMoney label="当前月薪（税前）" name="salary" />
                </ProCard>

                <ProCard title="调入信息">
                    <SelectOrg />
                    <ProFormSelect label="调整类型" name="transferType" />
                    <ProFormDatePicker
                        label="期望调整日期"
                        fieldProps={{
                            disabledDate: (current) =>
                                current && current < dayjs().startOf('day'),
                        }}
                        name="transferDate"
                    />
                    <ProFormMoney
                        label="调整后月薪（税前）"
                        name="transferSalary"
                    />
                    <ProFormTextArea label="调动原因" name="remark" />
                </ProCard>
            </Space>
        </ProForm>
    );
};

export default memo(Form);

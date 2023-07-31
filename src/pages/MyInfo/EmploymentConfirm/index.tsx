/*
 * @Author: Lin Yunhe
 * @Date: 2023-07-26 09:59:47
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-27 10:51:33
 */
import {
    getEmploymentConfirmInfo,
    updateEmploymentConfirmInfo,
} from '@/services/hrManage';
import { ProCard, ProForm, ProFormTextArea } from '@ant-design/pro-components';
import { Divider, message } from 'antd';
import { useRequest } from 'cmt-utils';
import SubmitterInfo from './SubmitterInfo';

/**
 * @name 转正申请
 */
function EmploymentConfirm() {
    const { data, refresh, loading } = useRequest(getEmploymentConfirmInfo);
    const { run, loading: submitLoading } = useRequest(
        updateEmploymentConfirmInfo,
        {
            manual: true,
            onSuccess() {
                message.success('提交成功');
                refresh?.();
            },
        },
    );

    return (
        <ProCard loading={loading}>
            <ProForm
                layout="horizontal"
                readonly={!data?.isSubmit}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 14 }}
                loading={submitLoading}
                initialValues={data}
                onFinish={async (values: any) => {
                    await run(values);
                }}
                submitter={
                    !data?.isSubmit
                        ? false
                        : {
                              resetButtonProps: false,
                          }
                }
            >
                <Divider orientation="left">提交人信息</Divider>
                <SubmitterInfo value={data} />
                <Divider orientation="left">工作小结</Divider>
                <ProFormTextArea
                    name="trialContent"
                    label="试用期完成工作"
                    rules={[
                        {
                            required: true,
                            message: '请输入',
                        },
                    ]}
                />
                <ProFormTextArea
                    name="planContent"
                    label="下一步工作计划"
                    rules={[
                        {
                            required: true,
                            message: '请输入',
                        },
                    ]}
                />
                <ProFormTextArea name="otherContent" label="其它" />
            </ProForm>
        </ProCard>
    );
}

export default EmploymentConfirm;

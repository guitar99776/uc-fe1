/*
 * @Author: Lin Yunhe
 * @Date: 2023-07-26 14:33:28
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-27 10:51:24
 */
import {
    getResignationApplyInfo,
    updateResignationApplyInfo,
} from '@/services/hrManage';
import {
    ProCard,
    ProForm,
    ProFormDatePicker,
    ProFormTextArea,
} from '@ant-design/pro-components';
import { Divider, message } from 'antd';
import { useRequest } from 'cmt-utils';
import SubmitterInfo from './SubmitterInfo';

/**
 * @name 离职申请
 */
function ResignationApply() {
    const { data, refresh, loading } = useRequest(getResignationApplyInfo);
    const { run, loading: submitLoading } = useRequest(
        updateResignationApplyInfo,
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
                <Divider orientation="left">离职申请</Divider>
                <ProFormDatePicker
                    name="expectedDate"
                    label="期望离职时间"
                    rules={[
                        {
                            required: true,
                            message: '请选择',
                        },
                    ]}
                />
                {!data?.isSubmit && (
                    <ProFormDatePicker
                        readonly
                        name="createTime"
                        label="申请时间"
                    />
                )}
                <ProFormTextArea
                    name="resignationContent"
                    label="离职原因"
                    colProps={{ span: 22 }}
                    rules={[
                        {
                            required: true,
                            message: '请输入',
                        },
                    ]}
                />
            </ProForm>
        </ProCard>
    );
}

export default ResignationApply;

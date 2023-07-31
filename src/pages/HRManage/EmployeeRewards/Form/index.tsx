import ProForm from '@/components/ProForm';
import Upload from '@/components/Upload';
import { setRewards } from '@/services/hrManage';
import { transformDict2Enum, transformUploadValue } from '@/utils';
import {
    ProCard,
    ProDescriptions,
    ProFormRadio,
    ProFormTextArea,
} from '@ant-design/pro-components';
import { useModel, useNavigate, useRequest } from '@umijs/max';
import { Space, message } from 'antd';
import { pick } from 'lodash';
import { FC, memo, useCallback, useState } from 'react';
import SelectEmployee from './SelectEmployee';

interface FormProps {
    type: 'add' | 'readonly';
    data?: any;
}

const Form: FC<FormProps> = (props) => {
    const { type, data } = props;

    const readonly = type === 'readonly';

    const navigate = useNavigate();

    const { initialState } = useModel('@@initialState');

    const [staffAwardApplyList, setStaffAwardApplyList] = useState<any[]>([]);

    const { run, loading } = useRequest(setRewards, {
        manual: true,
        onSuccess: () => {
            message.success('提交成功');

            navigate(-1);
        },
    });

    const onFinish = useCallback(
        async (value: any) => {
            if (!staffAwardApplyList.length) {
                message.warning('请选择奖励员工');
                return;
            }

            await run({
                ...value,
                staffAwardApplyList,
                attachUrl: transformUploadValue({ data: value.attachUrl })?.[0]
                    .url,
            });

            return true;
        },
        [run, staffAwardApplyList],
    );

    const onChange = useCallback((_: any, selectedRows: any[]) => {
        setStaffAwardApplyList(
            selectedRows.map((item) => {
                const current = pick(item, [
                    'name',
                    'staffId',
                    'deptName',
                    'postName',
                    'positionName',
                ]);

                return {
                    staffName: current.name,
                    staffId: current.staffId,
                    staffOrg: current.deptName,
                    post: current.postName,
                    job: current.positionName,
                };
            }),
        );
    }, []);

    return (
        <ProForm
            readonly={readonly}
            onFinish={onFinish}
            initialValues={data}
            layout="horizontal"
            labelCol={{ span: 3 }}
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
                    <ProDescriptions column={2} />
                </ProCard>

                <ProCard title="提交名单">
                    <SelectEmployee onChange={onChange} />
                </ProCard>

                <ProCard title="奖励信息">
                    <ProFormTextArea
                        label="申请事由"
                        name="applyReason"
                        placeholder="请输入申请事由"
                        rules={[{ required: true, message: '请输入申请事由' }]}
                    />
                    <ProFormRadio.Group
                        label="奖励措施"
                        name="awardMethod"
                        valueEnum={transformDict2Enum(
                            initialState?.hrDict?.staffAwardMethod,
                            undefined,
                            ['dictDesc', 'dictCode'],
                        )}
                        rules={[{ required: true, message: '请选择奖励措施' }]}
                    />
                    <Upload
                        label="上传附件"
                        rules={[{ required: true, message: '请上传附件' }]}
                        name="attachUrl"
                    />
                </ProCard>
            </Space>
        </ProForm>
    );
};

export default memo(Form);

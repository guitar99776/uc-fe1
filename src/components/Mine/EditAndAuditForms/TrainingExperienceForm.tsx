/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 15:55:25
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-21 16:47:32
 */
import {
    getTrainingExperience,
    updateTrainingExperience,
} from '@/services/myInfo';
import { objectArrToKeyArr } from '@/utils';
import {
    FormInstance,
    ProCard,
    ProForm,
    ProFormDateRangePicker,
    ProFormDigit,
    ProFormGroup,
    ProFormList,
    ProFormSelect,
    ProFormText,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Row, Spin, message } from 'antd';
import { useAsyncEffect, useRequest } from 'cmt-utils';
import { useEffect, useRef } from 'react';
import {
    ColorMarkMap,
    EditFormProps,
    HandleType,
    TrainingExperience,
} from '../index.d';

const EditModalForm = ({ type = 'EDIT', refresh, value }: EditFormProps) => {
    const { initialState } = useModel('@@initialState');
    const formRef = useRef<FormInstance>();
    const {
        data,
        loading,
        run: editRun,
    } = useRequest(getTrainingExperience, {
        manual: true,
    });

    const sourceList = data?.trainingExperienceVOs || [];

    useAsyncEffect(async () => {
        if (type === 'EDIT') await editRun();
    }, [type]);

    useEffect(() => {
        const _data = value || sourceList;

        if (_data) {
            formRef.current?.setFieldsValue({
                trainingExperiences:
                    _data?.map((i: TrainingExperience) => ({
                        ...i,
                        dateRange: [i?.startDate || '', i?.endDate || ''],
                    })) || [],
            });
        }
    }, [value, sourceList]);

    const handleFinish = async (values: any) => {
        const { trainingExperiences = [] } = values || {};

        const newList = trainingExperiences?.map((i: any) => {
            const item = {
                ...i,
                startDate: i?.dateRange?.[0],
                endDate: i?.dateRange?.[1],
            };

            // 无 guid 字段 标记为 新增
            if (!i?.guid) return { ...item, currentDataHandleType: 'INSERT' };

            return item;
        });

        // 标记删除数据
        const deleteRows = sourceList.reduce(
            (prev: any, item: TrainingExperience) => {
                // 新数组的唯一键集合
                const newGuids = objectArrToKeyArr(
                    trainingExperiences,
                    'guid',
                ).filter((i) => i);

                // 若新键集合不包含该 键值，则该项已被删除，标记为删除
                if (!newGuids.includes(item?.guid)) {
                    return prev.concat({
                        ...item,
                        currentDataHandleType: 'DELETE',
                    });
                }

                return prev;
            },
            [],
        );

        await updateTrainingExperience({
            resumeTrainingExperienceDTOs: [...newList, ...deleteRows],
        });
        message.success('提交成功');
        refresh?.();
        return true;
    };

    const isAuditing = type === 'AUDIT_VIEW' || type === 'AUDIT';

    return (
        <Spin spinning={loading}>
            <ProForm
                formRef={formRef}
                layout="horizontal"
                grid
                submitter={
                    isAuditing
                        ? false
                        : {
                              resetButtonProps: false,
                          }
                }
                labelCol={{ span: 8 }}
                colProps={{ span: 11, offset: 1 }}
                onFinish={handleFinish}
                readonly={isAuditing}
            >
                <ProFormList
                    name="trainingExperiences"
                    copyIconProps={false}
                    deleteIconProps={isAuditing ? false : undefined}
                    creatorButtonProps={isAuditing ? false : undefined}
                    colProps={{ span: 22 }}
                    initialValue={sourceList}
                    itemRender={({ listDom, action }, { record }) => {
                        return (
                            <ProCard
                                bordered
                                extra={action}
                                title={record?.name}
                                style={{
                                    marginBlockEnd: 8,
                                    background:
                                        ColorMarkMap?.[
                                            record?.currentDataHandleType as HandleType
                                        ],
                                }}
                            >
                                {listDom}
                            </ProCard>
                        );
                    }}
                >
                    <ProFormGroup colProps={{ span: 24 }}>
                        <ProFormDateRangePicker
                            colProps={{ span: 22, offset: 2 }}
                            name="dateRange"
                            label="起止日期"
                            rules={[
                                { required: true, message: '请输入起止日期' },
                            ]}
                        />
                        <ProFormText
                            labelCol={{ span: 8 }}
                            name="trainingCourse"
                            label="培训课程"
                            rules={[
                                { required: true, message: '请输入培训课程' },
                            ]}
                        />
                        <ProForm.Item
                            label="培训时长"
                            labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 24 }}
                        >
                            <Row>
                                <ProFormDigit
                                    width="md"
                                    name="trainingDuration"
                                />
                                <ProFormSelect
                                    width={100}
                                    name="durationUnit"
                                    fieldProps={{
                                        options:
                                            initialState?.dict
                                                .TRAINING_DURATION_TYPE,
                                        fieldNames: {
                                            label: 'desc',
                                            value: 'code',
                                            options: 'options',
                                        },
                                    }}
                                />
                            </Row>
                        </ProForm.Item>
                        <ProFormText
                            labelCol={{ span: 8 }}
                            name="trainingInstitution"
                            label="培训机构"
                        />
                        <ProFormText
                            labelCol={{ span: 8 }}
                            name="teacher"
                            label="授课老师"
                        />
                        <ProFormText
                            labelCol={{ span: 8 }}
                            name="certificate"
                            label="获得证书"
                        />
                        <ProFormText
                            labelCol={{ span: 8 }}
                            name="certifyingAuthority"
                            label="发放机构"
                        />
                        <ProFormText
                            labelCol={{ span: 8 }}
                            name="certificateNum"
                            label="证书编号"
                        />
                        <ProFormDigit
                            labelCol={{ span: 8 }}
                            name="trainingScore"
                            label="培训成绩"
                            min={0}
                            max={999}
                            fieldProps={{ maxLength: 3 }}
                        />
                        <ProFormDigit
                            name="courseScore"
                            label="课程评分"
                            min={0}
                            max={10}
                            labelCol={{ span: 8 }}
                        />
                    </ProFormGroup>
                </ProFormList>
            </ProForm>
        </Spin>
    );
};

export default EditModalForm;

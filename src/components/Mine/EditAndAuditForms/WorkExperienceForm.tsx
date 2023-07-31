/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 15:55:25
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-14 14:17:34
 */
import { getWorkExperience, updateWorkExperience } from '@/services/myInfo';
import { objectArrToKeyArr } from '@/utils';
import {
    FormInstance,
    ProCard,
    ProForm,
    ProFormDateRangePicker,
    ProFormGroup,
    ProFormList,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Spin, message } from 'antd';
import { useAsyncEffect, useRequest } from 'cmt-utils';
import { useEffect, useRef } from 'react';
import {
    ColorMarkMap,
    EditFormProps,
    HandleType,
    WorkExperience,
} from '../index.d';

const EditModalForm = ({ type = 'EDIT', refresh, value }: EditFormProps) => {
    const { initialState } = useModel('@@initialState');
    const formRef = useRef<FormInstance>();
    const {
        data,
        loading,
        run: editRun,
    } = useRequest(getWorkExperience, {
        manual: true,
    });

    const sourceList = data?.socialExperienceVOs || [];

    useAsyncEffect(async () => {
        if (type === 'EDIT') await editRun();
    }, [type]);

    useEffect(() => {
        // value 优先级高于 data
        const _data = value || sourceList;

        if (_data) {
            formRef.current?.setFieldsValue({
                workExperiences:
                    _data?.map((i: WorkExperience) => ({
                        ...i,
                        dateRange: [i?.startDate || '', i?.endDate || ''],
                    })) || [],
            });
        }
    }, [value, sourceList]);

    const handleFinish = async (values: any) => {
        const { workExperiences = [] } = values || {};

        const newList = workExperiences?.map((i: any) => {
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
            (prev: any, item: WorkExperience) => {
                // 新数组的唯一键集合
                const newGuids = objectArrToKeyArr(
                    workExperiences,
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

        await updateWorkExperience({
            resumeSocialExperienceDTOs: [...newList, ...deleteRows],
        });
        message.success('提交成功');
        refresh?.();
        return true;
    };

    const isAuditing = type === 'AUDIT_VIEW' || type === 'AUDIT';

    return (
        <Spin spinning={loading}>
            <ProForm
                layout="horizontal"
                grid
                formRef={formRef}
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
                    name="workExperiences"
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
                        <ProFormSelect
                            labelCol={{ span: 8 }}
                            name="country"
                            label="国家/地区"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择所在国/地区',
                                },
                            ]}
                            fieldProps={{
                                options: initialState?.dict.COUNTRY,
                                fieldNames: {
                                    label: 'desc',
                                    value: 'code',
                                    options: 'options',
                                },
                            }}
                        />
                        <ProFormText
                            labelCol={{ span: 8 }}
                            name="city"
                            label="城市"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择城市',
                                },
                            ]}
                        />
                        <ProFormText
                            labelCol={{ span: 8 }}
                            name="employerName"
                            label="公司名称"
                            rules={[
                                { required: true, message: '请输入公司名称' },
                            ]}
                        />
                        <ProFormText
                            labelCol={{ span: 8 }}
                            name="department"
                            label="部门"
                        />
                        <ProFormText
                            name="previousPosition"
                            label="先前职务"
                            labelCol={{ span: 8 }}
                        />
                        <ProFormText
                            name="certifier"
                            label="证明人"
                            labelCol={{ span: 8 }}
                        />
                        <ProFormText
                            name="certifierPhone"
                            label="证明人联系方式"
                            labelCol={{ span: 8 }}
                        />
                        <ProFormTextArea
                            name="workPerformance"
                            label="工作业绩"
                            // labelCol={{ span: 8 }}
                            colProps={{ span: 22, offset: 2 }}
                        />
                        <ProFormTextArea
                            name="leavingReason"
                            label="离职原因"
                            // labelCol={{ span: 8 }}
                            colProps={{ span: 22, offset: 2 }}
                        />
                    </ProFormGroup>
                </ProFormList>
            </ProForm>
        </Spin>
    );
};

export default EditModalForm;

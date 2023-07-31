/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 15:55:25
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-27 18:17:23
 */
import {
    getEducationalExperience,
    updateEducationalExperience,
} from '@/services/myInfo';
import { objectArrToKeyArr } from '@/utils';
import {
    ProCard,
    ProForm,
    ProFormDatePicker,
    ProFormDateRangePicker,
    ProFormDigit,
    ProFormGroup,
    ProFormList,
    ProFormRadio,
    ProFormSelect,
    ProFormText,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { FormInstance, Spin, message } from 'antd';
import { useAsyncEffect, useRequest } from 'cmt-utils';
import { useEffect, useRef } from 'react';
import {
    ColorMarkMap,
    EditFormProps,
    EducationalExperience,
    HandleType,
} from '../index.d';

const EditForm = ({ type = 'EDIT', refresh, value }: EditFormProps) => {
    const { initialState } = useModel('@@initialState');
    const formRef = useRef<FormInstance>();

    const {
        data,
        loading,
        run: editRun,
    } = useRequest(getEducationalExperience, {
        manual: true,
    });

    const sourceList = data?.resumeEduExperienceVOs;

    useAsyncEffect(async () => {
        if (type === 'EDIT') await editRun();
    }, [type]);

    useEffect(() => {
        const _data = value || sourceList;

        if (_data) {
            formRef.current?.setFieldsValue({
                educationalExperiences:
                    _data?.map((i: EducationalExperience) => ({
                        ...i,
                        dateRange: [i?.startDate || '', i?.endDate || ''],
                    })) || [],
            });
        }
    }, [sourceList]);

    const handleFinish = async (values: any) => {
        const { educationalExperiences = [] } = values || {};

        const newList = educationalExperiences?.map((i: any) => {
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
            (prev: any, item: EducationalExperience) => {
                // 新数组的唯一键集合
                const newGuids = objectArrToKeyArr(
                    educationalExperiences,
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

        await updateEducationalExperience({
            resumeEduExperienceDTOs: [...newList, ...deleteRows],
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
                formRef={formRef}
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
                    name="educationalExperiences"
                    copyIconProps={false}
                    deleteIconProps={isAuditing ? false : undefined}
                    creatorButtonProps={isAuditing ? false : undefined}
                    colProps={{ span: 22 }}
                    itemRender={({ listDom, action }, { record }) => {
                        return (
                            <ProCard
                                key={record.id}
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
                    {(f, index, action) => {
                        const currentData = action?.getCurrentRowData();

                        return (
                            <ProFormGroup colProps={{ span: 24 }}>
                                <ProFormDateRangePicker
                                    colProps={{ span: 22, offset: 2 }}
                                    name="dateRange"
                                    label="起止日期"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入起止日期',
                                        },
                                    ]}
                                />
                                <ProFormText
                                    labelCol={{ span: 8 }}
                                    name="graduationSchool"
                                    label="毕业学校及单位"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入毕业学校及单位',
                                        },
                                    ]}
                                />
                                <ProFormSelect
                                    labelCol={{ span: 8 }}
                                    name="academic"
                                    fieldProps={{
                                        options: initialState?.dict.ACADEMIC,
                                        fieldNames: {
                                            label: 'desc',
                                            value: 'code',
                                            options: 'options',
                                        },
                                    }}
                                    disabled={currentData?.guid}
                                    label="学历"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择学历',
                                        },
                                    ]}
                                />
                                <ProFormSelect
                                    labelCol={{ span: 8 }}
                                    name="country"
                                    label="院校所在国/地区"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择院校所在国/地区',
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
                                    name="academicCertificateNum"
                                    label="学历证书编号"
                                />
                                <ProFormText
                                    name="major"
                                    label="所学专业"
                                    labelCol={{ span: 8 }}
                                />
                                <ProFormDatePicker
                                    name="academicDate"
                                    label="学历授予日期"
                                    labelCol={{ span: 8 }}
                                />
                                <ProFormDigit
                                    name="educationalSystem"
                                    label="学制（年）"
                                    labelCol={{ span: 8 }}
                                    min={0}
                                    max={999}
                                    fieldProps={{ maxLength: 3 }}
                                />
                                <ProFormSelect
                                    name="degree"
                                    label="学位"
                                    labelCol={{ span: 8 }}
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择学位',
                                        },
                                    ]}
                                    fieldProps={{
                                        options: initialState?.dict.DEGREE,
                                        fieldNames: {
                                            label: 'desc',
                                            value: 'code',
                                            options: 'options',
                                        },
                                    }}
                                />
                                <ProFormSelect
                                    name="learningForm"
                                    label="学习形式"
                                    labelCol={{ span: 8 }}
                                    fieldProps={{
                                        options: initialState?.dict.LEARN_FORM,
                                        fieldNames: {
                                            label: 'desc',
                                            value: 'code',
                                            options: 'options',
                                        },
                                    }}
                                />
                                <ProFormText
                                    name="degreeCertificatesNum"
                                    label="学位证书编号"
                                    labelCol={{ span: 8 }}
                                />
                                <ProFormSelect
                                    name="learningStyle"
                                    label="从学方式"
                                    labelCol={{ span: 8 }}
                                    fieldProps={{
                                        options: initialState?.dict.LEARN_STYLE,
                                        fieldNames: {
                                            label: 'desc',
                                            value: 'code',
                                            options: 'options',
                                        },
                                    }}
                                />
                                <ProFormDatePicker
                                    name="degreeDate"
                                    label="学位授予日期"
                                    labelCol={{ span: 8 }}
                                />
                                <ProFormRadio.Group
                                    labelCol={{ span: 4 }}
                                    colProps={{ span: 22, offset: 2 }}
                                    name="highestAcademic"
                                    label="是否为最高学位"
                                    valueEnum={{ X: '是', '': '否' }}
                                    tooltip="最高学位有且仅有一项，若此处点击为最高学位，则其他教育经历的'是否为最高学位'会更改为'否'。"
                                />
                                <ProFormRadio.Group
                                    labelCol={{ span: 4 }}
                                    colProps={{ span: 22, offset: 2 }}
                                    name="highestDegree"
                                    label="是否为最高学历"
                                    valueEnum={{ X: '是', '': '否' }}
                                    tooltip="最高学历有且仅有一项，若此处点击为最高学历，则其他教育经历的'是否为最高学历'会更改为'否'。"
                                />
                            </ProFormGroup>
                        );
                    }}
                </ProFormList>
            </ProForm>
        </Spin>
    );
};

export default EditForm;

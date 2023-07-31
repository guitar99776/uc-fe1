/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 15:55:25
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-14 14:20:55
 */
import { getAddressInfo, updateAddressInfo } from '@/services/myInfo';
import {
    FormInstance,
    ProCard,
    ProForm,
    ProFormDependency,
    ProFormGroup,
    ProFormList,
    ProFormRadio,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Spin, message } from 'antd';
import { useAsyncEffect, useRequest } from 'cmt-utils';
import { useEffect, useMemo, useRef } from 'react';
import { ColorMarkMap, EditFormProps, HandleType } from '../index.d';

const defaultValue = [
    {
        title: '通讯地址',
        addressType: '5',
        country: '',
        postCode: '',
        address: '',
        isLegal: '',
    },
    {
        title: '家庭地址',
        addressType: '3',
        country: '',
        postCode: '',
        address: '',
        isLegal: '',
    },
    {
        title: '户口地址',
        addressType: '6',
        country: '',
        postCode: '',
        address: '',
        isLegal: '',
    },
];

const EditModalForm = ({ type = 'EDIT', refresh, value }: EditFormProps) => {
    const { initialState } = useModel('@@initialState');
    const formRef = useRef<FormInstance>();
    const {
        data,
        loading,
        run: editRun,
    } = useRequest(getAddressInfo, {
        manual: true,
    });

    useAsyncEffect(async () => {
        if (type === 'EDIT') await editRun();
    }, [type]);

    const newFormData = useMemo(() => {
        if (!value && !data?.addressVOs) return defaultValue;

        const _data = value || data?.addressVOs;
        const addressMap = _data?.reduce((prev: any, item: any) => {
            return {
                ...prev,
                [item?.addressType]: item,
            };
        }, {});

        return defaultValue.map(({ title, addressType }: any) => ({
            title,
            ...(addressMap?.[addressType] || {}),
        }));
    }, [data, value]);

    useEffect(() => {
        if (newFormData) {
            formRef.current?.setFieldsValue({
                contactAddress: newFormData,
            });
        }
    }, [newFormData]);

    const handleFinish = async (values: any) => {
        const { contactAddress = [] } = values || {};

        await updateAddressInfo({
            addressDTOs: contactAddress,
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
                    name="contactAddress"
                    copyIconProps={false}
                    creatorButtonProps={false}
                    deleteIconProps={false}
                    colProps={{ span: 22 }}
                    initialValue={newFormData}
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
                    {(meta: any, index: any, action) => {
                        const rowData = action.getCurrentRowData();

                        return (
                            <ProFormGroup
                                colProps={{ span: 24 }}
                                title={rowData.title}
                            >
                                <ProFormDependency name={['isLegal']}>
                                    {({ isLegal }) => {
                                        const required =
                                            isLegal === 'X' ||
                                            isLegal === 'YES';

                                        return (
                                            <>
                                                <ProFormSelect
                                                    labelCol={{ span: 8 }}
                                                    name="country"
                                                    label="国家/地区"
                                                    rules={[
                                                        {
                                                            required,
                                                            message:
                                                                '请选择所在国/地区',
                                                        },
                                                    ]}
                                                    fieldProps={{
                                                        options:
                                                            initialState?.dict
                                                                .COUNTRY,
                                                        fieldNames: {
                                                            label: 'desc',
                                                            value: 'code',
                                                            options: 'options',
                                                        },
                                                    }}
                                                />
                                                <ProFormText
                                                    labelCol={{ span: 8 }}
                                                    name="postCode"
                                                    label="邮政编码"
                                                    rules={[
                                                        {
                                                            required,
                                                            message:
                                                                '请输入邮政编码',
                                                        },
                                                    ]}
                                                />
                                                <ProFormTextArea
                                                    name="address"
                                                    label="地址"
                                                    // labelCol={{ span: 8 }}
                                                    colProps={{
                                                        span: 22,
                                                        offset: 2,
                                                    }}
                                                    rules={[
                                                        {
                                                            required,
                                                            message:
                                                                '请输入地址',
                                                        },
                                                    ]}
                                                />
                                            </>
                                        );
                                    }}
                                </ProFormDependency>
                                <ProFormRadio.Group
                                    labelCol={{ span: 4 }}
                                    colProps={{ span: 22, offset: 2 }}
                                    name="isLegal"
                                    label="法定通信地址"
                                    valueEnum={{ YES: '是', NO: '否' }}
                                    initialValue=""
                                    convertValue={(value) => {
                                        if (value === 'YES' || value === 'NO')
                                            return value;

                                        return value === 'X' ? 'YES' : 'NO';
                                    }}
                                    transform={(value) => {
                                        if (!value || value === 'NO') return '';

                                        return 'X';
                                    }}
                                    tooltip="通知函、合同、文书等重要文件的寄送地址，法定通信的地址信息不能为空。"
                                />
                            </ProFormGroup>
                        );
                    }}
                </ProFormList>
            </ProForm>
        </Spin>
    );
};

export default EditModalForm;

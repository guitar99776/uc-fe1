/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 14:55:12
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-20 14:09:18
 */
import { IS_EMAIL } from '@/constants';
import { getStaffInfo, updateStaffInfo } from '@/services/myInfo';
import {
    ProForm,
    ProFormGroup,
    ProFormSelect,
    ProFormText,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, FormInstance, Row, Spin, message } from 'antd';
import { useAsyncEffect, useRequest } from 'cmt-utils';
import { useEffect, useMemo, useRef } from 'react';
import { ColorMarkMap, EditFormProps } from '../index.d';

export default function BaseInfoForm({
    type = 'EDIT',
    refresh,
    value,
    changeFields = '',
}: EditFormProps) {
    const { initialState } = useModel('@@initialState');
    const formRef = useRef<FormInstance>();
    const isAuditing = type === 'AUDIT_VIEW' || type === 'AUDIT';

    const {
        data,
        loading,
        run: editRun,
    } = useRequest(getStaffInfo, { manual: true });

    useAsyncEffect(async () => {
        if (type === 'EDIT') await editRun();
    }, [type]);

    // value 优先级高于 data
    const localData = useMemo(() => value?.[0] || value || data, [value, data]);

    useEffect(() => {
        formRef.current?.setFieldsValue(localData);
    }, [localData]);

    const handleFinish = async (values: any) => {
        await updateStaffInfo({
            ...values,
            iconUrl: localData?.iconUrl,
            guid: localData?.guid,
        });

        message.success('提交成功');
        refresh?.();
    };

    return (
        <Spin spinning={loading}>
            <ProForm
                formRef={formRef}
                submitter={
                    isAuditing
                        ? false
                        : {
                              resetButtonProps: false,
                              //   render(props, dom) {
                              //       return (
                              //           <div
                              //               style={{
                              //                   display: 'flex',
                              //                   justifyContent: 'flex-end',
                              //                   marginTop: 10,
                              //               }}
                              //           >
                              //               {dom}
                              //           </div>
                              //       );
                              //   },
                          }
                }
                layout="horizontal"
                grid
                labelCol={{ span: 8 }}
                colProps={{ span: 8 }}
                onFinish={handleFinish}
            >
                <Row>
                    <ProForm.Item label="头像" labelCol={{ span: 6 }}>
                        <img
                            src={localData?.iconUrl}
                            alt="avatar"
                            style={{ height: 160 }}
                        />
                    </ProForm.Item>
                </Row>
                <ProFormGroup colProps={{ span: 24 }}>
                    <ProFormText name="staffId" label="员工ID" readonly />
                    <ProFormText name="ethnicity" label="民族" readonly />
                    <ProFormText name="entryDate" label="入职日期" readonly />
                    <ProFormText name="birthDate" label="出生日期" readonly />
                    <ProFormText name="nativePlace" label="籍贯" readonly />
                    <ProFormText name="entryAge" label="司龄(年)" readonly />
                    <Col
                        span={8}
                        style={{
                            background: changeFields?.includes('marriage')
                                ? ColorMarkMap?.MODIFY
                                : '',
                            padding: 0,
                        }}
                    >
                        <ProFormSelect
                            colProps={{ span: 24 }}
                            name="marriage"
                            label="婚姻情况"
                            fieldProps={{
                                options: initialState?.dict.MARRIAGE_STATUS,
                                fieldNames: {
                                    label: 'desc',
                                    value: 'code',
                                    options: 'options',
                                },
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: '婚姻情况',
                                },
                            ]}
                            readonly={isAuditing}
                        />
                    </Col>
                    <ProFormText name="censusRegister" label="户籍" readonly />
                    <ProFormText
                        name="ctEntryAge"
                        label="盛屯体系司龄(年)"
                        readonly
                    />
                    <ProFormText
                        name="politicalStatus"
                        label="政治面貌"
                        readonly
                    />
                    <ProFormText name="phoneNum" label="手机号码" readonly />
                    <ProFormText
                        name="socialSeniority"
                        label="社会工龄（年）"
                        readonly
                    />
                    <ProFormText name="birthCountry" label="出生国" readonly />
                    <ProFormText name="nationality" label="国籍" readonly />
                    <Col
                        span={8}
                        style={{
                            background: changeFields?.includes('companyEmail')
                                ? ColorMarkMap?.MODIFY
                                : '',
                            padding: 0,
                        }}
                    >
                        <ProFormText
                            colProps={{ span: 24 }}
                            name="companyEmail"
                            label="公司邮箱"
                            readonly={isAuditing}
                            rules={[
                                {
                                    pattern: IS_EMAIL,
                                    message: '请输入正确的公司邮箱',
                                },
                            ]}
                        />
                    </Col>
                    <Col
                        span={8}
                        style={{
                            background: changeFields?.includes('personalEmail')
                                ? ColorMarkMap?.MODIFY
                                : '',
                            padding: 0,
                        }}
                    >
                        <ProFormText
                            colProps={{ span: 24 }}
                            name="personalEmail"
                            label="个人邮箱"
                            readonly={isAuditing}
                            rules={[
                                {
                                    pattern: IS_EMAIL,
                                    message: '请输入正确的个人邮箱',
                                },
                            ]}
                        />
                    </Col>
                </ProFormGroup>
            </ProForm>
        </Spin>
    );
}

/*
 * @Author: Xue XingChen
 * @Date: 2023-07-05 11:19:48
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-27 16:08:35
 */
import { GENDER } from '@/constants';
import { getFamilyMember, updateFamilyMember } from '@/services/myInfo';
import { objectArrToKeyArr, transformDict2Enum } from '@/utils';
import {
    EditableProTable,
    ProColumns,
    ProForm,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Form, FormInstance, Input, Space, Spin, message } from 'antd';
import { useAsyncEffect, useRequest } from 'cmt-utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ColorMarkMap, EditFormProps, HandleType } from '../index.d';

interface FamilyMemberNameProps {
    value?: string[];
    onChange?: (value: string[]) => void;
}

/**
 * @name 家庭成员姓和名分开编辑
 */
const FamilyMemberName = ({ value, onChange }: FamilyMemberNameProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (value)
            form.setFieldsValue({
                firstName: value?.[0],
                lastName: value?.[1],
            });
    }, [value]);

    const handleValueChange = (_, values: any) => {
        onChange?.([values?.firstName, values?.lastName]);
    };

    return (
        <Form form={form} onValuesChange={handleValueChange}>
            <Space>
                <Form.Item noStyle name="firstName">
                    <Input placeholder="请输入姓氏" />
                </Form.Item>
                <Form.Item noStyle name="lastName">
                    <Input placeholder="请输入名称" />
                </Form.Item>
            </Space>
        </Form>
    );
};

export default function FamilyMembers({
    type = 'EDIT',
    refresh,
    value,
}: EditFormProps) {
    const { initialState } = useModel('@@initialState');
    const formRef = useRef<FormInstance>();
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    const {
        data,
        loading,
        run: editRun,
    } = useRequest(getFamilyMember, {
        manual: true,
    });

    useEffect(() => {
        const _dataSource = (value || data?.familyVOs)?.map((i: any) => ({
            ...i,
            familyName: [i.memberFamilyName, i.memberFirstname],
            id: i?.guid,
            emergencyContact: i?.emergencyContact === 'X' ? 'YES' : 'NO',
            isInCompany: i?.isInCompany === 'X' ? 'YES' : 'NO',
        }));

        formRef.current?.setFieldsValue({
            members: _dataSource,
        });
    }, [data, value]);

    const isAuditing = type === 'AUDIT_VIEW' || type === 'AUDIT';

    const columns = useMemo<ProColumns<any>[]>(() => {
        const defaultColumns = [
            {
                dataIndex: 'familyName',
                title: '家庭成员姓名',
                render: (_, record) => {
                    return `${record.familyName?.join('')}`;
                },
                width: 300,
                renderFormItem: () => <FamilyMemberName />,
            },
            {
                dataIndex: 'relation',
                title: '与本人关系',
                valueEnum: transformDict2Enum(
                    initialState?.dict?.FAMILY_RELATION,
                ),
            },
            {
                dataIndex: 'country',
                title: () => <span className="required">国籍</span>,
                valueEnum: transformDict2Enum(initialState?.dict?.COUNTRY),
                formItemProps: {
                    rules: [
                        {
                            required: true,
                            message: '请选择国籍',
                        },
                    ],
                },
            },
            {
                dataIndex: 'emergencyContact',
                title: () => <span className="required">是否为紧急联系人</span>,
                valueType: 'select',
                tooltip:
                    '至少必须配置一位紧急联系人，若为紧急联系人，手机号码为必填项，请认真填写。',
                valueEnum: {
                    YES: '是',
                    NO: '否',
                },
                formItemProps: {
                    rules: [
                        {
                            required: true,
                            message: '请选择是否为紧急联系人',
                        },
                    ],
                },
                render: (_, record) => {
                    return (
                        <>{record?.emergencyContact === 'YES' ? '是' : '否'}</>
                    );
                },
            },
            {
                dataIndex: 'phoneNum',
                title: '手机号码',
                formItemProps: (form, { entity }) => {
                    if (entity?.emergencyContact === 'YES') {
                        return {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入手机号码',
                                },
                            ],
                            className: 'required',
                        };
                    }

                    return {};
                },
            },
            {
                dataIndex: 'isInCompany',
                title: () => <span className="required">是否在公司任职</span>,
                tooltip:
                    '若为盛屯任职，则任职公司、任职职务为必填项，请真实填写。',
                valueEnum: {
                    YES: '是',
                    NO: '否',
                },
                render: (_, record) => {
                    return <>{record?.isInCompany === 'YES' ? '是' : '否'}</>;
                },
                formItemProps: {
                    rules: [
                        {
                            required: true,
                            message: '请选择是否在公司任职',
                        },
                    ],
                },
            },
            {
                dataIndex: 'companyName',
                title: '任职公司',
                width: 230,
                formItemProps: (form, { entity }) => {
                    if (entity?.isInCompany === 'YES') {
                        return {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择任职公司',
                                },
                            ],
                            className: 'required',
                        };
                    }

                    return {};
                },
            },
            {
                dataIndex: 'position',
                title: '任职职务',
                formItemProps: (form, { entity }) => {
                    if (entity?.isInCompany === 'YES') {
                        return {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择任职公司',
                                },
                            ],
                            className: 'required',
                        };
                    }

                    return {};
                },
            },
            {
                dataIndex: 'birthDate',
                title: '出生日期',
                valueType: 'date',
            },
            {
                dataIndex: 'gender',
                title: '性别',
                valueEnum: GENDER,
            },
        ];

        if (isAuditing) return defaultColumns;
        else
            return defaultColumns.concat([
                {
                    title: '操作',
                    valueType: 'option',
                    width: 200,
                    fixed: 'right',
                    render: (text, record, _, action) => [
                        <a
                            key="editable"
                            onClick={() => {
                                action?.startEditable?.(record.id);
                            }}
                        >
                            编辑
                        </a>,
                        <a
                            key="delete"
                            onClick={() => {
                                formRef.current?.setFieldsValue({
                                    members: formRef.current
                                        ?.getFieldValue('members')
                                        .filter(
                                            (item: any) =>
                                                item.id !== record.id,
                                        ),
                                });
                            }}
                        >
                            删除
                        </a>,
                    ],
                },
            ]);
    }, [isAuditing]);

    useAsyncEffect(async () => {
        if (type === 'EDIT') await editRun();
    }, [type]);

    const handleFinish = async (values: any) => {
        const { members = [] } = values || {};
        const sourceList = data?.familyVOs;

        // 是否配置紧急联系人
        const hasEmergencyContact = members?.some(
            (i: any) => i?.emergencyContact === 'YES',
        );
        if (!hasEmergencyContact) {
            message.error('未配置紧急联系人，请重新配置');
            return;
        }

        const newList = members?.map((i: any) => {
            const [memberFamilyName, memberFirstname] = i?.familyName;
            // 无 guid 字段 标记为 新增
            if (!i?.guid)
                return {
                    ...i,
                    memberFamilyName,
                    memberFirstname,
                    emergencyContact: i?.emergencyContact === 'YES' ? 'X' : '',
                    isInCompany: i?.isInCompany === 'YES' ? 'X' : '',
                    currentDataHandleType: 'INSERT',
                };

            return i;
        });

        // 标记删除数据
        const deleteRows = sourceList.reduce((prev: any, item: any) => {
            // 新数组的唯一键集合
            const newGuids = objectArrToKeyArr(members, 'guid').filter(
                (i) => i,
            );

            // 若新键集合不包含该 键值，则该项已被删除，标记为删除
            if (!newGuids.includes(item?.guid)) {
                return prev.concat({
                    ...item,
                    currentDataHandleType: 'DELETE',
                });
            }

            return prev;
        }, []);

        await updateFamilyMember({
            familyDTOs: [...newList, ...deleteRows],
        });

        message.success('提交成功');
        refresh?.();
        return true;
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
                          }
                }
                onFinish={handleFinish}
                readonly={isAuditing}
            >
                <EditableProTable
                    name="members"
                    rowKey="id"
                    scroll={{ x: 'max-content' }}
                    recordCreatorProps={
                        isAuditing
                            ? false
                            : {
                                  record: () => ({
                                      id: (Math.random() * 1000000).toFixed(0),
                                  }),
                              }
                    }
                    onRow={(record) => ({
                        style: {
                            background:
                                ColorMarkMap?.[
                                    record?.currentDataHandleType as HandleType
                                ],
                        },
                    })}
                    loading={false}
                    columns={columns}
                    editable={
                        isAuditing
                            ? undefined
                            : {
                                  type: 'multiple',
                                  editableKeys,
                                  onChange: setEditableRowKeys,
                                  actionRender: (row, config, defaultDom) => {
                                      return [
                                          defaultDom.save,
                                          defaultDom.delete,
                                      ];
                                  },
                              }
                    }
                />
            </ProForm>
        </Spin>
    );
}

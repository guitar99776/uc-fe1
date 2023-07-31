/*
 * @Author: Xue XingChen
 * @Date: 2023-07-05 11:19:48
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-27 18:17:05
 */
import Upload from '@/components/Upload';
import { getCertificate, updateCertificate } from '@/services/myInfo';
import { objectArrToKeyArr } from '@/utils';
import {
    EditableProTable,
    ProColumns,
    ProForm,
} from '@ant-design/pro-components';
import { FormInstance, Spin, message } from 'antd';
import { useAsyncEffect, useRequest } from 'cmt-utils';
import { omit } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
    ColorMarkMap,
    EditFormProps,
    HandleType,
    Qualifications,
} from '../index.d';

export default function QualificationsForm({
    type = 'EDIT',
    refresh,
    value,
}: EditFormProps) {
    const formRef = useRef<FormInstance>();
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    const {
        data,
        loading,
        run: editRun,
    } = useRequest(getCertificate, {
        manual: true,
    });

    const sourceList = data?.certificateVOs;

    const isAuditing = type === 'AUDIT_VIEW' || type === 'AUDIT';

    useAsyncEffect(async () => {
        if (type === 'EDIT') await editRun();
    }, [type]);

    useEffect(() => {
        const _data = value || sourceList;

        if (_data) {
            formRef.current?.setFieldsValue({
                qualifications: _data?.map((i: any) => ({
                    ...i,
                    id: i?.guid,
                    files: [
                        {
                            uid: i?.guid,
                            name: i?.certificateAttachName,
                            status: 'done',
                            url: i?.certificateAttachUrl,
                        },
                    ],
                })),
            });
        }
    }, [data]);

    const columns = useMemo<ProColumns<any>[]>(() => {
        const defaultColumns = [
            {
                dataIndex: 'startDate',
                title: () => <span className="required">获得日期</span>,
                align: 'center',
                valueType: 'date',
                formItemProps: {
                    rules: [
                        {
                            required: true,
                            message: '请选择获得日期',
                        },
                    ],
                },
            },
            {
                dataIndex: 'endDate',
                title: () => <span className="required">到期日期</span>,
                align: 'center',
                valueType: 'date',
                formItemProps: {
                    rules: [
                        {
                            required: true,
                            message: '请选择到期日期',
                        },
                    ],
                },
            },
            {
                dataIndex: 'certificateName',
                title: () => <span className="required">名称</span>,
                align: 'center',
                formItemProps: {
                    rules: [
                        {
                            required: true,
                            message: '请输入名称',
                        },
                    ],
                },
            },
            {
                dataIndex: 'assessUnit',
                title: '评定单位',
                align: 'center',
            },
            {
                dataIndex: 'certificateNum',
                title: '证书编号',
                align: 'center',
            },
            {
                dataIndex: 'files',
                title: '证书附件',
                align: 'center',
                render: (_, record) => {
                    const name = record?.files?.file
                        ? record?.files?.file?.response?.originalFilename
                        : record?.files[0]?.name;

                    const url = record?.files?.file
                        ? record?.files?.file?.response?.url
                        : record?.files[0]?.url;

                    return <a href={url}>{name}</a>;
                },
                renderFormItem: () => (
                    <Upload
                        style={{ marginBottom: 0 }}
                        fieldProps={{ maxCount: 1 }}
                    />
                ),
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

    const handleFinish = async (values: any) => {
        const { qualifications = [] } = values || {};
        const newList = qualifications?.map((item: any) => {
            const newItem = item?.files?.file
                ? {
                      certificateAttachName:
                          item?.files?.file?.response?.originalFilename,
                      certificateAttachUrl: item?.files?.file?.response?.url,
                      ...item,
                  }
                : item;

            // 无 guid 字段 标记为 新增
            if (!item?.guid)
                return {
                    ...omit(newItem, ['files']),
                    currentDataHandleType: 'INSERT',
                };

            return newItem;
        });

        // 标记删除数据
        const deleteRows = sourceList?.reduce(
            (prev: any, item: Qualifications) => {
                // 新数组的唯一键集合
                const newGuids = objectArrToKeyArr(
                    qualifications,
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

        await updateCertificate({
            resumeCertificateDTOs: [...newList, ...deleteRows],
        });
        message.success('提交成功');
        refresh?.();
        return true;
    };

    return (
        <Spin spinning={loading}>
            <ProForm
                layout="horizontal"
                formRef={formRef}
                loading={loading}
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
                    name="qualifications"
                    rowKey="id"
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
                    editable={{
                        type: 'multiple',
                        editableKeys,
                        onChange: setEditableRowKeys,
                        actionRender: (row, config, defaultDom) => {
                            return [defaultDom.save, defaultDom.delete];
                        },
                    }}
                />
            </ProForm>
        </Spin>
    );
}

/*
 * @Author: Xue XingChen
 * @Date: 2023-07-05 11:19:48
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-21 16:32:59
 */
import { getLanguageAbility, updateLanguageAbility } from '@/services/myInfo';
import { objectArrToKeyArr, transformDict2Enum } from '@/utils';
import {
    EditableProTable,
    ProColumns,
    ProForm,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { FormInstance, Spin, message } from 'antd';
import { useAsyncEffect, useRequest } from 'cmt-utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
    ColorMarkMap,
    EditFormProps,
    HandleType,
    LanguageAbility,
} from '../index.d';

export default function LanguageAbilityForm({
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
    } = useRequest(getLanguageAbility, {
        manual: true,
    });

    const sourceList = data?.languageVOs;
    const isAuditing = type === 'AUDIT_VIEW' || type === 'AUDIT';

    useAsyncEffect(async () => {
        if (type === 'EDIT') await editRun();
    }, [type]);

    useEffect(() => {
        const _data = value || sourceList;

        if (_data) {
            formRef.current?.setFieldsValue({
                languageAbilities: _data.map((i: any) => ({
                    ...i,
                    id: i?.guid,
                })),
            });
        }
    }, [sourceList, value]);

    const columns = useMemo<ProColumns<any>[]>(() => {
        const defaultColumns = [
            {
                dataIndex: 'language',
                title: '语言种类',
                align: 'center',
            },
            {
                dataIndex: 'level',
                title: '语言能力',
                align: 'center',
                valueEnum: transformDict2Enum(
                    initialState?.dict?.LANGUAGE_LEVEL,
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
                                    languageAbilities: formRef.current
                                        ?.getFieldValue('languageAbilities')
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
    }, []);

    const handleFinish = async (values: any) => {
        const { languageAbilities = [] } = values || {};
        const newList = languageAbilities?.map((item: any) => {
            // 无 guid 字段 标记为 新增
            if (!item?.guid)
                return { ...item, currentDataHandleType: 'INSERT' };

            return item;
        });

        // 标记删除数据
        const deleteRows = sourceList?.reduce(
            (prev: any, item: LanguageAbility) => {
                // 新数组的唯一键集合
                const newGuids = objectArrToKeyArr(
                    languageAbilities,
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
        await updateLanguageAbility({
            resumeLanguageDTOs: [...newList, ...deleteRows],
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
                    name="languageAbilities"
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
                    loading={false}
                    columns={columns}
                    onRow={(record) => ({
                        style: {
                            background:
                                ColorMarkMap?.[
                                    record?.currentDataHandleType as HandleType
                                ],
                        },
                    })}
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

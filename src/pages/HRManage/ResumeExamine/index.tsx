/*
 * @Author: Lin Yunhe
 * @Date: 2023-07-03 20:28:29
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-17 16:43:09
 */
import { AnchorEnumText } from '@/components/Mine/index.d';
import ModalForms from '@/components/Mine/ModalForms';
import { getAuditList } from '@/services/hrManage';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button } from 'antd';
import Badge from 'antd/es/badge';
import { omit } from 'lodash';
import { useMemo, useRef } from 'react';

const ResumeExamine = () => {
    const { run } = useRequest(getAuditList, { manual: true });
    const actionRef = useRef<ActionType>(null);

    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                title: '任务名称',
                dataIndex: 'taskName',
                hideInSearch: true,
                render: (_text, record) =>
                    `【${AnchorEnumText?.[record?.infoType]}】修改申请`,
            },
            {
                title: '员工ID',
                dataIndex: 'staffId',
                hideInSearch: true,
            },
            {
                title: '员工姓名',
                dataIndex: 'staffName',
                hideInSearch: true,
            },
            {
                title: '申请时间',
                valueType: 'date',
                dataIndex: 'applyDate',
            },
            {
                title: '状态',
                dataIndex: 'approvalState',
                valueEnum: {
                    pending_approval: <Badge status="warning" text="待审批" />,
                    not_approved: <Badge status="error" text="未通过" />,
                    approved: <Badge status="success" text="通过" />,
                },
            },
            {
                title: '操作',
                key: 'option',
                valueType: 'option',
                fixed: 'right',
                width: 180,
                render: (_text, record) => {
                    return (
                        <ModalForms
                            moduleName={record?.infoType}
                            title={`${AnchorEnumText?.[record?.infoType]}修改${
                                record?.approvalState === 'pending_approval'
                                    ? '申请'
                                    : '查看'
                            }`}
                            type={
                                record?.approvalState === 'pending_approval'
                                    ? 'AUDIT'
                                    : 'AUDIT_VIEW'
                            }
                            trigger={<Button type="link">查看</Button>}
                            extraParams={{ historyId: record?.historyId }}
                            refresh={() => actionRef.current?.reload()}
                        />
                    );
                },
            },
        ],
        [],
    );

    return (
        <ProTable
            rowKey="historyId"
            columns={columns}
            scroll={{ x: 'max-content' }}
            headerTitle=" "
            actionRef={actionRef}
            revalidateOnFocus
            request={async (params: any) => {
                const result = await run({
                    ...omit(params, ['current']),
                    pageNum: params.current,
                });

                return {
                    total: result?.total ?? 0,
                    data: result?.records ?? [],
                };
            }}
            options={false}
            search={{ span: 8, defaultCollapsed: false, labelWidth: 85 }}
        />
    );
};

export default ResumeExamine;

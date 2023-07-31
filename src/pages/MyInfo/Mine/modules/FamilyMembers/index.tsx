/*
 * @Author: Xue XingChen
 * @Date: 2023-07-05 11:02:57
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-20 14:12:40
 */
import OptionsActions from '@/components/Mine/OptionsActions';
import { AnchorEnum } from '@/components/Mine/index.d';
import { GENDER } from '@/constants';
import { getFamilyMember } from '@/services/myInfo';
import { transformDict2Enum } from '@/utils';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel, useParams } from '@umijs/max';
import { Card } from 'antd';
import { useRequest } from 'cmt-utils';
import { useMemo } from 'react';

export default function FamilyMembers() {
    const { id, fromPage } = useParams();
    const { initialState } = useModel('@@initialState');
    const { data, refresh, loading } = useRequest(getFamilyMember, {
        defaultParams: [id],
        refreshDeps: [id],
    });

    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'memberFamilyName',
                title: '家庭成员姓名',
                align: 'center',
                render: (_, record) => {
                    return (
                        <>{record.memberFamilyName + record.memberFirstname}</>
                    );
                },
            },
            {
                dataIndex: 'relation',
                title: '与本人关系',
                align: 'center',
                valueEnum: transformDict2Enum(
                    initialState?.dict?.FAMILY_RELATION,
                ),
            },
            {
                dataIndex: 'country',
                title: '国籍',
                valueEnum: transformDict2Enum(initialState?.dict?.COUNTRY),
            },
            {
                dataIndex: 'emergencyContact',
                title: '是否为紧急联系人',
                align: 'center',
                render: (_, record) => {
                    return (
                        <>{record?.emergencyContact === 'X' ? '是' : '否'}</>
                    );
                },
            },
            {
                dataIndex: 'phoneNum',
                title: '手机号码',
                align: 'center',
            },
            {
                dataIndex: 'isInCompany',
                title: '是否在公司任职',
                align: 'center',
                render: (_, record) => {
                    return <>{record?.isInCompany === 'X' ? '是' : '否'}</>;
                },
            },
            {
                dataIndex: 'companyName',
                title: '任职公司',
                align: 'center',
            },
            {
                dataIndex: 'position',
                title: '任职职务',
                align: 'center',
            },
            {
                dataIndex: 'birthDate',
                title: '出生日期',
                align: 'center',
                valueType: 'date',
            },
            {
                dataIndex: 'gender',
                title: '性别',
                align: 'center',
                valueEnum: GENDER,
            },
        ],
        [],
    );

    return (
        <Card
            id={AnchorEnum?.FAMILY_MEMBERS}
            title="家庭成员信息"
            loading={loading}
            extra={
                fromPage !== 'HR_MANAGE' && (
                    <OptionsActions
                        isAuditing={data?.hasApproving}
                        title="家庭成员信息修改"
                        moduleName={AnchorEnum?.FAMILY_MEMBERS}
                        refresh={refresh}
                        extraParams={{ historyId: data?.modifyHistoryId }}
                    />
                )
            }
        >
            <ProTable
                rowKey={'guid'}
                search={false}
                options={false}
                toolBarRender={false}
                pagination={false}
                dataSource={data?.familyVOs ?? []}
                columns={columns}
                style={{ width: '100%' }}
            />
        </Card>
    );
}

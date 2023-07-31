import { getContractRenewalDetail } from '@/services/hrManage';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Card, Timeline } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import './index.less';

const timeData = [
    {
        approveDate: '2015-09-01',
        leaderName: '周杰伦',
        leaderPost: '组长',
        approveState: 'approved',
        approveIdea: '确认无误，同意申请',
    },
    {
        approveDate: '2015-09-01',
        leaderName: '黄哦',
        leaderPost: '上级',
        approveState: 'pending_approval',
        approveIdea: '审批中',
    },
    {
        approveDate: '2015-09-01',
        leaderName: '周杰伦',
        leaderPost: '经理',
        approveState: 'not_approved',
        approveIdea: '拒绝',
    },
];
const DetailPage = () => {
    const approvalEnum: any = {
        approved: {
            text: '通过',
            color: 'green',
        },
        pending_approval: {
            text: '审核中',
            color: '#1677ff',
        },
        not_approved: {
            text: '驳回',
            color: 'red',
        },
    };
    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'staffNum',
                title: '员工编号',
                align: 'center',
                key: 'staffNum',
                hideInSearch: true,
            },
            {
                dataIndex: 'staffName',
                title: '姓名',
                align: 'center',
                key: 'staffName',
                hideInSearch: true,
            },
            {
                dataIndex: 'gender',
                title: '性别',
                align: 'center',
                key: 'gender',
                hideInSearch: true,
            },
            {
                dataIndex: 'age',
                title: '年龄',
                align: 'center',
                key: 'age',
                hideInSearch: true,
            },
            {
                dataIndex: 'idNum',
                title: '身份证号',
                align: 'center',
                key: 'idNum',
                hideInSearch: true,
            },
            {
                dataIndex: 'joinDate',
                title: '入职时间',
                align: 'center',
                key: 'joinDate',
                hideInSearch: true,
            },
            {
                dataIndex: 'staffOrg',
                title: '部门',
                align: 'center',
                key: 'staffOrg',
                hideInSearch: true,
            },
            {
                dataIndex: 'position',
                title: '岗位',
                align: 'center',
                key: 'position',
                hideInSearch: true,
            },
            {
                dataIndex: 'contractNum',
                title: '合同编号',
                align: 'center',
                key: 'contractNum',
                hideInSearch: true,
            },
            {
                dataIndex: 'contractEndDate',
                title: '合同结束日期',
                align: 'center',
                key: 'contractEndDate',
                hideInSearch: true,
            },
            {
                dataIndex: 'signCount',
                title: '已签订次数',
                align: 'center',
                key: 'signCount',
                hideInSearch: true,
            },
            {
                dataIndex: 'contractType',
                title: '合同类型',
                align: 'center',
                key: 'contractType',
                hideInSearch: true,
            },
        ],
        [],
    );
    const { id } = useParams();
    const [pageData, setPageData] = useState<any>({});
    const getDetail = async () => {
        const data = await getContractRenewalDetail({ id });
        setPageData(data);
    };

    const timeLineData = useMemo(() => {
        return timeData?.map((item, index) => {
            return {
                label: item?.approveDate,
                color: approvalEnum[item?.approveState].color,
                children: (
                    <div key={index}>
                        <div>
                            {item?.leaderName}-{item?.leaderPost}(
                            {approvalEnum[item?.approveState].text})
                        </div>
                        <div
                            style={{
                                fontSize: '12px',
                                color: 'rgba(0, 0, 0, 0.6)',
                            }}
                        >
                            {item?.approveIdea}
                        </div>
                    </div>
                ),
            };
        });
    }, []);

    useEffect(() => {
        getDetail();
    }, []);
    return (
        <div className="labor-detail-page">
            <Card title="提交人信息">
                <div className="info">
                    <span>申请人：{pageData?.applyPerson}</span>
                    <span>申请人所属公司：{pageData?.applyPersonCompany}</span>
                    <span>申请时间：{pageData?.applyDate}</span>
                </div>
            </Card>
            <ProTable
                dataSource={pageData?.staffContractRenewals}
                headerTitle={<h4 style={{ fontWeight: 'bold' }}>提交名单</h4>}
                bordered
                rowKey="id"
                columns={columns}
                revalidateOnFocus={false}
                options={false}
                scroll={{ x: 'max-content' }}
                search={false}
            />
            <Card
                title="审批结果"
                extra={<a href="#">{pageData?.approvalState}</a>}
            >
                <Timeline mode="left" items={timeLineData} />
            </Card>
        </div>
    );
};

export default DetailPage;

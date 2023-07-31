import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Card, Timeline } from 'antd';
import './index.less';
const DetailPage = () => {
    return (
        <ProForm
            readonly
            submitter={false}
            layout="horizontal"
            className="remuneration-detail"
            initialValues={{
                a: '王一',
                b: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                c: '研发部',
                d: '2023-09-21  08:50:08',
                a1: 1,
                a2: 2,
                b1: 'xxx',
                b2: 'xxxx',
                c1: 'xxxx',
                c2: 'xxxx',
                d2: 'xxx',
            }}
        >
            <Card title="基本信息" className="detail-card">
                <div className="content">
                    <ProFormText name="a" label="申请人" />
                    <ProFormText name="b" label="所属公司" />
                    <ProFormText name="c" label="所属部门" />
                    <ProFormText name="d" label="申请时间" />
                </div>
            </Card>
            <Card title="调薪员工基本信息" className="detail-card">
                <div className="content">
                    <ProFormText name="a1" label="调薪员工" />
                    <ProFormText name="b1" label="员工ID" />
                    <ProFormText name="c1" label="所属公司" />
                    <ProFormText name="a2" label="所属部门" />
                    <ProFormText name="b2" label="所属岗位" />
                    <ProFormText name="c2" label="入职日期" />
                    <ProFormText name="d2" label="员工级别" />
                </div>
            </Card>
            <Card title="调整薪酬信息" className="detail-card">
                <div className="content">
                    <ProFormText name="a1" label="申请类别" />
                    <ProFormText name="b1" label="调薪额度" />
                    <ProFormText name="c1" label="生效日期" />
                    <ProFormText name="a2" label="调整前薪酬" />
                    <ProFormText name="b2" label="调整后薪酬" />
                    <ProFormText name="c2" label="调整薪资" />
                </div>
                <ProFormText name="d2" label="调薪说明" />
                <ProFormText name="d2" label="附件" />
            </Card>
            <Card
                title="审批结果"
                extra={<a href="#">已通过</a>}
                bodyStyle={{ display: 'flex' }}
            >
                <Timeline
                    mode="left"
                    items={[
                        {
                            label: '2015-09-01',
                            children: 'Create a services',
                        },
                        {
                            label: '2015-09-01 09:12:11',
                            children: 'Solve initial network problems',
                        },
                        {
                            children: 'Technical testing',
                        },
                        {
                            label: '2015-09-01 09:12:11',
                            children: 'Network problems being solved',
                        },
                    ]}
                />
            </Card>
        </ProForm>
    );
};

export default DetailPage;

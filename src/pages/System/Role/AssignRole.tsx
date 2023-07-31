import { roleTableData } from '@/pages/data';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Space } from 'antd';
import { useMemo, useState } from 'react';
import './index.less';

const AssignRole = () => {
    const columns = useMemo<ProColumns<any>[]>(
        () => [
            {
                dataIndex: 'roleId',
                title: '角色编号',
                align: 'center',
                key: 'roleId',
                hideInSearch: true,
            },
            {
                dataIndex: 'roleName',
                title: '角色名称',
                align: 'center',
                key: 'roleName',
            },
            {
                dataIndex: 'roleKey',
                title: '权限字符',
                align: 'center',
                key: 'roleKey',
                hideInSearch: true,
            },
            {
                dataIndex: 'createTime',
                title: '创建时间',
                align: 'center',
                // valueType: 'date',
                key: 'createTime',
            },
        ],
        [],
    );
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const onFinish = () => {
        console.log(111);
    };
    return (
        <div className="assin-role">
            <h4 className="title">基本信息</h4>
            <div className="info">
                <div>用户昵称：若依</div>
                <div>登录账号：ry</div>
            </div>
            <h4 className="title">角色信息</h4>
            <ProTable
                rowKey="roleId"
                rowSelection={rowSelection}
                scroll={{ x: 'max-content' }}
                dataSource={roleTableData}
                options={false}
                search={false}
                tableAlertRender={false}
                columns={columns}
            />
            <Space className="btn">
                <Button type="primary" onClick={onFinish}>
                    提交
                </Button>
                <Button onClick={() => history.go(-1)}>返回</Button>
            </Space>
        </div>
    );
};

export default AssignRole;

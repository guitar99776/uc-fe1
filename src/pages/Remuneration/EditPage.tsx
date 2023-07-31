import {
    ProForm,
    ProFormDatePicker,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
} from '@ant-design/pro-components';
import { Card } from 'antd';
import './index.less';

const EditPage = () => {
    return (
        <ProForm
            className="remuneration-edit"
            submitter={{ resetButtonProps: false }}
            onFinish={async (values) => {
                console.log('values', values);
            }}
        >
            <Card className="card" title="基本信息">
                <div className="info">
                    <span>申请人：胡彦斌</span>
                    <span>
                        申请人所属组织：盛新锂能集团股份有限公司/人力资源部
                    </span>
                </div>
            </Card>
            <Card title="调薪员工基本信息" className="card">
                <ProForm.Group>
                    <ProFormText
                        name="a"
                        width="sm"
                        label="所在组织"
                        placeholder="请选择"
                        required
                    />
                    <ProFormText
                        name="b"
                        width="sm"
                        label="岗位"
                        placeholder="请选择"
                        required
                    />
                    <ProFormSelect
                        name="c"
                        width="sm"
                        label="调薪员工姓名"
                        placeholder="请选择"
                        options={[
                            {
                                value: 'time',
                                label: '履行完终止',
                            },
                        ]}
                        required
                    />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormText
                        readonly
                        name="a"
                        width="md"
                        label="员工编号"
                        placeholder="请选择"
                    />
                    <ProFormText
                        readonly
                        name="b"
                        width="md"
                        label="入职时间"
                        placeholder="请选择"
                    />
                    <ProFormText
                        readonly
                        name="b"
                        width="md"
                        label="员工级别"
                        placeholder="请选择"
                    />
                </ProForm.Group>
            </Card>
            <Card title="调整薪酬信息">
                <ProForm.Group>
                    <ProFormSelect
                        name="cc"
                        width="sm"
                        label="申请类别"
                        placeholder="请选择"
                        options={[
                            {
                                value: '1',
                                label: '试用期转正定薪',
                            },
                            {
                                value: '2',
                                label: '晋升调薪',
                            },
                            {
                                value: '3',
                                label: '年度调薪',
                            },
                            {
                                value: '4',
                                label: '其他调薪',
                            },
                        ]}
                        required
                    />
                    <ProFormSelect
                        name="c2"
                        width="sm"
                        label="调薪额度"
                        placeholder="请选择"
                        options={[
                            {
                                value: '1',
                                label: '大于等于30%',
                            },
                            {
                                value: '2',
                                label: '小于30%',
                            },
                        ]}
                        required
                    />
                    <ProFormDatePicker
                        label="生效日期"
                        name="date"
                        width="sm"
                        required
                    />
                </ProForm.Group>
                <ProFormTextArea name="address" label="调薪说明" />
                <ProFormUploadButton
                    fieldProps={
                        {
                            // headers: {
                            //     authorization: getItem(LOGIN_TOKEN) ?? '',
                            // },
                        }
                    }
                    action="/api/malladmin/admin/file/upload/element"
                    label="上传附件"
                    name="imgs"
                />
            </Card>
        </ProForm>
    );
};

export default EditPage;

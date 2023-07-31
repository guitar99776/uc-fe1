import SelectOrg, { SelectOrgProps } from '@/components/SelectOrg';
import { getPositions, getUsers } from '@/services/common';
import { ProFormDependency, ProFormSelect } from '@ant-design/pro-components';
import { Col, Form, Row } from 'antd';
import { useRequest } from 'cmt-utils';
import { useEffect, useState } from 'react';

interface SelectUserOrPositionProps {
    /** 只选至岗位 */
    onlySelectPosition?: boolean;
    /** 自定义 label */
    customLabels?: {
        org?: string;
        position?: string;
        staff?: string;
    };
    orgFieldConfig?: Omit<SelectOrgProps, 'name' | 'required' | 'label'>;
    /** 回调用户信息 */
    onChangeUserInfo?: (value: Record<string, any>) => void;
}

/**
 * @name 选择用户
 */
function SelectUserOrPosition({
    onlySelectPosition,
    customLabels,
    orgFieldConfig = {},
    onChangeUserInfo,
}: SelectUserOrPositionProps) {
    const form = Form.useFormInstance();
    const [orgId, setOrgId] = useState('');
    const [postId, setPostId] = useState('');

    const { run: positionRun, data: positionOptions } = useRequest(
        getPositions,
        {
            manual: true,
        },
    );

    const { run: postRun, data: postOptions } = useRequest(getUsers, {
        manual: true,
    });

    useEffect(() => {
        if (orgId) positionRun(orgId);

        // orgId 变化，清空 postId
        form.setFieldValue('postId', '');
    }, [orgId]);

    useEffect(() => {
        if (postId) postRun(postId);

        // postId 变化，清空 staffId
        form.setFieldValue('staffId', '');
    }, [postId]);

    return (
        <Row>
            <Col span={8}>
                <SelectOrg
                    {...orgFieldConfig}
                    formItemProps={{
                        name: 'orgId',
                        required: true,
                        label: customLabels?.org,
                    }}
                />
            </Col>
            <ProFormDependency name={['orgId']}>
                {({ orgId }) => {
                    const localOrgId =
                        typeof orgId === 'string'
                            ? orgId
                            : orgId?.[orgId?.length - 1];

                    setOrgId(localOrgId);

                    return (
                        <ProFormSelect
                            colProps={{ span: 8 }}
                            name="postId"
                            label={customLabels?.position || '岗位'}
                            placeholder="请选择岗位"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择岗位',
                                },
                            ]}
                            fieldProps={{
                                options: localOrgId ? positionOptions : [],
                                fieldNames: {
                                    label: 'postName',
                                    value: 'postId',
                                    options: 'options',
                                },
                            }}
                        />
                    );
                }}
            </ProFormDependency>
            {!onlySelectPosition && (
                <ProFormDependency name={['postId']}>
                    {({ postId }) => {
                        setPostId(postId);

                        return (
                            <ProFormSelect
                                colProps={{ span: 8 }}
                                name="staffId"
                                label={customLabels?.staff || '员工姓名'}
                                placeholder="请选择员工姓名"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择员工姓名',
                                    },
                                ]}
                                fieldProps={{
                                    options: postId ? postOptions : [],
                                    fieldNames: {
                                        label: 'name',
                                        value: 'staffId',
                                        options: 'options',
                                    },
                                    onChange(_, option) {
                                        onChangeUserInfo?.(option);
                                    },
                                }}
                            />
                        );
                    }}
                </ProFormDependency>
            )}
        </Row>
    );
}

export default SelectUserOrPosition;

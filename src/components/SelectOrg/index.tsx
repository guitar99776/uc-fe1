import { getOrgCodeTree, getOrgCodeUserTree } from '@/services/common';
import { useRequest } from '@umijs/max';
import { Form, FormItemProps, TreeSelect, TreeSelectProps } from 'antd';
import { useMemo } from 'react';

export interface SelectOrgProps {
    /** 是否关闭form模式 */
    offFormMode?: boolean;
    formItemProps?: FormItemProps;
    /** 请求数据类型
     * @default 'DEFAULT' (有角色权限)
     */
    requestDataType?: 'ALL' | 'DEFAULT';
    fieldProps?: Omit<
        TreeSelectProps,
        'treeData' | 'changeOnSelect' | 'multiple' | 'onChange' | 'value'
    >;
    /** 是否多选 */
    multiple?: boolean;
    onChange?: TreeSelectProps['onChange'];
    value?: any;
}

/**
 * @name 选择组织机构
 */
const SelectOrg: React.FC<SelectOrgProps> = ({
    requestDataType = 'DEFAULT',
    fieldProps,
    multiple = false,
    onChange,
    value,
    offFormMode,
    formItemProps,
}) => {
    const {
        required,
        name,
        rules = [],
        label = '组织机构',
    } = formItemProps || {};

    const form = Form.useFormInstance() && !offFormMode;

    const { data: options } = useRequest(
        requestDataType === 'DEFAULT' ? getOrgCodeUserTree : getOrgCodeTree,
    );

    const orgCascader = useMemo(() => {
        return (
            <TreeSelect
                treeData={options || []}
                fieldNames={{
                    label: 'orgName',
                    value: 'orgId',
                    children: 'children',
                }}
                placeholder="请选择"
                maxTagCount={10}
                multiple={multiple}
                onChange={onChange}
                value={value}
                {...fieldProps}
            />
        );
    }, [options, fieldProps, multiple, onChange, value]);

    return (
        <>
            {form ? (
                <Form.Item
                    {...formItemProps}
                    name={name}
                    label={label}
                    rules={[
                        ...rules,
                        {
                            required,
                            validator: async (_, value) => {
                                if (!required) {
                                    return;
                                }

                                if (!value) {
                                    return Promise.reject(
                                        new Error(`请选择${label}`),
                                    );
                                }
                            },
                        },
                    ]}
                >
                    {orgCascader}
                </Form.Item>
            ) : (
                orgCascader
            )}
        </>
    );
};

export default SelectOrg;

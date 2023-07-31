import { ClockCircleOutlined, EditFilled } from '@ant-design/icons';
import { Button, Space } from 'antd';
import ModalForms, { ModalFormsProps } from '../ModalForms';

/*
 * @Author: Lin Yunhe
 * @Date: 2023-07-02 16:24:03
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-18 14:25:19
 */
type OptionsActionsProps = Pick<
    ModalFormsProps,
    'moduleName' | 'refresh' | 'title' | 'extraParams'
> & {
    /** 是否审核中 */
    isAuditing?: boolean;
};

/**
 * @name 操作项
 */
function OptionsActions({
    isAuditing,
    ...restModalProps
}: OptionsActionsProps) {
    if (isAuditing) {
        return (
            <Space>
                <span style={{ color: 'red' }}>等待hr审批中</span>
                <ModalForms
                    {...restModalProps}
                    title={`${restModalProps?.title}查看`}
                    type="AUDIT_VIEW"
                    trigger={
                        <Button
                            type="link"
                            style={{ cursor: 'pointer' }}
                            icon={<ClockCircleOutlined />}
                        ></Button>
                    }
                />
            </Space>
        );
    }

    return (
        <ModalForms
            {...restModalProps}
            trigger={
                <Button
                    style={{ cursor: 'pointer' }}
                    type="link"
                    icon={<EditFilled />}
                ></Button>
            }
        />
    );
}

export default OptionsActions;

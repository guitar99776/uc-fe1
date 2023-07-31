/*
 * @Author: Lin Yunhe
 * @Date: 2023-07-04 09:48:52
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-18 14:07:51
 */
import * as FormComponents from '@/components/Mine/EditAndAuditForms';
import Modal, { ModalProps, ModalRef } from '@/components/Modal';
import { auditInfo, getUpdateInfo } from '@/services/hrManage';
import { ProForm, ProFormTextArea } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Form, message } from 'antd';
import { useEffect, useRef } from 'react';
import { AnchorEnum } from '../index.d';

export interface ModalFormsProps {
    // 编辑、审核查看（仅查看）、审核
    type?: 'EDIT' | 'AUDIT_VIEW' | 'AUDIT';
    moduleName: typeof AnchorEnum;
    refresh?: () => void;
    trigger?: ModalProps['trigger'];
    title?: string;
    extraParams?: Record<string, any>;
}

function ModalForms({
    type,
    trigger,
    title,
    moduleName,
    refresh,
    extraParams,
}: ModalFormsProps) {
    const modalRef = useRef<ModalRef>(null);
    const [form] = Form.useForm();

    const Components = {
        BASE_INFO: FormComponents.BaseInfoForm,
        EDU_EXPERIENCE: FormComponents.EducationalExperienceForm,
        SOCIAL_EXPERIENCE: FormComponents.WorkExperienceForm,
        TRAINING_EXPERIENCE: FormComponents.TrainingExperienceForm,
        QUALIFICATION_CERTIFICATE: FormComponents.QualificationsForm,
        FAMILY_MEMBER: FormComponents.FamilyMembersForm,
        LANGUAGE: FormComponents.LanguageAbilityForm,
        ADDRESS: FormComponents.ContactAddressForm,
    };

    const CurrentFormComponent = Components?.[moduleName];

    const { data, run } = useRequest(getUpdateInfo, { manual: true });
    const { run: auditRun, loading: auditLoading } = useRequest(auditInfo, {
        manual: true,
    });

    const { detailMaps, approveIdea, infoType, changeFields } = data || {};

    const handleAudit = async (type: 'refuse' | 'agree') => {
        const { approveIdea } = await form.validateFields();

        await auditRun({
            id: extraParams?.historyId,
            dataType: infoType,
            approveIdea,
            approved: type === 'refuse' ? 'not_approved' : 'approved',
        });

        message.success('操作成功');
        refresh?.();
        modalRef?.current?.onCancel();
    };

    useEffect(() => {
        if (approveIdea) {
            form.setFieldsValue({ approveIdea });
        }
    }, [approveIdea]);

    return (
        <Modal
            title={title}
            ref={modalRef}
            wrapper={({ onOpen }) => (
                <div
                    onClick={async () => {
                        if (type === 'AUDIT_VIEW' || type === 'AUDIT') {
                            await run(extraParams);
                        }

                        onOpen();
                    }}
                >
                    {trigger}
                </div>
            )}
            footer={
                type === 'AUDIT' ? (
                    <>
                        <Button
                            type="primary"
                            ghost
                            onClick={() => handleAudit('refuse')}
                        >
                            拒绝
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => handleAudit('agree')}
                        >
                            同意
                        </Button>
                    </>
                ) : (
                    false
                )
            }
        >
            <CurrentFormComponent
                type={type}
                refresh={() => {
                    refresh?.();
                    modalRef.current?.onCancel();
                }}
                value={detailMaps}
                changeFields={changeFields}
            />
            {(type === 'AUDIT' || type === 'AUDIT_VIEW') && (
                <ProForm
                    style={{ marginTop: 20 }}
                    form={form}
                    layout="horizontal"
                    readonly={type === 'AUDIT_VIEW'}
                    submitter={false}
                >
                    <ProFormTextArea
                        name="approveIdea"
                        label="审核意见"
                        readonly={type === 'AUDIT_VIEW'}
                        rules={[
                            {
                                required: true,
                                message: '请输入审核意见',
                            },
                        ]}
                    />
                </ProForm>
            )}
        </Modal>
    );
}

export default ModalForms;

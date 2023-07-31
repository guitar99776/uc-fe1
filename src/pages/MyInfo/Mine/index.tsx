/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-29 20:11:11
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-25 17:23:25
 */
import { AnchorEnum } from '@/components/Mine/index.d';
import { ProCard } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Affix, Anchor, Button, Col, Row, Space } from 'antd';
import { AnchorLinkItemProps } from 'antd/es/anchor/Anchor';
import { useState } from 'react';
import * as Modules from './modules';

import './index.less';

type AnchorItems = AnchorLinkItemProps & {
    component?: React.ReactNode;
    hide?: boolean;
};

function Mine() {
    const { fromPage } = useParams();
    const [isPrinting, setIsPrinting] = useState(false);

    const anchorItems: AnchorItems[] = [
        {
            key: `${AnchorEnum.BASE_INFO}`,
            href: `#${AnchorEnum.BASE_INFO}`,
            title: '基本信息',
            component: <Modules.BaseInfo />,
        },
        {
            key: `${AnchorEnum.EDUCATION_EXPERIENCE}`,
            href: `#${AnchorEnum.EDUCATION_EXPERIENCE}`,
            title: '教育经历',
            component: <Modules.EducationalExperience />,
        },
        {
            key: `${AnchorEnum.WORK_EXPERIENCE}`,
            href: `#${AnchorEnum.WORK_EXPERIENCE}`,
            title: '社会工作经历',
            component: <Modules.WorkExperience />,
        },
        {
            key: `${AnchorEnum.PROJECT_EXPERIENCE}`,
            href: `#${AnchorEnum.PROJECT_EXPERIENCE}`,
            title: '项目经历',
            component: <Modules.ProjectExperience />,
        },
        {
            key: `${AnchorEnum.REWARD_PUNISHMENT}`,
            href: `#${AnchorEnum.REWARD_PUNISHMENT}`,
            title: '奖惩信息',
            component: <Modules.RewardPunishment />,
        },
        {
            key: `${AnchorEnum.QUALIFICATION_CERTIFICATE}`,
            href: `#${AnchorEnum.QUALIFICATION_CERTIFICATE}`,
            title: '资质证书',
            component: <Modules.Qualifications />,
        },
        {
            key: `${AnchorEnum.TRAINING_EXPERIENCE}`,
            href: `#${AnchorEnum.TRAINING_EXPERIENCE}`,
            title: '培训经历',
            component: <Modules.TrainingExperience />,
        },
        {
            key: `${AnchorEnum.LECTURER_RECORD}`,
            href: `#${AnchorEnum.LECTURER_RECORD}`,
            title: '讲师任职记录',
            component: <Modules.LecturerRecord />,
        },
        {
            key: `${AnchorEnum.PERFORMANCE}`,
            href: `#${AnchorEnum.PERFORMANCE}`,
            title: '绩效表现',
            component: <Modules.Performance />,
        },
        {
            key: `${AnchorEnum.LANGUAGE_ABILITY}`,
            href: `#${AnchorEnum.LANGUAGE_ABILITY}`,
            title: '语言能力',
            component: <Modules.LanguageAbility />,
        },
        {
            key: `${AnchorEnum.FAMILY_MEMBERS}`,
            href: `#${AnchorEnum.FAMILY_MEMBERS}`,
            title: '家庭成员信息',
            component: <Modules.FamilyMembers />,
            hide: fromPage === 'HR_MANAGE',
        },
        {
            key: `${AnchorEnum.CONTACT_ADDRESS}`,
            href: `#${AnchorEnum.CONTACT_ADDRESS}`,
            title: '联系地址',
            component: <Modules.ContactAddress />,
            hide: fromPage === 'HR_MANAGE',
        },
        {
            key: `${AnchorEnum.IDENTITY_INFO}`,
            href: `#${AnchorEnum.IDENTITY_INFO}`,
            title: '身份信息',
            component: <Modules.IdentityInfo />,
            hide: fromPage === 'HR_MANAGE',
        },
    ];

    const cardItems = anchorItems.map(({ hide, component }: AnchorItems) => {
        if (!hide) return component;
        return undefined;
    });

    const handlePrint = async () => {
        await setIsPrinting(true);
        const printHTML = document?.querySelector('#print')?.innerHTML;
        window.document.body.innerHTML = printHTML || '';
        window.print();
        // 打印完成后重新加载页面
        window.location.reload();
        await setIsPrinting(false);
    };

    return (
        <ProCard
            className="person-info"
            extra={
                fromPage === 'HR_MANAGE' && (
                    <Affix offsetTop={98}>
                        <Space>
                            <Button type="primary" onClick={handlePrint}>
                                打印
                            </Button>
                            <Button
                                type="primary"
                                ghost
                                onClick={() => history.go(-1)}
                            >
                                返回
                            </Button>
                        </Space>
                    </Affix>
                )
            }
        >
            <Row id="print">
                <Col span={isPrinting ? 24 : 20}>
                    <Space direction="vertical">{cardItems}</Space>
                </Col>
                {!isPrinting && (
                    <Col span={4} style={{ position: 'fixed', right: 80 }}>
                        <Anchor
                            style={{ background: '#fff' }}
                            affix={false}
                            offsetTop={150}
                            items={anchorItems}
                        />
                    </Col>
                )}
            </Row>
        </ProCard>
    );
}

export default Mine;

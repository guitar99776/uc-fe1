import { getSsoApps, ssoLogin } from '@/services/login';
import { getLoginUserInfo } from '@/utils/storage';
import { useRequest } from '@umijs/max';
import { Avatar, Col, Row, Typography, notification } from 'antd';
import { useCallback, useMemo } from 'react';
// import bannerUri from './images/banner.jpg';
import './index.less';
export interface PortalConfigObject {
    id: number;
    appKey: string;
    beanName?: string;
    clientId?: string;
    clientSecret?: string;
    dbId?: string;
    loginUrl: string;
    logoUrl: string;
    name: string;
    publicKey?: string;
    redirect?: string;
    summary: string;
    tokenUrl?: string;
}
const HomePage: React.FC = () => {
    const userInfo = getLoginUserInfo();
    const { data: appList } = useRequest(getSsoApps, {
        manual: false,
        debounceInterval: 300,
    });

    const apps = useMemo(() => {
        return userInfo?.userApps || [];
    }, [userInfo?.userApps]);

    const { run: ssoLoginFn } = useRequest(
        (appKey: string) => ssoLogin(appKey),
        {
            manual: true,
            onSuccess: async (res) => {
                if (res.status === 200) {
                    const { redirectUrl } = res.data;
                    window.open(
                        redirectUrl,
                        '_blank',
                        'noopener=yes,noreferrer=yes',
                    );
                }
            },
        },
    );
    const ssoLoginHanlder = (item: PortalConfigObject) => {
        const { appKey, loginUrl } = item;
        if (!apps || !apps.includes(appKey)) {
            notification.error({
                message: '您没有该应用权限，请联系管理员',
                key: appKey,
            });
            return;
        }
        if (appKey === 'wangkang') {
            window.location.href = loginUrl;
            return;
        }
        ssoLoginFn(appKey);
    };

    const getSummary = useCallback(
        (item: PortalConfigObject) => {
            const { appKey } = item;
            if (appKey === 'wangkang') {
                return (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        {item.summary}
                        <br />
                        <span style={{ color: 'red' }}>
                            （金蝶用户需要先登录网康VPN）
                        </span>
                    </div>
                );
            }
            return item.summary;
        },
        [appList],
    );
    return (
        <div className="home-page">
            {/* <div className="header-img"></div> */}
            <div className="home-content">
                <Row gutter={40}>
                    {appList?.map((portal: any) => {
                        return (
                            <Col key={portal.id} span={6} className={'col'}>
                                <div
                                    className={'card'}
                                    onClick={() => ssoLoginHanlder(portal)}
                                >
                                    <Avatar
                                        size={86}
                                        shape="square"
                                        src={`http://sso.chengtungroup.com${portal.logoUrl}`}
                                    />
                                    <Typography.Title level={3}>
                                        {portal.name}
                                    </Typography.Title>
                                    <Typography.Text>
                                        {getSummary(portal)}
                                    </Typography.Text>
                                </div>
                            </Col>
                        );
                    })}
                    {/* <Col span={24}>
                        <div
                            className="card culture"
                            style={{
                                // backgroundImage: `url(${bannerUri})`,
                                backgroundSize: '100% 100%',
                            }}
                        >
                            <Typography.Title level={2}>
                                尽善利用资源，尽美创造生活。
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: 20 }}>
                                融入谦逊奋进的文化和情怀，聚拢五湖四海的朋友和人才，
                                <br />
                                汇集优质精良的资源和产业，累积社会责任的精神和果实。
                            </Typography.Text>
                        </div>
                    </Col> */}
                </Row>
            </div>
        </div>
    );
};

export default HomePage;

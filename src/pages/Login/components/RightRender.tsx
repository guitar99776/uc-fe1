import { logout } from '@/services/login';
import { removeLoginUserInfo, removeToken } from '@/utils/storage';
import { history, useModel } from '@umijs/max';
import { Avatar, Dropdown, MenuProps, Space, notification } from 'antd';
import { useRequest } from 'cmt-utils';
import { useCallback, useMemo } from 'react';
import avatar from '../images/avatar.svg';

const RightRender = () => {
    const { initialState } = useModel('@@initialState');
    const { run: logOut } = useRequest(logout, {
        manual: true,
        onSuccess: async () => {
            await removeLoginUserInfo();
            removeToken();
            notification.success({
                message: `已退出登录`,
            });
            window.location.href = '/login';
        },
    });
    const onMenuClick = useCallback(
        (route: string) => {
            history.push(route);
        },
        [history],
    );
    const menuItems = useMemo<MenuProps['items']>(() => {
        const items = [
            {
                key: 1,
                label: '修改密码',
                onClick: () => onMenuClick(`/changePassword`),
            },
            {
                key: 2,
                label: '退出登录',
                onClick: () => logOut(),
            },
        ];

        return items.filter(Boolean) as MenuProps['items'];
    }, [initialState?.userInfo]);
    return (
        <div className="avatarAndName">
            <Dropdown
                align={{ offset: [0, 0] }}
                trigger={['click']}
                menu={{ items: menuItems }}
                placement="bottom"
                arrow={{ pointAtCenter: true }}
            >
                <Space className="userName">
                    <Avatar size="small" src={avatar} alt="avatar" />
                    {(initialState?.userInfo?.staffName as any) ?? '--'}
                </Space>
            </Dropdown>
        </div>
    );
};

export default RightRender;

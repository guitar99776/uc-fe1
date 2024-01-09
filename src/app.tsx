// 运行时配置

import {
    AxiosResponse,
    RequestConfig,
    RequestOptions,
    RunTimeLayoutConfig,
    RuntimeAntdConfig,
    history,
} from '@umijs/max';
import { message } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import RightRender from './pages/Login/components/RightRender';
import { getDict, getDicts } from './services/common';
import { DictBo } from './services/interface';
import { getMenuListByUser } from './services/menu';
import { getUserInfo } from './services/user';
import { getToken } from './utils/storage';

dayjs.locale('en');
export async function getInitialState(): Promise<{
    dict: Record<string, { dictName: string; dictValue: string }[]>;
    hrDict: DictBo;
    menuData: any[];
    userInfo: Record<string, any>;
}> {
    async function initFetch() {
        const [currentSapDict, currentDict, menuList, userInfo] =
            await Promise.all([
                getDicts(),
                getDict(),
                getMenuListByUser(),
                getUserInfo(),
            ]);
        const dictMap =
            currentSapDict.reduce((prev: any, item: any) => {
                return {
                    ...prev,
                    [item.enumType]: item.enumTypeVOs ?? [],
                };
            }, {}) ?? {};

        const initData = {
            hrDict: currentDict,
            dict: dictMap,
            menuData: menuList,
            userInfo,
        };
        return initData;
    }

    let initData = {
        menuData: [],
        dict: {},
        userInfo: {},
        hrDict: {},
    };

    if (history.location.pathname !== '/login') {
        try {
            const result = await initFetch();
            return {
                ...initData,
                ...result,
            };
        } catch {}
    }
    return initData;
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => ({
    logo: <img src="/favicon.ico" style={{ width: '20px', height: '20px' }} />,
    layout: 'mix',
    rightRender: () => <RightRender />,
    menu: {
        ignoreFlatMenu: true,
        request: async () =>
            initialState?.menuData?.length ? initialState?.menuData : [],
    },
});

export const request: RequestConfig = {
    requestInterceptors: [
        (config: RequestOptions) => {
            const { headers = {} } = config;
            const token: any = getToken();
            headers['token'] = token;

            return {
                ...config,
                headers,
                url: `http://58.254.35.98:33024/api${config.url}`,
            };
        },
    ],
    responseInterceptors: [
        (response: AxiosResponse) => {
            if (!response?.data?.success) {
                message.error(response.data.message ?? '请联系技术人员');
                if (Number(response?.data?.code) === 401) {
                    history.push('/login');
                }
            }

            return response?.data;
        },
    ],
    errorConfig: {
        errorHandler: (_, resData) => {
            const typeValue = Object.prototype.toString
                .call(resData)
                .slice(8, -1);

            if (typeValue === 'Blob') {
                return resData;
            }

            return {
                ...(resData?.data ?? {}),
                success: resData?.success,
                errorMessage: resData?.message ?? '请联系技术人员',
            };
        },
    },
};

export const antd: RuntimeAntdConfig = (memo) => {
    memo.locale = zhCN;

    return memo;
};

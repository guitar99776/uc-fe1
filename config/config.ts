/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-29 10:38:22
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-28 10:42:01
 */
import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
    hash: true,
    antd: {
        theme: {
            token: {
                colorPrimary: '#D80018',
                colorLink: '#D80018',
                colorLinkHover: '#E35D6D',
                colorLinkActive: '#E35D6D',
            },
        },
    },
    favicons: ['/favicon.ico'],
    access: {},
    model: {},
    initialState: {},
    request: {
        dataField: '', // 针对若依的处理 后面会更改
    },
    layout: {
        title: 'hr系统',
    },
    locale: false,
    proxy: {
        '/api/hr': {
            // target: `http://58.254.35.98:33024`,
            target: `http://172.16.20.40:8080`,
            // target: `http://172.16.20.173:8080/`,
            // target: `http://222.212.85.179:20010/`,
            changeOrigin: true,
            pathRewrite: { '/api/hr': '' },
        },
        '/api': {
            target: `http://58.254.35.98:33024`,
            // target: `http://172.16.20.40:30100`,
            // target: `http://172.16.20.173:8080`,
            changeOrigin: true,
            // pathRewrite: { '^/api': '' },
        },
    },
    theme: {
        '@primary-color': '#D80018',
    },
    routes,
    npmClient: 'pnpm',
});

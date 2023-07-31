/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-29 10:38:22
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-26 10:05:01
 */
export default [
    {
        path: '/login',
        layout: false,
        component: '@/pages/Login',
    },
    {
        path: '/',
        flatMenu: true,
        component: '@/layouts',
        routes: [
            {
                path: '/',
                redirect: '/myInfo',
            },
            {
                name: '首页',
                path: '/',
                component: '@/pages/Home',
                hideInMenu: true,
            },
            {
                name: '修改密码',
                path: '/changePassword',
                component: '@/pages/UserCenter/ChangePassword',
                hideInMenu: true,
            },
            {
                name: '组织架构',
                path: '/org',
                component: '@/pages/OrgManage/Org',
                hideInMenu: true,
            },
            {
                name: '组织汇报关系',
                path: '/org-report',
                component: '@/pages/OrgManage/OrgReport',
                hideInMenu: true,
            },
            {
                name: '系统管理',
                path: '/system',
                routes: [
                    {
                        name: '用户管理',
                        path: 'user',
                        component: '@/pages/System/User',
                    },
                    {
                        name: '角色管理',
                        path: 'role',
                        component: '@/pages/System/Role',
                    },
                    {
                        name: '分配角色',
                        path: 'assignRole/:userId',
                        component: '@/pages/System/Role/AssignRole',
                        hideInMenu: true,
                    },
                    {
                        name: '分配用户',
                        path: 'assignUser/:roleId',
                        component: '@/pages/System/AssignUser',
                        hideInMenu: true,
                    },
                    {
                        name: '菜单管理',
                        path: 'menu',
                        component: '@/pages/System/Menu',
                    },
                ],
            },
            {
                name: '我的信息',
                path: '/myInfo',
                routes: [
                    {
                        path: '/myInfo',
                        redirect: 'mine',
                    },
                    {
                        name: '个人信息',
                        path: 'mine',
                        component: '@/pages/MyInfo/Mine',
                    },
                    {
                        name: '转正申请',
                        path: 'employment-confirm',
                        component: '@/pages/MyInfo/EmploymentConfirm',
                    },
                    {
                        name: '离职申请',
                        path: 'resignation-apply',
                        component: '@/pages/MyInfo/ResignationApply',
                    },
                ],
            },
            {
                name: '薪酬管理',
                path: '/remuneration',
                routes: [
                    {
                        name: '调薪申请',
                        path: 'apply',
                        component: '@/pages/Remuneration',
                    },
                    {
                        name: '调薪申请新建',
                        path: 'edit',
                        component: '@/pages/Remuneration/EditPage',
                    },
                    {
                        name: '调薪申请详情',
                        path: 'detail',
                        component: '@/pages/Remuneration/DetailPage',
                    },
                ],
            },
            {
                name: '管理工具',
                path: '/hr-manage',
                routes: [
                    {
                        name: '员工简历查询',
                        path: 'employee-resume',
                        component: '@/pages/HRManage/EmployeeResume',
                    },
                    {
                        name: '员工简历详情',
                        path: 'employee-resume/:fromPage/:id',
                        component: '@/pages/MyInfo/Mine',
                        hideInMenu: true,
                    },
                    {
                        name: '个人信息审批',
                        path: 'resume-examine',
                        component: '@/pages/HRManage/ResumeExamine',
                    },
                    {
                        name: '奖励列表',
                        path: 'employee-rewards/list',
                        component: '@/pages/HRManage/EmployeeRewards/List',
                    },
                    {
                        name: '奖励申请',
                        path: 'employee-rewards/add',
                        hideInMenu: true,
                        component: '@/pages/HRManage/EmployeeRewards/Add',
                    },
                    {
                        name: '奖励申请详情',
                        path: 'employee-rewards/detail/:id',
                        hideInMenu: true,
                        component: '@/pages/HRManage/EmployeeRewards/Detail',
                    },
                    {
                        name: '调岗列表',
                        path: 'employee-job-transfer/list',
                        component: '@/pages/HRManage/EmployeeJobTransfer/List',
                    },
                    {
                        name: '调岗申请',
                        path: 'employee-job-transfer/add',
                        hideInMenu: true,
                        component: '@/pages/HRManage/EmployeeJobTransfer/Add',
                    },
                    {
                        name: '调岗申请详情',
                        path: 'employee-job-transfer/detail/:id',
                        hideInMenu: true,
                        component:
                            '@/pages/HRManage/EmployeeJobTransfer/Detail',
                    },
                    {
                        name: '返聘列表',
                        path: 'employee-rehiring/list',
                        component: '@/pages/HRManage/EmployeeRehiring/List',
                    },
                    {
                        name: '返聘申请',
                        path: 'employee-rehiring/add',
                        hideInMenu: true,
                        component: '@/pages/HRManage/EmployeeRehiring/Add',
                    },
                    {
                        name: '返聘申请详情',
                        path: 'employee-rehiring/detail/:id',
                        hideInMenu: true,
                        component: '@/pages/HRManage/EmployeeRehiring/Detail',
                    },
                    {
                        name: '劳动合同续签',
                        path: 'labor-renewal',
                        component: '@/pages/HRManage/LaborRenewal',
                    },
                    {
                        name: '提交劳动合同续签申请',
                        path: 'labor-renewal-edit',
                        component: '@/pages/HRManage/LaborRenewal/EditPage',
                    },
                    {
                        name: '劳动合同续签申请详情',
                        path: 'labor-renewal-detail/:id',
                        component: '@/pages/HRManage/LaborRenewal/DetailPage',
                    },
                ],
            },
        ],
    },
];

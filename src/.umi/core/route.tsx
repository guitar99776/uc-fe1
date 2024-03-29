// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  const routes = {"1":{"path":"/login","layout":false,"id":"1"},"2":{"path":"/","flatMenu":true,"parentId":"@@/global-layout","id":"2"},"3":{"path":"/","redirect":"/myInfo","parentId":"2","id":"3"},"4":{"name":"首页","path":"/","hideInMenu":true,"parentId":"2","id":"4"},"5":{"name":"修改密码","path":"/changePassword","hideInMenu":true,"parentId":"2","id":"5"},"6":{"name":"组织架构","path":"/org","hideInMenu":true,"parentId":"2","id":"6"},"7":{"name":"组织汇报关系","path":"/org-report","hideInMenu":true,"parentId":"2","id":"7"},"8":{"name":"系统管理","path":"/system","parentId":"2","id":"8"},"9":{"name":"用户管理","path":"user","parentId":"8","id":"9"},"10":{"name":"角色管理","path":"role","parentId":"8","id":"10"},"11":{"name":"分配角色","path":"assignRole/:userId","hideInMenu":true,"parentId":"8","id":"11"},"12":{"name":"分配用户","path":"assignUser/:roleId","hideInMenu":true,"parentId":"8","id":"12"},"13":{"name":"菜单管理","path":"menu","parentId":"8","id":"13"},"14":{"name":"我的信息","path":"/myInfo","parentId":"2","id":"14"},"15":{"path":"/myInfo","redirect":"mine","parentId":"14","id":"15"},"16":{"name":"个人信息","path":"mine","parentId":"14","id":"16"},"17":{"name":"转正申请","path":"employment-confirm","parentId":"14","id":"17"},"18":{"name":"离职申请","path":"resignation-apply","parentId":"14","id":"18"},"19":{"name":"薪酬管理","path":"/remuneration","parentId":"2","id":"19"},"20":{"name":"调薪申请","path":"apply","parentId":"19","id":"20"},"21":{"name":"调薪申请新建","path":"edit","parentId":"19","id":"21"},"22":{"name":"调薪申请详情","path":"detail","parentId":"19","id":"22"},"23":{"name":"管理工具","path":"/hr-manage","parentId":"2","id":"23"},"24":{"name":"员工简历查询","path":"employee-resume","parentId":"23","id":"24"},"25":{"name":"员工简历详情","path":"employee-resume/:fromPage/:id","hideInMenu":true,"parentId":"23","id":"25"},"26":{"name":"个人信息审批","path":"resume-examine","parentId":"23","id":"26"},"27":{"name":"奖励列表","path":"employee-rewards/list","parentId":"23","id":"27"},"28":{"name":"奖励申请","path":"employee-rewards/add","hideInMenu":true,"parentId":"23","id":"28"},"29":{"name":"奖励申请详情","path":"employee-rewards/detail/:id","hideInMenu":true,"parentId":"23","id":"29"},"30":{"name":"调岗列表","path":"employee-job-transfer/list","parentId":"23","id":"30"},"31":{"name":"调岗申请","path":"employee-job-transfer/add","hideInMenu":true,"parentId":"23","id":"31"},"32":{"name":"调岗申请详情","path":"employee-job-transfer/detail/:id","hideInMenu":true,"parentId":"23","id":"32"},"33":{"name":"返聘列表","path":"employee-rehiring/list","parentId":"23","id":"33"},"34":{"name":"返聘申请","path":"employee-rehiring/add","hideInMenu":true,"parentId":"23","id":"34"},"35":{"name":"返聘申请详情","path":"employee-rehiring/detail/:id","hideInMenu":true,"parentId":"23","id":"35"},"36":{"name":"劳动合同续签","path":"labor-renewal","parentId":"23","id":"36"},"37":{"name":"提交劳动合同续签申请","path":"labor-renewal-edit","parentId":"23","id":"37"},"38":{"name":"劳动合同续签申请详情","path":"labor-renewal-detail/:id","parentId":"23","id":"38"},"@@/global-layout":{"id":"@@/global-layout","path":"/","parentId":"ant-design-pro-layout","isLayout":true},"ant-design-pro-layout":{"id":"ant-design-pro-layout","path":"/","isLayout":true}} as const;
  return {
    routes,
    routeComponents: {
'1': React.lazy(() => import(/* webpackChunkName: "p__Login__index" */'@/pages/Login/index.tsx')),
'2': React.lazy(() => import(/* webpackChunkName: "layouts__index" */'@/layouts/index.tsx')),
'3': React.lazy(() => import( './EmptyRoute')),
'4': React.lazy(() => import(/* webpackChunkName: "p__Home__index" */'@/pages/Home/index.tsx')),
'5': React.lazy(() => import(/* webpackChunkName: "p__UserCenter__ChangePassword__index" */'@/pages/UserCenter/ChangePassword/index.tsx')),
'6': React.lazy(() => import(/* webpackChunkName: "p__OrgManage__Org__index" */'@/pages/OrgManage/Org/index.tsx')),
'7': React.lazy(() => import(/* webpackChunkName: "p__OrgManage__OrgReport__index" */'@/pages/OrgManage/OrgReport/index.tsx')),
'8': React.lazy(() => import( './EmptyRoute')),
'9': React.lazy(() => import(/* webpackChunkName: "p__System__User__index" */'@/pages/System/User/index.tsx')),
'10': React.lazy(() => import(/* webpackChunkName: "p__System__Role__index" */'@/pages/System/Role/index.tsx')),
'11': React.lazy(() => import(/* webpackChunkName: "p__System__Role__AssignRole" */'@/pages/System/Role/AssignRole.tsx')),
'12': React.lazy(() => import(/* webpackChunkName: "p__System__AssignUser__index" */'@/pages/System/AssignUser/index.tsx')),
'13': React.lazy(() => import(/* webpackChunkName: "p__System__Menu__index" */'@/pages/System/Menu/index.tsx')),
'14': React.lazy(() => import( './EmptyRoute')),
'15': React.lazy(() => import( './EmptyRoute')),
'16': React.lazy(() => import(/* webpackChunkName: "p__MyInfo__Mine__index" */'@/pages/MyInfo/Mine/index.tsx')),
'17': React.lazy(() => import(/* webpackChunkName: "p__MyInfo__EmploymentConfirm__index" */'@/pages/MyInfo/EmploymentConfirm/index.tsx')),
'18': React.lazy(() => import(/* webpackChunkName: "p__MyInfo__ResignationApply__index" */'@/pages/MyInfo/ResignationApply/index.tsx')),
'19': React.lazy(() => import( './EmptyRoute')),
'20': React.lazy(() => import(/* webpackChunkName: "p__Remuneration__index" */'@/pages/Remuneration/index.tsx')),
'21': React.lazy(() => import(/* webpackChunkName: "p__Remuneration__EditPage" */'@/pages/Remuneration/EditPage.tsx')),
'22': React.lazy(() => import(/* webpackChunkName: "p__Remuneration__DetailPage" */'@/pages/Remuneration/DetailPage.tsx')),
'23': React.lazy(() => import( './EmptyRoute')),
'24': React.lazy(() => import(/* webpackChunkName: "p__HRManage__EmployeeResume__index" */'@/pages/HRManage/EmployeeResume/index.tsx')),
'25': React.lazy(() => import(/* webpackChunkName: "p__MyInfo__Mine__index" */'@/pages/MyInfo/Mine/index.tsx')),
'26': React.lazy(() => import(/* webpackChunkName: "p__HRManage__ResumeExamine__index" */'@/pages/HRManage/ResumeExamine/index.tsx')),
'27': React.lazy(() => import(/* webpackChunkName: "p__HRManage__EmployeeRewards__List__index" */'@/pages/HRManage/EmployeeRewards/List/index.tsx')),
'28': React.lazy(() => import(/* webpackChunkName: "p__HRManage__EmployeeRewards__Add__index" */'@/pages/HRManage/EmployeeRewards/Add/index.tsx')),
'29': React.lazy(() => import(/* webpackChunkName: "p__HRManage__EmployeeRewards__Detail__index" */'@/pages/HRManage/EmployeeRewards/Detail/index.tsx')),
'30': React.lazy(() => import(/* webpackChunkName: "p__HRManage__EmployeeJobTransfer__List__index" */'@/pages/HRManage/EmployeeJobTransfer/List/index.tsx')),
'31': React.lazy(() => import(/* webpackChunkName: "p__HRManage__EmployeeJobTransfer__Add__index" */'@/pages/HRManage/EmployeeJobTransfer/Add/index.tsx')),
'32': React.lazy(() => import(/* webpackChunkName: "p__HRManage__EmployeeJobTransfer__Detail__index" */'@/pages/HRManage/EmployeeJobTransfer/Detail/index.tsx')),
'33': React.lazy(() => import(/* webpackChunkName: "p__HRManage__EmployeeRehiring__List__index" */'@/pages/HRManage/EmployeeRehiring/List/index.tsx')),
'34': React.lazy(() => import(/* webpackChunkName: "p__HRManage__EmployeeRehiring__Add__index" */'@/pages/HRManage/EmployeeRehiring/Add/index.tsx')),
'35': React.lazy(() => import(/* webpackChunkName: "p__HRManage__EmployeeRehiring__Detail__index" */'@/pages/HRManage/EmployeeRehiring/Detail/index.tsx')),
'36': React.lazy(() => import(/* webpackChunkName: "p__HRManage__LaborRenewal__index" */'@/pages/HRManage/LaborRenewal/index.tsx')),
'37': React.lazy(() => import(/* webpackChunkName: "p__HRManage__LaborRenewal__EditPage" */'@/pages/HRManage/LaborRenewal/EditPage.tsx')),
'38': React.lazy(() => import(/* webpackChunkName: "p__HRManage__LaborRenewal__DetailPage" */'@/pages/HRManage/LaborRenewal/DetailPage.tsx')),
'@@/global-layout': React.lazy(() => import(/* webpackChunkName: "layouts__index" */'/Users/menglin/Documents/ncs-repertories/uc-fe/src/layouts/index.tsx')),
'ant-design-pro-layout': React.lazy(() => import(/* webpackChunkName: "umi__plugin-layout__Layout" */'/Users/menglin/Documents/ncs-repertories/uc-fe/src/.umi/plugin-layout/Layout.tsx')),
},
  };
}

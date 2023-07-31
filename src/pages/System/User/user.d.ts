declare namespace User {
    interface OrgTree {
        orgId: number;
        orgName: string;
        children: Array<userList>;
    }
    interface StaffsParmasBo {
        pageNum: number;
        pageSize: number;
        name?: string;
        phone?: string;
        orgId?: number;
    }
    interface MenuFormRequestBo {
        menuName: string;
        path: string;
        visible: true;
        menuId?: number;
        parentId?: number;
        menuSort: number;
        menuType?: string;
        perms?: string;
        remark?: string;
    }
}

import { getPostTreeByUser } from '@/services/user';
import OrgChart, { NodeDataType } from '@twp0217/react-org-chart';
import { useRequest } from 'cmt-utils';
import './index.less';

interface TreeNode {
    orgName?: string;
    orgId?: number;
    parentOrgId: number;
    status: string;
    [key: string]: any;
    children: TreeNode[];
}

const OrgManage = () => {
    const transformTree = (tree: TreeNode[]): any[] => {
        return tree?.map((node) => ({
            key: node.postId,
            label: node.postName,
            children: transformTree(node.children),
        }));
    };

    const { data } = useRequest(getPostTreeByUser);
    const NodeComponent = (node: NodeDataType) => {
        return (
            <>
                <div>{node.label}</div>
            </>
        );
    };
    return (
        <div className="org-container">
            <OrgChart
                className="org"
                data={transformTree(data)?.[0]}
                renderNode={NodeComponent}
                expandable
                expandAll={false}
            />
        </div>
    );
};

export default OrgManage;

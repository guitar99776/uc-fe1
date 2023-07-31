import { getOrgTreeByUser } from '@/services/user';
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

const Org = () => {
    const transformTree = (tree: TreeNode[]): any[] => {
        return tree?.map((node) => ({
            key: node.orgId,
            label: node.orgName,
            children: transformTree(node.children),
        }));
    };

    const { data } = useRequest(getOrgTreeByUser);
    const NodeComponent = (node: NodeDataType) => {
        return (
            <>
                {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> */}
                <div
                // className={`node-label ${node.label.includes('销售') ? 'active' : ''
                //     } `}
                >
                    {node.label}
                </div>
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

export default Org;

/*
 * @Author: Lin Yunhe
 * @Date: 2023-07-02 10:52:25
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-06 18:02:43
 */

import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useBoolean } from 'cmt-utils';

interface LoadMoreAndFoldProps {
    defaultValue?: boolean;
    onChange?: (isExpand: boolean) => void;
}

function LoadMoreAndFold({ defaultValue, onChange }: LoadMoreAndFoldProps) {
    // 是否展开，默认折叠
    const [expand, { toggle }] = useBoolean(defaultValue);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
                type="link"
                icon={expand ? <UpOutlined /> : <DownOutlined />}
                onClick={() => {
                    toggle();
                    // TODO：同步更新
                    onChange?.(!expand);
                }}
            >
                {expand ? '收起' : '更多'}
            </Button>
        </div>
    );
}

export default LoadMoreAndFold;

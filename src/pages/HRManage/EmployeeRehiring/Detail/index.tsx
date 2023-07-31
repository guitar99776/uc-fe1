import { getRehireDetail } from '@/services/hrManage';
import { useParams, useRequest } from '@umijs/max';
import { Spin } from 'antd';
import Form from '../Form';

const Detail = () => {
    const { id } = useParams<{ id: string }>();

    const { data, loading } = useRequest(getRehireDetail, {
        defaultParams: [{ id }],
    });

    return (
        <Spin spinning={loading}>
            <Form type="readonly" data={data} />
        </Spin>
    );
};

export default Detail;

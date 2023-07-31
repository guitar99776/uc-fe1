import {
    ProForm as AntProForm,
    FooterToolbar,
    ProFormProps,
} from '@ant-design/pro-components';
import { FC, useMemo } from 'react';

const ProForm: FC<
    ProFormProps & {
        children?: React.ReactNode | React.ReactNode[];
    }
> = (props) => {
    const submitter = useMemo<Required<ProFormProps>['submitter']>(() => {
        if (props.submitter === false) {
            return props.submitter;
        }

        const render = props.submitter?.render;

        return {
            ...(props.submitter ?? {}),
            render: (_, dom) => {
                if (render === false) {
                    return false;
                }

                return (
                    <FooterToolbar>
                        {typeof render === 'function' ? render(_, dom) : dom}
                    </FooterToolbar>
                );
            },
        };
    }, [props.submitter]);

    return <AntProForm {...props} submitter={submitter} />;
};

export default ProForm;

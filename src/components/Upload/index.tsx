import { upload } from '@/services/common';
import {
    ProFormUploadButton,
    ProFormUploadButtonProps,
} from '@ant-design/pro-components';
import { useCustomAntdUploadRequest } from 'cmt-utils';
import { FC, useMemo } from 'react';

const Upload: FC<ProFormUploadButtonProps> = ({
    fieldProps,
    value: sourceValue,
    ...rest
}) => {
    const customRequest = useCustomAntdUploadRequest(upload);

    const value = useMemo(
        () => (sourceValue as any)?.fileList || sourceValue,
        [sourceValue],
    );

    return (
        <ProFormUploadButton
            {...rest}
            value={value}
            fieldProps={{ ...fieldProps, customRequest, onPreview: () => {} }}
        />
    );
};

export default Upload;

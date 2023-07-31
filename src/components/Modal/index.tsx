/*
 * @Author: Lin Yunhe
 * @Date: 2023-03-29 21:04:18
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-04-06 16:08:15
 */
import type { ModalProps as AntModalProps } from 'antd';
import { Modal as AntModal } from 'antd';
import type { ReactNode } from 'react';
import {
    cloneElement,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useState,
} from 'react';

export interface ModalProps extends Omit<AntModalProps, 'onCancel'> {
    trigger?: JSX.Element;
    wrapper?: (params: { onOpen: () => void; trigger: ReactNode }) => ReactNode;
}

export interface ModalRef {
    onCancel: () => void;
    onOpen: () => void;
}

const Modal = forwardRef<ModalRef, ModalProps>((props, ref) => {
    const { children, trigger, wrapper, ...rest } = props;

    const [open, setOpen] = useState(false);

    const onCancel = useCallback(() => {
        setOpen(false);
    }, []);

    const onOpen = useCallback(() => {
        setOpen(true);
    }, []);

    useImperativeHandle(
        ref,
        () => ({
            onCancel,
            onOpen,
        }),
        [onCancel, onOpen],
    );

    const triggerOrWrapper = useMemo(() => {
        if (wrapper) return wrapper({ onOpen, trigger });

        if (trigger)
            return cloneElement(trigger, {
                onClick: onOpen,
            });

        return null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger, wrapper]);

    return (
        <>
            {triggerOrWrapper}
            <AntModal
                width={'80%'}
                destroyOnClose
                {...rest}
                open={open}
                onCancel={onCancel}
            >
                {children}
            </AntModal>
        </>
    );
});

export default Modal;

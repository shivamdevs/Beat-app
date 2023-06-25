import React from 'react';
import { useAppContext } from '../../core/app/AppContext';
import "./Dialog.scss";
import { MdClear } from 'react-icons/md';

interface PropType {
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | ((_ref: HTMLDialogElement | null) => (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null));
    className?: string | undefined;
    innerClassName?: string | undefined;
    onClose?: (() => void) | null;
};

function Dialog({ children, className = "", innerClassName = "", onClose = null }: PropType) {
    const dialogRef = React.useRef<HTMLDialogElement>(null);
    const [dialogState, setDialogState] = React.useState<HTMLDialogElement | null>(dialogRef.current);

    const { dialog: { $set: { account } } } = useAppContext();

    React.useEffect(() => {
        const dialog = dialogRef.current;
        setDialogState(dialog);
        if (dialog) {
            !dialog.open && dialog.showModal();

            const handleClose = () => {
                account(false);
                onClose?.();
            };

            dialog.addEventListener("close", handleClose);
            return () => dialog.removeEventListener("close", handleClose);
        }
    }, [account, onClose]);

    const handleOuterClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        const dialog = dialogRef.current;
        if (dialog) {
            const dialogDimensions = dialog.getBoundingClientRect()
            if (e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right || e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom) {
                e.preventDefault();
                dialog.close();
            }
        }
    };

    return (
        <dialog ref={dialogRef} className={"dialog " + className} onClick={handleOuterClick}>
            <button type="button" aria-label="Close popup" onClick={() => dialogState?.close()}><MdClear /></button>
            <div className={innerClassName}>
                {typeof children === 'function' ? children(dialogState) : children}
            </div>
        </dialog>
    );
}

export default Dialog;

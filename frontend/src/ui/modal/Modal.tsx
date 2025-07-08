import type { ReactNode } from "react";
import styles from "./Modal.module.scss";
import ReactDOM from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  title?: string;
  children?: ReactNode;
};

const Modal = ({ isOpen, onClose, onConfirm, confirmText = "Confirm", cancelText = "Cancel", title, children }: Props) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles["modal-overlay"]} onClick={onClose}>
      <div className={styles["modal-container"]} onClick={(e) => e.stopPropagation()}>
        {title && <h2 className={styles["modal-title"]}>{title}</h2>}
        <div className={styles["modal-body"]}>{children}</div>
        <div className={styles["modal-actions"]}>
          <button className={styles["cancel-button"]} onClick={onClose}>
            {cancelText}
          </button>
          <button className={styles["confirm-button"]} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
};

export default Modal;

import classNames from "classnames/bind";
import styles from "./index.module.css";

const cx = classNames.bind(styles);

const Confirmation = ({
  title,
  visible,
  onOk,
  onCancel,
  maskClosable = true,
}) => {
  return (
    <div className={cx("modal", { visible })}>
      <div
        className={cx("mask")}
        onClick={maskClosable ? onCancel : () => {}}
      />
      <div className={cx("content")}>
        <div className={cx("title")}>{title}</div>
        <div className={cx("btns-wrap")}>
          <button className={cx("btn", "cancel")} onClick={onCancel}>
            Cancel
          </button>
          <button className={cx("btn", "ok")} onClick={onOk}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;

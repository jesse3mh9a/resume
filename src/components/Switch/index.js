import classNames from "classnames/bind";
import styles from "./index.module.css";

const cx = classNames.bind(styles);

const Switch = ({ checked, onChange }) => {
  return (
    <div className={cx("wrap", { checked })} onClick={() => onChange(checked)}>
      <div className={cx("slider")} />
    </div>
  );
};

export default Switch;

import classNames from "classnames/bind";
import styles from "./index.module.css";

const cx = classNames.bind(styles);

const Spin = ({
  size = 30,
  color = "purple",
  track = "#f3f3f3",
  duration = "0.8s",
  classes = {},
  style = {},
}) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderColor: track,
        borderTopColor: color,
        animationDuration: duration,
        ...style,
      }}
      className={cx("loader", classes.root)}
    ></div>
  );
};

export default Spin;

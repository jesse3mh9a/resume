import { useLayoutEffect, useRef } from "react";
import styles from "./index.module.css";

const Mm = () => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const width = ref.current.offsetWidth;
    // eslint-disable-next-line no-console
    console.log(width);
  }, []);

  return <div className={styles.wrap} ref={ref} />;
};

export default Mm;

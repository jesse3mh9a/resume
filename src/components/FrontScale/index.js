import { useContext, useEffect, useLayoutEffect, useRef } from "react";

import classNames from "classnames/bind";

import { Dispatch, setFrontScale } from "Edit/Provider";

import styles from "./index.module.css";

const cx = classNames.bind(styles);

const getWidth = (ref, dispatch) => {
  if (ref.current && ref.current.parentNode) {
    const width = ref.current.offsetWidth;
    const parentWidth = ref.current.parentNode.offsetWidth;

    dispatch(setFrontScale(parentWidth / width));
  }
};

const FrontScale = () => {
  const dispatch = useContext(Dispatch);

  const ref = useRef(null);

  useEffect(() => {
    const reportWindowSize = () => {
      getWidth(ref, dispatch);
    };

    window.addEventListener("resize", reportWindowSize);

    return () => {
      window.removeEventListener("resize", reportWindowSize);
    };
  }, [dispatch]);

  useLayoutEffect(() => {
    getWidth(ref, dispatch);
  }, [dispatch]);

  return <div ref={ref} className={cx("content")} />;
};

export default FrontScale;

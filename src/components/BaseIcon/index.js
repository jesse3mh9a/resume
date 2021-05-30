import { forwardRef } from "react";

const baseIcon = (wrapped) => {
  return forwardRef((props, ref) => {
    const { className, class: c, width, height, ...filter } = wrapped.props;

    return <wrapped.type ref={ref} {...filter} {...props} />;
  });
};

export default baseIcon;

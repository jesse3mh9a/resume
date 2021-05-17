const baseIcon = (wrapped) => {
  return (props) => {
    const { className, class: c, width, height, ...filter } = wrapped.props;

    return <wrapped.type {...filter} {...props} />;
  };
};

export default baseIcon;

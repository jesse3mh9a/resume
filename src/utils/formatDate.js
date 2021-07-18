const formatDate = (time, { placeholder = "至今", separator = "/" } = {}) => {
  if (time) {
    return time.replace(/-/g, separator);
  }

  return placeholder;
};

export default formatDate;

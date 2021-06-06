import FrontScale from "components/FrontScale";

import useFrontScale from "hooks/useFrontScale";

const ResumeWrapper = ({ children }) => {
  const frontScale = useFrontScale();

  return (
    <div style={{ fontSize: `${frontScale}rem` }}>
      <FrontScale />
      {children}
    </div>
  );
};

export default ResumeWrapper;

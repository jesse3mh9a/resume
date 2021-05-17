import { useContext } from "react";

import { Context, initialState } from "Provider";

import DEMO from "demo";
/**
 * 如果demo是false, 无论enableDemo值什么, 都不会使用demo的数据
 */
const useResume = ({ demo = false } = {}) => {
  const { enableDemo, currentResume, resumes } = useContext(Context);

  if (demo && enableDemo) {
    return DEMO;
  }

  const resume = resumes[currentResume] || initialState.resumes[0];

  return resume;
};

export const usePreview = () => {
  return useResume({ demo: true });
};

export default useResume;

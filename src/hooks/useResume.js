import { useContext } from "react";

import { Context, initialState } from "Provider";

import DEMO from "demo";

const useResume = ({ demo = true } = {}) => {
  const { enableDemo, currentResume, resumes } = useContext(Context);

  if (demo && enableDemo) {
    return DEMO;
  }

  const resume = resumes[currentResume] || initialState.resumes[0];

  return resume;
};

export default useResume;

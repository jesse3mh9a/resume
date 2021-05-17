import { useContext } from "react";

import { Context, initialState } from "Provider";

const useResume = () => {
  const { currentResume, resumes } = useContext(Context);

  const resume = resumes[currentResume] || initialState.resumes[0];

  return resume;
};

export default useResume;

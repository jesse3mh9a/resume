import { useContext, useEffect } from "react";

import {
  Context,
  DispatchContext,
  initialState,
  update as updateAction,
  resumeOnChange,
} from "Provider";

const useFreshResume = () => {
  const { currentResume, resumes } = useContext(Context);
  const dispatch = useContext(DispatchContext);

  const deriveResumes = () => {
    const isEmpty = resumes.length === 0;

    const unCurrent = resumes[currentResume] === undefined;

    return {
      isEmpty,
      unCurrent,
    };
  };

  const { isEmpty, unCurrent } = deriveResumes();

  useEffect(() => {
    if (isEmpty) {
      dispatch(updateAction({ resumes: initialState.resumes }));
    } else if (unCurrent) {
      dispatch(resumeOnChange(0));
    }
  }, [dispatch, unCurrent, isEmpty]);
};

export default useFreshResume;

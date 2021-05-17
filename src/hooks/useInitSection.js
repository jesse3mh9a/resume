import { useContext, useEffect } from "react";

import useResume from "hooks/useResume";

import { DispatchContext, addSectionItem } from "Provider";

const usePlaceholder = (section) => {
  const resume = useResume();
  const dispatch = useContext(DispatchContext);

  const isEmpty = resume[section].length === 0;

  useEffect(() => {
    if (isEmpty) {
      dispatch(addSectionItem(section));
    }
  }, [dispatch, isEmpty, section]);
};

export default usePlaceholder;

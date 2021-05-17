import { useEffect } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

// edit
import Edit from "Edit";
import PersonalDetails from "Edit/PersonalDetails/Loadable";
import Summary from "Edit/Summary/Loadable";
import Education from "Edit/Education/Loadable";
import Experience from "Edit/Experience/Loadable";

import DataManage from "Edit/DataManage/Loadable";

const DefaultHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/edit/personal-details");
  }, [navigate]);

  return null;
};

const Container = () => {
  return (
    <Routes>
      <Route path="edit" element={<Edit />}>
        <Route path="personal-details" element={<PersonalDetails />} />
        <Route path="summary" element={<Summary />} />
        <Route path="education" element={<Education />} />
        <Route path="experience" element={<Experience />} />
        <Route path="/data/manage" element={<DataManage />} />
      </Route>
      <Route path="*" element={<DefaultHome />} />
    </Routes>
  );
};

export default Container;

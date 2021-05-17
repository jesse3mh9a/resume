import { useContext, useState } from "react";

import {
  DispatchContext,
  setSectionItem,
  addSectionItem,
  removeSectionItem,
} from "Provider";

import useResume from "hooks/useResume";

import classNames from "classnames/bind";

import useInitSection from "hooks/useInitSection";

import Confirmation from "components/Confirmation";

import styles from "./index.module.css";
import formStyles from "styles/form.module.css";

const cx = classNames.bind({ ...formStyles, ...styles });

const section = "education";

const initialDeleteConfirm = { title: "", id: -1, visible: false };

const Education = () => {
  useInitSection(section);

  const [deleteConfirm, setDeleteConfirm] = useState(initialDeleteConfirm);

  const closeConfirm = () => {
    setDeleteConfirm(initialDeleteConfirm);
  };

  const { education = [] } = useResume({ demo: false });

  const dispatch = useContext(DispatchContext);

  const setForm = (index) => (form) =>
    dispatch(setSectionItem({ section, index, form }));

  const addForm = () => dispatch(addSectionItem("education"));

  const removeForm = (index) => dispatch(removeSectionItem({ section, index }));

  const confirmationOnOk = () => {
    removeForm(deleteConfirm.id);
    closeConfirm();
  };

  return (
    <div className={cx("container")}>
      <Confirmation
        title={deleteConfirm.title}
        visible={deleteConfirm.visible}
        onCancel={closeConfirm}
        onOk={confirmationOnOk}
      />
      {education.map(
        ({ key, schoolName, endDate, startDate, description }, i) => {
          const setFormItem = setForm(i);
          return (
            <form key={key} className={cx("form", "item")}>
              <div className={cx("form-item")}>
                <label htmlFor={`school-name-${i}`} className={cx("label")}>
                  School name
                </label>
                <div className={cx("input-control")}>
                  <input
                    id={`school-name-${i}`}
                    className={cx("input")}
                    placeholder=""
                    value={schoolName}
                    onChange={(e) => {
                      setFormItem({
                        schoolName: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className={cx("form-item")}>
                <label className={cx("label")} htmlFor={`start-date-${i}`}>
                  Start date
                </label>
                <div className={cx("input-control", "multi-input")}>
                  <div className={cx("input-control")}>
                    <input
                      className={cx("input")}
                      type="date"
                      id={`start-date-${i}`}
                      max={endDate}
                      value={startDate}
                      onChange={(e) => {
                        setFormItem({ startDate: e.target.value });
                      }}
                    />
                  </div>

                  <div className={cx("multi-separate")}>至</div>
                  <div className={cx("input-control")}>
                    {" "}
                    <input
                      className={cx("input")}
                      type="date"
                      min={startDate}
                      value={endDate}
                      onChange={(e) => {
                        setFormItem({ endDate: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={cx("form-item")}>
                <label htmlFor={`description-${i}`} className={cx("label")}>
                  Description
                </label>
                <div className={cx("input-control")}>
                  <textarea
                    id={`description-${i}`}
                    rows={10}
                    className={cx("input", "textarea")}
                    placeholder=""
                    value={description}
                    onChange={(e) => {
                      setFormItem({
                        description: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className={cx("delete-wrap")}>
                <button
                  className={cx("delete")}
                  type="button"
                  onClick={() => {
                    setDeleteConfirm({
                      title: `Are you sure delete?`,
                      id: i,
                      visible: true,
                    });
                  }}
                >
                  Remove
                </button>
              </div>
            </form>
          );
        }
      )}
      <button type="button" className={cx("add")} onClick={() => addForm()}>
        Add
      </button>
    </div>
  );
};

export default Education;

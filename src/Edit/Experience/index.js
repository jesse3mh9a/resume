import { useState, useContext } from "react";

import classNames from "classnames/bind";

import {
  DispatchContext,
  setSectionItem,
  addSectionItem,
  removeSectionItem,
  makeOrderSectionItem,
} from "Provider";

import useInitSection from "hooks/useInitSection";

import useResume from "hooks/useResume";

import Confirmation from "components/Confirmation";

import styles from "Edit/Education/index.module.css";
import formStyles from "styles/form.module.css";

const cx = classNames.bind({ ...formStyles, ...styles });

const section = "experience";

const initialDeleteConfirm = { title: "", id: -1, visible: false };

const Experience = () => {
  useInitSection(section);

  const [deleteConfirm, setDeleteConfirm] = useState(initialDeleteConfirm);

  const closeConfirm = () => {
    setDeleteConfirm(initialDeleteConfirm);
  };

  const { experience = [] } = useResume();

  const dispatch = useContext(DispatchContext);

  const setForm = (index) => (form) =>
    dispatch(setSectionItem({ section, index, form }));

  const addForm = () => dispatch(addSectionItem(section));
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
      {experience.map(
        (
          { key, jobTitle, companyName, endDate, startDate, description },
          i
        ) => {
          const setFormItem = setForm(i);
          return (
            <form key={key} className={cx("form", "item")}>
              <div className={cx("order")}>
                {i > 0 && (
                  <div
                    className={cx("order-item")}
                    onClick={() => {
                      dispatch(
                        makeOrderSectionItem({
                          section: "experience",
                          index: i,
                          toward: "up",
                        })
                      );
                    }}
                  >
                    <div className={cx("arrow", "up")} />
                  </div>
                )}
                {i < experience.length - 1 && (
                  <div
                    className={cx("order-item")}
                    onClick={() => {
                      dispatch(
                        makeOrderSectionItem({
                          section: "experience",
                          index: i,
                          toward: "down",
                        })
                      );
                    }}
                  >
                    <div className={cx("arrow", "down")} />
                  </div>
                )}
              </div>
              <div className={cx("multiple-index")}>#{i + 1}</div>
              <div className={cx("form-item")}>
                <label htmlFor={`company-name-${i}`} className={cx("label")}>
                  Company name
                </label>
                <div className={cx("input-control")}>
                  <input
                    id={`company-name-${i}`}
                    className={cx("input")}
                    placeholder="Company name"
                    value={companyName}
                    onChange={(e) => {
                      setFormItem({
                        companyName: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className={cx("form-item")}>
                <label htmlFor={`jop-title-${i}`} className={cx("label")}>
                  Job title
                </label>
                <div className={cx("input-control")}>
                  <input
                    id={`jop-title-${i}`}
                    className={cx("input")}
                    placeholder="Job title"
                    value={jobTitle}
                    onChange={(e) => {
                      setFormItem({
                        jobTitle: e.target.value,
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
                      type="month"
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
                      type="month"
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

export default Experience;

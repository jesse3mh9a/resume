import { useContext, useState } from "react";

import { useParams } from "react-router-dom";

import {
  DispatchContext,
  setSectionItem,
  addSectionItem,
  removeSectionItem,
  makeOrderSectionItem,
} from "Provider";

import useResume from "hooks/useResume";

import classNames from "classnames/bind";

import useInitSection from "hooks/useInitSection";

import Confirmation from "components/Confirmation";

import { options } from "./constants";

import styles from "./index.module.css";
import formStyles from "styles/form.module.css";

const cx = classNames.bind({ ...formStyles, ...styles });

const initialDeleteConfirm = { title: "", id: -1, visible: false };

const control = {
  text: ({ name, value, setFormItem, index }) => {
    const id = [name, index].join("-");
    return (
      <div className={cx("form-item")}>
        <label htmlFor={id} className={cx("label")}>
          {name}
        </label>
        <div className={cx("input-control")}>
          <input
            id={id}
            className={cx("input")}
            placeholder={""}
            value={value}
            onChange={(e) => {
              setFormItem({
                [name]: e.target.value,
              });
            }}
          />
        </div>
      </div>
    );
  },

  range: ({ name, start, end, setFormItem, index }) => {
    const id = [name, index].join("-");
    return (
      <div className={cx("form-item")}>
        <label className={cx("label")} htmlFor={id}>
          {name}
        </label>
        <div className={cx("input-control", "multi-input")}>
          <div className={cx("input-control")}>
            <input
              id={id}
              className={cx("input")}
              type="month"
              max={end.value}
              value={start.value}
              onChange={(e) => {
                setFormItem({ [start.name]: e.target.value });
              }}
            />
          </div>

          <div className={cx("multi-separate")}>至</div>
          <div className={cx("input-control")}>
            <input
              className={cx("input")}
              type="month"
              min={start.value}
              value={end.value}
              onChange={(e) => {
                setFormItem({ [end.name]: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
    );
  },

  textarea: ({ name, value, setFormItem, index }) => {
    const id = [name, index].join("-");
    return (
      <div className={cx("form-item")}>
        <label htmlFor={id} className={cx("label")}>
          {name}
        </label>
        <div className={cx("input-control")}>
          <textarea
            id={id}
            rows={10}
            className={cx("input", "textarea")}
            placeholder=""
            value={value}
            onChange={(e) => {
              setFormItem({
                description: e.target.value,
              });
            }}
          />
        </div>
      </div>
    );
  },
};

const List = () => {
  const params = useParams();

  const { section } = params;

  const { group = [] } = options?.[section];

  useInitSection(section);

  const [deleteConfirm, setDeleteConfirm] = useState(initialDeleteConfirm);

  const closeConfirm = () => {
    setDeleteConfirm(initialDeleteConfirm);
  };

  const resume = useResume();

  const list = resume[section] || [];

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
      {list.map((item, index) => {
        const { key } = item;
        const setFormItem = setForm(index);
        return (
          <form key={key} className={cx("form", "item")}>
            <div className={cx("order")}>
              {index > 0 && (
                <div
                  className={cx("order-item")}
                  onClick={() => {
                    dispatch(
                      makeOrderSectionItem({
                        section,
                        index,
                        toward: "up",
                      })
                    );
                  }}
                >
                  <div className={cx("arrow", "up")} />
                </div>
              )}
              {index < list.length - 1 && (
                <div
                  className={cx("order-item")}
                  onClick={() => {
                    dispatch(
                      makeOrderSectionItem({
                        section,
                        index,
                        toward: "down",
                      })
                    );
                  }}
                >
                  <div className={cx("arrow", "down")} />
                </div>
              )}
            </div>
            <div className={cx("multiple-index")}>#{index + 1}</div>
            {group.map((field, groupIdx) => {
              const { type, name, start, end } = field;

              const getControlProps = () => {
                switch (field.type) {
                  case "range":
                    return {
                      name,
                      start: {
                        name: start,
                        value: item[start],
                      },
                      end: {
                        name: end,
                        value: item[end],
                      },
                    };

                  default:
                    return {
                      name,
                      value: item[name],
                    };
                }
              };

              const Control = control[type];
              const { value = "", ...rest } = getControlProps();
              return (
                <Control
                  key={groupIdx}
                  setFormItem={setFormItem}
                  index={index}
                  value={value}
                  {...rest}
                />
              );
            })}
            <div className={cx("delete-wrap")}>
              <button
                className={cx("delete")}
                type="button"
                onClick={() => {
                  setDeleteConfirm({
                    title: `Are you sure delete?`,
                    id: index,
                    visible: true,
                  });
                }}
              >
                Remove
              </button>
            </div>
          </form>
        );
      })}
      <button type="button" className={cx("add")} onClick={() => addForm()}>
        Add
      </button>
    </div>
  );
};

export default List;

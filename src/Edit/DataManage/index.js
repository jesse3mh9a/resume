import { useState, useContext } from "react";

import classNames from "classnames/bind";

import {
  Context,
  DispatchContext,
  updateResume,
  resumeOnChange,
  addResume,
  removeResume,
  update,
} from "Provider";

import useInitResume from "hooks/useInitResume";

import Confirmation from "components/Confirmation";

import styles from "./index.module.css";

const cx = classNames.bind(styles);

const initialDeleteConfirm = { title: "", id: -1, visible: false };

const DataManage = () => {
  useInitResume();

  const [deleteConfirm, setDeleteConfirm] = useState(initialDeleteConfirm);
  const [removeAllConfirm, setRemoveAllConfirm] = useState(false);

  const closeConfirm = () => {
    setDeleteConfirm(initialDeleteConfirm);
  };

  const { resumes = [], currentResume } = useContext(Context);

  const dispatch = useContext(DispatchContext);

  const confirmationOnOk = () => {
    dispatch(removeResume(deleteConfirm.id));
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
      <Confirmation
        title="Are you sure delete all?"
        visible={removeAllConfirm}
        onCancel={() => setRemoveAllConfirm(false)}
        onOk={() => {
          dispatch(update({ resumes: [] }));
          setRemoveAllConfirm(false);
        }}
      />
      <div>
        {resumes.map(({ name, description, key }, index) => {
          const selected = currentResume === index;

          return (
            <div
              key={key}
              className={cx("item", { selected })}
              onClick={() => dispatch(resumeOnChange(index))}
            >
              <div className={cx("item-content")}>
                <div className={cx("number")}>{`${index + 1}.`}</div>
                <div className={cx("content")}>
                  <div className={cx("name")}>{name || "input name"}</div>
                  {description && (
                    <div className={cx("description")}>{description}</div>
                  )}
                </div>
                <div className={cx("input-wrap")}>
                  <div>
                    <input
                      className={cx("input")}
                      placeholder="input name"
                      value={name}
                      onChange={(e) => {
                        dispatch(updateResume(["name", e.target.value]));
                      }}
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder="input description"
                      className={cx("textarea")}
                      rows={5}
                      value={description}
                      onChange={(e) => {
                        dispatch(updateResume(["description", e.target.value]));
                      }}
                    />
                  </div>
                </div>

                <div className={cx("right-side")}>{selected && "✅"}</div>
              </div>
              <div className={cx("delete-wrap")}>
                <button
                  type="button"
                  className={cx("delete")}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteConfirm({
                      title: `Are you sure delete?`,
                      id: index,
                      visible: true,
                    });
                  }}
                >
                  remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <button
          type="button"
          className={cx("add")}
          onClick={() => dispatch(addResume())}
        >
          Add
        </button>
      </div>
      <div>
        <button
          type="button"
          className={cx("remove-all")}
          onClick={() => {
            setRemoveAllConfirm(true);
          }}
        >
          Remove All
        </button>
      </div>
    </div>
  );
};

export default DataManage;

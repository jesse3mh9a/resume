import { useContext } from "react";

import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import {
  Context as EditContext,
  Dispatch as EditDispatch,
  setNavOpen,
} from "Edit/Provider";

import styles from "./index.module.css";

const cx = classNames.bind(styles);

const menus = [
  {
    name: "personal details",
    link: "/edit/personal-details",
  },
  {
    name: "summary",
    link: "/edit/summary",
  },
  {
    name: "education",
    link: "/edit/list/education",
  },
  {
    name: "experience",
    link: "/edit/list/experience",
  },
  {
    name: "project",
    link: "/edit/list/project",
  },
];

const Nav = ({ classes = {} }) => {
  const { pathname } = useLocation();

  const { navOpen } = useContext(EditContext);

  const editDispatch = useContext(EditDispatch);

  return (
    <>
      {navOpen && (
        <div
          className={cx(classes.mask)}
          onClick={() => {
            editDispatch(setNavOpen(false));
          }}
        />
      )}
      <div className={cx("content", classes.root, { [classes.open]: navOpen })}>
        <ul className={cx("list")}>
          {menus.map(({ name, link }, i) => {
            return (
              <li key={i} className={cx("item", { select: link === pathname })}>
                <Link className={cx("link")} to={link}>
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={cx("head")}>Setting</div>
        <ul className={cx("list")}>
          <li
            className={cx("item", { select: pathname === "/edit/data/manage" })}
          >
            <Link className={cx("link")} to="/edit/data/manage">
              Resume data
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nav;

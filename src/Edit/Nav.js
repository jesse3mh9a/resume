import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./index.module.css";
import navStyles from "./Nav.module.css";

const cx = classNames.bind({ ...styles, ...navStyles });

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
    link: "/edit/education",
  },
  {
    name: "experience",
    link: "/edit/experience",
  },
];

const Nav = ({ open, setOpen }) => {
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={cx("nav-layer", { open })}
        onClick={() => {
          setOpen(false);
        }}
      />
      <div className={cx("nav-space")} />
      <div className={cx("nav", { open })}>
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
          <li className={cx("item", "developing")}>
            <div className={cx("link", "disabled")}>
              <div>
                Database<span>developing...</span>
              </div>
              <div className={cx("developing-describe")}>
                Save resume data to your database
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nav;

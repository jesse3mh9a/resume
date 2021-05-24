import classNames from "classnames/bind";
import { usePreview } from "hooks/useResume";
import useTheme from "hooks/useTheme";
import useConfig from "hooks/useConfig";

import PhoneIcon from "icons/Phone";
import EmailIcon from "icons/Email";
import AddressIcon from "icons/Address";
import GithubIcon from "icons/Github";
import WebsiteNormalIcon from "icons/Website";
import config from "./config";
import styles from "./index.module.css";

import avatarMale from "./avatar-male.png";
import avatarFemale from "./avatar-female.png";

const AVATAR = {
  male: avatarMale,
  female: avatarFemale,
};

const WEBSITE_ICON = {
  website: WebsiteNormalIcon,
  github: GithubIcon,
};

const cx = classNames.bind(styles);

const Template = () => {
  const {
    personalDetails: { fullName, phone, email, profession, address, website },
    summary,
    experience = [],
    education = [],
  } = usePreview();

  const { primary } = useTheme(config);
  const { general = {} } = useConfig(config);

  const WebSiteIcon = WEBSITE_ICON[general.website];

  return (
    <div className={cx("container")}>
      <div className={cx("base-info")}>
        <div
          className={cx("avatar")}
          style={{ backgroundImage: `url(${AVATAR[general.avatar]})` }}
        ></div>
        <div className={cx("base-info-side")}>
          <div className={cx("full-name")}>{fullName}</div>
          <div className={cx("profession")}>{profession}</div>
          <div className={cx("summary")}>{summary}</div>
        </div>
      </div>
      <div className={cx("bar-wrap", "mt")}>
        <div className={cx("bar")}>
          <div className={cx("item")}>
            <PhoneIcon className={cx("icon")} style={{ fill: primary }} />
            <div className={cx("info")}>{phone}</div>
          </div>
          <div className={cx("item")}>
            <EmailIcon className={cx("icon")} style={{ fill: primary }} />
            <div className={cx("info")}>{email}</div>
          </div>
          <div className={cx("item")}>
            <AddressIcon className={cx("icon")} style={{ fill: primary }} />
            <div className={cx("info")}>{address}</div>
          </div>
          <div className={cx("item")}>
            <WebSiteIcon className={cx("icon")} style={{ fill: primary }} />
            <div className={cx("info")}>{website}</div>
          </div>
        </div>
      </div>
      <div style={{ color: primary }} className={cx("section-title", "mt-lg")}>
        工作经历
      </div>
      <div>
        {experience.map(
          ({ key, companyName, startDate, endDate, description }) => {
            return (
              <div key={key} className={cx("experience-item", "mt")}>
                <div>{companyName}</div>
                <div className={cx("time", "mt-sm")}>
                  {startDate} ~ {endDate}
                </div>
                <div className={cx("description", "mt-sm")}>{description}</div>
              </div>
            );
          }
        )}
      </div>
      <div style={{ color: primary }} className={cx("section-title", "mt-lg")}>
        教育
      </div>
      <div>
        {education.map(
          ({ key, schoolName, startDate, endDate, description }) => {
            return (
              <div key={key} className={cx("experience-item", "mt")}>
                <div>{schoolName}</div>
                <div className={cx("time", "mt-sm")}>
                  {startDate} ~ {endDate}
                </div>
                <div className={cx("description", "mt-sm")}>{description}</div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Template;

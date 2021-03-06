import classNames from "classnames/bind";
import { usePreview } from "hooks/useResume";
import createTheme from "createTheme";
import createBox from "createBox";
import { useConfigPreview } from "hooks/useConfig";

import formatDate from "utils/formatDate";

import PhoneIcon from "icons/Phone";
import EmailIcon from "icons/Email";
import AddressIcon from "icons/Address";
import GithubIcon from "icons/Github";
import WebsiteNormalIcon from "icons/Website";
import config from "./config";
import styles from "./index.module.css";

import avatarMale from "images/avatar-male.png";
import avatarFemale from "images/avatar-female.png";

const AVATAR = {
  male: avatarMale,
  female: avatarFemale,
};

const WEBSITE_ICON = {
  website: WebsiteNormalIcon,
  github: GithubIcon,
};

const cx = classNames.bind(styles);

const Theme = createTheme(config);

const Box = createBox(config);

const Template = () => {
  const {
    personalDetails: {
      fullName,
      phone,
      email,
      profession,
      address,
      website,
    } = {},
    summary,
    experience = [],
    education = [],
    project = [],
  } = usePreview();

  const { general = {}, section: { skills = [] } = {} } =
    useConfigPreview(config);

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
            <Box clone color="primary" variant="fill" className={cx("icon")}>
              <PhoneIcon />
            </Box>
            <div className={cx("info")}>{phone}</div>
          </div>
          <div className={cx("item")}>
            <Box
              component={EmailIcon}
              className={cx("icon")}
              color="primary"
              variant="fill"
            />
            <div className={cx("info")}>{email}</div>
          </div>
          <div className={cx("item")}>
            <Theme component={AddressIcon} type="fill" className={cx("icon")} />
            <div className={cx("info")}>{address}</div>
          </div>
          <div className={cx("item")}>
            <Theme component={WebSiteIcon} type="fill" className={cx("icon")} />
            <div className={cx("info")}>{website}</div>
          </div>
        </div>
      </div>
      <div>
        <Theme className={cx("section-title")}>??????</Theme>
        <div className={cx("skills")}>
          {skills.map((item, i) => {
            return (
              <Box
                key={i}
                className={cx("skills-item")}
                color="primary"
                variant="backgroundColor"
              >
                {item.name}
              </Box>
            );
          })}
        </div>
      </div>
      <Theme className={cx("section-title", "mt-lg")}>????????????</Theme>
      <div>
        {experience.map(
          ({ key, companyName, jobTitle, startDate, endDate, description }) => {
            return (
              <div key={key} className={cx("experience-item", "mt")}>
                <div className={cx("company-name")}>{companyName}</div>
                <div className={cx("job-title", "mt-sm")}>{jobTitle}</div>
                <div className={cx("time", "mt-sm")}>
                  {formatDate(startDate)} - {formatDate(endDate)}
                </div>
                <div className={cx("description", "mt-sm")}>{description}</div>
              </div>
            );
          }
        )}
      </div>
      <Theme className={cx("section-title", "mt-lg")}>??????</Theme>
      <div>
        {education.map(
          ({ key, schoolName, startDate, endDate, description }) => {
            return (
              <div key={key} className={cx("experience-item", "mt")}>
                <div>{schoolName}</div>
                <div className={cx("time", "mt-sm")}>
                  {formatDate(startDate)} - {formatDate(endDate)}
                </div>
                <div className={cx("description", "mt-sm")}>{description}</div>
              </div>
            );
          }
        )}
      </div>
      <Theme className={cx("section-title", "mt-lg")}>
        {general.projectHead}
      </Theme>
      <div>
        {project.map(({ key, name, startDate, endDate, description }) => {
          return (
            <div key={key} className={cx("experience-item", "mt")}>
              <div>{name}</div>
              <div className={cx("time", "mt-sm")}>
                {formatDate(startDate)} - {formatDate(endDate)}
              </div>
              <div className={cx("description", "mt-sm")}>{description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Template;

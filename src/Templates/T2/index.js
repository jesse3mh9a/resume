import classNames from "classnames/bind";
import { usePreview } from "hooks/useResume";
import createTheme from "createTheme";
import { useConfigPreview } from "hooks/useConfig";
import config from "./config";
import styles from "./index.module.css";
import bg from "./images/mountain.jpeg";

import avatarMale from "images/avatar-male.png";
import avatarFemale from "images/avatar-female.png";

const cx = classNames.bind(styles);

const Theme = createTheme(config);

const AVATAR = {
  male: avatarMale,
  female: avatarFemale,
};

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
  } = usePreview();

  const { general = {}, section: { skills = [] } = {} } =
    useConfigPreview(config);

  return (
    <div className={styles.container}>
      <div className={cx("bg")} style={{ backgroundImage: `url(${bg})` }} />
      <div className={cx("wrap")}>
        <div className={cx("content")}>
          <div className={cx("head")}>
            <div className={cx("head-center")}>
              <div
                className={cx("avatar")}
                style={{ backgroundImage: `url(${AVATAR[general.avatar]})` }}
              />
              <div className={cx("avatar-hold")} />
              <div className={cx("full-name")}>{fullName}</div>
              <Theme type="backgroundColor" className={cx("profession")}>
                {profession}
              </Theme>
            </div>
          </div>
          <div className={cx("side")}>
            <div className={cx("left")}>
              <div className={cx("title")}>关于我</div>
              <div className={cx("summary")}>{summary}</div>
              <div className={cx("title", "mt-lg")}>我的技能</div>
              <div>
                {skills.map((skill, i) => {
                  return (
                    <div key={i} className={cx("skills-item")}>
                      <div className={cx("skills-name")}>{skill.name}</div>
                      <Theme
                        type="borderColor"
                        className={cx("skills-rogress")}
                      >
                        <Theme
                          type="backgroundColor"
                          style={{
                            width: `${skill.degree}%`,
                          }}
                        />
                      </Theme>
                    </div>
                  );
                })}
              </div>
              <div className={cx("mt-lg")}>
                <Theme className={cx("info-label")}>Phone</Theme>
                <div className={cx("info")}>{phone}</div>
              </div>
              <div className={cx("mt-lg")}>
                <Theme className={cx("info-label")}>Email</Theme>
                <div className={cx("info")}>{email}</div>
              </div>

              <div className={cx("mt-lg")}>
                <Theme className={cx("info-label")}>Address</Theme>
                <div className={cx("info")}>{address}</div>
              </div>
              <div className={cx("mt-lg")}>
                <Theme className={cx("info-label")}>{general.website}</Theme>
                <div className={cx("info")}>{website}</div>
              </div>
            </div>
            <div className={cx("right")}>
              <div className={cx("title")}>工作经验</div>
              <div className={cx("list-wrap", "mt")}>
                <div className={cx("line")} />
                <div className={cx("list")}>
                  {experience.map((exp) => {
                    return (
                      <div key={exp.key} className={cx("item", "mt")}>
                        <div className={cx("item-head")}>
                          <Theme
                            type="backgroundColor"
                            className={cx("circle")}
                          />
                          <Theme className={cx("title")}>
                            {exp.companyName}
                          </Theme>
                          <div className={cx("mx-sm")}>/</div>
                          <div className={cx("mt-sm")}>{exp.jobTitle}</div>
                        </div>
                        <div className={cx("mt-sm")}>
                          {exp.startDate} 至 {exp.endDate}
                        </div>
                        <div className={cx("mt-sm")}>{exp.description}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={cx("title", "mt-lg")}>教育背景</div>
              <div className={cx("list-wrap", "mt")}>
                <div className={cx("line")} />
                <div className={cx("list")}>
                  {education.map((edu) => {
                    return (
                      <div key={edu.key} className={cx("item", "mt")}>
                        <div className={cx("item-head")}>
                          <Theme
                            type="backgroundColor"
                            className={cx("circle")}
                          />
                          <Theme className={cx("title")}>
                            {edu.schoolName}
                          </Theme>
                          <div className={cx("mx-sm")}>/</div>
                          <div className={cx("mt-sm")}>{edu.jobTitle}</div>
                        </div>
                        <div className={cx("mt-sm")}>
                          {edu.startDate} 至 {edu.endDate}
                        </div>
                        <div className={cx("mt-sm")}>{edu.description}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;

import classNames from "classnames/bind";
import { usePreview } from "hooks/useResume";
import createBox from "createBox";
import { useConfigPreview } from "hooks/useConfig";
import config from "./config";
import styles from "./index.module.css";
import bg from "./images/mountain.jpeg";

import avatarMale from "images/avatar-male.png";
import avatarFemale from "images/avatar-female.png";

const cx = classNames.bind(styles);

const Box = createBox(config);

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
              <Box typography="head">{fullName}</Box>
              <Box
                variant="backgroundColor"
                className={cx("profession")}
                px={0.5}
                py={0.3}
                mt={1}
              >
                {profession}
              </Box>
            </div>
          </div>
          <Box className={cx("side")} p={1} mt={1} spacing={1}>
            <div className={cx("left")}>
              <Box typography="title">关于我</Box>
              <Box mt={1}>{summary}</Box>
              <Box spacing={1} typography="title" mt={2}>
                我的技能
              </Box>
              <div>
                {skills.map((skill, i) => {
                  return (
                    <Box
                      key={i}
                      className={cx("skills-item")}
                      mt={1}
                      spacing={{ y: 8 }}
                    >
                      <div className={cx("skills-name")}>{skill.name}</div>
                      <Box
                        variant="borderColor"
                        className={cx("skills-rogress")}
                      >
                        <Box
                          variant="backgroundColor"
                          style={{
                            width: `${skill.degree}%`,
                          }}
                        />
                      </Box>
                    </Box>
                  );
                })}
              </div>
              <Box typography="subtitle" color="primary" mt={2}>
                Phone
              </Box>
              <div spacing={2} typography="subtitle" className={cx("info")}>
                {phone}
              </div>
              <Box spacing={2} typography="subtitle" color="primary" mt={1}>
                Email
              </Box>
              <div className={cx("info")}>{email}</div>
              <Box spacing={2} typography="subtitle" color="primary" mt={1}>
                Address
              </Box>
              <div className={cx("info")}>{address}</div>
              <Box spacing={2} typography="subtitle" color="primary" mt={1}>
                {general.website}
              </Box>
              <div className={cx("info")}>{website}</div>
            </div>
            <div className={cx("right")}>
              <Box typography="title">工作经验</Box>
              <Box className={cx("list")} mt={2}>
                {experience.map((exp, index) => {
                  return (
                    <Box
                      key={exp.key}
                      className={cx("item")}
                      mt={index === 0 ? 0 : 2}
                    >
                      <Box variant="backgroundColor" className={cx("circle")} />
                      <Box className={cx("item-content")} ml={1}>
                        <div className={cx("item-head")}>
                          <Box color="primary" typography="title">
                            {exp.companyName}
                          </Box>
                          <Box ml={1}>{exp.jobTitle}</Box>
                        </div>
                        <Box mt={0.5}>
                          {exp.startDate} 至 {exp.endDate}
                        </Box>
                        <Box mt={0.5}>{exp.description}</Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box typography="title" mt={2}>
                教育背景
              </Box>
              <div className={cx("list-wrap")}>
                <Box className={cx("list")} mt={1}>
                  {education.map((edu, index) => {
                    return (
                      <Box
                        key={edu.key}
                        className={cx("item")}
                        mt={index === 0 ? 0 : 2}
                      >
                        <Box
                          variant="backgroundColor"
                          className={cx("circle")}
                        />
                        <Box className={cx("item-content")} ml={1}>
                          <div className={cx("item-head")}>
                            <Box typography="title">{edu.schoolName}</Box>
                            <Box ml={1}>{edu.degree}</Box>
                          </div>
                          <Box mt={0.5}>
                            {edu.startDate} 至 {edu.endDate}
                          </Box>
                          <Box mt={0.5}>{edu.description}</Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Template;

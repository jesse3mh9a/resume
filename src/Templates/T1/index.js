import useResume from "hooks/useResume";
import useTheme from "hooks/useTheme";
import config from "./config";
import styles from "./index.module.css";

const Template = () => {
  const {
    personalDetails: { fullName, phone, email, profession, address, website },
  } = useResume();

  const { primary } = useTheme(config);

  return (
    <div className={styles.container}>
      <div className={styles["base-info"]}>
        <div>
          <div style={{ color: primary }}>
            <span className={styles["full-name"]}>{fullName}</span>
            <span className={styles.profession}>{profession}</span>
          </div>
          <div className={styles.list}>
            <div className={styles.item}>
              <div className={styles.label}>手机</div>
              <div className={styles.value}>{phone}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>邮箱</div>
              <div className={styles.value}>{email}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>地址</div>
              <div className={styles.value}>{address}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>Github</div>
              <div className={styles.value}>{website}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;

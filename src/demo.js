import createGenId from "utils/createGenId";

const genKey = createGenId();

const DEMO = {
  personalDetails: {
    resumeName: "Demo",
    fullName: "jesse",
    profession: "前端工程师",
    phone: "12345678901",
    address: "一个美丽的地方",
    email: "123456789@abc.com",
    website: "https://github.com/jesse3mh9a",
  },

  summary:
    "文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字",

  education: [
    {
      key: genKey(),
      schoolName: "大学",
      degree: "本科",
      startDate: "2014-05-30",
      endDate: "2018-05-30",
      description:
        "文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字",
    },
  ],
  experience: [
    {
      key: genKey(),
      jobTitle: "web前端",
      companyName: "公司公司",
      startDate: "2018-05-30",
      endDate: "2020-06-01",
      description:
        "文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字",
    },
    {
      key: genKey(),
      jobTitle: "web前端",
      companyName: "公司公司",
      startDate: "2018-05-30",
      endDate: "2020-06-01",
      description:
        "文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字",
    },
    {
      key: genKey(),
      jobTitle: "web前端",
      companyName: "公司公司",
      startDate: "2018-05-30",
      endDate: "2020-06-01",
      description:
        "文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字",
    },
    {
      key: genKey(),
      jobTitle: "web前端",
      companyName: "公司公司",
      startDate: "2018-05-30",
      endDate: "2020-06-01",
      description:
        "文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字, 文字文字",
    },
  ],
};

export default DEMO;

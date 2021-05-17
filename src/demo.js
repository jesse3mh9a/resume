import createGenId from "utils/createGenId";

const genKey = createGenId();

const DEMO = {
  personalDetails: {
    resumeName: "Demo",
    fullName: "jesse",
    profession: "",
    phone: "12345678901",
    address: "一个美丽的地方",
    email: "123456789@abc.com",
    website: "https://github.com/jesse3mh9a",
  },

  summary: "summary",

  education: [
    {
      key: genKey(),
    },
  ],
  experience: [
    {
      key: genKey(),
    },
  ],
};

export default DEMO;

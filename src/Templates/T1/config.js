const config = {
  // required
  id: 1,
  name: "",
  author: "jesse",
  tag: ["front end", "developer", "software engineer"],

  theme: {
    primary: "#4caf50",
  },

  section: {
    avatar: {
      label: "avatar",
      type: "options",
      custom: true,
      value: "male",
      options: ["male", "female"],
    },

    website: {
      label: "website",
      custom: false,
      type: "options",
      value: "github",
      options: ["website", "github"],
    },

    skills: [
      {
        name: "javascript",
      },
      {
        name: "React",
      },
      {
        name: "html",
      },
      {
        name: "css",
      },
      {
        name: "vue",
      },
      {
        name: "git",
      },
    ],
  },
};

export default config;

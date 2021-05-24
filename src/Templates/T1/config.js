const config = {
  // required
  id: 1,
  name: "",
  author: "jesse",
  tag: ["front end", "developer", "software engineer"],

  theme: {
    primary: "#4caf50",
  },

  general: {
    avatar: {
      label: "Avatar",
      name: "avatar",
      type: "options",
      custom: true,
      value: "male",
      options: ["male", "female"],
    },

    website: {
      label: "Website",
      name: "website",
      custom: false,
      type: "options",
      value: "github",
      options: ["website", "github"],
    },
  },

  section: {
    skills: {
      value: [],
      max: 10,
      type: [
        {
          label: "Name",
          name: "name",
          type: "text",
        },
      ],
    },
  },

  demo: {
    skills: [
      {
        name: "javascript",
      },
      {
        name: "react",
      },
      {
        name: "html",
      },
      {
        name: "css",
      },
    ],
  },
};

export default config;

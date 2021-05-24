const config = {
  // required
  id: 1,
  name: "",
  author: "jesse",
  tag: ["front end", "developer", "software engineer"],

  theme: {
    primary: "#4caf50",
  },

  general: [
    {
      name: "avatar",
      label: "Avatar",
      type: "options",
      custom: true,
      value: "male",
      options: ["male", "female"],
    },

    {
      name: "website",
      label: "Website",
      custom: false,
      type: "options",
      value: "github",
      options: ["website", "github"],
    },
  ],

  section: [
    {
      name: "skill",
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
  ],

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

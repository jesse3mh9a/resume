const config = {
  id: 2,
  name: "",
  author: "jesse",
  describe: "",
  tag: ["front end", "developer", "software engineer"],

  theme: {
    primary: "#2196f3",
    // secondary: "pink",
  },

  general: [
    {
      name: "avatar",
      label: "Avatar",
      control: "select",
      value: "male",
      options: ["male", "female"],
    },

    {
      name: "website",
      label: "Website",
      control: "select",
      value: "github",
      options: ["website", "github"],
    },
  ],

  section: [
    {
      name: "skills",
      label: "Skills",
      multiple: 20,
      group: [
        {
          label: "Name",
          name: "name",
          control: "text",
        },
        {
          label: "Degree",
          name: "degree",
          control: "text",
        },
      ],
    },
    {
      name: "interest",
      label: "Interest",
      group: [
        {
          label: "Name",
          name: "name",
          control: "text",
        },
        {
          label: "Time",
          name: "time",
          control: "date",
        },
      ],
    },
  ],

  demo: {
    skills: [
      {
        name: "javascript",
        degree: 90,
      },
      {
        name: "react",
        degree: 90,
      },
      {
        name: "redux",
        degree: 80,
      },
      {
        name: "git",
        degree: 70,
      },
      {
        name: "vue",
        degree: 85,
      },
      {
        name: "ant design",
        degree: 90,
      },
    ],
  },
};

export default config;

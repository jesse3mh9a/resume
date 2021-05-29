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
          value: "javascript",
        },
        {
          label: "Degree",
          name: "degree",
          control: "text",
          value: 90,
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
          value: "football",
        },
        {
          label: "Time",
          name: "time",
          control: "date",
          value: "2021-05-28",
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
        degree: 90,
      },
      {
        name: "git",
        degree: 90,
      },
      {
        name: "html",
        degree: 90,
      },
      {
        name: "css",
        degree: 90,
      },
      {
        name: "vue",
        degree: 80,
      },
      {
        name: "ant design",
        degree: 90,
      },
      {
        name: "material ui",
        degree: 90,
      },
      {
        name: "tailwindcss",
        degree: 80,
      },
    ],
  },
};

export default config;

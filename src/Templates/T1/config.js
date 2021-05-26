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
      value: [
        {
          name: "hello",
          degree: 90,
        },
        {
          name: "hi",
          degree: 80,
        },
      ],
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
      value: {
        name: "yo",
        degree: 75,
      },
      group: [
        {
          label: "Name",
          name: "name",
          control: "text",
        },
        {
          label: "time",
          name: "Time",
          control: "date",
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
        name: "redux",
      },
      {
        name: "git",
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
        name: "ant design",
      },
      {
        name: "material ui",
      },
      {
        name: "tailwindcss",
      },
    ],
  },
};

export default config;

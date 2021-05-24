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
      multiple: true,
      group: [
        {
          label: "Name",
          name: "name",
          value: "javascript",
          control: "text",
        },
        {
          label: "Degree",
          name: "degree",
          value: 90,
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
          value: "javascript",
          control: "text",
        },
        {
          label: "Degree",
          name: "degree",
          value: 90,
          control: "text",
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

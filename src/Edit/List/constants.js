export const options = {
  education: {
    group: [
      {
        name: "schoolName",
        type: "text",
      },
      {
        name: "time",
        start: "startDate",
        end: "endDate",
        type: "range",
      },
      {
        name: "description",
        type: "textarea",
      },
    ],
  },
  experience: {
    group: [
      {
        name: "companyName",
        type: "text",
      },
      {
        name: "jobTitle",
        type: "text",
      },
      {
        name: "time",
        start: "startDate",
        end: "endDate",
        type: "range",
      },
      {
        name: "description",
        type: "textarea",
      },
    ],
  },
  project: {
    group: [
      {
        name: "name",
        type: "text",
      },
      {
        name: "time",
        start: "startDate",
        end: "endDate",
        type: "range",
      },
      {
        name: "description",
        type: "textarea",
      },
    ],
  },
};

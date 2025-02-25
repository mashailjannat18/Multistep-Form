export const formSteps = [
    {
      step: 1,
      title: "Basic Information",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      fields: [
        {
          name: "fullName",
          type: "text",
          label: "Full Name",
          placeholder: "Enter your full name",
          required: true,
        },
      ],
    },
    {
      step: 2,
      title: "Basic Information",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      fields: [
        {
          name: "age",
          type: "number",
          label: "Age",
          placeholder: "Enter your age",
          required: true,
        },
      ],
    },
    {
      step: 3,
      title: "Treatment Info",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      fields: [
        {
          name: "country",
          type: "select",
          label: "Country of Residence",
          placeholder: "Select your country",
          required: true,
          options: [
            "United States",
            "Canada",
            "United Kingdom",
            "Australia",
            "Germany",
            "India",
            "Other",
          ],
        },
      ],
    },
  ];
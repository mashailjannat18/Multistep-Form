import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const updateFormData = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const clearFormData = () => {
    setFormData({});
    setSubmissionStatus(null);
  };

  const handleFormSubmission = async () => {
    try {
      console.log("Submitting Form Data:", formData);
      setSubmissionStatus("success");
      alert("Form submitted successfully!");
      clearFormData();
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmissionStatus("error");
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        handleFormSubmission,
        submissionStatus,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
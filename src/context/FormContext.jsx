import { createContext, useContext, useState, useEffect } from "react";
import { formSteps } from "../config/formConfig";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Load form data and step from URL on initial render
  useEffect(() => {
    const loadStateFromUrl = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const data = {};
      let currentStep = 1;

      queryParams.forEach((value, key) => {
        if (key === "step") {
          currentStep = parseInt(value, 10) || 1;
        } else {
          data[key] = value;
        }
      });

      setStep(currentStep);
      setFormData(data);
    };

    loadStateFromUrl();
  }, []);

  // Update URL when step or form data changes
  const updateUrl = (newStep, newFormData) => {
    const queryParams = new URLSearchParams();
    Object.entries(newFormData).forEach(([key, value]) => {
      if (value) queryParams.set(key, value);
    });
    queryParams.set("step", newStep);

    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({ step: newStep, formData: newFormData }, "", newUrl);
  };

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state) {
        const { step: historyStep, formData: historyFormData } = event.state;
        setStep(historyStep);
        setFormData(historyFormData || {});
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const updateFormData = (data) => {
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);
    updateUrl(step, newFormData); // Update URL with new form data
  };

  const nextStep = () => {
    if (step < formSteps.length) {
      const newStep = step + 1;
      setStep(newStep);
      updateUrl(newStep, formData);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      const newStep = step - 1;
      setStep(newStep);
      updateUrl(newStep, formData);
    }
  };

  const clearFormData = () => {
    setFormData({});
    setStep(1);
    setSubmissionStatus(null);
    window.history.replaceState(null, "", window.location.pathname);
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
        step,
        formData,
        updateFormData,
        nextStep,
        prevStep,
        clearFormData,
        handleFormSubmission,
        submissionStatus,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
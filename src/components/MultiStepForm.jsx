import { useForm } from "../context/FormContext";
import { formSteps } from "../config/formConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const MultiStepForm = () => {
  const {
    step,
    formData,
    updateFormData,
    nextStep,
    handleFormSubmission,
    submissionStatus,
  } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      step < formSteps.length ? nextStep() : handleFormSubmission();
    }
  };

  const currentStepConfig = formSteps.find((s) => s.step === step);
  const progressPercentage = ((step - 1) / (formSteps.length - 1)) * 100;

  return (
    <div>
      <div className="w-[568.198px] mt-[-65px] relative">
        <div className="mb-8">
          <div className="w-full rounded-full h-[12px] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progressPercentage}%`,
                background:
                  "linear-gradient(90deg, rgba(1, 121, 111, 0.4) 46.61%, #01796F 100%)",
              }}
            />
          </div>
        </div>

        <div
          className="absolute h-[20px] w-[29px] ml-[12px] top-[-23px] text-[10px] font-medium flex justify-center items-center rounded-[4px]"
          style={{
            left: `calc(${progressPercentage}%)`,
            transform: "translateX(-50%)",
            backgroundColor: "#ebf2f3",
            color: "#01796f",
            borderColor: "#b0d3d2",
            borderWidth: "1px",
          }}
        >
          {progressPercentage.toFixed(0)}%
        </div>
      </div>

      <p className="text-[24px] font-bold">{currentStepConfig.title}</p>
      <p className="text-base text-gray-600 mb-6 w-[374px]">
        {currentStepConfig.subtitle}
      </p>

      {submissionStatus === "error" && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          Submission failed. Please try again.
        </div>
      )}

      <form onKeyPress={handleKeyPress}>
        {currentStepConfig.fields.map((field) => (
          <div key={field.name} className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            {field.type === "select" ? (
              <div className="relative">
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-[568.2px] h-[56px] bg-white p-2 border border-[#E5E5E7] rounded-[10px] focus:border-[#E5E5E7] focus:outline-none appearance-none bg-no-repeat bg-[right_12px_center] bg-[length:16px]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2301796F"><path d="M7 10l5 5 5-5z"/></svg>'
                    )}")`,
                  }}
                  required={field.required}
                >
                  <option value="" disabled className="text-[#E5E5E7]">
                    {field.placeholder}
                  </option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-[568.2px] h-[56px] bg-white p-2 border border-[#E5E5E7] rounded-[10px] placeholder:text-[#8A8A8A] focus:border-[#E5E5E7] focus:outline-none"
                required={field.required}
              />
            )}
          </div>
        ))}

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={step < formSteps.length ? nextStep : handleFormSubmission}
            className="px-6 py-2 bg-[#01796F] text-white rounded-[16px] w-full flex items-center justify-center gap-2 hover:bg-[#00514a] transition-all duration-200"
          >
            {step < formSteps.length ? (
              <>
                Continue
                <FontAwesomeIcon icon={faArrowRight} className="mt-[4px]" />
              </>
            ) : (
              "Complete Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
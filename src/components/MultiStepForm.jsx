import { useForm } from "../context/FormContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const MultiStepForm = () => {
  const {
    formData,
    updateFormData,
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
      handleFormSubmission();
    }
  };

  const currentStepConfig = {
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
  };

  return (
    <div>
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
            ) : field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-[568.2px] h-[100px] bg-white p-2 border border-[#E5E5E7] rounded-[10px] placeholder:text-[#8A8A8A] focus:border-[#E5E5E7] focus:outline-none"
                required={field.required}
              />
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
            onClick={handleFormSubmission}
            className="px-6 py-2 bg-[#01796F] text-white rounded-[16px] w-full flex items-center justify-center gap-2 hover:bg-[#00514a] transition-all duration-200"
          >
            Submit
            <FontAwesomeIcon icon={faArrowRight} className="mt-[4px]" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
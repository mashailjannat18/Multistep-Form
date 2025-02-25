import { FormProvider } from "./context/FormContext";
import MultiStepForm from "./components/MultiStepForm";
import Header from "./components/Header";

function App() {
  return (
    <FormProvider>
      <div className="bg-[#F8F9FA]">
        <Header />

        <div className="min-h-screen min-w-screen flex items-center justify-center mt-[-10px] pt-32">
          <MultiStepForm />
        </div>
      </div>
    </FormProvider>
  );
}

export default App;
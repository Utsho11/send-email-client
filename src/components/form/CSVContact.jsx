import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Upload, Check, File, Loader, X, ArrowLeft } from "lucide-react";
import { Modal, Steps } from "antd";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";

const CSVContact = () => {
  const { id } = useParams();
  const methods = useForm({ defaultValues: { listId: id, file: null } });
  const { handleSubmit, setValue, reset } = methods;
  const [fileName, setFileName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "text/csv") {
      setFileName(file.name);
      setValue("file", file);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const onSubmit = async (data) => {
    if (!data.file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("listId", data.listId);
    formData.append("file", data.file);

    setIsModalOpen(true); // Open modal
    setCurrentStep(0); // Reset steps

    try {
      setTimeout(() => setCurrentStep(1), 1000); // Simulate uploading

      await axios.post(
        "https://email-sender-server-gamma.vercel.app/upload-csv",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setTimeout(() => setCurrentStep(2), 2000); // Simulate processing
      setTimeout(() => {
        setCurrentStep(3);
        setTimeout(() => setIsModalOpen(false), 2000);
      }, 3000);
      setTimeout(() => navigate("/dashboard"), 4000);
      reset();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setCurrentStep(4);
    }
  };

  return (
    <div className="p-6 w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg my-8">
      <div className="mb-8">
        <Link
          to="/dashboard/add-contact"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Previous
        </Link>
      </div>
      <h2 className="text-xl font-bold mb-4">Import Contacts via CSV</h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* File Upload */}
          <div>
            <label className="font-semibold">Upload CSV File</label>
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
              id="csv-upload"
            />
            <label
              htmlFor="csv-upload"
              className="border-dashed border-2 border-gray-400 rounded-md p-4 text-center cursor-pointer flex flex-col items-center mt-2"
            >
              <Upload className="w-6 h-6 text-gray-600" />
              <span className="mt-2 text-gray-600">
                {fileName ? (
                  <>
                    <File className="inline-block w-4 h-4 mr-2" />
                    {fileName}
                  </>
                ) : (
                  "Click to upload CSV"
                )}
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
          >
            Submit <Check className="w-4 h-4 ml-2" />
          </button>
        </form>
      </FormProvider>

      {/* Modal for Processing */}
      <Modal
        title="Processing CSV File"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <Steps current={currentStep} size="small" direction="vertical">
          <Steps.Step
            status={currentStep >= 0 ? "process" : "wait"}
            title="Uploading CSV"
            icon={
              currentStep === 0 && <Loader className="animate-spin w-5 h-5" />
            }
          />
          <Steps.Step
            status={currentStep >= 1 ? "process" : "wait"}
            title="Reading & Validating Data"
            icon={
              currentStep === 1 && <Loader className="animate-spin w-5 h-5" />
            }
          />
          <Steps.Step
            status={currentStep >= 2 ? "process" : "wait"}
            title="Processing Records"
            icon={
              currentStep === 2 && <Loader className="animate-spin w-5 h-5" />
            }
          />
          <Steps.Step
            status={currentStep === 3 ? "finish" : "wait"}
            title="Completed Successfully"
            icon={
              currentStep === 3 && <Check className="w-5 h-5 text-green-600" />
            }
          />
          <Steps.Step
            status={currentStep === 4 ? "error" : "wait"}
            title="Error Occurred"
            icon={currentStep === 4 && <X className="w-5 h-5 text-red-600" />}
          />
        </Steps>
      </Modal>
    </div>
  );
};

export default CSVContact;

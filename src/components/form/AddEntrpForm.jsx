import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import companyCategories from "/src/data/companyType";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";

const MultiStepEntrepreneurForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://email-sender-server-gamma.vercel.app/clients",
        data
      );
      if (response.data.id) {
        Swal.fire({
          title: "Client Added Successfully",
          icon: "success",
          confirmButtonText: "Close",
        });
      }
      reset();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to add client");
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const steps = ["Personal", "Business", "Financial", "Review"];
  return (
    <div className="">
      <div className="m-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Previous
        </Link>
      </div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-gray-100 rounded-l-2xl p-8 hidden md:flex items-center justify-center">
            <div className="text-center space-y-6 max-w-md">
              <div className="w-full h-64 bg-blue-50 rounded-xl mb-6 flex items-center justify-center">
                <span className="text-gray-400 text-lg">
                  <img src="/form.jpg" alt="" />
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Empower Your Business Growth
              </h2>
              <p className="text-gray-600 text-lg">
                Join our network of successful entrepreneurs and take your
                business to the next level with our expert support system.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8">
            {/* Step Indicator */}
            <div className="relative mb-8">
              {/* Step Circles */}
              <div className="flex justify-between relative">
                {steps.map((label, index) => {
                  const stepNumber = index + 1;
                  return (
                    <div
                      key={stepNumber}
                      className="relative flex flex-col items-center w-1/4"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors duration-300
                ${
                  step >= stepNumber
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                      >
                        {step > stepNumber ? (
                          <CheckCircle size={20} className="text-white" />
                        ) : (
                          stepNumber
                        )}
                      </div>
                      <span
                        className={`mt-2 text-sm font-medium ${
                          step === stepNumber
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 z-[-1]">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{
                    width: `${((step - 1) / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        className="w-full py-2 border-b focus:border-b-blue-500 outline-none"
                      />
                      {errors.firstName && (
                        <span className="text-red-500 text-sm">
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        className="w-full py-2 border-b focus:border-b-blue-500 outline-none"
                      />
                      {errors.lastName && (
                        <span className="text-red-500 text-sm">
                          {errors.lastName.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        type="email"
                        className="w-full py-2 border-b focus:border-b-blue-500 outline-none"
                      />
                      {errors.email && (
                        <span className="text-red-500 text-sm">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        className="w-full py-2 border-b focus:border-b-blue-500 outline-none"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        {...register("address")}
                        type="tel"
                        className="w-full py-2 border-b focus:border-b-blue-500 outline-none"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Business Information */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Business Information
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        {...register("companyName", {
                          required: "Company name is required",
                        })}
                        className="w-full py-2 border-b focus:border-b-blue-500 outline-none"
                      />
                      {errors.companyName && (
                        <span className="text-red-500 text-sm">
                          {errors.companyName.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Industry
                      </label>
                      <select
                        {...register("industry", {
                          required: "Industry selection is required",
                        })}
                        className="w-full px-2 py-2 border rounded-b-lg"
                      >
                        <option value="">Select Industry</option>
                        {companyCategories.map((category) => (
                          <optgroup key={category.label} label={category.label}>
                            {category.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      {errors.industry && (
                        <span className="text-red-500 text-sm">
                          {errors.industry.message}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Position
                        </label>
                        <input
                          {...register("position")}
                          className="w-full py-2 border-b focus:border-b-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website
                        </label>
                        <input
                          {...register("website")}
                          type="url"
                          className="w-full py-2 border-b focus:border-b-blue-500 outline-none"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                    <div className="pt-6 mt-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Company Location
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <input
                            {...register("state", {
                              required: "State is required",
                            })}
                            className="w-full py-2 border-b focus:border-b-blue-500 outline-none"
                          />
                          {errors.state && (
                            <span className="text-red-500 text-sm">
                              {errors.state.message}
                            </span>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            {...register("city", {
                              required: "City is required",
                            })}
                            className="w-full py-2 border-b focus:border-b-blue-500 outline-none"
                          />
                          {errors.city && (
                            <span className="text-red-500 text-sm">
                              {errors.city.message}
                            </span>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Postal Code
                          </label>
                          <input
                            {...register("postalCode", {
                              required: "Postal code is required",
                            })}
                            className="w-full py-2 border-b focus:border-b-blue-500 outline-none"
                          />
                          {errors.postalCode && (
                            <span className="text-red-500 text-sm">
                              {errors.postalCode.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="font-semibold text-lg text-gray-700 mb-1">
                        Company Description
                      </label>
                      <textarea
                        {...register("companyDescription")}
                        className="w-full px-2 py-2 border rounded-lg focus:border-blue-500 outline-none h-32"
                        placeholder="Briefly describe your company..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Financial Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Financial Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total Investment ($)
                      </label>
                      <input
                        {...register("investment", {
                          required: "Investment amount is required",
                        })}
                        type="number"
                        className="w-full py-2 border-b focus:border-b-blue-500 outline-none"
                      />
                      {errors.investment && (
                        <span className="text-red-500 text-sm">
                          {errors.investment.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Annual Revenue ($)
                      </label>
                      <input
                        {...register("revenue")}
                        type="number"
                        className="w-full py-2 border-b focus:border-b-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Funding Stage
                      </label>
                      <select
                        {...register("fundingStage")}
                        className="w-full px-2 py-2 border focus:border-blue-500 rounded-lg"
                      >
                        <option value="">Select Funding Stage</option>
                        <option value="Seed">Seed</option>
                        <option value="Series A">Series A</option>
                        <option value="Series B">Series B</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Employees
                      </label>
                      <input
                        {...register("employees")}
                        type="number"
                        className="w-full py-2 border-b focus:border-b-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Review & Submit
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Personal Info Review */}
                      <div className="space-y-4">
                        <div className="border-b pb-2">
                          <dt className="text-sm font-medium text-gray-500">
                            First Name
                          </dt>
                          <dd className="mt-1 text-gray-900">
                            {watch("firstName")}
                          </dd>
                        </div>
                        <div className="border-b pb-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Last Name
                          </dt>
                          <dd className="mt-1 text-gray-900">
                            {watch("lastName")}
                          </dd>
                        </div>
                        <div className="border-b pb-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Email
                          </dt>
                          <dd className="mt-1 text-gray-900">
                            {watch("email")}
                          </dd>
                        </div>
                        <div className="border-b pb-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Phone
                          </dt>
                          <dd className="mt-1 text-gray-900">
                            {watch("phone") || "N/A"}
                          </dd>
                        </div>
                      </div>

                      {/* Business Info Review */}
                      <div className="space-y-4">
                        <div className="border-b pb-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Company Name
                          </dt>
                          <dd className="mt-1 text-gray-900">
                            {watch("companyName")}
                          </dd>
                        </div>
                        <div className="border-b pb-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Industry
                          </dt>
                          <dd className="mt-1 text-gray-900">
                            {watch("industry")}
                          </dd>
                        </div>
                        <div className="border-b pb-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Location
                          </dt>
                          <dd className="mt-1 text-gray-900">
                            {watch("city")}, {watch("state")}{" "}
                            {watch("postalCode")}
                          </dd>
                        </div>
                        <div className="border-b pb-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Employees
                          </dt>
                          <dd className="mt-1 text-gray-900">
                            {watch("employees") || "N/A"}
                          </dd>
                        </div>
                      </div>

                      {/* Financial Info Review */}
                      <div className="col-span-full pt-4 space-y-4">
                        <div className="border-b pb-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Total Investment
                          </dt>
                          <dd className="mt-1 text-gray-900">
                            ${watch("investment")?.toLocaleString() || "N/A"}
                          </dd>
                        </div>
                        <div className="border-b pb-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Annual Revenue
                          </dt>
                          <dd className="mt-1 text-gray-900">
                            ${watch("revenue")?.toLocaleString() || "N/A"}
                          </dd>
                        </div>
                        <div className="border-b pb-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Funding Stage
                          </dt>
                          <dd className="mt-1 text-gray-900">
                            {watch("fundingStage") || "N/A"}
                          </dd>
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                  >
                    <ArrowLeft size={18} className="mr-2" /> Previous
                  </button>
                )}

                {step < 4 ? (
                  <div
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center cursor-pointer"
                  >
                    Next <ArrowRight size={18} className="ml-2" />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepEntrepreneurForm;

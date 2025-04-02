import { Form, Input, Button, Modal } from "antd";
import { Mail, LayoutTemplate } from "lucide-react";
import { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setCampaignId } from "../../store/store";
import TemplatePreview from "../module/TemplatePreview";

const EmailTemplateOptions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const campaignState = useSelector((state) => state.campaign);
  const { templateId } = campaignState;

  const [form] = Form.useForm(); // Initialize form instance

  const campaigns = [
    {
      title: "Basic Templates Editor",
      description:
        "Simple, customizable templates for daily communications, personal correspondence, and general business messaging",
      icon: <Mail className="w-8 h-8 text-teal-600" />,
      bgColor: "bg-teal-100",
      borderColor: "hover:border-teal-500",
      buttonBg: "bg-teal-600",
      buttonHoverBg: "hover:bg-teal-700",
      textColor: "text-white",
      path: "email-template-editor",
    },
    {
      title: "Pre-Designed Templates",
      description:
        "Professionally crafted templates for special offers, product launches, and seasonal promotions",
      icon: <LayoutTemplate className="w-8 h-8 text-blue-600" />,
      bgColor: "bg-blue-100",
      borderColor: "hover:border-blue-500",
      buttonBg: "bg-blue-600",
      buttonHoverBg: "hover:bg-blue-700",
      textColor: "text-white",
      path: "pre-designed-template",
    },
  ];

  // Toggle modal visibility
  const toggleModal = (open) => {
    setIsModalOpen(open);
  };

  // Handle form submission
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "https://send-email-server-wdia.onrender.com/campaign",
        values
      );
      console.log("Campaign created:", response.data);

      const campaignId = response.data.id;
      if (!campaignId) {
        throw new Error("No campaignId returned from API");
      }

      dispatch(setCampaignId(campaignId)); // Store campaignId in Redux

      toggleModal(false); // Close the modal

      Swal.fire({
        title: "Campaign Created Successfully",
        icon: "success",
        confirmButtonText: "Close",
      });

      // Navigate based on whether a templateId exists
      if (templateId) {
        navigate(`/${campaignId}/template-editor`);
      } else {
        navigate(`/dashboard/${campaignId}/email-form`);
      }
    } catch (error) {
      console.error(
        "Error creating campaign:",
        error.response?.data || error.message
      );
      form.setFields([
        {
          name: "campaignName",
          errors: [error.response?.data?.error || "Failed to create campaign"],
        },
      ]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Choose Your Template Type
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <div
            key={campaign.title}
            className={`group flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 ${campaign.borderColor} transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 relative min-h-[250px]`}
          >
            <div className={`p-3 ${campaign.bgColor} rounded-full mb-4`}>
              {campaign.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {campaign.title}
            </h3>
            <p className="text-gray-600 text-center mb-4 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
              {campaign.description}
            </p>
            <Button
              onClick={() => toggleModal(true)}
              className={`absolute bottom-6 ${campaign.buttonBg} ${campaign.buttonHoverBg} ${campaign.textColor} font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}
              type="primary"
            >
              Create New
            </Button>
          </div>
        ))}
      </div>

      <Modal
        title="Create Campaign"
        open={isModalOpen}
        onOk={() => toggleModal(false)}
        onCancel={() => toggleModal(false)}
        footer={false}
        closable={true}
        className="w-full max-w-md mx-auto"
      >
        <Form
          form={form}
          name="create_campaign"
          onFinish={onFinish}
          layout="vertical"
          className="space-y-6"
        >
          <Form.Item
            name="campaignName"
            label="Campaign Name *"
            rules={[
              { required: true, message: "Please enter a campaign name!" },
            ]}
            className="mb-4"
          >
            <Input
              placeholder="Enter campaign name"
              variant="underlined"
              className="w-full border-gray-300 rounded-md focus:border-gray-400 focus:ring-0"
            />
          </Form.Item>

          <div className="mb-6 text-blue-500 flex items-center gap-1">
            <InfoCircleOutlined />
            <span>
              Categorize your contacts under different topics to send them the
              right emails.{" "}
              <a href="#" className="underline">
                Learn More
              </a>
            </span>
          </div>

          <Form.Item className="text-right">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full px-6 py-2"
            >
              Save and Proceed
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Assuming TemplatePreview is a component that needs handleCreateClick */}
      <div>
        <TemplatePreview toggleModal={toggleModal} />
      </div>
    </div>
  );
};

export default EmailTemplateOptions;

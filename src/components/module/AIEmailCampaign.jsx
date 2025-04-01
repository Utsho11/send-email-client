import { useState } from "react";
import { Form, Input, Button, Card, Row, Col } from "antd";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { RobotOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setContent, setSubject } from "../../store/store";
import { useNavigate, useParams } from "react-router";

const { TextArea } = Input;

// Initialize GoogleGenerativeAI with API key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const AIEmailCampaign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { campaignId } = useParams();
  const [output, setOutput] = useState({
    subject: "",
    overview: "",
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (output?.overview) {
      navigator.clipboard.writeText(output.overview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    }
  };

  const generateEmailContent = async (values) => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Using gemini-pro as gemini-2.0-flash isn't available yet

      const prompt = `
        Generate an email campaign based on:
        Subject: ${values.subject}
        Overview: ${values.overview}
        Return the response in JSON format with "subject" and "overview" fields.
      `;

      const result = await model.generateContent(prompt);
      const response = result.response.candidates[0].content.parts[0].text;

      // Extract valid JSON from the response text
      const jsonText = response.replace(/```json\n|\n```/g, "").trim();
      const generatedData = JSON.parse(jsonText);

      //   console.log(generatedData);

      setOutput({
        subject: generatedData.subject,
        overview: generatedData.overview,
      });
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setOutput({
        subject: "Error generating subject",
        overview: "Error generating overview",
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    generateEmailContent(values);
  };

  const handleConfirm = () => {
    dispatch(setSubject(output.subject));
    dispatch(setContent({ html: output.overview }));
    navigate(`/dashboard/${campaignId}/email-form`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Card
        title={
          <h2 className="text-2xl font-bold">
            <RobotOutlined /> AI Email Campaign Generator
          </h2>
        }
        className="shadow-lg"
      >
        <Row gutter={[24, 24]}>
          {/* Input Column */}
          <Col xs={24} md={12}>
            <div className="bg-gray-50 p-4 rounded-lg h-full">
              <h3 className="text-lg font-semibold mb-4">Input Details</h3>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
              >
                <Form.Item
                  name="subject"
                  label="Email Subject"
                  rules={[
                    { required: true, message: "Please enter email subject" },
                  ]}
                >
                  <Input
                    variant="underlined"
                    placeholder="Enter email subject"
                    className="w-full"
                  />
                </Form.Item>

                <Form.Item
                  name="overview"
                  label="Email Overview"
                  rules={[
                    { required: true, message: "Please enter email overview" },
                  ]}
                >
                  <TextArea
                    rows={6}
                    variant="underlined"
                    placeholder="Enter email overview"
                    className="w-full"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    loading={loading}
                  >
                    Generate Email
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>

          {/* Output Column */}
          <Col xs={24} md={12}>
            <div className="bg-gray-50 p-4 rounded-lg border border-blue-200 h-full">
              <div className="space-y-4">
                <div className="p-3 bg-white rounded min-h-[40px]">
                  <h3 className="text-lg font-semibold mb-4">
                    Generated Subject
                  </h3>
                  {output.subject || "Generated subject will appear here"}
                </div>
                <div className="p-4 bg-white rounded max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                  {/* Copy Button Positioned Above Content */}
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Generated Content</h3>
                    <button
                      onClick={handleCopy}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 text-sm rounded transition"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  {/* Overview Text */}
                  <div>
                    {output?.overview || "Generated overview will appear here"}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleConfirm}
            className="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px"></span>

            <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"></span>

            <div className="relative flex items-center justify-between py-3 px-6 text-lg text-white rounded-lg transform -translate-y-1 bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#0f172a] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110">
              <span className="select-none">Go to next step</span>

              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 ml-2 -mr-1 transition duration-250 group-hover:translate-x-1"
              >
                <path
                  clipRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AIEmailCampaign;

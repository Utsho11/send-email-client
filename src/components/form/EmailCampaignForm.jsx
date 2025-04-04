import { useDispatch, useSelector } from "react-redux";
import { Button, Card, message, Tag } from "antd";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { resetCampaign, updateField } from "../../store/store";
import { Edit, PlusCircle } from "lucide-react";
import { fetchData } from "../../utils/fetchData";
import SubjectModal from "../modal/SubjectModal";
import SenderModal from "../modal/SenderModal";
import RecipientsModal from "../modal/RecipientsModal";
import axios from "axios";
import Swal from "sweetalert2";
import { EditOutlined } from "@ant-design/icons";

const EmailCampaignForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const [clients, setClients] = useState([]);
  const [contactLists, setContactLists] = useState([]);
  const [topic, setTopic] = useState(null);
  const [type, setType] = useState(null);
  const { subject, sender, recipients, content } = useSelector(
    (state) => state.campaign
  );
  const [modalField, setModalField] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLists, setSelectedLists] = useState([]);
  const [filterOption, setFilterOption] = useState("My Lists");

  const openModal = (field) => {
    console.log("Opening modal for field:", field);
    setModalField(field);
    setModalVisible(true);
    setSearchTerm(field === "sender" ? sender || "" : "");
    if (field === "recipients") {
      setSelectedLists(recipients ? recipients.split(",") : []);
    }
  };

  const closeModal = () => {
    // console.log("Closing modal");
    setModalField(null);
    setModalVisible(false);
    setSearchTerm("");
    setSelectedLists([]);
  };

  useEffect(() => {
    const loadCampaigns = async () => {
      if (!campaignId) return;

      const result = await fetchData(
        `https://email-sender-server-gamma.vercel.app/campaign/${campaignId}`
      );
      if (result.error) {
        console.error("Failed to fetch campaigns:", result.error);
        message.error("Failed to load campaign data");
      } else {
        setTopic(result.data.topic);
        setType(result.data.type);
      }
    };

    loadCampaigns();
  }, [type, campaignId]);

  // console.log(type);

  useEffect(() => {
    const loadClients = async () => {
      const result = await fetchData(
        `https://email-sender-server-gamma.vercel.app/clients`
      );
      if (result.error) {
        console.error("Failed to fetch clients:", result.error);
        message.error("Failed to load clients");
      } else {
        // console.log("Clients fetched:", result.data);
        setClients(result.data || []);
      }
    };

    loadClients();
  }, []);

  useEffect(() => {
    fetchInvestorLists();
  }, []);

  const fetchInvestorLists = async () => {
    const { data, error } = await fetchData(
      "https://email-sender-server-gamma.vercel.app/contact-lists"
    );

    // console.log(data.data);

    if (error) {
      message.error(error);
      setContactLists([]);
    } else {
      setContactLists(Array.isArray(data.data) ? data.data : []);
    }
  };

  // console.log(contactLists);

  const handleSave = (value) => {
    if (!modalField) {
      console.warn("No field specified for update.");
      return;
    }

    // Get the current campaign state from the store if needed (optional)
    const validFields = ["subject", "sender", "recipients", "content"];

    if (!validFields.includes(modalField)) {
      console.warn(
        `Invalid field: ${modalField} does not exist in campaign state.`
      );
      return;
    }

    // console.log("Saving value:", value, "for field:", modalField);
    dispatch(updateField({ field: modalField, value }));
    closeModal();
  };

  const handleSendEmail = async () => {
    const emailData = {
      topic: topic || "",
      subject: subject || "No Subject",
      sender: sender || "No Sender",
      recipients: recipients || "No Recipients",
      content: content || "No Content",
      campaignId: campaignId || "No Campaign ID",
    };

    try {
      await axios.post(
        "https://email-sender-server-gamma.vercel.app/send-email",
        emailData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        title: "Email Sent Successfully",
        icon: "success",
        confirmButtonText: "Close",
      });

      navigate("/dashboard/allCampaign");
      dispatch(resetCampaign());
    } catch (error) {
      console.error(
        "Failed to send email:",
        error.response?.data || error.message
      );
      message.error("Failed to send email");
    }
  };

  const handleCreateContent = () => {
    console.log(type);

    if (type === "regular" || type === "ai" || type === "followUp") {
      navigate(`/${campaignId}/text-editor`);
    } else {
      navigate(`/${campaignId}/template-editor`);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log(recipients);

  return (
    <div
      style={{
        padding: "32px",
        background: "#f0f2f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card className="w-full max-w-[1080px] rounded-xl shadow-lg p-6 mx-auto">
        {/* Subject Section */}
        <div className="grid grid-cols-12 border-b border-gray-200 py-4 mb-4 gap-4">
          <div className="col-span-12 sm:col-span-3 font-semibold text-lg text-gray-400">
            SUBJECT
          </div>
          {subject && (
            <div className="col-span-12 sm:col-span-3">{subject}</div>
          )}
          <div
            className={`col-span-12 ${
              subject ? "sm:col-span-6 flex justify-end" : "sm:col-span-9"
            }`}
          >
            {subject ? (
              <Button
                variant="outlined"
                color="blue"
                icon={<Edit size={16} />}
                onClick={() => openModal("subject")}
                className="w-full sm:w-auto"
              >
                Edit Subject
              </Button>
            ) : (
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base">
                  Give a suitable subject line to this campaign.
                </h3>
                <Button
                  type="default"
                  variant="outlined"
                  color="blue"
                  onClick={() => openModal("subject")}
                  className="w-full sm:w-auto"
                >
                  ADD SUBJECT
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Sender Section */}
        <div className="grid grid-cols-12 border-b border-gray-200 py-4 mb-4 gap-4">
          <div className="col-span-12 sm:col-span-3 font-semibold text-lg text-gray-400">
            SENDER
          </div>
          {sender && <div className="col-span-12 sm:col-span-3">{sender}</div>}
          <div
            className={`col-span-12 ${
              sender ? "sm:col-span-6 flex justify-end" : "sm:col-span-9"
            }`}
          >
            {sender ? (
              <Button
                variant="outlined"
                color="blue"
                icon={<Edit size={16} />}
                onClick={() => openModal("sender")}
                className="w-full sm:w-auto"
              >
                Edit Sender
              </Button>
            ) : (
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base">
                  Who is sending this email campaign?
                </h3>
                <Button
                  type="primary"
                  onClick={() => openModal("sender")}
                  icon={<PlusCircle size={16} />}
                  className="w-full sm:w-auto"
                >
                  ADD SENDER
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Recipients Section */}
        <div className="grid grid-cols-12 border-b border-gray-200 py-4 mb-4 gap-4">
          <div className="col-span-12 sm:col-span-3 font-semibold text-lg text-gray-400">
            RECIPIENTS
          </div>
          {recipients && (
            <div className="col-span-12 sm:col-span-9">
              {recipients.length > 0 ? (
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {contactLists
                      .filter((contact) => recipients.includes(contact.id))
                      .map((contact) => (
                        <Tag key={contact.id}>{contact.listName}</Tag>
                      ))}
                  </div>
                  <Button
                    variant="outlined"
                    color="blue"
                    icon={<Edit size={16} />}
                    onClick={() => openModal("recipients")}
                    className="w-full sm:w-auto"
                  >
                    Edit Recipients
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base">
                    Select recipients from your created contact list.
                  </h3>
                  <Button
                    type="primary"
                    onClick={() => openModal("recipients")}
                    icon={<PlusCircle size={16} />}
                    className="w-full sm:w-auto"
                  >
                    ADD RECIPIENTS
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-12 border-b border-gray-200 py-4 mb-4 gap-4">
          <div className="col-span-12 sm:col-span-3">
            <h3 className="font-semibold text-lg text-gray-400">CONTENT</h3>
          </div>
          <div className="col-span-12 sm:col-span-9 w-full">
            {content?.html ? (
              <div className="w-full min-h-[400px] border border-gray-300 rounded-md bg-white overflow-hidden">
                <iframe
                  srcDoc={content.html}
                  title="Email Preview"
                  className="w-full min-h-[400px] border-none"
                  sandbox="allow-same-origin"
                />
                <div className="m-4 text-end">
                  <Button
                    type="default"
                    variant="outlined"
                    color="blue"
                    onClick={handleCreateContent}
                    icon={<EditOutlined size={16} />}
                    className="w-full sm:w-auto"
                  >
                    Edit Content
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full min-h-[200px] sm:min-h-[400px] border border-gray-300 rounded-md bg-white flex flex-col items-center justify-center space-y-5 cursor-pointer">
                <img
                  src="/Create content.png"
                  alt="content"
                  className="w-[100px] sm:w-[130px]"
                />
                <h4 className="text-sm sm:text-base">
                  Create the content of your campaign.
                </h4>
                <Button
                  type="primary"
                  onClick={handleCreateContent}
                  icon={<PlusCircle size={16} />}
                  className="w-full sm:w-auto"
                >
                  Create Content
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Send Button */}
        <div className="flex justify-end">
          <button
            className="relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[1px] focus:outline-none w-full sm:w-auto"
            onClick={handleSendEmail}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-white px-7 text-sm font-medium shadow-lg border border-gray-300 backdrop-blur-3xl gap-2 text-blue-500">
              Send Now
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"></path>
              </svg>
            </span>
          </button>
        </div>
      </Card>

      {/* Subject Modal */}
      <SubjectModal
        visible={modalVisible && modalField === "subject"}
        onSave={handleSave}
        onCancel={closeModal}
        defaultValue={subject}
      />

      {/* Sender Modal */}
      <SenderModal
        visible={modalVisible && modalField === "sender"}
        onSave={handleSave}
        onCancel={closeModal}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredClients={filteredClients}
      />

      {/* Recipients Modal */}
      <RecipientsModal
        visible={modalVisible && modalField === "recipients"}
        onSave={handleSave}
        onCancel={closeModal}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLists={selectedLists}
        setSelectedLists={setSelectedLists}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        contactLists={contactLists}
      />
    </div>
  );
};

export default EmailCampaignForm;

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
    console.log("Closing modal");
    setModalField(null);
    setModalVisible(false);
    setSearchTerm("");
    setSelectedLists([]);
  };

  useEffect(() => {
    const loadCampaigns = async () => {
      if (!campaignId) return;

      const result = await fetchData(
        `https://send-email-server-wdia.onrender.com/campaign/${campaignId}`
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
  }, [campaignId]);

  // console.log(type);

  useEffect(() => {
    const loadClients = async () => {
      const result = await fetchData(
        `https://send-email-server-wdia.onrender.com/clients`
      );
      if (result.error) {
        console.error("Failed to fetch clients:", result.error);
        message.error("Failed to load clients");
      } else {
        console.log("Clients fetched:", result.data);
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
      "https://send-email-server-wdia.onrender.com/contact-lists"
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

    console.log("Saving value:", value, "for field:", modalField);
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
        "https://send-email-server-wdia.onrender.com/send-email",
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
    if (type === "regular" || type === "ai" || type === "followUp") {
      navigate(`/${campaignId}/text-editor`);
    } else {
      navigate(`/${campaignId}/template-editor`);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(recipients);

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
      <Card
        style={{
          maxWidth: "1080px",
          width: "100%",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "24px",
        }}
      >
        <div className="grid grid-cols-12 border-b border-b-gray-200 py-4 mb-4">
          <div className="col-span-3 font-semibold text-lg text-gray-400">
            SUBJECT
          </div>
          {subject && <div className="col-span-3">{subject}</div>}
          <div
            className={`${
              subject ? "col-span-6 space-y-5 flex justify-end" : "col-span-9"
            }`}
          >
            {subject ? (
              <>
                <Button
                  variant="outlined"
                  color="blue"
                  icon={<Edit size={16} />}
                  onClick={() => openModal("subject")}
                >
                  Edit Subject
                </Button>
              </>
            ) : (
              <div className="">
                <h3>Give a suitable subject line to this campaign.</h3>
                <Button type="primary" onClick={() => openModal("subject")}>
                  ADD SUBJECT
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 border-b border-b-gray-200 py-4 mb-4">
          <div className="col-span-3 font-semibold text-lg text-gray-400">
            SENDER
          </div>
          {sender && <div className="col-span-3">{sender}</div>}

          <div
            className={`${
              sender ? "col-span-6 space-y-5 flex justify-end" : "col-span-9"
            }`}
          >
            {sender ? (
              <>
                <Button
                  variant="outlined"
                  color="blue"
                  icon={<Edit size={16} />}
                  onClick={() => openModal("sender")}
                >
                  Edit Sender
                </Button>
              </>
            ) : (
              <div className="">
                <h3>Who is sending this email campaign?</h3>
                <Button
                  type="primary"
                  onClick={() => openModal("sender")}
                  icon={<PlusCircle size={16} />}
                >
                  ADD SENDER
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 border-b border-b-gray-200 py-4 mb-4">
          <div className="col-span-3 font-semibold text-lg text-gray-400">
            RECIPIENTS
          </div>
          {recipients && (
            <div className="col-span-9">
              {recipients.length > 0 ? (
                <div className="flex justify-between">
                  <div className="">
                    {contactLists
                      .filter((contact) => recipients.includes(contact.id))
                      .map((contact) => (
                        <Tag key={contact.id}>{contact.listName}</Tag>
                      ))}
                  </div>
                  <div className="col-end-6">
                    <Button
                      variant="outlined"
                      color="blue"
                      icon={<Edit size={16} />}
                      onClick={() => openModal("recipients")}
                    >
                      Edit Recipients
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="">
                  <h3>Select recipients from your created contact list.</h3>
                  <Button
                    type="primary"
                    onClick={() => openModal("recipients")}
                    icon={<PlusCircle size={16} />}
                  >
                    ADD RECIPIENTS
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-12 border-b border-gray-200 py-4 mb-4">
          <div className="col-span-3">
            <h3 className="font-semibold text-lg text-gray-400">CONTENT</h3>
          </div>
          <div className="col-span-9 w-full">
            {content?.html ? (
              <div className="w-full min-h-[400px] border border-gray-300 rounded-md bg-white overflow-hidden">
                <iframe
                  srcDoc={content.html}
                  title="Email Preview"
                  className="w-full min-h-[400px] border-none"
                  sandbox="allow-same-origin"
                />
              </div>
            ) : (
              <div className="w-full min-h-[400px] border border-gray-300 rounded-md bg-white flex flex-col items-center justify-center space-y-5 cursor-pointer">
                <img
                  src="/Create content.png"
                  alt="content"
                  className="w-[130px]"
                />
                <h4>Create the content of your campaign.</h4>
                <Button
                  type="primary"
                  onClick={handleCreateContent}
                  icon={<PlusCircle size={16} />}
                >
                  Create Content
                </Button>
              </div>
            )}
          </div>
        </div>

        <Button
          type="primary"
          onClick={handleSendEmail}
          style={{
            marginTop: "16px",
            width: "100%",
            backgroundColor: "#52c41a",
            borderColor: "#52c41a",
          }}
        >
          Send Email
        </Button>
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

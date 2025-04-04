import { useState, useEffect } from "react";
import { Table, Button, message, Modal } from "antd";
import moment from "moment";
import axios from "axios";
import { jsPDF } from "jspdf";

const AllReports = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch all email stats on component mount
  useEffect(() => {
    const fetchEmailStats = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://email-sender-server-rho.vercel.app/email-stats"
        );
        if (response.data.message === "No email campaigns found") {
          message.info("No email campaigns found");
          setStats([]);
        } else {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching email stats:", error);
        message.error("Failed to fetch email stats");
      } finally {
        setLoading(false);
      }
    };

    fetchEmailStats();
  }, []);

  // Fetch stats for a single campaign
  const fetchSingleCampaignStats = async (campaignId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://email-sender-server-rho.vercel.app/email-stats/${campaignId}`
      );
      if (response.status === 200) {
        setSelectedCampaign(response.data);
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error fetching campaign stats:", error);
      if (error.response?.status === 404) {
        message.error("Campaign stats not found");
      } else {
        message.error("Failed to fetch campaign stats");
      }
    } finally {
      setLoading(false);
    }
  };

  // Generate PDF report for the selected campaign with Report.jpg
  const generatePDF = async () => {
    if (!selectedCampaign) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    let yPosition = 20;

    // Load the Report.jpg image from the public folder
    const imgUrl = "/Report.jpg";
    try {
      // Fetch the image as a blob
      const response = await fetch(imgUrl);
      if (!response.ok) throw new Error("Failed to fetch image");
      const blob = await response.blob();
      const imgData = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });

      // Add the image to the PDF
      const imgProps = doc.getImageProperties(imgData);
      const imgWidth = 100; // Set desired width
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      doc.addImage(
        imgData,
        "JPEG",
        (pageWidth - imgWidth) / 2,
        yPosition,
        imgWidth,
        imgHeight
      );
      yPosition += imgHeight + 15; // Adjust yPosition after adding the image
    } catch (error) {
      console.error("Error loading Report.jpg:", error);
      // Fallback if image fails to load
      doc.setFontSize(12);
      doc.text("Unable to load logo", pageWidth / 2, yPosition, {
        align: "center",
      });
      yPosition += 15;
    }

    // Title
    doc.setFontSize(18);
    doc.text("Email Campaign Report", pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 10;

    // Campaign Details
    doc.setFontSize(12);
    doc.text(`Campaign ID: ${selectedCampaign.campaignId}`, margin, yPosition);
    yPosition += 10;
    doc.text(`Subject: ${selectedCampaign.subject}`, margin, yPosition);
    yPosition += 10;
    doc.text(`Sender: ${selectedCampaign.sender}`, margin, yPosition);
    yPosition += 10;
    doc.text(
      `Sent At: ${
        selectedCampaign.sentAt
          ? moment(selectedCampaign.sentAt).format("MMMM Do YYYY, h:mm:ss a")
          : "N/A"
      }`,
      margin,
      yPosition
    );
    yPosition += 15;

    // Stats Section
    doc.setFontSize(14);
    doc.text("Campaign Statistics", margin, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    const stats = [
      `Sent: ${selectedCampaign.stats.sent}`,
      `Opened: ${selectedCampaign.stats.opened}`,
      `Bounced: ${selectedCampaign.stats.bounced}`,
      `Spammed: ${selectedCampaign.stats.spammed}`,
      `Unread: ${selectedCampaign.stats.unread}`,
    ];

    stats.forEach((stat) => {
      doc.text(stat, margin, yPosition);
      yPosition += 10;
    });

    // Footer
    doc.setFontSize(10);
    doc.text(
      `Generated on: ${moment().format("MMMM Do YYYY, h:mm:ss a")}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );

    // Save the PDF
    doc.save(`Campaign_${selectedCampaign.campaignId}_Report.pdf`);
  };

  // Table columns for email stats
  const columns = [
    {
      title: "Campaign ID",
      dataIndex: "campaignId",
      key: "campaignId",
    },
    {
      title: "Sender",
      dataIndex: "sender",
      key: "sender",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Sent At",
      dataIndex: "sentAt",
      key: "sentAt",
      render: (isoString) => {
        if (isoString) {
          const date = moment(isoString);
          return date.format("MMMM Do YYYY, h:mm:ss a");
        }
        return <span className="text-gray-500">N/A</span>;
      },
    },
    {
      title: "Sent",
      dataIndex: ["stats", "sent"],
      key: "sent",
    },
    {
      title: "Opened",
      dataIndex: ["stats", "opened"],
      key: "opened",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => fetchSingleCampaignStats(record.campaignId)}
          className="text-blue-500 hover:text-blue-700"
        >
          View Details
        </Button>
      ),
    },
  ];

  // Columns for the detailed stats modal
  const detailColumns = [
    {
      title: "Metric",
      dataIndex: "metric",
      key: "metric",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  // Data for the detailed stats modal
  const detailData = selectedCampaign
    ? [
        { key: "sent", metric: "Sent", value: selectedCampaign.stats.sent },
        {
          key: "opened",
          metric: "Opened",
          value: selectedCampaign.stats.opened,
        },
        {
          key: "bounced",
          metric: "Bounced",
          value: selectedCampaign.stats.bounced,
        },
        {
          key: "spammed",
          metric: "Spammed",
          value: selectedCampaign.stats.spammed,
        },
        {
          key: "unread",
          metric: "Unread",
          value: selectedCampaign.stats.unread,
        },
      ]
    : [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Email Campaign Statistics</h2>
      <Table
        columns={columns}
        dataSource={stats}
        loading={loading}
        rowKey="campaignId"
        pagination={{ pageSize: 10 }}
        className="shadow-lg rounded-lg"
      />

      {/* Modal for detailed stats */}
      <Modal
        title={
          <h3 className="text-lg font-semibold">
            Campaign Details: {selectedCampaign?.subject}
          </h3>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="download"
            type="primary"
            onClick={generatePDF}
            className="bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#0f172a] border-0"
          >
            Download PDF
          </Button>,
        ]}
        className="rounded-lg"
      >
        {selectedCampaign && (
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">
                <strong>Campaign ID:</strong> {selectedCampaign.campaignId}
              </p>
              <p className="text-gray-600">
                <strong>Sender:</strong> {selectedCampaign.sender}
              </p>
              <p className="text-gray-600">
                <strong>Sent At:</strong>{" "}
                {selectedCampaign.sentAt
                  ? moment(selectedCampaign.sentAt).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )
                  : "N/A"}
              </p>
            </div>
            <Table
              columns={detailColumns}
              dataSource={detailData}
              pagination={false}
              rowKey="key"
              className="shadow-sm"
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AllReports;

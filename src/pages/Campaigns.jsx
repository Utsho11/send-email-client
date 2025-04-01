import { Button, Table, message } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { fetchData } from "../utils/fetchData";
import axios from "axios";
import moment from "moment/moment";

const Campaigns = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch campaigns on mount using Axios
  useEffect(() => {
    const loadCampaigns = async () => {
      setLoading(true);
      const result = await fetchData(
        "https://send-email-server-wdia.onrender.com/campaign"
      );

      // console.log(result);

      if (result.error) {
        console.error("Error fetching campaigns:", result.error);
        message.error("Error loading campaigns");
      } else {
        const formattedCampaigns = result.data.map((campaign) => ({
          key: campaign.id, // Assuming API returns 'id'
          campaignName: campaign.campaignName,
          topic: campaign.topic,
          createdAt: campaign.createdAt,
        }));
        setCampaigns(formattedCampaigns);
      }
      setLoading(false);
    };

    loadCampaigns();
  }, []);

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select at least one campaign to delete");
      return;
    }

    setLoading(true);
    try {
      const deletePromises = selectedRowKeys.map((id) =>
        axios
          .delete(`https://send-email-server-wdia.onrender.com/campaign/${id}`)
          .then((response) => {
            // Check if the response indicates success
            // Assuming backend returns 204 (no content) or 200 with JSON
            if (response.status !== 204 && response.status !== 200) {
              throw new Error(`Failed to delete campaign ${id}`);
            }
            return id; // Return the id of the successfully deleted campaign
          })
          .catch((error) => {
            throw new Error(
              `Failed to delete campaign ${id}: ${
                error.response?.data?.error || error.message
              }`
            );
          })
      );

      const deletedIds = await Promise.all(deletePromises);

      // Update state by filtering out deleted campaigns
      setCampaigns((prev) =>
        prev.filter((campaign) => !deletedIds.includes(campaign.key))
      );
      setSelectedRowKeys([]); // Clear selection
      message.success("Campaigns deleted successfully");
    } catch (error) {
      console.error("Error deleting campaigns:", error);
      message.error(error.message || "Error deleting campaigns");
    } finally {
      setLoading(false);
    }
  };

  // Table columns
  const columns = [
    {
      title: "Campaign Name",
      dataIndex: "campaignName",
      key: "campaignName",
      render: (text, record) => (
        <span
          className="text-black hover:text-blue-500 hover:underline cursor-pointer"
          onClick={() => navigate(`/dashboard/${record.key}/email-form`)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Campaign Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (timestamp) => {
        // console.log(timestamp);

        if (timestamp && timestamp._seconds) {
          const date = moment
            .unix(timestamp._seconds)
            .add(timestamp._nanoseconds / 1000000, "milliseconds");
          return date.format("MMMM Do YYYY, h:mm:ss a");
        }
        return <span className="text-gray-500">N/A</span>;
      },
    },
  ];

  // Row selection configuration
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          const newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          const newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 !== 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="my-8 flex justify-end gap-4">
        <Button
          danger
          onClick={handleDelete}
          disabled={selectedRowKeys.length === 0}
          loading={loading}
        >
          Delete Selected
        </Button>
        <NavLink to="/dashboard/select-campaign">
          <Button type="primary">Create Campaign</Button>
        </NavLink>
      </div>
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          loading={loading}
          dataSource={campaigns}
        />
      </div>
    </div>
  );
};

export default Campaigns;

import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  message,
  Modal,
  Descriptions,
  Input,
  Space,
  Typography,
  Card,
  Tag,
  Tooltip,
  Badge,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { fetchData } from "../utils/fetchData";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
const { Title, Text } = Typography;

const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async (email = "") => {
    setLoading(true);
    const url = email
      ? `https://email-sender-server-rho.vercel.app/clients?email=${email}`
      : "https://email-sender-server-rho.vercel.app/clients";
    const { data, error } = await fetchData(url);

    if (error) {
      message.error("Failed to load clients.");
    } else {
      setClients(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://email-sender-server-rho.vercel.app/clients/${id}`
      );
      message.success("Client deleted successfully.");
      setClients(clients.filter((client) => client.id !== id));
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Error deleting client.");
    }
  };

  const handleView = (client) => {
    setSelectedClient(client);
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Client",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => (
        <Space>
          <Badge status="success" />
          <div>
            <Text strong>{`${record.firstName} ${record.lastName}`}</Text>
            <br />
            <Text type="secondary">{record.companyName}</Text>
          </div>
        </Space>
      ),
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Contact",
      dataIndex: "email",
      key: "email",
      render: (email, record) => (
        <div>
          <Text>{email}</Text>
          <br />
          <Text type="secondary">{record.phone}</Text>
        </div>
      ),
    },
    {
      title: "Business Info",
      key: "business",
      render: (_, record) => (
        <div>
          <Tag color="blue">{record.industry}</Tag>
          <br />
          <Text type="secondary">Employees: {record.employees}</Text>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (_, record) => (
        <Space>
          <Tooltip title="View details">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            />
          </Tooltip>

          <Tooltip title="Edit client">
            <Link to={`/dashboard/edit-client/${record.id}`}>
              <Button shape="circle" icon={<EditOutlined />} />
            </Link>
          </Tooltip>

          <Popconfirm
            title="Delete this client?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete client">
              <Button shape="circle" icon={<DeleteOutlined />} danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Navigation Header */}
      <div className="mb-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>
      <Card
        title={
          <Title level={4} className="!mb-0">
            Client Management
          </Title>
        }
        extra={
          <Link to="/dashboard/add-client">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="flex items-center"
            >
              Add Client
            </Button>
          </Link>
        }
      >
        <div className="mb-6">
          <Input
            placeholder="Search clients by email..."
            suffix={<SearchOutlined />}
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            onPressEnter={() => loadClients(searchEmail)}
            allowClear
            style={{ maxWidth: 400 }}
          />
          <Button
            className="ml-2"
            onClick={() => {
              setSearchEmail("");
              loadClients();
            }}
          >
            Reset
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={clients}
          loading={loading}
          rowKey="id"
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} clients`,
          }}
        />
      </Card>

      <Modal
        title={<span className="text-lg font-semibold">Client Details</span>}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedClient && (
          <Descriptions
            bordered
            column={2}
            size="middle"
            className="mt-4"
            extra={
              <Button
                icon={<EditOutlined />}
                onClick={() =>
                  navigate(`/dashboard/edit-client/${selectedClient.id}`)
                }
              >
                Edit Profile
              </Button>
            }
          >
            <Descriptions.Item label="Full Name" span={2}>
              {selectedClient.firstName} {selectedClient.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedClient.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {selectedClient.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Company" span={2}>
              <div>
                <Text strong>{selectedClient.companyName}</Text>
                <br />
                <Text type="secondary">{selectedClient.position}</Text>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Industry">
              <Tag color="blue">{selectedClient.industry}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Employees">
              {selectedClient.employees}
            </Descriptions.Item>
            <Descriptions.Item label="Website">
              <a href={selectedClient.website} target="_blank" rel="noreferrer">
                {selectedClient.website}
              </a>
            </Descriptions.Item>
            <Descriptions.Item label="Address" span={2}>
              {selectedClient.address}, {selectedClient.city},{" "}
              {selectedClient.state}, {selectedClient.postalCode}
            </Descriptions.Item>
            <Descriptions.Item label="Financial Info" span={2}>
              <Space>
                <StatCard title="Revenue" value={selectedClient.revenue} />
                <StatCard
                  title="Investment"
                  value={selectedClient.investment}
                />
                <StatCard
                  title="Funding Stage"
                  value={selectedClient.fundingStage}
                />
              </Space>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const StatCard = ({ title, value }) => (
  <Card className="!bg-gray-50 !w-32">
    <Text type="secondary" className="block text-xs">
      {title}
    </Text>
    <Text strong className="block mt-1">
      {value}
    </Text>
  </Card>
);

export default ManageClients;

import { useEffect, useState } from "react";
import StatsCard from "../components/card/StatsCard";
import { useAuth } from "../Context/AuthContext";
import {
  Users,
  List,
  Briefcase,
  ArrowUpRight,
  Activity,
  Plus,
  X,
  Mail,
  UserPlus,
  Mailbox,
  MailOpen,
  MailWarning,
  MailCheck,
} from "lucide-react";
import { fetchData } from "../utils/fetchData";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Button, Form, Input, Modal, Spin } from "antd";
import { NavLink, useNavigate } from "react-router";
import DemoBanner from "../components/card/DemoBanner";
import Swal from "sweetalert2";
import axios from "axios";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ token }) => ({
  "my-modal-body": {
    padding: token.paddingSM,
  },
  "my-modal-mask": {
    boxShadow: `inset 0 0 15px #fff`,
  },
  "my-modal-header": {
    borderBottom: `1px dotted ${token.colorPrimary}`,
  },
  "my-modal-footer": {
    color: token.colorPrimary,
  },
  "my-modal-content": {
    border: "1px solid #333",
  },
}));

const Profile = () => {
  const { user } = useAuth();
  const currentUser = user.providerData[0];
  const [loading, setLoading] = useState(false);
  const [emailStatloading, setEmailStatLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState([false, false]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { styles } = useStyle();
  const [emailStats, setEmailStats] = useState();

  const classNames = {
    body: styles["my-modal-body"],
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
  };

  const modalStyles = {
    header: {
      borderRadius: 0,
      paddingInlineStart: 5,
    },
    body: {
      borderRadius: 5,
      padding: "10px",
    },
    mask: {
      backdropFilter: "blur(10px)",
    },
  };

  const toggleModal = (idx, target) => {
    setIsOpen(false);
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

  const [stats, setStats] = useState({
    clients: 0,
    investorLists: 0,
    totalContacts: 0,
    performanceData: [],
    clientDistribution: [],
  });

  const [error, setError] = useState(null);

  // Enhanced mock data
  const mockChartData = [
    { name: "Jan", value: 65 },
    { name: "Feb", value: 85 },
    { name: "Mar", value: 75 },
    { name: "Apr", value: 90 },
    { name: "May", value: 95 },
  ];

  const clientDistributionData = [
    { name: "Corporate", value: 400 },
    { name: "Individual", value: 300 },
    { name: "Government", value: 300 },
  ];

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await fetchData(
          "https://email-sender-server-rho.vercel.app/stats"
        );
        setStats({
          ...data,
          performanceData: mockChartData,
          clientDistribution: clientDistributionData,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  useEffect(() => {
    const loadEmailStats = async () => {
      setEmailStatLoading(true);
      try {
        const { data } = await fetchData(
          "https://email-sender-server-rho.vercel.app/email-stats"
        );

        // console.log(data);

        setEmailStats(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setEmailStatLoading(false);
      }
    };
    loadEmailStats();
  }, []);

  let totals;

  if (emailStats) {
    totals = emailStats.reduce(
      (acc, campaign) => {
        acc.sent += campaign.stats.sent;
        acc.opened += campaign.stats.opened;
        acc.spammed += campaign.stats.spammed;
        acc.unread += campaign.stats.unread;
        return acc;
      },
      { sent: 0, opened: 0, spammed: 0, unread: 0 } // Initial values
    );
  }
  const handleSave = async (values) => {
    try {
      const response = await axios.post(
        "https://email-sender-server-rho.vercel.app/contact-lists",
        {
          listName: values.listName, // Changed to match Form.Item name
        }
      );
      if (response.data.success) {
        toggleModal(0, false);
        form.resetFields();
        Swal.fire({
          title: "Contact List Added Successfully",
          icon: "success",
          confirmButtonText: "Close",
        });
        navigate(`/dashboard/${response.data.id}/type`);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire({
          title: "Duplicate List Name",
          text: error.response.data.message,
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else {
        console.error("Error saving list:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to create contact list",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  if (loading)
    return (
      <Spin tip="Loading" size="large">
        Dashboard Loading...
      </Spin>
    );

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="px-6 py-8 shadow-md rounded-2xl my-8 mx-4">
        <div className=" mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {currentUser.displayName}
              </h1>
              <p className="mt-2 opacity-90">
                Here&apos;s your business overview
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col-reverse sm:flex-col md:flex-row gap-3 md:items-center md:space-x-3">
              <div>
                <Button
                  variant="solid"
                  color="primary"
                  icon={<Plus size={16} />}
                  onClick={() => setIsOpen(true)}
                  className="w-full sm:w-auto"
                >
                  Create
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                  <span className="font-medium text-sm text-wrap sm:text-base">
                    {currentUser.displayName[0]}
                  </span>
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-medium text-sm sm:text-base">
                    {currentUser.email}
                  </p>
                  <p className="text-xs sm:text-sm opacity-75">
                    Last login: 2h ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          width={800} // Custom width
          transitionName=""
          title={
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Create New</span>
              <X
                size={18}
                className="cursor-pointer hover:text-gray-600"
                onClick={() => setIsOpen(false)}
              />
            </div>
          }
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          footer={null}
          centered
          closeIcon={null}
          style={{
            top: 0,
            margin: 0,
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
          }}
          className="top-modal"
        >
          {/* Modal Content */}
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              {/* Email Campaign Card */}
              <NavLink to="/dashboard/select-campaign">
                <div
                  className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border hover:border-blue-100"
                  role="button"
                  tabIndex={0}
                >
                  <div className="text-blue-500 mb-4">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Create Email Campaign
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Design and send targeted email campaigns to your audience
                  </p>
                </div>
              </NavLink>

              {/* Contact List Card */}

              <div
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border hover:border-green-100"
                role="button"
                onClick={() => toggleModal(0, true)}
                tabIndex={0}
              >
                <div className="text-green-500 mb-4">
                  <List className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Create New Contact List
                </h3>
                <p className="text-gray-600 text-sm">
                  Organize and manage your subscriber lists effectively
                </p>
              </div>

              {/* Client Creation Card */}
              <NavLink to="/dashboard/add-client">
                <div
                  className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border hover:border-purple-100"
                  role="button"
                  tabIndex={0}
                >
                  <div className="text-purple-500 mb-4">
                    <UserPlus className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Create a Client
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Add new clients and manage their profiles in your system
                  </p>
                </div>
              </NavLink>
            </div>
          </div>
        </Modal>
        <Modal
          title="Create Contact List"
          footer={false}
          open={isModalOpen[0]}
          onCancel={() => toggleModal(0, false)}
          classNames={classNames}
          styles={modalStyles}
        >
          <Form
            form={form}
            name="contactListForm"
            onFinish={handleSave}
            layout="horizontal"
          >
            <Form.Item
              name="listName" // Changed from contactListName to match API
              label="List Name"
              rules={[
                {
                  required: true,
                  message: "Please enter a contact list name",
                },
              ]}
            >
              <Input placeholder="Enter contact list name" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 mt-12">
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Clients"
            count={stats.clients}
            icon={Users}
            trend="+12.5%"
            trendPositive={true}
            className="bg-white shadow-lg hover:shadow-xl transition-shadow"
          />
          <StatsCard
            title="Investor Lists"
            count={stats.investorLists}
            icon={List}
            trend="+8.2%"
            trendPositive={true}
            className="bg-white shadow-lg hover:shadow-xl transition-shadow"
          />
          <StatsCard
            title="Total Contacts"
            count={stats.totalContacts}
            icon={Briefcase}
            trend="-3.1%"
            trendPositive={false}
            className="bg-white shadow-lg hover:shadow-xl transition-shadow"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Performance Overview
              </h2>
              <div className="flex items-center space-x-2 text-indigo-600">
                <Activity className="w-5 h-5" />
                <span className="text-sm font-medium">Last 6 months</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.performanceData}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#6b7280" tickLine={false} />
                  <YAxis stroke="#6b7280" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{
                      r: 6,
                      fill: "#6366f1",
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "1rem" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Client Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Email Analytics
              </h2>
              <Mailbox className="text-indigo-600 w-5 h-5" />
            </div>

            {emailStatloading ? (
              <Spin tip="Loading" size="small" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Open Status */}
                <div className="flex items-center p-4 bg-emerald-50 rounded-lg transition-all hover:bg-emerald-100">
                  <div className="flex-shrink-0 p-3 bg-emerald-600 rounded-lg">
                    <MailOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-semibold text-gray-800">
                      {totals?.opened}
                    </div>
                    <div className="text-sm font-medium text-emerald-600">
                      Opened
                    </div>
                  </div>
                </div>

                {/* Spam Status */}
                <div className="flex items-center p-4 bg-rose-50 rounded-lg transition-all hover:bg-rose-100">
                  <div className="flex-shrink-0 p-3 bg-rose-600 rounded-lg">
                    <MailWarning className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-semibold text-gray-800">
                      {totals?.spammed}
                    </div>
                    <div className="text-sm font-medium text-rose-600">
                      Marked as Spam
                    </div>
                  </div>
                </div>

                {/* Bounced Status */}
                <div className="flex items-center p-4 bg-blue-50 rounded-lg transition-all hover:bg-blue-100">
                  <div className="flex-shrink-0 p-3 bg-blue-600 rounded-lg">
                    <MailCheck className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-semibold text-gray-800">
                      {totals?.sent}
                    </div>
                    <div className="text-sm font-medium text-blue-600">
                      Sent
                    </div>
                  </div>
                </div>

                {/* Unread Status */}
                <div className="flex items-center p-4 bg-amber-50 rounded-lg transition-all hover:bg-amber-100">
                  <div className="flex-shrink-0 p-3 bg-amber-600 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-semibold text-gray-800">
                      {totals?.unread < 0 ? "0" : totals?.unread}
                    </div>
                    <div className="text-sm font-medium text-amber-600">
                      Unread
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activities & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Recent Activities
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors group"
                >
                  <div className="w-3 h-3 bg-indigo-600 rounded-full mr-4" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      New client onboarding
                    </h3>
                    <p className="text-sm text-gray-600">
                      Client: ABC Corporation
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 group-hover:text-indigo-600">
                    2h ago
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-3">
              <NavLink to="/dashboard/add-client">
                <button className="w-full flex items-center p-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-indigo-600 mr-3" />
                  <span className="font-medium text-gray-800">
                    Add New Client
                  </span>
                </button>
              </NavLink>

              <button
                onClick={() => toggleModal(0, true)}
                className="w-full flex items-center p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors"
              >
                <List className="w-5 h-5 text-emerald-600 mr-3" />
                <span className="font-medium text-gray-800">Create List</span>
              </button>

              <button className="w-full flex items-center p-4 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors">
                <Briefcase className="w-5 h-5 text-amber-600 mr-3" />
                <span className="font-medium text-gray-800">
                  Generate Report
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="my-8">
          <DemoBanner />
        </div>
      </div>
    </div>
  );
};

export default Profile;

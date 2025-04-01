import { NavLink, Outlet } from "react-router";
import { useState } from "react";
import {
  ContactsOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Tooltip } from "antd";
import { Loader, LogOut, Mail, Megaphone, StickyNote } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import auth from "../firebase/firebase.init";
import ListDropdown from "../components/dropdown/ListDropdown";
const { Header, Sider, Content } = Layout;

const items = [
  {
    key: "1",
    icon: <DashboardOutlined />,
    label: <NavLink to="/dashboard">Dashboard</NavLink>,
  },
  {
    key: "sub1",
    label: "Manage Clients",
    icon: <UserOutlined />,
    children: [
      {
        key: "2",
        label: <NavLink to="/dashboard/manage-client">All Client</NavLink>,
      },
      {
        key: "3",
        label: <NavLink to="/dashboard/add-client">Add Client</NavLink>,
      },
    ],
  },
  {
    key: "sub2",
    label: "Manage Contacts",
    icon: <ContactsOutlined />,
    children: [
      {
        key: "4",
        label: <NavLink to="/dashboard/all-investors">All Contacts</NavLink>,
      },
      {
        key: "5",
        label: (
          <NavLink to="/dashboard/manage-contactsList">
            Manage Contact List
          </NavLink>
        ),
      },
    ],
  },
  {
    key: "sub3",
    label: "Start Campaigns",
    icon: <Megaphone size={16} />,
    children: [
      {
        key: "6",
        label: <NavLink to="/dashboard/allCampaign">All Campaigns</NavLink>,
      },
      {
        key: "7",
        label: (
          <NavLink to="/dashboard/select-campaign">Email Campaigns</NavLink>
        ),
      },
      {
        key: "8",
        label: (
          <NavLink to="/dashboard/pre-designed-template-options">
            Pre Designed Templates
          </NavLink>
        ),
      },
    ],
  },
  {
    key: "sub4",
    label: "Reports",
    icon: <StickyNote size={16} />,
    children: [
      {
        key: "9",
        label: <NavLink to="#">All Reports</NavLink>,
      },
      {
        key: "10",
        label: <NavLink to="#">Campaign-Based Report</NavLink>,
      },
      {
        key: "11",
        label: <NavLink to="#">List-Based Report</NavLink>,
      },
    ],
  },
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(true);

  const { user, logout } = useAuth();

  if (!user.photoURL) {
    return (
      <div className="">
        <Loader />
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout(auth);
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <div className="">
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="min-h-screen"
        >
          <div className="demo-logo-vertical" />
          <div className="text-white h-[6rem] items-center flex justify-between border-b-2 mb-2">
            <h1
              className={`text-lg font-semibold flex ${
                collapsed ? "flex-col justify-center text-center text-xs" : ""
              } items-center gap-3 p-4`}
            >
              {collapsed ? <Mail size={16} /> : <Mail size={24} />}
              SEND MAIL
            </h1>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
          <div
            className={`m-[4px] ${
              collapsed ? "px-[28px]" : "pl-[24px] pr-[16px]"
            } cursor-pointer`}
          >
            {collapsed ? (
              <Tooltip placement="right" title="Log out">
                <button
                  onClick={handleLogout}
                  className="flex gap-2 text-red-500 cursor-pointer hover:text-white"
                >
                  <LogOut size={20} />
                </button>
              </Tooltip>
            ) : (
              <button
                onClick={handleLogout}
                className="flex gap-2 text-red-500 cursor-pointer hover:text-white"
              >
                <LogOut size={20} /> <span>Log out</span>
              </button>
            )}
          </div>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              height: "6rem",
              background: "#001529",
            }}
          >
            <div className="flex justify-between items-center">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "24px",
                  width: 64,
                  height: 64,
                  color: "white",
                }}
              />

              <div className="flex items-center gap-5 m-3">
                <ListDropdown />
                {user.photoURL && (
                  <div className="mb-5 text-center">
                    <img
                      src={user?.photoURL || "/default-avatar.png"}
                      alt="User"
                      className="w-16 h-16 rounded-full mx-auto border-2 border-gray-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </Header>
          <Content
            style={{
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;

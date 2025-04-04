import { Button, Card, Drawer, Dropdown, Form, Input, Modal } from "antd";
import { createStyles } from "antd-style";
import axios from "axios";
import {
  Bell,
  BellOff,
  CircleHelp,
  EllipsisVertical,
  Plus,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";

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

const ListDropdown = () => {
  const [open, setOpen] = useState(false);
  const { styles } = useStyle();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState([false, false]);

  const toggleModal = (idx, target) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

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

  const handleSave = async (values) => {
    try {
      const response = await axios.post(
        "https://email-sender-server-gamma.vercel.app/contact-lists",
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

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const item1 = [
    {
      key: "1",
      label: "Folder",
    },
    {
      key: "2",
      label: "Favorites",
    },
    {
      key: "3",
      label: <NavLink to="/dashboard/calendar">Calendar</NavLink>,
    },
    {
      key: "4",
      label: "Feedback",
    },
  ];

  const item2 = [
    {
      key: "5",
      icon: <Plus size={16} />,
      label: <NavLink to="/dashboard/select-campaign">Create Campaign</NavLink>,
    },
    {
      key: "6",
      icon: <Plus size={16} />,
      label: <div onClick={() => toggleModal(0, true)}>Add Contact</div>,
    },
    {
      key: "7",
      icon: <Plus size={16} />,
      label: <NavLink to="/dashboard/add-client">Add Client</NavLink>,
    },
  ];

  return (
    <div className="hidden md:flex text-white space-x-3">
      <Dropdown
        menu={{
          items: item2,
        }}
        placement="bottomLeft"
        arrow
      >
        <Button variant="solid" color="primary">
          <Plus size={16} />
        </Button>
      </Dropdown>
      <button onClick={showDrawer}>
        <Bell />
      </button>
      <button>
        <CircleHelp />
      </button>
      <button>
        <Settings />
      </button>
      <Dropdown
        menu={{
          items: item1,
        }}
        placement="bottomRight"
        arrow
      >
        <button>
          <EllipsisVertical />
        </button>
      </Dropdown>
      <Drawer
        title="Notifications"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <Card className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md border border-gray-200 bg-white">
          <BellOff className="text-gray-400" size={48} />
          <p className="text-gray-500 mt-2">No Notifications</p>
        </Card>
      </Drawer>
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
  );
};

export default ListDropdown;

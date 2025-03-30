import { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Table } from "antd";
import { createStyles } from "antd-style";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router";
import { fetchData } from "../utils/fetchData";
import { Trash, UserRoundPlus } from "lucide-react";

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

const ManageContactList = () => {
  const [dataSource, setDataSource] = useState([]);
  const { styles } = useStyle();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    fetchInvestorLists();
  }, []);

  const fetchInvestorLists = async () => {
    setLoading(true);
    const { data, error } = await fetchData(
      "https://send-email-server-wdia.onrender.com/contact-lists"
    );

    if (error) {
      message.error(error);
      setDataSource([]);
    } else {
      setDataSource(Array.isArray(data.data) ? data.data : []);
    }
    setLoading(false);
  };

  const handleSave = async (values) => {
    try {
      const response = await axios.post(
        "https://send-email-server-wdia.onrender.com/contact-lists",
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
        fetchInvestorLists(); // Refresh the list after adding
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

  const handleDelete = (listId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting this contact list will also delete all related investor lists. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `https://send-email-server-wdia.onrender.com/contact-lists/${listId}`
          );
          if (response.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: response.data.message,
              icon: "success",
              confirmButtonText: "OK",
            });
            fetchInvestorLists();
          }
        } catch (error) {
          console.error("Error deleting contact list:", error);
          Swal.fire({
            title: "Error",
            text:
              "Failed to delete contact list: " +
              (error.response?.data?.message || error.message),
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "listName",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      render: (createdAt) => {
        if (!createdAt) return "N/A"; // Handle null/undefined
        const date = new Date(
          createdAt._seconds * 1000 + createdAt._nanoseconds / 1000000
        );
        return date.toLocaleString(); // Convert to readable format
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <div className="space-x-2">
          <NavLink to={`/dashboard/${record.id}/type`}>
            <Button icon={<UserRoundPlus size={16} />} danger />
          </NavLink>
          <Button
            icon={<Trash size={16} />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  console.log(dataSource);

  return (
    <div className="p-8">
      <div className="flex justify-between py-8">
        <p className="text-3xl">All Contact List</p>
        <Button type="primary" onClick={() => toggleModal(0, true)}>
          Create New List
        </Button>
      </div>
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
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default ManageContactList;

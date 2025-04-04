import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Checkbox, Popover } from "antd";
import axios from "axios";
import { SlidersVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const ManualContactImport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const columnOptions = [
    { key: "Partner Email", label: "Partner Email", permanent: true },
    { key: "Investor Name", label: "Investor Name" },
    { key: "Partner Name", label: "Partner Name" },
    { key: "Fund Type", label: "Fund Type" },
    { key: "Fund Stage", label: "Fund Stage" },
    { key: "Website (If Available)", label: "Website (If Available)" },
    { key: "Fund Focus (Sectors)", label: "Fund Focus (Sectors)" },
    { key: "Portfolio Companies", label: "Portfolio Companies" },
    { key: "Location", label: "Location" },
    { key: "Twitter Link", label: "Twitter Link" },
    { key: "linkedinLink", label: "Linkedin Link" },
    { key: "Facebook Link", label: "Facebook Link" },
    { key: "Number Of Investments", label: "Number Of Investments" },
    { key: "Number Of Exits", label: "Number Of Exits" },
    { key: "Fund Description", label: "Fund Description" },
    { key: "Founding Year", label: "Founding Year" },
  ];
  const [visibleColumns, setVisibleColumns] = useState({
    "Partner Email": true,
    "Investor Name": true,
    "Fund Type": true,
    "Fund Stage": true,
    "Website (If Available)": true,
  });

  const onFinish = async (data) => {
    const contacts = data.contacts;
    // Add listId to each contact object
    const updatedContacts = contacts.map((contact) => ({
      ...contact,
      listId: id,
    }));

    try {
      const response = await axios.post(
        "https://email-sender-server-rho.vercel.app/investors",
        updatedContacts
      );
      if (response.data.id) {
        Swal.fire({
          title: "Investor Added Successfully",
          icon: "success",
          confirmButtonText: "Close",
        });
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to add client");
    }
  };

  const handleColumnChange = (key, checked) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: checked }));
  };

  const columnSelectorContent = (
    <div style={{ maxHeight: "25vh", overflowY: "auto", padding: "8px" }}>
      {columnOptions.map(({ key, label, permanent }) => (
        <div key={key} style={{ marginBottom: 8 }}>
          <Checkbox
            checked={visibleColumns[key]}
            onChange={(e) => handleColumnChange(key, e.target.checked)}
            disabled={permanent}
          >
            {label} {permanent && "(Required)"}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  return (
    <div className="m-8">
      <div className="mb-4">
        <Popover
          content={columnSelectorContent}
          title="Select Columns"
          trigger="click"
          placement="bottomLeft"
        >
          <Button icon={<SlidersVertical />}>Customize Columns</Button>
        </Popover>
      </div>
      <div className="border border-gray-500 rounded-md">
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="on"
          initialValues={{ contacts: Array(4).fill({}) }}
        >
          <div className="p-4" style={{ maxHeight: "70vh", overflow: "auto" }}>
            <div
              style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
              className="font-semibold text-lg"
            >
              {columnOptions.map(({ key, label }) =>
                visibleColumns[key] ? (
                  <div key={key} style={{ minWidth: "20rem" }}>
                    {label}
                  </div>
                ) : null
              )}
            </div>
            <Form.List name="contacts">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex" }}
                      align="baseline"
                    >
                      {columnOptions.map(
                        ({ key: columnKey }) =>
                          visibleColumns[columnKey] && (
                            <Form.Item
                              key={columnKey}
                              {...restField}
                              name={[name, columnKey]}
                              rules={
                                columnKey === "email"
                                  ? [
                                      {
                                        type: "email",
                                        message: "Invalid email format",
                                      },
                                      {
                                        required: true,
                                        message: "Email is required",
                                      },
                                    ]
                                  : columnKey === "phone"
                                  ? [
                                      {
                                        pattern: /^[0-9]{10}$/,
                                        message: "Phone must be 10 digits",
                                      },
                                    ]
                                  : [
                                      {
                                        required: true,
                                        message: `Missing ${columnKey}`,
                                      },
                                    ]
                              }
                            >
                              <Input
                                size="large"
                                style={{ width: "20rem" }}
                                placeholder={
                                  columnOptions.find(
                                    (col) => col.key === columnKey
                                  ).label
                                }
                              />
                            </Form.Item>
                          )
                      )}
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        style={{
                          color: "#FF0000",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                      />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="link"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add more field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="m-4">
              <PlusOutlined />
              Add
            </Button>
            <Button
              type="dashed"
              className="m-4"
              style={{
                borderColor: "#FF0000",
                color: "#FF0000",
                cursor: "pointer",
                fontSize: "18px",
              }}
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ManualContactImport;

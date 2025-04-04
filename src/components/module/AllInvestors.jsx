import { useState, useEffect } from "react";
import { Table, Modal, Form, Input, Popover } from "antd"; // Keeping some Antd components
import axios from "axios";
import { Edit2, Settings, Save, X, ChevronDown, Trash2 } from "lucide-react"; // Lucide icons

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

const AllInvestors = () => {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [form] = Form.useForm();
  const [visibleColumns, setVisibleColumns] = useState(
    Object.fromEntries(columnOptions.map((option) => [option.key, true]))
  );
  const [popoverVisible, setPopoverVisible] = useState(false);

  useEffect(() => {
    fetchInvestors();
  }, []);

  const fetchInvestors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://email-sender-server-rho.vercel.app/investors"
      );
      setInvestors(response.data.data);
    } catch (error) {
      console.error("Error fetching investors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setSelectedInvestor(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(
        `https://email-sender-server-rho.vercel.app/investors/${id}`
      );
      setInvestors(investors.filter((inv) => inv.id !== id));
      console.log("Investor deleted successfully");
    } catch (error) {
      console.error("Error deleting investor:", error);
      Modal.error({
        title: "Deletion Failed",
        content:
          error.response?.data?.error ||
          "An error occurred while deleting the investor",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const response = await axios.put(
        `https://email-sender-server-rho.vercel.app/investors/${selectedInvestor.id}`,
        values
      );

      setInvestors(
        investors.map((inv) =>
          inv.id === selectedInvestor.id ? { ...inv, ...values } : inv
        )
      );
      setModalVisible(false);
      form.resetFields();
      console.log("Investor updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating investor:", error);
      Modal.error({
        title: "Update Failed",
        content:
          error.response?.data?.error ||
          "An error occurred while updating the investor",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleColumnChange = (key, checked) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: checked }));
  };

  const columnSelectorContent = (
    <div className="bg-white rounded-lg shadow-md p-4 max-h-[25vh] overflow-y-auto">
      {columnOptions.map(({ key, label, permanent }) => (
        <div key={key} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={visibleColumns[key]}
            onChange={(e) => handleColumnChange(key, e.target.checked)}
            disabled={permanent}
            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className={permanent ? "text-gray-500" : "text-gray-800"}>
            {label} {permanent && "(Required)"}
          </span>
        </div>
      ))}
    </div>
  );

  const columns = [
    ...columnOptions
      .filter((option) => visibleColumns[option.key])
      .map((option) => ({
        title: option.label,
        dataIndex: option.key,
        key: option.key,
        render: (text) => text || "-",
      })),
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(record)}
            className="flex items-center px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            <Edit2 size={16} className="mr-1" /> Edit
          </button>
          <button
            onClick={() => handleDelete(record.id)}
            className="flex items-center px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
          >
            <Trash2 size={16} className="mr-1" /> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="all-investors-page p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Investors</h2>

      {/* Column Customization */}
      <div className="mb-6">
        <Popover
          content={columnSelectorContent}
          title={<span className="font-semibold">Select Columns</span>}
          trigger="click"
          placement="bottomLeft"
          open={popoverVisible}
          onOpenChange={setPopoverVisible}
        >
          <button className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
            <Settings size={18} className="mr-2" />
            Customize Columns
            <ChevronDown size={18} className="ml-2" />
          </button>
        </Popover>
      </div>

      {/* Table */}
      <Table
        dataSource={investors}
        columns={columns}
        rowKey="id"
        loading={loading}
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 10 }}
        className="bg-white rounded-lg shadow"
      />

      {/* Edit Modal */}
      <Modal
        title={
          <div className="flex items-center">
            <Edit2 size={20} className="mr-2" /> Edit Investor
          </div>
        }
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={[
          <button
            key="cancel"
            onClick={() => {
              setModalVisible(false);
              form.resetFields();
            }}
            className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            <X size={16} className="inline mr-1" /> Cancel
          </button>,
          <button
            key="save"
            onClick={handleOk}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            <Save size={16} className="inline mr-1" /> Save
          </button>,
        ]}
        className="rounded-lg"
      >
        <Form form={form} layout="vertical" className="p-4">
          {columnOptions.map((option) => (
            <Form.Item
              key={option.key}
              name={option.key}
              label={option.label}
              rules={[
                {
                  required: option.permanent,
                  message: `${option.label} is required`,
                },
              ]}
            >
              <Input className="border-gray-300 rounded focus:border-blue-500" />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

export default AllInvestors;

/* eslint-disable react/prop-types */
import { Modal, Input, List, Typography } from "antd";
import { Edit, PlusCircle } from "lucide-react";

const { Text } = Typography;

const SenderModal = ({
  visible,
  onSave,
  onCancel,
  searchTerm,
  setSearchTerm,
  filteredClients,
}) => {
  const handleSelectSender = (email) => {
    setSearchTerm(email);
  };

  return (
    <Modal
      title={
        <>
          {searchTerm ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Edit size={20} color="#1890ff" style={{ marginRight: "8px" }} />
              Edit Sender
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <PlusCircle
                size={20}
                color="#1890ff"
                style={{ marginRight: "8px" }}
              />
              Add Sender
            </div>
          )}
        </>
      }
      centered
      open={visible}
      onOk={() => onSave(searchTerm)}
      onCancel={onCancel}
      okText="Save"
      cancelText="Cancel"
      cancelButtonProps={{
        style: { borderColor: "#ff4d4f", color: "#ff4d4f" },
      }}
      width="600px"
    >
      <div>
        <Input
          placeholder="Search or enter sender email"
          variant="underlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "16px" }}
        />
        <List
          bordered
          dataSource={filteredClients}
          renderItem={(client) => (
            <List.Item
              onClick={() => handleSelectSender(client.email)}
              style={{ cursor: "pointer", padding: "8px 16px" }}
              hoverable
            >
              <Text>{client.email}</Text>
            </List.Item>
          )}
          style={{ maxHeight: "200px", overflowY: "auto" }}
        />
      </div>
    </Modal>
  );
};

export default SenderModal;

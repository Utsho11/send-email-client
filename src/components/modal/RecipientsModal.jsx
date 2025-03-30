/* eslint-disable react/prop-types */
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Modal,
  Input,
  List,
  Select,
  Checkbox,
  Tag,
  Button,
  Typography,
} from "antd";
import { Edit, PlusCircle } from "lucide-react";

const { Text } = Typography;
const { Option } = Select;

const RecipientsModal = ({
  visible,
  onSave,
  onCancel,
  searchTerm,
  setSearchTerm,
  selectedLists,
  setSelectedLists,
  filterOption,
  setFilterOption,
  contactLists,
}) => {
  const filteredContactLists = contactLists.filter((list) =>
    list.listName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleList = (listId) => {
    setSelectedLists((prev) =>
      prev.includes(listId)
        ? prev.filter((id) => id !== listId)
        : [...prev, listId]
    );
  };

  const handleRemoveList = (listId) => {
    setSelectedLists((prev) => prev.filter((id) => id !== listId));
  };

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          {selectedLists.length > 0 ? (
            <>
              <Edit size={20} color="#1890ff" style={{ marginRight: "8px" }} />
              Edit Recipient
            </>
          ) : (
            <>
              <PlusCircle
                size={20}
                color="#1890ff"
                style={{ marginRight: "8px" }}
              />
              Add Recipient
            </>
          )}
        </div>
      }
      centered
      open={visible}
      onOk={() => onSave(selectedLists.join(","))}
      onCancel={onCancel}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        style: { backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" },
      }}
      cancelButtonProps={{
        style: { borderColor: "#ff4d4f", color: "#ff4d4f" },
      }}
      width="800px"
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Select
              value={filterOption}
              onChange={setFilterOption}
              style={{ width: 120, color: "#ff7a45" }}
              dropdownStyle={{ color: "#ff7a45" }}
            >
              <Option value="My Lists">My Lists</Option>
              <Option value="Recently Created">Recently Created</Option>
            </Select>
            <Input
              placeholder="Search lists"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 150, borderRadius: "4px" }}
              prefix={<SearchOutlined style={{ color: "#d9d9d9" }} />}
            />
            <Button
              type="text"
              icon={<PlusCircle size={16} style={{ color: "#d9d9d9" }} />}
            />
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Text style={{ color: "#595959" }}>
              Selected Lists ({selectedLists.length})
            </Text>
            <Text style={{ color: "#595959" }}>Selected Segments (0)</Text>
          </div>
        </div>
        <div className="flex justify-between gap-5">
          <div className="w-1/2">
            <List
              dataSource={filteredContactLists}
              renderItem={(list) => (
                <List.Item style={{ padding: "8px 0", borderBottom: "none" }}>
                  <Checkbox
                    checked={selectedLists.includes(list.id)}
                    onChange={() => handleToggleList(list.id)}
                    style={{ marginRight: "8px", color: "#ff7a45" }}
                  >
                    <Text style={{ color: "#595959" }}>{list.listName}</Text>
                  </Checkbox>
                </List.Item>
              )}
            />
          </div>
          <div className="w-1/2">
            {selectedLists.length > 0 && (
              <div>
                <Text
                  strong
                  style={{
                    marginBottom: "8px",
                    display: "block",
                    color: "#595959",
                  }}
                >
                  Selected Lists
                </Text>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {selectedLists.map((listId) => {
                    const list = contactLists.find((l) => l.id === listId);
                    return list ? (
                      <Tag
                        key={list.id}
                        closable
                        onClose={() => handleRemoveList(list.id)}
                        closeIcon={
                          <CloseOutlined style={{ color: "#613400" }} />
                        }
                        style={{
                          backgroundColor: "#fffbe6",
                          borderColor: "#ffe58f",
                          color: "#613400",
                          borderRadius: "12px",
                          padding: "2px 8px",
                        }}
                      >
                        {list.listName}
                      </Tag>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RecipientsModal;

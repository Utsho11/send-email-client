import { Modal, Input } from "antd";
import { Edit, PlusCircle } from "lucide-react";

// eslint-disable-next-line react/prop-types
const SubjectModal = ({ visible, onSave, onCancel, defaultValue }) => {
  return (
    <Modal
      title={
        <>
          {defaultValue ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Edit size={20} color="#1890ff" style={{ marginRight: "8px" }} />
              Edit Subject
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <PlusCircle
                size={20}
                color="#1890ff"
                style={{ marginRight: "8px" }}
              />
              Add Subject
            </div>
          )}
        </>
      }
      centered
      open={visible}
      onOk={() => onSave(document.getElementById("modalInput")?.value || "")}
      onCancel={onCancel}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        style: { backgroundColor: "#4096ff", borderColor: "#4096ff" },
      }}
      cancelButtonProps={{
        style: { borderColor: "#ff4d4f", color: "#ff4d4f" },
      }}
      width="50%"
    >
      <Input
        id="modalInput"
        defaultValue={defaultValue || ""}
        placeholder="Enter subject"
        variant="underlined"
        style={{ marginTop: "16px" }}
      />
    </Modal>
  );
};

export default SubjectModal;

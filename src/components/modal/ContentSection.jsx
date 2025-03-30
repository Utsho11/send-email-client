/* eslint-disable react/prop-types */
import { Button } from "antd";
import { NavLink } from "react-router";
import { FileText } from "lucide-react";
import { Typography } from "antd";

const { Title, Text } = Typography;
const ContentSection = ({ content, path }) => (
  <div
    style={{
      padding: "16px",
      background: "#fff",
      borderRadius: "8px",
      border: "1px solid #e8e8e8",
    }}
  >
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
    >
      <FileText size={24} color="#aeadbb" style={{ marginRight: "16px" }} />
      <Title level={4} style={{ margin: 0, color: "#333" }}>
        CONTENT
      </Title>
    </div>
    {content?.html ? (
      <div
        style={{
          width: "100%",
          minHeight: "300px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          background: "#fff",
          overflow: "hidden",
        }}
      >
        <iframe
          srcDoc={content.html}
          title="Email Preview"
          style={{ width: "100%", minHeight: "300px", border: "none" }}
          sandbox="allow-same-origin"
        />
      </div>
    ) : (
      <div
        style={{
          width: "100%",
          minHeight: "300px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#999" }}>No Content Available</Text>
      </div>
    )}
    <NavLink to={`/${path}`}>
      <Button type="primary" style={{ marginTop: "16px", width: "100%" }}>
        {content ? "Edit Content" : "Create Content"}
      </Button>
    </NavLink>
  </div>
);

export default ContentSection;

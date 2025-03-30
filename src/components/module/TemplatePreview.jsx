import { useEffect, useState } from "react";
import { Card, Spin, Alert, Button } from "antd";
import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  WhatsAppOutlined,
  XOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setTemplateId } from "../../store/store";

// eslint-disable-next-line react/prop-types
const TemplatePreview = ({ toggleModal }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const encodeBase64 = (str) => btoa(unescape(encodeURIComponent(str)));

  const handleStoreTemplateId = (id) => {
    dispatch(setTemplateId(id));
    toggleModal(true);
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      const apiKey =
        "ISKcTtANpdmELniL682WRfFdxKK0CTShtJvjJceCUwF1Ou0Hurj2OnVUvvaaRAND";
      const authHeader = "Basic " + encodeBase64(apiKey + ":");

      try {
        const response = await fetch("https://api.unlayer.com/v2/templates", {
          headers: { Authorization: authHeader },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { data } = await response.json();
        setTemplates(data);

        // Generate thumbnails
        data.forEach((template) => generateThumbnail(template));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const socialIcons = {
    Facebook: <FacebookOutlined style={{ fontSize: "20px" }} />,
    LinkedIn: <LinkedinOutlined style={{ fontSize: "20px" }} />,
    Instagram: <InstagramOutlined style={{ fontSize: "20px" }} />,
    YouTube: <YoutubeOutlined style={{ fontSize: "20px" }} />,
    Email: <MailOutlined style={{ fontSize: "20px" }} />,
    WhatsApp: <WhatsAppOutlined style={{ fontSize: "20px" }} />,
    GitHub: <GithubOutlined style={{ fontSize: "20px" }} />,
    X: <XOutlined style={{ fontSize: "20px" }} />,
    // Add more icons as needed
  };

  // Function to generate a thumbnail containing the full template
  const generateThumbnail = (template) => {
    const rows = template.design.body.rows;
    return (
      <div
        style={{
          width: "100%",
          height: "500px", // Full height of container
          backgroundColor:
            template.design.body.values.backgroundColor || "#f9f9f9",
          overflowY: "auto",
          scrollBehavior: "auto",
          border: "1px solid #e8e8e8",
          padding: "5px",
          boxSizing: "border-box",
          fontSize: "8px", // Scale down all text
        }}
      >
        {rows.map((row) => (
          <div
            key={row.id}
            style={{
              backgroundColor:
                row.values.columnsBackgroundColor || "transparent",
              padding: row.values.padding || "5px",
              marginBottom: "2px",
              minHeight: "20px", // Minimum height for visibility
            }}
          >
            {row.columns.map((column) => (
              <div
                key={column.id}
                style={{ padding: column.values.padding || "0px" }}
              >
                {column.contents.map((content) => (
                  <div
                    key={content.id}
                    style={{
                      padding: content.values.containerPadding || "2px",
                      textAlign: content.values.textAlign || "left",
                    }}
                  >
                    {content.type === "text" && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: content.values.text
                            .replace(/font-size: \d+px/g, "font-size: 8px")
                            .replace(
                              /line-height: \d+(\.\d+)?px/g,
                              "line-height: 10px"
                            ),
                        }}
                        style={{ color: content.values.color }}
                      />
                    )}
                    {content.type === "image" && (
                      <img
                        src={content.values.src.url}
                        alt={content.values.altText || "preview"}
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          display: "block",
                          margin: "0 auto",
                        }}
                      />
                    )}
                    {content.type === "button" && (
                      <button
                        style={{
                          backgroundColor:
                            content.values.buttonColors.backgroundColor,
                          color: content.values.color,
                          padding: "2px 4px",
                          borderRadius: content.values.borderRadius || "2px",
                          border: "none",
                          width: content.values.size.autoWidth
                            ? "auto"
                            : content.values.size.width,
                          textAlign: "center",
                          display: "block",
                          margin: "0 auto",
                        }}
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: content.values.text.replace(
                              /font-size: \d+px/g,
                              "font-size: 8px"
                            ),
                          }}
                        />
                      </button>
                    )}
                    {content.type === "social" && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: content.values.align,
                          gap: "2px",
                        }}
                      >
                        {content.values.icons.icons.map((icon, idx) => (
                          <a
                            key={idx}
                            href={icon.url}
                            style={{ display: "inline-block" }}
                          >
                            <span>{socialIcons[icon.name]}</span>{" "}
                            {/* Simplified social icon */}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  if (loading)
    return (
      <Spin size="large" className="flex justify-center items-center h-64" />
    );
  if (error)
    return (
      <Alert
        message="Error fetching templates"
        description={error}
        type="error"
        showIcon
      />
    );

  return (
    <div className="p-6 h-screen">
      <h2 className="text-2xl font-semibold mb-4">
        You might like these email templates:
      </h2>
      <div className="grid grid-cols-3 gap-4 h-[500px]">
        {templates.map((template) => (
          <Card
            key={template.id}
            hoverable
            cover={
              template.thumbnail_url ? (
                <img
                  alt={template.name}
                  src={template.thumbnail_url}
                  className="w-full h-full object-contain" // Changed to object-contain
                />
              ) : (
                <div style={{ height: "500px" }}>
                  {" "}
                  {/* Increased height to contain more content */}
                  {generateThumbnail(template)}
                </div>
              )
            }
          >
            <Card.Meta
              title={template.name}
              description={`ID: ${template.id}`}
            />
            <Button
              type="primary"
              block
              className="mt-2"
              onClick={() => handleStoreTemplateId(template.id)}
            >
              Use Template
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplatePreview;

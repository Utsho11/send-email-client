import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContent } from "../../store/store";
import { useNavigate, useParams } from "react-router";
import EmailEditor from "react-email-editor";
import { Button } from "antd";

const EmailTemplateEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailEditorRef = useRef(null);
  const { campaignId } = useParams();
  const [templates, setTemplates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const campaignState = useSelector((state) => state.campaign);
  const { templateId } = campaignState;

  const encodeBase64 = (str) => btoa(unescape(encodeURIComponent(str)));

  // Fetch template from Unlayer API
  useEffect(() => {
    const fetchTemplates = async () => {
      const apiKey = import.meta.env.VITE_UNLAYER_API_KEY;
      const authHeader = "Basic " + encodeBase64(apiKey + ":");

      try {
        const response = await fetch(
          `https://api.unlayer.com/v2/templates/${templateId}`,
          {
            headers: { Authorization: authHeader },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { data } = await response.json();
        setTemplates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (templateId) {
      fetchTemplates();
    } else {
      setLoading(false); // If no templateId, skip fetching
    }
  }, [templateId]);

  // Load design into editor when template is fetched or on editor ready
  const loadDesign = (editor) => {
    if (templates?.design) {
      try {
        editor.loadDesign(templates.design);
      } catch (error) {
        console.error(
          `Failed to load design for templateId: ${templateId}`,
          error
        );
        editor.loadDesign({ body: { rows: [] } }); // Load blank design on error
      }
    } else {
      editor.loadDesign({ body: { rows: [] } }); // Load blank design if no template
    }
  };

  const handleConfirm = () => {
    emailEditorRef.current?.editor?.exportHtml(({ design, html }) => {
      dispatch(setContent({ design, html }));
      navigate(`/dashboard/${campaignId}/email-form`);
    });
  };

  const handleImageUpload = (file, done) => {
    const formData = new FormData();
    formData.append("file", file);
    fetch("https://your-backend.com/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => done({ url: data.imageUrl }))
      .catch((err) => {
        console.error("Image upload failed:", err);
        done({ error: "Image upload failed" });
      });
  };

  return (
    <div style={{ padding: "24px", background: "#f0f2f5" }}>
      {loading ? (
        <p>Loading template...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <EmailEditor
          ref={emailEditorRef}
          style={{ height: "80vh" }}
          onReady={(editor) => {
            loadDesign(editor); // Load design when editor is ready
            editor.registerCallback("image", handleImageUpload);
          }}
          options={{
            mergeTags: {
              first_name: { name: "First Name", value: "{{first_name}}" },
            },
            projectId: "270051",
          }}
          tools={{
            image: {
              properties: {
                src: {
                  label: "Image URL",
                  value: "",
                  defaultValue: "https://your-default-image-url.com/image.png",
                },
              },
            },
            timer: {
              properties: {
                countdown: {
                  value: {
                    countdownUrl: `https://cdn.tools.unlayer.com/countdown/countdown.gif`,
                    endTime: "",
                    backgroundColor: "#000000",
                    labelColor: "#FFFFFF",
                    labelFontFamily: "Open Sans",
                    labelFontSize: 28,
                    digitColor: "#FFFFFF",
                    digitFontFamily: "Open Sans",
                    digitFontSize: 75,
                    timezone: "America/Los_Angeles",
                    locale: null,
                    showLabels: false,
                  },
                },
              },
            },
          }}
          editorConfig={{ features: { image_upload: true } }}
        />
      )}
      <div style={{ marginTop: "16px" }}>
        <Button onClick={() => navigate(-1)} style={{ marginRight: "8px" }}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default EmailTemplateEditor;

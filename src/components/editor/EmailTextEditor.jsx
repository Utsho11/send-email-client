// src/EmailTextEditor.jsx
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { setContent } from "../../store/store";

const EmailTextEditor = () => {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { campaignId } = useParams();

  const handleContent = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());

      const html = editorRef.current.getContent();
      // console.log(html);
      dispatch(setContent({ html }));
      navigate(`/dashboard/${campaignId}/email-form`);
    }
  };

  const tinymceApi = import.meta.env.VITE_TINYMCE_KEY;

  return (
    <div className="editor-container">
      <Editor
        apiKey={tinymceApi} // Your free API key
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: "80vh",
          menubar: "file edit view insert format tools table help", // Enable the menubar with custom menus
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "textcolor", // For forecolor and backcolor
            "codesample", // For codesample in insert menu
            "pagebreak", // For pagebreak in insert menu
            "nonbreaking", // For nonbreaking in insert menu
            "tableofcontents", // For tableofcontents in insert menu
            "emoticons", // For emoticons in insert menu
            "a11ycheck", // For accessibility checker in tools menu
            "visualchars", // For visualchars in view menu
            "spellchecker", // For spellchecker in tools and view menu
          ],
          toolbar:
            "undo redo | blocks | fontfamily fontsize | " + // Added fontfamily and fontsize
            "bold italic forecolor backcolor | alignleft aligncenter " + // Added backcolor
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          menu: {
            file: {
              title: "File",
              items:
                "newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations",
            },
            edit: {
              title: "Edit",
              items:
                "undo redo | cut copy paste pastetext | selectall | searchreplace",
            },
            view: {
              title: "View",
              items:
                "code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments",
            },
            insert: {
              title: "Insert",
              items:
                "image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime",
            },
            format: {
              title: "Format",
              items:
                "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat",
            },
            tools: {
              title: "Tools",
              items:
                "spellchecker spellcheckerlanguage | a11ycheck code wordcount",
            },
            table: {
              title: "Table",
              items:
                "inserttable | cell row column | advtablesort | tableprops deletetable",
            },
            help: { title: "Help", items: "help" },
          },
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <div className="m-8 flex justify-end">
        <Button type="primary" onClick={handleContent}>
          Add Content
        </Button>
      </div>
    </div>
  );
};

export default EmailTextEditor;

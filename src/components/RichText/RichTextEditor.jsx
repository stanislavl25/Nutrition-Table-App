import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function RichTextEditor({ text, handleTextChange }) {
  const config = {
    removePlugins: [
      "Heading",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
      "uploadImage",
      "BlockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
      "Essentials",
      "CKFinderUploadAdapter",
      "CKFinder",
      "CloudServices",
      "EasyImage",
      "Image",
      "ImageCaption",
      "ImageStyle",
      "ImageToolbar",
      "ImageUpload",
      "Indent",
      "List",
      "MediaEmbed",
      "Table",
      "TableToolbar",
    ],
    toolbar: ["Bold", "Italic", "|", "Link"],
  };
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={text}
        onChange={(event, editor) => handleTextChange(event, editor)}
        config={config}
      />
    </div>
  );
}

export default RichTextEditor;

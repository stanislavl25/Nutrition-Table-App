import { Card } from "@shopify/polaris";
import React from "react";
import RichTextEditor from "./RichTextEditor";

function LegalNotes({ data, lEGALNOTICEText, handleTextChange }) {
  return (
    <Card sectioned title={data}>
      <RichTextEditor
        text={lEGALNOTICEText}
        handleTextChange={handleTextChange}
      />
    </Card>
  );
}

export default LegalNotes;

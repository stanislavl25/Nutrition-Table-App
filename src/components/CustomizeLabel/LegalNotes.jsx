import { Card, TextStyle } from "@shopify/polaris";
import React from "react";
import RichTextEditor from "../RichText/RichTextEditor";

function LegalNotes({ data, lEGALNOTICEText, handleTextChange }) {
  return (
    <Card sectioned title={data}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
          gap: "7px",
        }}
      >
        <TextStyle variation="subdued">(Leave empty for none)</TextStyle>
        <RichTextEditor
          text={lEGALNOTICEText}
          handleTextChange={handleTextChange}
        />
      </div>
    </Card>
  );
}

export default LegalNotes;

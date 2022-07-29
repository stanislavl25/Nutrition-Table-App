import { Card, Subheading, TextStyle } from "@shopify/polaris";
import React from "react";
import RichTextEditor from "../RichText/RichTextEditor";
function Notes({ notesText, handleTextChange }) {
  return (
    <Card sectioned title="Notes">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "10px",
          gap: "4px",
        }}
      >
        <Subheading>Nutrition notes </Subheading>{" "}
        <TextStyle variation="subdued">(leave empty for none)</TextStyle>
      </div>
      <RichTextEditor text={notesText} handleTextChange={handleTextChange} />
    </Card>
  );
}

export default Notes;

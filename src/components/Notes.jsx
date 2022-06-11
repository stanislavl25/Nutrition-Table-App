import { Card, Subheading, TextStyle } from "@shopify/polaris";
import React from "react";
import RichTextEditor from "./RichTextEditor";
function Notes({ notesText, handleTextChange }) {
  console.log(notesText.length > 10 ? "product Exist" : "");
  return (
    <Card sectioned title="Notes">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Subheading>Nutrition notes </Subheading>
        <TextStyle variation="subdued">(leave empty for none)</TextStyle>
      </div>
      <RichTextEditor text={notesText} handleTextChange={handleTextChange} />
    </Card>
  );
}

export default Notes;

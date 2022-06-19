import { Card } from "@shopify/polaris";
import React from "react";
import RichTextEditor from "../RichText/RichTextEditor";

function AllergyInfo({ data, allergyInfoText, handleTextChange }) {
  return (
    <Card sectioned title={data}>
      <RichTextEditor
        text={allergyInfoText}
        handleTextChange={handleTextChange}
      />
    </Card>
  );
}

export default AllergyInfo;

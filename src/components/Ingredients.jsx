import { Card } from "@shopify/polaris";
import React from "react";
import RichTextEditor from "./RichTextEditor";

function Ingredients({ data, ingredientsText, handleTextChange }) {
  return (
    <Card sectioned title={data}>
      <RichTextEditor
        text={ingredientsText}
        handleTextChange={handleTextChange}
      />
    </Card>
  );
}

export default Ingredients;

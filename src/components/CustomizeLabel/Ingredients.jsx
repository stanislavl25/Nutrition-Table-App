import { Card, Subheading, TextStyle } from "@shopify/polaris";
import React from "react";
import RichTextEditor from "../RichText/RichTextEditor";

function Ingredients({ data, ingredientsText, handleTextChange }) {
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
        <TextStyle variation="subdued">
          (Please separate each ingredient with a comma like this: "ingredient
          1, ingredient 2,...")
        </TextStyle>
        <RichTextEditor
          text={ingredientsText}
          handleTextChange={handleTextChange}
        />
      </div>
    </Card>
  );
}

export default Ingredients;

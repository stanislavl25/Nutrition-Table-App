import { Card, Stack, Tag, TextStyle } from "@shopify/polaris";
import React from "react";
import RichTextEditor from "../RichText/RichTextEditor";
import parse from "html-react-parser";
function AllergyInfo({ data, allergyInfoText, handleTextChange }) {
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
          (Please separate each allergen with a comma like this: "allergen 1,
          allergen 2,...")
        </TextStyle>
        <Stack>
          {allergyInfoText
            .replace("<p>", "")
            .replace("</p>", "")
            .split(",")
            .map((elem, index) => (
              <Tag key={`allergy-${index}`}>{parse(elem)}</Tag>
            ))}
        </Stack>
        <RichTextEditor
          text={allergyInfoText}
          handleTextChange={handleTextChange}
        />
      </div>
    </Card>
  );
}

export default AllergyInfo;

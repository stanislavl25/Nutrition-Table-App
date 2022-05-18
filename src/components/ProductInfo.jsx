import { Typography } from "@mui/material";
import {
  Button,
  Card,
  Checkbox,
  Heading,
  Select,
  Subheading,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";

function ProductInfo({
  productToPrepare,
  handleproductToPrepare,
  editableProduct,
  handleEditableProduct,
  handleNutriScoreCheckElem,
}) {
  const [nutriScoreCheck, setNutriScore] = useState(false);
  const [selected, setSelected] = useState("");
  const handleSelectChange = useCallback((value) => {
    handleNutriScoreCheckElem(value);
    setSelected(value);
  }, []);
  const handleNutriScore = useCallback(
    (newChecked) => setNutriScore(newChecked),
    []
  );
  const options = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
  ];

  return (
    <Card sectioned title="Product Info">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Typography>
            {/* // todo Product name goes here */}
            Product
          </Typography>
          <Button>Manage</Button>
        </div>

        <Checkbox
          label="This is a non-food product"
          checked={editableProduct}
          onChange={handleEditableProduct}
        />
        <Checkbox
          label="Product to prepare"
          checked={productToPrepare}
          onChange={handleproductToPrepare}
        />
        <Checkbox
          label="Show Nutri-Score"
          checked={nutriScoreCheck}
          onChange={handleNutriScore}
        />
        {nutriScoreCheck ? (
          <div style={{ marginTop: "10px" }}>
            <Subheading>Nutri-Score Letter</Subheading>
            <Select
              label=""
              options={options}
              onChange={handleSelectChange}
              value={selected}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </Card>
  );
}

export default ProductInfo;

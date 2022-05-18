import { Select } from "@shopify/polaris";
import React from "react";

function SlectComponent({ options, handleChange, unit, name, index }) {
  return (
    <div style={{ marginRight: "10px" }}>
      <Select
        label=""
        options={options}
        onChange={(e) => handleChange(e, index, name)}
        value={unit}
      />
    </div>
  );
}

export default SlectComponent;

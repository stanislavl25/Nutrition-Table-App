import { Select } from "@shopify/polaris";
import React from "react";

function SlectComponent({ options, handleChange, unit, name, index }) {
  return (
    <Select
      label=""
      options={options}
      onChange={(e) => handleChange(e, index, name)}
      value={unit}
    />
  );
}

export default SlectComponent;

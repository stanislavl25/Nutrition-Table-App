import { Button, Select, Stack, TextField } from "@shopify/polaris";
import React from "react";
import { Popover } from "@mui/material";

const options = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const PopOverComponent = ({
  element,
  removeFormFields,
  handleChange,
  index,
  id,
  handlePopOverClose,
  openPopOver,
  anchorEl,
}) => {
  return (
    <Popover
      onClose={handlePopOverClose}
      id={id}
      open={openPopOver}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
    >
      <div style={{ padding: "10px" }}>
        <Stack>
          <Stack.Item fill>
            <Select
              handleChange={(e) => handleChange(e, "bold", index)}
              value={element.bolean}
              options={options}
              name="bold"
              label="Bold Name"
            />
          </Stack.Item>
        </Stack>

        <TextField
          label="Left Spacing (Table)"
          type="number"
          value={element.leftSpacing || ""}
          min={0}
          name="leftSpacing"
          onChange={(e) => handleChange(e, "leftSpacing", index)}
          multiline={false}
        />

        <TextField
          label="Order"
          type="number"
          name="order"
          min={0}
          value={element.order}
          onChange={(e) => {
            handleChange(e, "order", index);
          }}
          multiline={false}
        />
        <Button
          destructive
          outline
          style={{ margin: "4px" }}
          type="button"
          className="button remove"
          onClick={() => removeFormFields(index)}
        >
          Delete
        </Button>
      </div>
    </Popover>
  );
};

export default PopOverComponent;

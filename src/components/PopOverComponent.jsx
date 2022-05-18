import { Button, TextField } from "@shopify/polaris";
import React from "react";
import SlectComponent from "./SelectComponent";
import { Popover } from "@mui/material";

const Label = (text) => {
  return <label>{text}</label>;
};

const BoldName = ({ data, index, handleChange }) => {
  const options = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {Label("Bold Name")}
      <SlectComponent
        handleChange={handleChange}
        index={index}
        unit={data.bolean}
        options={options}
        name="bold"
      />
    </div>
  );
};
const LeftSpacing = ({ data, index, handleChange }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: "10px",
      }}
    >
      {Label("Left Spacing (Table)")}
      <TextField
        // size="small"
        label=""
        type="number"
        value={data.leftSpacing || ""}
        min={0}
        name="leftSpacing"
        onChange={(e) => handleChange(e, index, "leftSpacing")}
        multiline={false}
      />
    </div>
  );
};
const Order = ({ data, handleChange, index, handleOrderChange }) => {
  let order = data.order;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: "10px",
      }}
    >
      {Label("Order")}
      <TextField
        type="number"
        name="order"
        min={0}
        value={order}
        onChange={(e) => {
          handleChange(e, index, "order");
          handleOrderChange(e, index);
        }}
        multiline={false}
      />
    </div>
  );
};

const PopOverComponent = ({
  element,
  removeFormFields,
  handleChange,
  index,
  id,
  handlePopOverClose,
  openPopOver,
  anchorEl,
  handleOrderChange,
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
      sx={{ boxShadow: "none" }}
    >
      <div style={{ padding: "10px" }}>
        <BoldName data={element} handleChange={handleChange} index={index} />
        <LeftSpacing
          data={element}
          handleChange={handleChange}
          index={index}
          //   handleOrderChange={handleOrderChange}
        />
        <Order
          data={element}
          handleChange={handleChange}
          index={index}
          handleOrderChange={handleOrderChange}
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

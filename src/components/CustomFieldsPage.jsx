import React, { useState } from "react";
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Toast, useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";

export default function CustomFieldsPage({ productId }) {
  const [formValues, setFormValues] = useState([{ title: "", value: "" }]);
  const [prefix, setPrefix] = React.useState("");

  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  const handlePrefixChange = (event) => {
    setPrefix(event.target.value);
  };
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { title: "", value: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSave = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formValues));
    // const fetchOptions = {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formValues),
    // };

    // const data = await fetch("/addCustomFields", fetchOptions)
    //   .then((res) => res.json())
    //   .then((messages) => {
    //     (response) => console.log(response);
    //   });
  };

  return (
    <div>
      <Typography style={{ margin: "20px" }}>
        add custom fields to a certain product
      </Typography>
      <form onSubmit={handleSave}>
        {formValues.map((element, index) => (
          <div className="form-inline" key={index}>
            {/* <label>Title</label> */}
            <TextField
              label="Title"
              type="text"
              variant="outlined"
              name="title"
              value={element.title || ""}
              onChange={(e) => handleChange(index, e)}
              style={{
                marginLeft: "10px",
                marginBottom: "10px",
                marginRight: "10xp",
              }}
            />
            {/* <label>Value</label> */}
            <TextField
              label="Value"
              variant="outlined"
              type="text"
              name="Value"
              value={element.Value || ""}
              onChange={(e) => handleChange(index, e)}
              style={{
                marginLeft: "10px",
                marginBottom: "10px",
                marginRight: "10xp",
              }}
            />
            <Select
              value={prefix}
              label="Prefix"
              onChange={handlePrefixChange}
              style={{
                marginLeft: "10px",
                marginBottom: "10px",
                marginRight: "10xp",
              }}
            >
              <MenuItem value={"kCals"}>kCals</MenuItem>
              <MenuItem value={"Cals"}>Cals</MenuItem>
              <MenuItem value={"g"}>gram</MenuItem>
            </Select>
            {index ? (
              <Button
                variant="contained"
                style={{ margin: "4px" }}
                type="button"
                className="button remove"
                onClick={() => removeFormFields(index)}
              >
                Remove
              </Button>
            ) : null}
          </div>
        ))}
        <div className="button-section">
          <Button
            variant="contained"
            className="button add"
            type="button"
            onClick={() => addFormFields()}
            style={{ margin: "4px" }}
          >
            Add
          </Button>
          <Button
            className="button submit"
            type="submit"
            variant="contained"
            style={{ margin: "4px" }}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

import { Popover } from "@mui/material";
import {
  Select,
  Button,
  FormLayout,
  Card,
  Heading,
  TextField,
  Stack,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import PopOverComponent from "./PopOverComponent";
import SelectComponent from "./SelectComponent";

function NutritionInfo({
  formValues,
  setFormValues,
  formLables,
  handleOrderChange,
  newFormSet,
  locationPlan,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopOverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const openPopOver = Boolean(anchorEl);
  const id = openPopOver ? "simple-popover" : undefined;

  let addFormFields = () => {
    setFormValues([...formValues, newFormSet]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
    handlePopOverClose();
  };
  let handleSave = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formValues));
  };
  const handleChange = useCallback((e, i, name) => {
    console.log(e);
    let newFormValues = [...formValues];
    newFormValues[i][name] = e;
    setFormValues(newFormValues);
  }, []);

  const handleUnitChange = (i, val) => {
    let newFormValues = [...formValues];
    newFormValues[i]["Unit"] = val;
    setFormValues(newFormValues);
  };

  const options = [
    { label: "Grams", value: "Grams" },
    { label: "MilliGrams", value: "MilliGrams" },
  ];

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Card Sectioned>
        <Card.Section>
          <Stack distribution="equalSpacing">
            <Heading>Nutrition Informaion</Heading>
            <Button
              variant="contained"
              className="button add"
              type="button"
              onClick={() => addFormFields()}
              style={{ margin: "4px" }}
              primary
            >
              Add
            </Button>
          </Stack>
        </Card.Section>
        <Card.Section>
          <form onSubmit={handleSave}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {formLables.map((lableTitle, index) => (
                <label
                  key={index}
                  style={{
                    width: "130px",
                    marginRight: "10px",
                    color:
                      locationPlan.plan == "Basic" &&
                      lableTitle == "Per portion"
                        ? "#8c9196"
                        : "black",
                  }}
                >
                  {lableTitle}
                </label>
              ))}
            </div>
            <div>
              {formValues.map((element, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "stretch",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <TextField
                    style={{ width: "130px", marginRight: "10px" }}
                    value={element.name}
                    name="Name"
                    onChange={(e) => handleChange(e, index, "name")}
                    label=""
                    autoComplete="off"
                  />
                  <TextField
                    style={{ width: "80px", marginRight: "10px" }}
                    value={element.per100g || 0}
                    name="Per100g"
                    onChange={(e) => handleChange(e, index, "per100g")}
                    inputMode="number"
                    autoComplete="off"
                  />
                  <TextField
                    style={{ width: "120px", marginRight: "10px" }}
                    value={element.perportion || 0}
                    name="Perportion"
                    onChange={(e) => handleChange(e, index, "perportion")}
                    autoComplete="off"
                    inputMode="number"
                    disabled={locationPlan.plan === "Basic" ? true : false}
                  />
                  <div style={{ width: "100px", marginRight: "10px" }}>
                    <SelectComponent
                      index={index}
                      unit={element.unit}
                      handleChange={handleChange}
                      options={options}
                      name="unit"
                    />
                  </div>

                  <Button onClick={handlePopOverOpen} aria-describedby={id}>
                    More
                  </Button>
                  <PopOverComponent
                    // handleOrderChange={handleOrderChange}
                    openPopOver={openPopOver}
                    handleOrderChange={handleOrderChange}
                    id={id}
                    anchorEl={anchorEl}
                    handlePopOverClose={handlePopOverClose}
                    element={element}
                    handleChange={handleChange}
                    removeFormFields={removeFormFields}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </form>
        </Card.Section>
        <Button onClick={handleSave}>Save</Button>
      </Card>
    </div>
  );
}

export default NutritionInfo;

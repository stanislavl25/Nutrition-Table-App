import { Button, Card, Heading, Stack, TextField } from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import SelectComponent from "./SelectComponent";
import PopOverComponent from "./PopOverComponent";
function NutritionInfoCA({
  formValues,
  setFormValues,
  formLables,
  handleOrderChange,
  newFormSet,
  locationPlan,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
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
          <div>
            <Stack distribution="fill" spacing="tight">
              {formLables.map((lableTitle, index) => (
                <label key={index}>{lableTitle}</label>
              ))}
            </Stack>
          </div>
          <div>
            {formValues.map((element, index) => (
              <Stack
                distribution="fill"
                spacing="loose"
                key={index}
                wrap={false}
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
                  value={element.quantity || 0}
                  name="Per100g"
                  onChange={(e) => handleChange(e, index, "per100g")}
                  inputMode="number"
                  autoComplete="off"
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
                <TextField
                  style={{ width: "120px", marginRight: "10px" }}
                  value={element.dailyValue || 0}
                  name="Perportion"
                  onChange={(e) => handleChange(e, index, "perportion")}
                  autoComplete="off"
                  inputMode="number"
                />
                <Button onClick={handlePopOverOpen} aria-describedby={id}>
                  More
                </Button>
                <PopOverComponent
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
              </Stack>
            ))}
          </div>
        </form>
      </Card.Section>
      <Button onClick={handleSave}>Save</Button>
    </Card>
  );
}

export default NutritionInfoCA;

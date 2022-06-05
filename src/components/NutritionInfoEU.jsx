import {
  Select,
  Button,
  FormLayout,
  Card,
  Heading,
  TextField,
  Stack,
  Popover,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import SelectComponent from "./SelectComponent";
import NutritionInfoCA from "./NutritionInfoCA";
import NutritionInfoNA from "./NutritionInfoNA";

const PopOverComponent = ({
  handleChange,
  index,
  element,
  removeFormFields,
}) => {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      More
    </Button>
  );
  const options = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  return (
    <Popover
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
      ariaHaspopup={false}
      sectioned
      autofocusTarget="none"
      preferredAlignment="center"
    >
      <FormLayout>
        <Stack>
          <Stack.Item fill>
            <Select
              onChange={(e) => handleChange(e, "bold", index)}
              value={element.bold || ""}
              options={options}
              name="bold"
              label="Bold Name"
            />
          </Stack.Item>
          <Stack.Item>
            <TextField
              label="Order"
              type="number"
              name="order"
              min={0}
              value={element.order || ""}
              onChange={(e) => {
                handleChange(e, "order", index);
              }}
              multiline={false}
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
          label="% RI*"
          type="number"
          value={element.RI || ""}
          min={0}
          name="% RI*"
          onChange={(e) => handleChange(e, "RI", index)}
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
      </FormLayout>
    </Popover>
  );
};

function NutritionInfo({
  formValues,
  setFormValues,
  formLables,
  handleOrderChange,
  newFormSet,
  locationPlan,
}) {
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
  const handleChange = useCallback((e, name, i) => {
    console.log(e);
    let newFormValues = [...formValues];
    newFormValues[i][name] = e;
    setFormValues(newFormValues);
  }, []);

  const options = [
    { label: "Grams", value: "Grams" },
    { label: "MilliGrams", value: "MilliGrams" },
  ];

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      {locationPlan.location === "CA" ? (
        <NutritionInfoCA
          formValues={formValues}
          setFormValues={setFormValues}
          formLables={formLables}
          handleOrderChange={handleOrderChange}
          newFormSet={newFormSet}
          locationPlan={locationPlan}
        />
      ) : (
        <></>
      )}
      {locationPlan.location === "NA" ? (
        <NutritionInfoNA
          formValues={formValues}
          setFormValues={setFormValues}
          handleOrderChange={handleOrderChange}
          newFormSet={newFormSet}
          locationPlan={locationPlan}
        />
      ) : (
        <></>
      )}

      {locationPlan.location === "EU" ? (
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
                      onChange={(e) => handleChange(e, "name", index)}
                      label=""
                      autoComplete="off"
                    />
                    <TextField
                      style={{ width: "80px", marginRight: "10px" }}
                      value={element.per100g || 0}
                      name="Per100g"
                      onChange={(e) => handleChange(e, "per100g", index)}
                      inputMode="number"
                      autoComplete="off"
                    />
                    <TextField
                      style={{ width: "120px", marginRight: "10px" }}
                      value={element.perportion || 0}
                      name="Perportion"
                      onChange={(e) => handleChange(e, "perportion", index)}
                      autoComplete="off"
                      inputMode="number"
                      disabled={locationPlan.plan === "Basic" ? true : false}
                    />
                    <div style={{ width: "100px", marginRight: "10px" }}>
                      <Select
                        value={element.unit}
                        onChange={(e) => handleChange(e, "unit", index)}
                        options={options}
                        name="unit"
                      />
                    </div>
                    <PopOverComponent
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
      ) : (
        <></>
      )}
    </div>
  );
}

export default NutritionInfo;

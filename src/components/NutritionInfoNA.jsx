import {
  Button,
  Card,
  FormLayout,
  Popover,
  Select,
  Stack,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import SelectComponent from "./SelectComponent";

const PopOverComponent = () => {
  const [popoverActive, setPopoverActive] = useState(false);
  const [tagValue, setTagValue] = useState("");

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const handleTagValueChange = useCallback((value) => setTagValue(value), []);

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      More
    </Button>
  );
  return (
    <Popover
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
      ariaHaspopup={false}
      sectioned
    >
      <FormLayout>
        <Select label="Show all customers where:" options={["Tagged with"]} />
        <TextField
          label="Tags"
          value={tagValue}
          onChange={handleTagValueChange}
          autoComplete="off"
        />
        <Button size="slim">Add filter</Button>
      </FormLayout>
    </Popover>
  );
};

const formLabels = ["name", "Quantity", "Unit", "% Daily Value*"];
function NutritionInfoNA({
  formValues,
  setFormValues,
  handleOrderChange,
  newFormSet,
  locationPlan,
}) {
  console.log(formValues);
  const handleChange = useCallback((e, i, name) => {
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
    <Card>
      <Card.Section>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "150px",
          }}
        >
          {formLabels.map((elem, index) => (
            <label key={index}>{elem}</label>
          ))}
        </div>
      </Card.Section>
      <Card.Section>
        {formValues.map((elem, index) => (
          <Stack wrap={false}>
            <Stack.Item>
              <TextField
                value={elem.name || ""}
                onChange={(e) => handleChange(e, index, "name")}
              />
            </Stack.Item>
            <Stack.Item fill>
              <TextField
                value={elem.quantity || ""}
                onChange={(e) => handleChange(e, index, "quantity")}
              />
            </Stack.Item>
            <Stack.Item>
              <SelectComponent
                index={index}
                unit={elem.unit}
                handleChange={handleChange}
                options={options}
                name="unit"
              />
            </Stack.Item>
            <Stack.Item fill>
              <TextField
                value={elem.dailyValue || ""}
                onChange={(e) => handleChange(e, index, "dailyValue")}
              />
            </Stack.Item>
            <Stack.Item>
              <PopOverComponent />
            </Stack.Item>
          </Stack>
        ))}
      </Card.Section>
    </Card>
  );
}

export default NutritionInfoNA;

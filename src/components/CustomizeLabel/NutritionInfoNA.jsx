import {
  Button,
  Card,
  FormLayout,
  Heading,
  Popover,
  Select,
  Stack,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";

const PopOverComponent = ({
  handleChange,
  index,
  element,
  removeFormFields,
}) => {
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
        <Stack wrap={false}>
          <Stack.Item fill>
            <Select
              label="Bold Name"
              options={options}
              value={element.bold}
              onChange={(e) => handleChange(e, "bold", index)}
            />
          </Stack.Item>
          <Stack.Item>
            <TextField
              label="Order"
              onChange={(e) => handleChange(e, "order", index)}
              autoComplete="off"
              value={element.order}
            />
          </Stack.Item>
        </Stack>
        <TextField
          label="Left Spacing (Table)"
          value={element.leftSpacing}
          onChange={(e) => handleChange(e, "leftSpacing", index)}
          autoComplete="off"
        />
        <Heading>Prepared Product</Heading>
        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label="Quantity"
              value={element.preparedProductQuantity}
              onChange={(e) =>
                handleChange(e, "preparedProductQuantity", index)
              }
              autoComplete="off"
            />
          </Stack.Item>
          <Stack.Item>
            <TextField
              label="% DV*"
              value={element.preparedProductDV}
              autoComplete="off"
              onChange={(e) => handleChange(e, "preparedProductDV", index)}
            />
          </Stack.Item>
        </Stack>
        <TextField
          label="Prepared Unit"
          value={element.preparedProductUnit}
          autoComplete="off"
          onChange={(e) => handleChange(e, "preparedProductUnit", index)}
        />
        <Button destructive outline onClick={() => removeFormFields(index)}>
          Delete
        </Button>
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
  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
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
          <Stack wrap={false} key={index}>
            <Stack.Item>
              <TextField
                value={elem.name || ""}
                onChange={(e) => handleChange(e, "name")}
              />
            </Stack.Item>
            <Stack.Item fill>
              <TextField
                value={elem.quantity || ""}
                onChange={(e) => handleChange(e, "quantity", index)}
              />
            </Stack.Item>
            <Stack.Item>
              <Select
                options={options}
                value={elem.unit || ""}
                onChange={(e) => handleChange(e, "unit", index)}
              />
            </Stack.Item>
            <Stack.Item fill>
              <TextField
                value={elem.dailyValue || ""}
                onChange={(e) => handleChange(e, "dailyValue", index)}
              />
            </Stack.Item>
            <Stack.Item>
              <PopOverComponent
                element={elem}
                index={index}
                handleChange={handleChange}
                removeFormFields={removeFormFields}
              />
            </Stack.Item>
          </Stack>
        ))}
      </Card.Section>
    </Card>
  );
}

export default NutritionInfoNA;

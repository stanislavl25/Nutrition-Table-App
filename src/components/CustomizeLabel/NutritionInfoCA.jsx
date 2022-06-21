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
import React, { useState, useCallback } from "react";

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
              onChange={(e) => handleChange(e, "nutritionData", "bold", index)}
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
              onChange={(e) => handleChange(e, "nutritionData", "order", index)}
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
          onChange={(e) =>
            handleChange(e, "nutritionData", "leftSpacing", index)
          }
          multiline={false}
        />
        <div>
          <Heading>Prepared Product</Heading>
          <TextField
            label="% DV*"
            type="number"
            value={element.preparedProduct || ""}
            min={0}
            name="% RI*"
            onChange={(e) =>
              handleChange(e, "nutritionData", "preparedProduct", index)
            }
            multiline={false}
          />
        </div>
        <Button
          destructive
          outline
          style={{ margin: "4px" }}
          type="button"
          className="button remove"
          onClick={() => {
            removeFormFields(index);
            togglePopoverActive();
          }}
        >
          Delete
        </Button>
      </FormLayout>
    </Popover>
  );
};
function NutritionInfoCA({
  formValues,
  formLables,
  handleAddNutritionData,
  handleRemoveNutritionData,
  handleChange,
}) {
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
            onClick={() => handleAddNutritionData()}
            style={{ margin: "4px" }}
            primary
          >
            Add
          </Button>
        </Stack>
      </Card.Section>
      <Card.Section>
        <form>
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
                  value={element.name || ""}
                  name="name"
                  onChange={(e) =>
                    handleChange(e, "nutritionData", "name", index)
                  }
                  autoComplete="off"
                />
                <TextField
                  style={{ width: "80px", marginRight: "10px" }}
                  value={element.quantity || 0}
                  name="quantity"
                  onChange={(e) =>
                    handleChange(e, "nutritionData", "quantity", index)
                  }
                  inputMode="number"
                  autoComplete="off"
                />
                <div style={{ width: "100px", marginRight: "10px" }}>
                  <Select
                    value={element.Unit || ""}
                    onChange={(e) =>
                      handleChange(e, "nutritionData", "Unit", index)
                    }
                    options={options}
                    name="Unit"
                  />
                </div>
                <TextField
                  value={element.dailyValue || 0}
                  name="dailyValue"
                  onChange={(e) =>
                    handleChange(e, "nutritionData", "dailyValue", index)
                  }
                  autoComplete="off"
                  inputMode="number"
                />
                <PopOverComponent
                  element={element}
                  handleChange={handleChange}
                  removeFormFields={handleRemoveNutritionData}
                  index={index}
                />
              </Stack>
            ))}
          </div>
        </form>
      </Card.Section>
    </Card>
  );
}

export default NutritionInfoCA;

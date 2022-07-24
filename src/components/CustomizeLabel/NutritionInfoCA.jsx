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
  dataLength,
  productToPrepare,
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
          {/* <Stack.Item>
            <TextField
              label="Order"
              type="number"
              name="order"
              min={0}
              max={dataLength}
              value={element.order || ""}
              onChange={(e) => handleChange(e, "nutritionData", "order", index)}
              multiline={false}
            />
          </Stack.Item> */}
        </Stack>
        <TextField
          label="Left Spacing (Table)"
          type="number"
          value={element.leftSpacing || ""}
          min={0}
          max={30}
          name="leftSpacing"
          onChange={(e) =>
            handleChange(e, "nutritionData", "leftSpacing", index)
          }
          multiline={false}
        />
        <div>
          {productToPrepare ? (
            <>
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
            </>
          ) : (
            <></>
          )}
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
  dataLength,
  productToPrepare,
}) {
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
            justifyContent: "space-between",
          }}
        >
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
        </div>
      </Card.Section>
      <Card.Section>
        <div
          style={{
            borderCollapse: "separate",
            display: "inline-table",
            borderSpacing: "1em .5em",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              display: "table-header-group",
              width: "100%",
            }}
          >
            {formLables.map((lableTitle, index) => (
              <label
                style={{
                  display: "table-cell",
                }}
                key={index}
              >
                {lableTitle}
              </label>
            ))}
          </div>

          <div
            style={{
              display: "table-row-group",
              width: "100%",
            }}
          >
            {formValues.map((element, index) => (
              <div
                style={{
                  display: "table-row",
                  paddingTop: "10px",
                }}
              >
                <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                  <TextField
                    value={element.name || ""}
                    name="name"
                    onChange={(e) =>
                      handleChange(e, "nutritionData", "name", index)
                    }
                    autoComplete="off"
                  />
                </div>
                <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                  <TextField
                    value={element.quantity || 0}
                    name="quantity"
                    onChange={(e) =>
                      handleChange(e, "nutritionData", "quantity", index)
                    }
                    inputMode="number"
                    autoComplete="off"
                  />
                </div>
                <div
                  style={{
                    maxWidth: "80px",
                    flex: "1 0 0 auto",
                    display: "table-cell",
                  }}
                >
                  <Select
                    value={element.Unit || ""}
                    onChange={(e) =>
                      handleChange(e, "nutritionData", "Unit", index)
                    }
                    options={options}
                    name="Unit"
                  />
                </div>
                <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                  <TextField
                    value={element.dailyValue || 0}
                    name="dailyValue"
                    onChange={(e) =>
                      handleChange(e, "nutritionData", "dailyValue", index)
                    }
                    autoComplete="off"
                    inputMode="number"
                  />
                </div>
                <div style={{ flex: "1 0 0 auto" }}>
                  <PopOverComponent
                    element={element}
                    handleChange={handleChange}
                    removeFormFields={handleRemoveNutritionData}
                    index={index}
                    dataLength={dataLength}
                    productToPrepare={productToPrepare}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card.Section>
    </Card>
  );
}

export default NutritionInfoCA;

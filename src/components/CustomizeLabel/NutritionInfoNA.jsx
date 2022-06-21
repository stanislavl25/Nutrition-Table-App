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
        <Stack wrap={false}>
          <Stack.Item fill>
            <Select
              label="Bold Name"
              options={options}
              value={element.bold}
              onChange={(e) => handleChange(e, "nutritionData", "bold", index)}
            />
          </Stack.Item>
          <Stack.Item>
            <TextField
              label="Order"
              onChange={(e) => handleChange(e, "nutritionData", "order", index)}
              autoComplete="off"
              value={element.order}
            />
          </Stack.Item>
        </Stack>
        <TextField
          label="Left Spacing (Table)"
          value={element.leftSpacing}
          onChange={(e) =>
            handleChange(e, "nutritionData", "leftSpacing", index)
          }
          autoComplete="off"
        />
        {productToPrepare ? (
          <>
            <Heading>Prepared Product</Heading>
            <Stack wrap={false}>
              <Stack.Item fill>
                <TextField
                  label="Quantity"
                  value={element.preparedProductQuantity}
                  onChange={(e) =>
                    handleChange(
                      e,
                      "nutritionData",
                      "preparedProductQuantity",
                      index
                    )
                  }
                  autoComplete="off"
                />
              </Stack.Item>
              <Stack.Item>
                <TextField
                  label="% DV*"
                  value={element.preparedProductDV}
                  autoComplete="off"
                  onChange={(e) =>
                    handleChange(e, "nutritionData", "preparedProductDV", index)
                  }
                />
              </Stack.Item>
            </Stack>
            <TextField
              label="Prepared Unit"
              value={element.preparedProductUnit}
              autoComplete="off"
              onChange={(e) =>
                handleChange(e, "nutritionData", "preparedProductUnit", index)
              }
            />
          </>
        ) : (
          <></>
        )}
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
  handleAddNutritionData,
  handleRemoveNutritionData,
  handleChange,
  productToPrepare,
}) {
  const options = [
    { label: "Grams", value: "Grams" },
    { label: "MilliGrams", value: "MilliGrams" },
  ];
  return (
    <Card>
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
        {formValues.map((elem, index) => (
          <Stack wrap={false} key={index}>
            <Stack.Item>
              <TextField
                value={elem.name || ""}
                onChange={(e) =>
                  handleChange(e, "nutritionData", "name", index)
                }
              />
            </Stack.Item>
            <Stack.Item fill>
              <TextField
                value={elem.quantity || ""}
                onChange={(e) =>
                  handleChange(e, "nutritionData", "quantity", index)
                }
              />
            </Stack.Item>
            <Stack.Item>
              <div style={{ maxWidth: "80px" }}>
                <Select
                  options={options}
                  value={elem.unit || ""}
                  onChange={(e) =>
                    handleChange(e, "nutritionData", "unit", index)
                  }
                />
              </div>
            </Stack.Item>
            <Stack.Item fill>
              <TextField
                value={elem.dailyValue || ""}
                onChange={(e) =>
                  handleChange(e, "nutritionData", "dailyValue", index)
                }
              />
            </Stack.Item>
            <Stack.Item>
              <PopOverComponent
                element={elem}
                index={index}
                handleChange={handleChange}
                removeFormFields={handleRemoveNutritionData}
                productToPrepare={productToPrepare}
              />
            </Stack.Item>
          </Stack>
        ))}
      </Card.Section>
    </Card>
  );
}

export default NutritionInfoNA;

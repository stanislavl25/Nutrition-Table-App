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
  const unitoptions = [
    { label: "Grams", value: "Grams" },
    { label: "MilliGrams", value: "MilliGrams" },
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
        </Stack>
        <TextField
          label="Left Spacing (Table)"
          value={element.leftSpacing}
          max={30}
          min={0}
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

            <Select
              label="Prepared Unit"
              options={unitoptions}
              value={element.preparedProductUnit}
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
  data,
  handleNewRIElem,
}) {
  const options = [
    { label: "Grams", value: "Grams" },
    { label: "MilliGrams", value: "MilliGrams" },
  ];

  const handleAutoCalculsOnChangeDV = useCallback((val, index, tag) => {
    handleChange(val, "nutritionData", tag, index);
    const newNutritionDV =
      (data.nutritionData[index].quantity /
        data.nutritionData[index].dailyValue) *
      100;
    handleChange(
      Math.floor(newNutritionDV).toString(),
      "nutritionData",
      "preparedProductDV",
      index
    );
  });

  return (
    <Card sectioned>
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
      <div
        style={{
          borderCollapse: "separate",
          display: "inline-table",
          borderSpacing: "1em .5em",
          marginBottom: "10px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "table-header-group",
            width: "100%",
          }}
        >
          {formLabels.map((elem, index) => (
            <label
              style={{
                display: "table-cell",
              }}
              key={index}
            >
              {elem}
            </label>
          ))}
        </div>
        <div
          style={{
            display: "table-row-group",
            width: "100%",
          }}
        >
          {formValues.map((elem, index) => (
            <div
              key={index}
              style={{
                display: "table-row",
                paddingTop: "10px",
              }}
            >
              <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                <TextField
                  value={elem.name || ""}
                  onChange={(e) =>
                    handleChange(e, "nutritionData", "name", index)
                  }
                  onBlur={(e) => handleNewRIElem(e.target.value)}
                />
              </div>
              <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                <TextField
                  value={elem.quantity || ""}
                  onChange={(e) =>
                    handleAutoCalculsOnChangeDV(e, index, "quantity")
                  }
                />
              </div>
              <div
                style={{
                  flex: "1 0 0 auto",
                  display: "table-cell",
                  maxWidth: "80px",
                }}
              >
                <Select
                  options={options}
                  value={elem.unit || ""}
                  onChange={(e) =>
                    handleChange(e, "nutritionData", "unit", index)
                  }
                />
              </div>
              <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                <TextField
                  value={elem.dailyValue || ""}
                  onChange={(e) =>
                    handleChange(e, "nutritionData", "dailyValue", index)
                  }
                />
              </div>
              <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                <PopOverComponent
                  element={elem}
                  index={index}
                  handleChange={handleChange}
                  removeFormFields={handleRemoveNutritionData}
                  productToPrepare={productToPrepare}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default NutritionInfoNA;

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
        <Select
          onChange={(e) => handleChange(e, "nutritionData", "bold", index)}
          value={element.bold || ""}
          options={options}
          name="bold"
          label="Bold Name"
        />

        {/* <Stack.Item>
            <TextField
              label="Order"
              type="number"
              name="order"
              min={0}
              max={dataLength}
              value={element.order}
              onChange={(e) => {
                handleChange(e, "nutritionData", "order", index);
              }}
              multiline={false}
            />
          </Stack.Item> */}

        <TextField
          label="Left Spacing (Table)"
          type="number"
          min={0}
          max={30}
          value={element.leftSpacing || ""}
          name="leftSpacing"
          onChange={(e) =>
            handleChange(e, "nutritionData", "leftSpacing", index)
          }
          multiline={false}
        />
        <TextField
          label="% RI*"
          type="number"
          value={element.RI || ""}
          min={0}
          name="% RI*"
          onChange={(e) => handleChange(e, "nutritionData", "RI", index)}
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
  formLables,
  locationPlan,
  data,
  handleAddNutritionData,
  handleRemoveNutritionData,
  handleChange,
  productToPrepare,
}) {
  const handleAutoCalculs = () => {
    data.nutritionData.forEach((elem, index) => {
      const division =
        data?.servingSize.EU.DefaultAmount / data?.servingSize.EU.PortionSize;
      const newVitamonPortion = elem.per100g / division;
      if (Math.floor(newVitamonPortion).toString() !== elem.perportion) {
        handleChange(
          Math.floor(newVitamonPortion).toString(),
          "nutritionData",
          "perportion",
          index
        );
      }
      return;
    });
  };
  useEffect(() => {
    return handleAutoCalculs();
  }, [
    data.nutritionData.filter((elem) => {
      return elem.per100g;
    }),
  ]);

  const options = [
    { label: "Grams", value: "Grams" },
    { label: "MilliGrams", value: "MilliGrams" },
  ];

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      {locationPlan.location === "CA" ? (
        <NutritionInfoCA
          formValues={data.nutritionData}
          formLables={formLables}
          handleChange={handleChange}
          handleAddNutritionData={handleAddNutritionData}
          handleRemoveNutritionData={handleRemoveNutritionData}
          dataLength={data.length}
          productToPrepare={productToPrepare}
        />
      ) : (
        <></>
      )}
      {locationPlan.location === "NA" ? (
        <NutritionInfoNA
          formValues={data.nutritionData}
          handleChange={handleChange}
          handleAddNutritionData={handleAddNutritionData}
          handleRemoveNutritionData={handleRemoveNutritionData}
          productToPrepare={productToPrepare}
          dataLength={data.length}
        />
      ) : (
        <></>
      )}

      {locationPlan.location === "EU" ? (
        <Card>
          <div style={{ padding: "20px 20px 0px 20px" }}>
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
          </div>

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
              <label style={{ display: "table-cell" }}>Name</label>
              <label style={{ display: "table-cell" }}>Per 100 g</label>
              <label
                style={{
                  color: locationPlan.plan == "Basic" ? "#8c9196" : "black",
                  display: "table-cell",
                }}
              >
                Per portion {data?.servingSize.EU.PortionSize}{" "}
                {data?.servingSize.EU.PortionSizeUnit === "Grams" ? "g" : "mg"}
              </label>
              <label style={{ display: "table-cell" }}>Unit</label>
            </div>
            <div style={{ display: "table-row-group", width: "100%" }}>
              {data.nutritionData && data.nutritionData.length > 0 ? (
                data.nutritionData.map((element, index) => (
                  <div
                    key={index}
                    style={{
                      display: "table-row",
                      paddingTop: "10px",
                    }}
                  >
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <TextField
                        value={element.name}
                        name="Name"
                        onChange={(e) =>
                          handleChange(e, "nutritionData", "name", index)
                        }
                        label=""
                        autoComplete="off"
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <TextField
                        value={element.per100g || 0}
                        name="Per100g"
                        onChange={(e) =>
                          handleChange(e, "nutritionData", "per100g", index)
                        }
                        inputMode="number"
                        autoComplete="off"
                        type="number"
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <TextField
                        value={element.perportion || 0}
                        name="Perportion"
                        onChange={(e) =>
                          handleChange(e, "nutritionData", "perportion", index)
                        }
                        autoComplete="off"
                        inputMode="number"
                        type="number"
                        disabled={locationPlan.plan === "Basic" ? true : false}
                      />
                    </div>
                    <div style={{ display: "table-cell", flex: "1 0 0 auto" }}>
                      <div style={{ width: "80px" }}>
                        <Select
                          value={element.unit}
                          onChange={(e) =>
                            handleChange(e, "nutritionData", "unit", index)
                          }
                          options={options}
                          name="unit"
                        />
                      </div>
                    </div>

                    <div style={{ flex: "1 0 0 auto" }}>
                      <PopOverComponent
                        element={element}
                        handleChange={handleChange}
                        removeFormFields={handleRemoveNutritionData}
                        index={index}
                        dataLength={data.length}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
}

export default NutritionInfo;

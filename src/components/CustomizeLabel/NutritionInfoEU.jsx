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
  dataLength,
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
            <div style={{ maxWidth: "80px" }}>
              <Select
                onChange={(e) =>
                  handleChange(e, "nutritionData", "bold", index)
                }
                value={element.bold || ""}
                options={options}
                name="bold"
                label="Bold Name"
              />
            </div>
          </Stack.Item>
          <Stack.Item>
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
          </Stack.Item>
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

          <div>
            <form>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "0px 20px 0px 20px ",
                  width: "100%",
                }}
              >
                <label style={{ marginRight: "170px" }}>Name</label>
                <label style={{ marginRight: "110px" }}>Per 100 g</label>
                <label
                  style={{
                    color: locationPlan.plan == "Basic" ? "#8c9196" : "black",
                    maxWidth: "123px",
                    marginRight: "100px",
                  }}
                >
                  Per portion
                </label>
                <label style={{ marginRight: "20px" }}>Unit</label>
              </div>
              <hr
                style={{
                  borderTop: "1px solid #cecece",
                  width: "100%",
                  padding: "0px",
                }}
              />

              <div style={{ padding: "0px 20px 20px 20px", width: "100%" }}>
                {data.nutritionData && data.nutritionData.length > 0 ? (
                  data.nutritionData.map((element, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "20px",
                      }}
                    >
                      <div style={{ maxWidth: "200px", marginRight: "20px" }}>
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
                      <div style={{ maxWidth: "150px", marginRight: "20px" }}>
                        <TextField
                          value={element.per100g || 0}
                          name="Per100g"
                          onChange={(e) =>
                            handleChange(e, "nutritionData", "per100g", index)
                          }
                          inputMode="number"
                          autoComplete="off"
                        />
                      </div>
                      <div style={{ maxWidth: "150px", marginRight: "20px" }}>
                        <TextField
                          value={element.perportion || 0}
                          name="Perportion"
                          onChange={(e) =>
                            handleChange(
                              e,
                              "nutritionData",
                              "perportion",
                              index
                            )
                          }
                          autoComplete="off"
                          inputMode="number"
                          disabled={
                            locationPlan.plan === "Basic" ? true : false
                          }
                        />
                      </div>

                      <div style={{ maxWidth: "75px", marginRight: "20px" }}>
                        <Select
                          value={element.unit}
                          onChange={(e) =>
                            handleChange(e, "nutritionData", "unit", index)
                          }
                          options={options}
                          name="unit"
                        />
                      </div>

                      <div style={{ maxWidth: "100px" }}>
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
            </form>
          </div>
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
}

export default NutritionInfo;

import {
  Card,
  Heading,
  Layout,
  Select,
  Stack,
  TextField,
} from "@shopify/polaris";
import React from "react";

const SelectElement = ({ val, tag, handleChange, secondTag, name }) => {
  const options = [
    { label: "Grams", value: "Grams" },
    { label: "MilliGrams", value: "MilliGrams" },
  ];

  return (
    <div style={{ maxWidth: "80px" }}>
      <Select
        label="Unit"
        options={options}
        onChange={(e) => {
          handleChange(e, tag, name, secondTag);
        }}
        value={val}
      />
    </div>
  );
};

function ServingSize({
  productToPrepare,
  servingSize,
  locationPlan,
  data,
  handleChange,
}) {
  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <Card title="Serving Size">
        <Card.Section>
          {locationPlan.location === "CA" ? (
            <>
              <Stack>
                <Stack.Item>
                  <TextField
                    label="Serving size"
                    value={data.servingSize.CA.servingSizeBasic}
                    onChange={(e) =>
                      handleChange(e, "servingSize", "servingSizeBasic", "CA")
                    }
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <TextField
                    label="Serving reference"
                    value={servingSize.CA.servingRefBasic}
                    onChange={(e) =>
                      handleChange(e, "servingSize", "servingRefBasic", "CA")
                    }
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <TextField
                    label="Bilingual reference"
                    value={servingSize.CA.bilingualRefBasic}
                    onChange={(e) =>
                      handleChange(e, "servingSize", "bilingualRefBasic", "CA")
                    }
                  />
                </Stack.Item>
                <Stack.Item>
                  <div style={{ width: "80px" }}>
                    <Select
                      label="Unit"
                      options={[
                        { label: "liters", value: "liters" },
                        { label: "Milliliters", value: "Milliliters" },
                      ]}
                      onChange={(e) => {
                        handleChange(e, "servingSize", "unitBasic", "CA");
                      }}
                      value={servingSize.CA.unitBasic}
                    />
                  </div>
                </Stack.Item>
              </Stack>
              {productToPrepare ? (
                <></>
              ) : (
                <Stack>
                  <TextField
                    label="Calories per serving"
                    onChange={(e) => {
                      handleChange(
                        e,
                        "servingSize",
                        "caloriesPerServingBasic",
                        "CA"
                      );
                    }}
                    value={servingSize.CA.caloriesPerServingBasic}
                  />
                </Stack>
              )}
            </>
          ) : (
            <></>
          )}
          {locationPlan.location === "EU" ? (
            <Stack>
              <Stack.Item fill>
                <TextField
                  label="Default Amount"
                  value={data.servingSize.EU.DefaultAmount}
                  onChange={(e) =>
                    handleChange(e, "servingSize", "DefaultAmount", "EU")
                  }
                  disabled
                />
              </Stack.Item>
              <Stack.Item>
                <SelectElement
                  val={data.servingSize.EU.DefaultAmountUnit}
                  handleChange={handleChange}
                  tag="servingSize"
                  secondTag="EU"
                  name="DefaultAmountUnit"
                />
              </Stack.Item>
              <Stack.Item fill>
                <TextField
                  label="Portion Size"
                  value={data.servingSize.EU.PortionSize}
                  onChange={(e) =>
                    handleChange(e, "servingSize", "PortionSize", "EU")
                  }
                  disabled={locationPlan.plan === "Basic" ? true : false}
                />
              </Stack.Item>
              <Stack.Item>
                <SelectElement
                  val={data.servingSize.EU.PortionSizeUnit}
                  handleChange={handleChange}
                  tag="servingSize"
                  secondTag="EU"
                  name="PortionSizeUnit"
                />
              </Stack.Item>
            </Stack>
          ) : (
            <></>
          )}

          {locationPlan.location === "NA" ? (
            <Stack distribution="fill">
              <TextField
                label="Servings per container"
                value={servingSize.NA.Servingspercontainer}
                onChange={(e) =>
                  handleChange(e, "servingSize", "Servingspercontainer", "NA")
                }
              />

              <Stack.Item>
                <TextField
                  label="Serving reference"
                  value={servingSize.NA.Servingreference}
                  onChange={(e) =>
                    handleChange(e, "servingSize", "Servingreference", "NA")
                  }
                />
              </Stack.Item>
              <Stack.Item>
                <TextField
                  label="serving size"
                  value={servingSize.NA.servingsize}
                  onChange={(e) =>
                    handleChange(e, "servingSize", "servingsize", "NA")
                  }
                />
              </Stack.Item>
              <Stack.Item>
                <SelectElement
                  val={servingSize.NA.unit}
                  handleChange={handleChange}
                  tag="servingSize"
                  secondTag="NA"
                  name="unit"
                />
              </Stack.Item>
            </Stack>
          ) : (
            <></>
          )}
          {productToPrepare && locationPlan.location === "NA" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", gap: "20px" }}
              >
                <div style={{ width: "40%" }}>
                  <TextField
                    label="Unprepared Reference"
                    onChange={(e) =>
                      handleChange(
                        e,
                        "servingSize",
                        "UnpreparedReference",
                        "NA"
                      )
                    }
                    value={servingSize.NA.UnpreparedReference}
                  />
                </div>
                <div style={{ width: "25%" }}>
                  <TextField
                    label="Unprepared calories"
                    onChange={(e) =>
                      handleChange(e, "servingSize", "Unpreparedcalories", "NA")
                    }
                    value={servingSize.NA.Unpreparedcalories}
                  />
                </div>
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "20px" }}
              >
                <div style={{ width: "40%" }}>
                  <TextField
                    label="Prepared Reference"
                    onChange={(e) =>
                      handleChange(e, "servingSize", "PreparedReference", "NA")
                    }
                    value={servingSize.NA.PreparedReference}
                  />
                </div>
                <div style={{ width: "25%" }}>
                  <TextField
                    label="Prepared calories"
                    onChange={(e) =>
                      handleChange(e, "servingSize", "Preparedcalories", "NA")
                    }
                    value={servingSize.NA.Preparedcalories}
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </Card.Section>
        {productToPrepare && locationPlan.location === "CA" ? (
          <>
            <Card.Section title="Unprepared Calories">
              <Stack>
                <Stack.Item fill>
                  <TextField
                    label="Reference"
                    size="small"
                    style={{ minWidth: "150px", marginRight: "10px" }}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "servingSize",
                        "unpreparedReference",
                        "CA"
                      )
                    }
                    value={servingSize.CA.unpreparedReference}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <TextField
                    label="Bilingual reference"
                    size="small"
                    style={{ minWidth: "150px", marginRight: "10px" }}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "servingSize",
                        "unpreparedBilingualReference",
                        "CA"
                      )
                    }
                    value={servingSize.CA.unpreparedBilingualReference}
                  />
                </Stack.Item>

                <Stack.Item>
                  <TextField
                    label="Calories"
                    size="small"
                    style={{ minWidth: "100px", marginRight: "10px" }}
                    onChange={(e) =>
                      handleChange(e, "servingSize", "unpreparedCalories", "CA")
                    }
                    value={servingSize.CA.unpreparedCalories}
                  />
                </Stack.Item>
              </Stack>
            </Card.Section>
            <Card.Section title="prepared Calories">
              <Stack>
                <Stack.Item fill>
                  <TextField
                    label="Reference"
                    size="small"
                    style={{ width: "150px", marginRight: "10px" }}
                    onChange={(e) =>
                      handleChange(e, "servingSize", "preparedReference", "CA")
                    }
                    value={servingSize.CA.preparedReference}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <TextField
                    label="Bilingual reference"
                    size="small"
                    style={{ width: "150px", marginRight: "10px" }}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "servingSize",
                        "preparedBilingualReference",
                        "CA"
                      )
                    }
                    value={servingSize.CA.preparedBilingualReference}
                  />
                </Stack.Item>
                <Stack.Item>
                  <TextField
                    label="Calories"
                    size="small"
                    style={{ width: "100px", marginRight: "10px" }}
                    onChange={(e) =>
                      handleChange(e, "servingSize", "preparedCalories", "CA")
                    }
                    value={servingSize.CA.preparedCalories}
                  />
                </Stack.Item>
              </Stack>
            </Card.Section>
          </>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
}

export default ServingSize;

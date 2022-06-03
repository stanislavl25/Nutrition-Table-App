import {
  Card,
  Heading,
  Layout,
  Select,
  Stack,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";

const SelectElement = ({ val, tag, handleServingSizeChange }) => {
  const [selected, setSelected] = useState(val);

  const handleSelectChange = useCallback((value) => {
    setSelected(value);
    handleServingSizeChange(value, tag, "unitBasic");
  }, []);

  const options = [
    { label: "Grams", value: "Grams" },
    { label: "MilliGrams", value: "MilliGrams" },
  ];

  return (
    <Select
      label="Unit"
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
};

function ServingSize({
  productToPrepare,
  servingSize,
  handleServingSizeChange,
  locationPlan,
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
            <Stack wrap={false}>
              <Stack.Item fill>
                <TextField
                  label="Serving size"
                  value={servingSize.CA.servingSizeBasic || ""}
                  onChange={(e) =>
                    handleServingSizeChange(e, "CA", "servingSizeBasic")
                  }
                />
              </Stack.Item>
              <Stack.Item>
                <TextField
                  label="Serving reference"
                  value={servingSize.CA.servingRefBasic || ""}
                  onChange={(e) =>
                    handleServingSizeChange(e, "CA", "servingRefBasic")
                  }
                />
              </Stack.Item>
              <Stack.Item fill>
                <TextField
                  label="Bilingual reference"
                  value={servingSize.CA.bilingualRefBasic || ""}
                  onChange={(e) =>
                    handleServingSizeChange(e, "CA", "bilingualRefBasic")
                  }
                />
              </Stack.Item>
              <Stack.Item>
                <SelectElement
                  val={servingSize.CA.unitBasic || ""}
                  handleServingSizeChange={handleServingSizeChange}
                  tag="CA"
                />
              </Stack.Item>
            </Stack>
          ) : (
            <></>
          )}
          {locationPlan.location === "EU" ? (
            <Stack wrap={false}>
              <Stack.Item fill>
                <TextField
                  label="Default Amoount"
                  value={servingSize.EU.DefaultAmoount || ""}
                  onChange={(e) =>
                    handleServingSizeChange(e, "EU", "DefaultAmoount")
                  }
                  disabled
                />
              </Stack.Item>
              <Stack.Item>
                <SelectElement
                  val={servingSize.EU.DefaultAmoountUnit || ""}
                  handleServingSizeChange={handleServingSizeChange}
                  tag="EU"
                />
              </Stack.Item>
              <Stack.Item fill>
                <TextField
                  label="Portion Size"
                  value={servingSize.EU.PortionSize || ""}
                  onChange={(e) =>
                    handleServingSizeChange(e, "EU", "PortionSize")
                  }
                  disabled={locationPlan.plan === "Basic" ? true : false}
                />
              </Stack.Item>
              <Stack.Item>
                <SelectElement
                  val={servingSize.EU.PortionSizeUnit || ""}
                  handleServingSizeChange={handleServingSizeChange}
                  tag="EU"
                />
              </Stack.Item>
            </Stack>
          ) : (
            <></>
          )}

          {locationPlan.location === "NA" ? (
            <Stack wrap={false}>
              <Stack.Item fill>
                <TextField
                  label="Servings per container"
                  value={servingSize.NA.Servingspercontainer || ""}
                  onChange={(e) =>
                    handleServingSizeChange(e, "NA", "Servingspercontainer")
                  }
                />
              </Stack.Item>
              <Stack.Item>
                <TextField
                  label="Serving reference"
                  value={servingSize.NA.Servingreference || ""}
                  onChange={(e) =>
                    handleServingSizeChange(e, "NA", "Servingreference")
                  }
                />
              </Stack.Item>
              <Stack.Item fill>
                <TextField
                  label="serving size"
                  value={servingSize.NA.servingsize || ""}
                  onChange={(e) =>
                    handleServingSizeChange(e, "NA", "servingsize")
                  }
                />
              </Stack.Item>
              <Stack.Item>
                <SelectElement
                  val={servingSize.NA.unit || ""}
                  handleServingSizeChange={handleServingSizeChange}
                  tag="NA"
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
              <Stack>
                <Stack.Item>
                  <TextField
                    label="Unprepared Reference"
                    onChange={(e) =>
                      handleServingSizeChange(e, "NA", "UnpreparedReference")
                    }
                    value={servingSize.NA.UnpreparedReference || ""}
                  />
                </Stack.Item>
                <Stack.Item>
                  <TextField
                    label="Unprepared calories"
                    onChange={(e) =>
                      handleServingSizeChange(e, "NA", "Unpreparedcalories")
                    }
                    value={servingSize.NA.Unpreparedcalories || ""}
                  />
                </Stack.Item>
              </Stack>
              <Stack>
                <Stack.Item>
                  <TextField
                    label="Prepared Reference"
                    onChange={(e) =>
                      handleServingSizeChange(e, "NA", "PreparedReference")
                    }
                    value={servingSize.NA.PreparedReference || ""}
                  />
                </Stack.Item>
                <Stack.Item>
                  <TextField
                    label="Prepared calories"
                    onChange={(e) =>
                      handleServingSizeChange(e, "NA", "Preparedcalories")
                    }
                    value={servingSize.NA.Preparedcalories || ""}
                  />
                </Stack.Item>
              </Stack>
            </div>
          ) : (
            <></>
          )}

          {/* {locationPlan.location === "CA" ? (
            <div>
              <label style={{ minWidth: "100px", marginBottom: "30px" }}>
                Calories per serving
              </label>
              <Stack>
                <TextField
                  size="small"
                  value={servingSizeCA.caloriesPerServingBasic || ""}
                  onChange={(e) =>
                    handleServingSizeChange(e, "caloriesPerServingBasic")
                  }
                />
              </Stack>
            </div>
          ) : (
            <></>
          )} */}
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
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <TextField
                    label="Bilingual reference"
                    size="small"
                    style={{ minWidth: "150px", marginRight: "10px" }}
                  />
                </Stack.Item>

                <Stack.Item>
                  <TextField
                    label="Calories"
                    size="small"
                    style={{ minWidth: "100px", marginRight: "10px" }}
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
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <TextField
                    label="Bilingual reference"
                    size="small"
                    style={{ width: "150px", marginRight: "10px" }}
                  />
                </Stack.Item>
                <Stack.Item>
                  <TextField
                    label="Calories"
                    size="small"
                    style={{ width: "100px", marginRight: "10px" }}
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

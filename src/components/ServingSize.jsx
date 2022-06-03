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

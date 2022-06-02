import {
  Card,
  Heading,
  Layout,
  Select,
  Stack,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";

const SelectElement = ({ val, handleServingSizeCAChange }) => {
  const [selected, setSelected] = useState(val);

  const handleSelectChange = useCallback((value) => {
    setSelected(value);
    handleServingSizeCAChange(value, "unitBasic");
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
  servingSizeCA,
  handleServingSizeCAChange,
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
          <Stack wrap={false}>
            <Stack.Item fill>
              <TextField
                label="Serving size"
                value={servingSizeCA.servingSizeBasic || ""}
                onChange={(e) =>
                  handleServingSizeCAChange(e, "servingSizeBasic")
                }
              />
            </Stack.Item>
            <Stack.Item>
              <TextField
                label="Serving reference"
                value={servingSizeCA.servingRefBasic || ""}
                onChange={(e) =>
                  handleServingSizeCAChange(e, "servingRefBasic")
                }
              />
            </Stack.Item>
            <Stack.Item fill>
              <TextField
                label="Bilingual reference"
                value={servingSizeCA.bilingualRefBasic || ""}
                onChange={(e) =>
                  handleServingSizeCAChange(e, "bilingualRefBasic")
                }
              />
            </Stack.Item>
            <Stack.Item>
              <SelectElement
                val={servingSizeCA.unitBasic || ""}
                handleServingSizeCAChange={handleServingSizeCAChange}
              />
            </Stack.Item>
          </Stack>
          {locationPlan.location === "CA" ? (
            <div>
              <label style={{ minWidth: "100px", marginBottom: "30px" }}>
                Calories per serving
              </label>
              <Stack>
                <TextField
                  size="small"
                  value={servingSizeCA.caloriesPerServingBasic || ""}
                  onChange={(e) =>
                    handleServingSizeCAChange(e, "caloriesPerServingBasic")
                  }
                />
              </Stack>
            </div>
          ) : (
            <></>
          )}
        </Card.Section>
        {productToPrepare ? (
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

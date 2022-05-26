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
          <div>
            <Card.Section title="Unprepared Calories">
              <div
                style={{
                  display: "flex",
                }}
              >
                <label style={{ minWidth: "150px", marginRight: "10px" }}>
                  Reference
                </label>
                <label style={{ minWidth: "150px", marginRight: "10px" }}>
                  Bilingual reference
                </label>
                <label style={{ minWidth: "100px", marginRight: "10px" }}>
                  Calories
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <TextField
                  size="small"
                  style={{ minWidth: "150px", marginRight: "10px" }}
                />
                <TextField
                  size="small"
                  style={{ minWidth: "150px", marginRight: "10px" }}
                />
                <TextField
                  size="small"
                  style={{ minWidth: "100px", marginRight: "10px" }}
                />
              </div>
            </Card.Section>
            <Card.Section title="prepared Calories">
              <div
                style={{
                  display: "flex",
                }}
              >
                <label style={{ minWidth: "150px", marginRight: "10px" }}>
                  Reference
                </label>
                <label style={{ minWidth: "150px", marginRight: "10px" }}>
                  Bilingual reference
                </label>
                <label style={{ minWidth: "100px", marginRight: "10px" }}>
                  Calories
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <TextField
                  size="small"
                  style={{ width: "150px", marginRight: "10px" }}
                />
                <TextField
                  size="small"
                  style={{ width: "150px", marginRight: "10px" }}
                />
                <TextField
                  size="small"
                  style={{ width: "100px", marginRight: "10px" }}
                />
              </div>
            </Card.Section>
          </div>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
}

export default ServingSize;

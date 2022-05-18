import { Card, Heading, Layout, Select, TextField } from "@shopify/polaris";
import React, { useCallback, useState } from "react";

const SelectElement = ({ val, handleServingSizeCAChange }) => {
  const [selected, setSelected] = useState(val);

  const handleSelectChange = useCallback((value) => {
    setSelected(value);
    handleServingSizeCAChange(value, "unitBasic");
  }, []);

  const options = [
    { label: "Liters", value: "Liters" },
    { label: "Milliliters", value: "Milliliters" },
  ];

  return (
    <div style={{ marginRight: "10px" }}>
      <Select
        label=""
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />
    </div>
  );
};
function ServingSize({
  productToPrepare,
  servingSizeCA,
  handleServingSizeCAChange,
}) {
  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <Card title="Serving Size">
        <Card.Section>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <label style={{ minWidth: "100px", marginLeft: "10px" }}>
              Serving size
            </label>
            <label style={{ minWidth: "130px", marginLeft: "10px" }}>
              Serving reference
            </label>
            <label style={{ minWidth: "140px", marginLeft: "10px" }}>
              Bilingual reference
            </label>
            <label style={{ minWidth: "100px", marginLeft: "10px" }}>
              Unit
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
              value={servingSizeCA.servingSizeBasic || ""}
              onChange={(e) => handleServingSizeCAChange(e, "servingSizeBasic")}
            />
            <TextField
              value={servingSizeCA.servingRefBasic || ""}
              onChange={(e) => handleServingSizeCAChange(e, "servingRefBasic")}
            />
            <TextField
              value={servingSizeCA.bilingualRefBasic || ""}
              onChange={(e) =>
                handleServingSizeCAChange(e, "bilingualRefBasic")
              }
            />
            <div>
              <SelectElement
                val={servingSizeCA.unitBasic || ""}
                handleServingSizeCAChange={handleServingSizeCAChange}
              />
            </div>
          </div>
          <div>
            <label style={{ minWidth: "100px", marginBottom: "30px" }}>
              Calories per serving
            </label>
            <TextField
              size="small"
              value={servingSizeCA.caloriesPerServingBasic || ""}
              onChange={(e) =>
                handleServingSizeCAChange(e, "caloriesPerServingBasic")
              }
            />
          </div>
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

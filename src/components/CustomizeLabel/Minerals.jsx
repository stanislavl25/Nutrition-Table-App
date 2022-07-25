import {
  Banner,
  Button,
  Card,
  FormLayout,
  Heading,
  Popover,
  Select,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";

const PopoverElement = ({ element, removeFormFields, handleChange, index }) => {
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
  return (
    <Popover
      sectioned
      active={popoverActive}
      activator={activator}
      autofocusTarget="first-node"
      onClose={togglePopoverActive}
    >
      <FormLayout>
        <TextField
          label="%RI*"
          type="text"
          name="RI"
          value={element.RI || ""}
          onChange={(e) => handleChange(e, "minerals", "RI", index)}
        />{" "}
        <TextField
          label="Left Spacing (Table)"
          type="number"
          name="LeftSpacing"
          value={element.LeftSpacing || ""}
          onChange={(e) => handleChange(e, "minerals", "LeftSpacing", index)}
        />
        {/* <TextField
          label="Order"
          type="number"
          name="Name"
          value={element.order || ""}
          onChange={(e) => handleChange(e, "minerals", "order", index)}
          inputMode="numeric"
        /> */}
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

const options = [
  { label: "Grams", value: "g" },
  { label: "Miligrams", value: "Mg" },
];
const SelectElement = ({ unit, handleChange, index }) => {
  return (
    <div>
      <Select
        label=""
        options={options}
        onChange={(e) => handleChange(e, "minerals", "unit", index)}
        value={unit}
      />
    </div>
  );
};

function Minerals({
  data,
  locationPlan,
  handleAddMinerals,
  handleRemoveMinerals,
  handleChange,
}) {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 20px 10px 20px",
        }}
      >
        <Heading>Minerals</Heading>
        <Button
          variant="contained"
          className="button add"
          type="button"
          onClick={() => handleAddMinerals()}
          style={{ margin: "4px" }}
          primary
          disabled={
            locationPlan?.plan === "basic" && locationPlan?.location !== "EU"
              ? true
              : false
          }
        >
          Add
        </Button>
      </div>
      {locationPlan?.plan === "basic" && locationPlan?.location !== "EU" ? (
        <TextContainer>
          <Banner status="warning">
            Upgrade your plan to add more Vitamins
          </Banner>
        </TextContainer>
      ) : (
        <></>
      )}
      {data.length === 0 ? (
        <div style={{ textAlign: "center", paddingBottom: "20px" }}>
          <p>Click add to create a new Mineral</p>
        </div>
      ) : (
        <div
          style={{
            borderCollapse: "separate",
            display: "inline-table",
            borderSpacing: "1em .5em",
            marginBottom: "10px",
            width: "100%",
          }}
        >
          {locationPlan.location === "CA" || locationPlan.location === "NA" ? (
            <div style={{ display: "table-header-group", width: "100%" }}>
              <label style={{ display: "table-cell" }}>Name</label>
              <label style={{ display: "table-cell" }}>Quantity</label>
              <label style={{ display: "table-cell" }}>Unit</label>
              <label style={{ display: "table-cell" }}>% Daily value*</label>
            </div>
          ) : (
            <div style={{ display: "table-header-group", width: "100%" }}>
              <label style={{ display: "table-cell" }}>Name</label>
              <label style={{ display: "table-cell" }}>Per 100 g</label>
              <label style={{ display: "table-cell" }}>Per portion 25 g</label>
              <label style={{ display: "table-cell" }}>Unit</label>
            </div>
          )}
          {/* <hr style={{ borderTop: "1px solid #cecece" }} /> */}
          <div
            style={{
              display: "table-row-group",
              width: "100%",
            }}
          >
            {locationPlan.location === "CA" || locationPlan.location === "NA"
              ? data.map((element, index) => (
                  <div
                    className="form-inline"
                    key={index}
                    style={{
                      display: "table-row",
                      paddingTop: "10px",
                    }}
                  >
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <TextField
                        size="small"
                        type="text"
                        variant="outlined"
                        name="Name"
                        value={element.name || ""}
                        onChange={(e) =>
                          handleChange(e, "minerals", "name", index)
                        }
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <TextField
                        size="small"
                        variant="outlined"
                        type="text"
                        name="quantity"
                        value={element.quantity || ""}
                        onChange={(e) =>
                          handleChange(e, "minerals", "quantity", index)
                        }
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <SelectElement
                        unit={element.unit}
                        handleChange={handleChange}
                        index={index}
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <TextField
                        size="small"
                        variant="outlined"
                        type="text"
                        name="dailyValue"
                        value={element.dailyValue || ""}
                        onChange={(e) =>
                          handleChange(e, "minerals", "dailyValue", index)
                        }
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto" }}>
                      <PopoverElement
                        element={element}
                        removeFormFields={handleRemoveMinerals}
                        handleChange={handleChange}
                        index={index}
                      />
                    </div>
                  </div>
                ))
              : data.map((element, index) => (
                  <div
                    className="form-inline"
                    key={index}
                    style={{
                      display: "table-row",
                      paddingTop: "10px",
                    }}
                  >
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <TextField
                        size="small"
                        type="text"
                        variant="outlined"
                        name="Name"
                        value={element.name || ""}
                        onChange={(e) =>
                          handleChange(e, "minerals", "name", index)
                        }
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <TextField
                        size="small"
                        variant="outlined"
                        type="text"
                        name="per100g"
                        value={element.per100g || ""}
                        onChange={(e) =>
                          handleChange(e, "minerals", "per100g", index)
                        }
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <TextField
                        size="small"
                        variant="outlined"
                        type="text"
                        name="perportion"
                        value={element.perportion || ""}
                        onChange={(e) =>
                          handleChange(e, "minerals", "perportion", index)
                        }
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <SelectElement
                        unit={element.unit}
                        handleChange={handleChange}
                        index={index}
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto" }}>
                      <PopoverElement
                        element={element}
                        removeFormFields={handleRemoveMinerals}
                        handleChange={handleChange}
                        index={index}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )}
    </Card>
  );
}

export default Minerals;

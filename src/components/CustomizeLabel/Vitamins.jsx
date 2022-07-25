import {
  Button,
  Card,
  Heading,
  Popover,
  FormLayout,
  Select,
  TextField,
  TextContainer,
  Banner,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";

const PopoverElement = ({ element, removeFormFields, handleChange, index }) => {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    (test) => setPopoverActive((popoverActive) => !popoverActive),

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
          name="Name"
          value={element.RI || ""}
          onChange={(e) => handleChange(e, "vitamins", "RI", index)}
        />
        <TextField
          label="Left Spacing (Table)"
          type="text"
          name="Name"
          value={element.LeftSpacing || ""}
          onChange={(e) => handleChange(e, "vitamins", "LeftSpacing", index)}
        />
        {/* <TextField
          label="Order"
          type="text"
          name="Name"
          value={element.order || ""}
          onChange={(e) => handleChange(e, "vitamins", "order", index)}
        /> */}
        <Button destructive outline onClick={() => removeFormFields(index)}>
          Delete
        </Button>
      </FormLayout>
    </Popover>
  );
};

const SelectElement = ({ index, handleChange, unit }) => {
  const options = [
    { label: "Grams", value: "g" },
    { label: "Miligrams", value: "Mg" },
  ];

  return (
    <div style={{ minWidth: "60px" }}>
      <Select
        label=""
        options={options}
        onChange={(e) => handleChange(e, "vitamins", "unit", index)}
        value={unit}
      />
    </div>
  );
};

function Vitamins({
  data,
  locationPlan,
  handleAddVitamins,
  handleRemoveVitamins,
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
          padding: "20px",
        }}
      >
        <Heading>Vitamins</Heading>
        <Button
          variant="contained"
          className="button add"
          type="button"
          onClick={() => handleAddVitamins()}
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
          <p>Click add to create a new Vitamin</p>
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
            <div
              style={{
                display: "table-header-group",
                width: "100%",
              }}
            >
              <label style={{ display: "table-cell" }}>Name</label>
              <label style={{ display: "table-cell" }}>Quantity</label>
              <label style={{ display: "table-cell" }}>Unit</label>
              <label style={{ display: "table-cell" }}>% Daily value*</label>
            </div>
          ) : (
            <div
              style={{
                display: "table-header-group",
                width: "100%",
              }}
            >
              <label style={{ display: "table-cell" }}>Name</label>
              <label style={{ display: "table-cell" }}>Per 100 g</label>
              <label style={{ display: "table-cell" }}>Per portion 25 g</label>
              <label style={{ display: "table-cell" }}>Unit</label>
            </div>
          )}
          <div
            style={{
              marginRight: "10px",
              display: "table-row-group",
              width: "100%",
            }}
          >
            {locationPlan.location === "CA" || locationPlan.location === "NA"
              ? data.map((element, index) => (
                  <div
                    key={index}
                    style={{
                      display: "table-row",
                    }}
                  >
                    <div
                      style={{
                        flex: "1 0 0 auto",
                        display: "table-cell",
                      }}
                    >
                      <TextField
                        type="text"
                        name="name"
                        value={element.name || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "name", index)
                        }
                      />
                    </div>
                    <div
                      style={{
                        flex: "1 0 0 auto",
                        display: "table-cell",
                      }}
                    >
                      <TextField
                        type="text"
                        name="quantity"
                        value={element.quantity || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "quantity", index)
                        }
                      />
                    </div>
                    <div
                      style={{
                        flex: "1 0 0 auto",
                        display: "table-cell",
                      }}
                    >
                      <SelectElement
                        index={index}
                        handleChange={handleChange}
                        unit={element.unit}
                      />
                    </div>
                    <div
                      style={{
                        flex: "1 0 0 auto",
                        display: "table-cell",
                      }}
                    >
                      <TextField
                        type="text"
                        name="dailyValue"
                        value={element.dailyValue || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "dailyValue", index)
                        }
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto" }}>
                      <PopoverElement
                        element={element}
                        removeFormFields={handleRemoveVitamins}
                        handleChange={handleChange}
                        index={index}
                      />
                    </div>
                  </div>
                ))
              : data.map((element, index) => (
                  <div
                    key={index}
                    style={{
                      display: "table-row",
                    }}
                  >
                    <div
                      style={{
                        flex: "1 0 0 auto",
                        display: "table-cell",
                      }}
                    >
                      <TextField
                        type="text"
                        name="name"
                        value={element.name || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "name", index)
                        }
                      />
                    </div>
                    <div
                      style={{
                        flex: "1 0 0 auto",
                        display: "table-cell",
                      }}
                    >
                      <TextField
                        type="text"
                        name="per100g"
                        value={element.per100g || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "per100g", index)
                        }
                      />
                    </div>
                    <div
                      style={{
                        flex: "1 0 0 auto",
                        display: "table-cell",
                      }}
                    >
                      <TextField
                        type="text"
                        name="perportion"
                        value={element.perportion || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "perportion", index)
                        }
                      />
                    </div>
                    <div
                      style={{
                        flex: "1 0 0 auto",
                        display: "table-cell",
                      }}
                    >
                      <SelectElement
                        index={index}
                        handleChange={handleChange}
                        unit={element.unit}
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto" }}>
                      <PopoverElement
                        element={element}
                        removeFormFields={handleRemoveVitamins}
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

export default Vitamins;

import {
  Button,
  Card,
  Heading,
  Popover,
  FormLayout,
  Select,
  TextField,
  Stack,
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
        <TextField
          label="Order"
          type="text"
          name="Name"
          value={element.order || ""}
          onChange={(e) => handleChange(e, "vitamins", "order", index)}
        />
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
        <form>
          {locationPlan.location === "CA" || locationPlan.location === "NA" ? (
            <div style={{ display: "flex", padding: "0px 20px 0px 20px" }}>
              <label style={{ marginRight: "170px" }}>Name</label>
              <label style={{ marginRight: "110px" }}>Quantity</label>
              <label style={{ marginRight: "80px" }}>Unit</label>
              <label style={{ marginRight: "20px" }}>% Daily value*</label>
            </div>
          ) : (
            <div style={{ display: "flex", padding: "0px 20px 0px 20px" }}>
              <label style={{ marginRight: "170px" }}>Name</label>
              <label style={{ marginRight: "110px" }}>Per 100 g</label>
              <label style={{ marginRight: "80px" }}>Per portion 25 g</label>
              <label style={{ marginRight: "20px" }}>Unit</label>
            </div>
          )}
          <hr style={{ borderTop: "1px solid #cecece", width: "100%" }} />
          <div style={{ padding: "20px 20px 20px 20px", marginRight: "10px" }}>
            {locationPlan.location === "CA" || locationPlan.location === "NA"
              ? data.map((element, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "20px",
                    }}
                  >
                    <div style={{ maxWidth: "200px", marginRight: "20px" }}>
                      <TextField
                        type="text"
                        name="name"
                        value={element.name || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "name", index)
                        }
                      />
                    </div>
                    <div style={{ maxWidth: "150px", marginRight: "20px" }}>
                      <TextField
                        type="text"
                        name="quantity"
                        value={element.quantity || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "quantity", index)
                        }
                      />
                    </div>
                    <div style={{ maxWidth: "75px", marginRight: "20px" }}>
                      <SelectElement
                        index={index}
                        handleChange={handleChange}
                        unit={element.unit}
                      />
                    </div>
                    <div style={{ maxWidth: "150px", marginRight: "20px" }}>
                      <TextField
                        type="text"
                        name="perportion"
                        value={element.perportion || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "perportion", index)
                        }
                      />
                    </div>
                    <Stack.Item fill>
                      <PopoverElement
                        element={element}
                        removeFormFields={handleRemoveVitamins}
                        handleChange={handleChange}
                        index={index}
                      />
                    </Stack.Item>
                  </div>
                ))
              : data.map((element, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "20px",
                    }}
                  >
                    <div style={{ maxWidth: "200px", marginRight: "20px" }}>
                      <TextField
                        type="text"
                        name="name"
                        value={element.name || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "name", index)
                        }
                      />
                    </div>
                    <div style={{ maxWidth: "150px", marginRight: "20px" }}>
                      <TextField
                        type="text"
                        name="per100g"
                        value={element.per100g || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "per100g", index)
                        }
                      />
                    </div>
                    <div style={{ maxWidth: "150px", marginRight: "20px" }}>
                      <TextField
                        type="text"
                        name="perportion"
                        value={element.perportion || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "perportion", index)
                        }
                      />
                    </div>
                    <div style={{ maxWidth: "75px", marginRight: "20px" }}>
                      <SelectElement
                        index={index}
                        handleChange={handleChange}
                        unit={element.unit}
                      />
                    </div>
                    <Stack.Item fill>
                      <PopoverElement
                        element={element}
                        removeFormFields={handleRemoveVitamins}
                        handleChange={handleChange}
                        index={index}
                      />
                    </Stack.Item>
                  </div>
                ))}
          </div>
        </form>
      )}
    </Card>
  );
}

export default Vitamins;

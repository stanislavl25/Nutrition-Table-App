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
        <TextField
          label="Order"
          type="number"
          name="Name"
          value={element.order || ""}
          onChange={(e) => handleChange(e, "minerals", "order", index)}
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
        <form>
          {locationPlan.location === "CA" || locationPlan.location === "NA" ? (
            <div style={{ display: "flex", padding: "0px 20px 0px 20px " }}>
              <label style={{ marginRight: "170px" }}>Name</label>
              <label style={{ marginRight: "110px" }}>Quantity</label>
              <label style={{ marginRight: "70px" }}>Unit</label>
              <label style={{ marginRight: "20px" }}>% Daily value*</label>
            </div>
          ) : (
            <div style={{ display: "flex", padding: "0px 20px 0px 20px " }}>
              <label style={{ marginRight: "170px" }}>Name</label>
              <label style={{ marginRight: "110px" }}>Per 100 g</label>
              <label style={{ marginRight: "70px" }}>Per portion 25 g</label>
              <label style={{ marginRight: "20px" }}>Unit</label>
            </div>
          )}
          <hr style={{ borderTop: "1px solid #cecece" }} />
          {locationPlan.location === "CA" || locationPlan.location === "NA"
            ? data.map((element, index) => (
                <div
                  className="form-inline"
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "20px 20px 10px 20px",
                  }}
                >
                  <div style={{ maxWidth: "200px", marginRight: "20px" }}>
                    <TextField
                      size="small"
                      style={{ width: "150px", marginRight: "10px" }}
                      type="text"
                      variant="outlined"
                      name="Name"
                      value={element.name || ""}
                      onChange={(e) =>
                        handleChange(e, "minerals", "name", index)
                      }
                    />
                  </div>
                  <div style={{ maxWidth: "150px", marginRight: "20px" }}>
                    <TextField
                      size="small"
                      style={{ width: "90px", marginRight: "10px" }}
                      variant="outlined"
                      type="text"
                      name="quantity"
                      value={element.quantity || ""}
                      onChange={(e) =>
                        handleChange(e, "minerals", "quantity", index)
                      }
                    />
                  </div>
                  <div style={{ maxWidth: "80px", marginRight: "20px" }}>
                    <SelectElement
                      unit={element.unit}
                      handleChange={handleChange}
                      index={index}
                    />
                  </div>
                  <div style={{ maxWidth: "150px", marginRight: "20px" }}>
                    <TextField
                      style={{ width: "130px", marginRight: "10px" }}
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
                  <PopoverElement
                    element={element}
                    removeFormFields={handleRemoveMinerals}
                    handleChange={handleChange}
                    index={index}
                  />
                </div>
              ))
            : data.map((element, index) => (
                <div
                  className="form-inline"
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "20px 20px 10px 20px",
                  }}
                >
                  <div style={{ maxWidth: "200px", marginRight: "20px" }}>
                    <TextField
                      size="small"
                      style={{ width: "150px", marginRight: "10px" }}
                      type="text"
                      variant="outlined"
                      name="Name"
                      value={element.name || ""}
                      onChange={(e) =>
                        handleChange(e, "minerals", "name", index)
                      }
                    />
                  </div>
                  <div style={{ maxWidth: "150px", marginRight: "20px" }}>
                    <TextField
                      size="small"
                      style={{ width: "90px", marginRight: "10px" }}
                      variant="outlined"
                      type="text"
                      name="per100g"
                      value={element.per100g || ""}
                      onChange={(e) =>
                        handleChange(e, "minerals", "per100g", index)
                      }
                    />
                  </div>
                  <div style={{ maxWidth: "150px", marginRight: "20px" }}>
                    <TextField
                      style={{ width: "130px", marginRight: "10px" }}
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
                  <div style={{ maxWidth: "75px", marginRight: "20px" }}>
                    <SelectElement
                      unit={element.unit}
                      handleChange={handleChange}
                      index={index}
                    />
                  </div>
                  <PopoverElement
                    element={element}
                    removeFormFields={handleRemoveMinerals}
                    handleChange={handleChange}
                    index={index}
                  />
                </div>
              ))}
        </form>
      )}
    </Card>
  );
}

export default Minerals;

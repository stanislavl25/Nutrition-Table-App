// import { TextField } from "@mui/material";
import {
  Button,
  Card,
  Heading,
  Popover,
  FormLayout,
  Select,
  TextField,
  Layout,
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
          onChange={(e) => handleChange(e, "RI", index)}
        />
        <TextField
          label="Left Spacing (Table)"
          type="text"
          name="Name"
          value={element.LeftSpacing || ""}
          onChange={(e) => handleChange(e, "LeftSpacing", index)}
        />
        <TextField
          label="Order"
          type="text"
          name="Name"
          value={element.order || ""}
          onChange={(e) => handleChange(e, "order", index)}
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
        onChange={(e) => handleChange(e, "unit", index)}
        value={unit}
      />
    </div>
  );
};

function Vitamins({ data, defaultSet, locationPlan }) {
  const [formValues, setFormValues] = useState([
    {
      name: "Vitamin C",
      per100g: "14.81",
      perportion: "4.5",
      LeftSpacing: "",
      order: "",
      RI: "",
    },
  ]);

  let handleChange = useCallback((e, tag, i) => {
    let newFormValues = [...formValues];
    newFormValues[i][tag] = e;
    setFormValues(newFormValues);
  });

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        name: "",
        per100g: "",
        perportion: "",
        LeftSpacing: "",
        order: "",
        RI: "",
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  let handleSave = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formValues));
    // const fetchOptions = {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formValues),
    // };

    // const data = await fetch("/addCustomFields", fetchOptions)
    //   .then((res) => res.json())
    //   .then((messages) => {
    //     (response) => console.log(response);
    //   });
  };

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
          onClick={() => addFormFields()}
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
        <form onSubmit={handleSave}>
          <div style={{ display: "flex", padding: "0px 20px 0px 20px" }}>
            <label style={{ marginRight: "170px" }}>Name</label>
            <label style={{ marginRight: "110px" }}>Per 100 g</label>
            <label style={{ marginRight: "80px" }}>Per portion 25 g</label>
            <label style={{ marginRight: "20px" }}>Unit</label>
          </div>
          <hr style={{ borderTop: "1px solid #cecece", width: "100%" }} />
          <div style={{ padding: "20px 20px 20px 20px", marginRight: "10px" }}>
            {data.map((element, index) => (
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
                    onChange={(e) => handleChange(e, "name", index)}
                  />
                </div>
                <div style={{ maxWidth: "150px", marginRight: "20px" }}>
                  <TextField
                    type="text"
                    name="per100g"
                    value={element.per100g || ""}
                    onChange={(e) => handleChange(e, "per100g", index)}
                  />
                </div>
                {/* <Stack.Item fill></Stack.Item> */}
                <div style={{ maxWidth: "150px", marginRight: "20px" }}>
                  <TextField
                    type="text"
                    name="perportion"
                    value={element.perportion || ""}
                    onChange={(e) => handleChange(e, "perportion", index)}
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
                    removeFormFields={removeFormFields}
                    handleChange={handleChange}
                    index={index}
                  />
                </Stack.Item>
              </div>
            ))}
          </div>
          <div className="button-section">
            {/* <Button
            className="button submit"
            type="submit"
            variant="contained"
            style={{ margin: "4px" }}
            >
            Save
          </Button> */}
          </div>
        </form>
      )}
    </Card>
  );
}

export default Vitamins;

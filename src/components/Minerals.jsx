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
          onChange={(e) => handleChange(e, "RI", index)}
        />{" "}
        <TextField
          label="Left Spacing (Table)"
          type="text"
          name="LeftSpacing"
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

const SelectElement = ({ unit, handleChange, index }) => {
  const options = [
    { label: "Grams", value: "g" },
    { label: "Miligrams", value: "Mg" },
  ];

  return (
    <div>
      <Select
        label=""
        options={options}
        onChange={(e) => handleChange(e, "unit", index)}
        value={unit}
      />
    </div>
  );
};

function Minerals({ data, locationPlan, defaultSet }) {
  const [formValues, setFormValues] = useState([]);
  let handleChange = useCallback((e, tag, i) => {
    console.log(e);
    let newFormValues = [...formValues];
    newFormValues[i][tag] = e;
    setFormValues(newFormValues);
  });

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        Name: "",
        Per100g: "",
        Perportion25g: "",
        unit: "Grams",
        order: "",
        LeftSpacing: "",
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
          padding: "20px 20px 10px 20px",
        }}
      >
        <Heading>Minerals</Heading>
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
          <p>Click add to create a new Mineral</p>
        </div>
      ) : (
        <form onSubmit={handleSave}>
          <div style={{ display: "flex", padding: "0px 20px 0px 20px " }}>
            <label style={{ marginRight: "170px" }}>Name</label>
            <label style={{ marginRight: "110px" }}>Per 100 g</label>
            <label style={{ marginRight: "70px" }}>Per portion 25 g</label>
            <label style={{ marginRight: "20px" }}>Unit</label>
          </div>
          <hr style={{ borderTop: "1px solid #cecece" }} />

          {data.map((element, index) => (
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
                  value={element.Name || ""}
                  onChange={(e) => handleChange(e, "Name", index)}
                />
              </div>
              <div style={{ maxWidth: "150px", marginRight: "20px" }}>
                <TextField
                  size="small"
                  style={{ width: "90px", marginRight: "10px" }}
                  variant="outlined"
                  type="text"
                  name="Per100g"
                  value={element.Per100g || ""}
                  onChange={(e) => handleChange(e, "Per100g", index)}
                />
              </div>
              <div style={{ maxWidth: "150px", marginRight: "20px" }}>
                <TextField
                  style={{ width: "130px", marginRight: "10px" }}
                  size="small"
                  variant="outlined"
                  type="text"
                  name="Perportion25g"
                  value={element.Perportion25g || ""}
                  onChange={(e) => handleChange(e, "Perportion25g", index)}
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
                removeFormFields={removeFormFields}
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

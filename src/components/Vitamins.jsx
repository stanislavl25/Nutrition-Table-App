// import { TextField } from "@mui/material";
import {
  Button,
  Card,
  Heading,
  Popover,
  FormLayout,
  Select,
  TextField,
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

  const Label = (text) => {
    return <label>{text}</label>;
  };
  const MoreContent1 = (item) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {Label("%RI*")}
        <TextField
          style={{ marginBottom: "10px" }}
          size="small"
          type="text"
          variant="outlined"
          name="Name"
          value={item.RI || ""}
          onChange={(e) => handleChange(index, e)}
        />
      </div>
    );
  };
  const MoreContent2 = (item) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {Label("Left Spacing (Table)")}
        <TextField
          style={{ marginBottom: "10px" }}
          size="small"
          type="text"
          variant="outlined"
          name="Name"
          value={item.LeftSpacing || ""}
          onChange={(e) => handleChange(index, e)}
        />
      </div>
    );
  };
  const MoreContent3 = (item) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {Label("Order")}
        <TextField
          size="small"
          style={{ marginBottom: "10px" }}
          type="text"
          variant="outlined"
          name="Name"
          value={item.order || ""}
          onChange={(e) => handleChange(index, e)}
        />
      </div>
    );
  };
  return (
    <Popover
      sectioned
      active={popoverActive}
      activator={activator}
      autofocusTarget="first-node"
      onClose={togglePopoverActive}
    >
      <FormLayout>
        <MoreContent1 item={element} />
        <MoreContent2 item={element} />
        <MoreContent3 item={element} />
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

const SelectElement = () => {
  const [selected, setSelected] = useState("Grams");

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    { label: "Grams", value: "g" },
    { label: "Miligrams", value: "Mg" },
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

function Vitamins() {
  const [formValues, setFormValues] = useState([
    { name: "Vitamin C", per100g: "14.81", perportion: "4.5" },
  ]);

  const handleChange = useCallback((e, i, name) => {
    console.log(e);
    console.log(i);
    console.log(name);
    let newFormValues = [...formValues];
    newFormValues[i][name] = e;
    setFormValues(newFormValues);
  }, []);

  let addFormFields = () => {
    setFormValues([...formValues, { name: "", per100g: "", perportion: "" }]);
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
    <Card sectioned>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
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
        >
          Add
        </Button>
      </div>

      {formValues.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <p>Click add to create a new Vitamin</p>
        </div>
      ) : (
        <form onSubmit={handleSave}>
          <div style={{ display: "flex" }}>
            <label style={{ width: "150px", marginRight: "10px" }}>Name</label>
            <label style={{ width: "90px", marginRight: "10px" }}>
              Per 100 g
            </label>
            <label style={{ width: "130px", marginRight: "10px" }}>
              Per portion 25 g
            </label>
            <label style={{ width: "100px", marginRight: "10px" }}>Unit</label>
          </div>
          <hr style={{ borderTop: "1px solid #cecece" }} />
          {formValues.map((element, index) => (
            <div
              className="form-inline"
              key={index}
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
                type="text"
                variant="outlined"
                name="name"
                value={element.name || ""}
                onChange={(e) => handleChange(e, index, "name")}
              />
              <TextField
                size="small"
                style={{ width: "90px", marginRight: "10px" }}
                variant="outlined"
                type="text"
                name="per100g"
                value={element.per100g || ""}
                onChange={(e) => handleChange(e, index, "per100g")}
              />
              <TextField
                style={{ width: "130px", marginRight: "10px" }}
                size="small"
                variant="outlined"
                type="text"
                name="perportion"
                value={element.perportion || ""}
                onChange={(e) => handleChange(e, index, "perportion")}
              />
              <SelectElement />
              <PopoverElement
                element={element}
                removeFormFields={removeFormFields}
                handleChange={handleChange}
                index={index}
              />
            </div>
          ))}
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

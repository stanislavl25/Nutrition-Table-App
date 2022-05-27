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
    <div style={{ minWidth: "60px" }}>
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
          <div style={{ display: "flex", padding: "0px 20px 0px 20px" }}>
            <label style={{ width: "140px", marginRight: "10px" }}>Name</label>
            <label style={{ width: "70px", marginRight: "75px" }}>
              Per 100 g
            </label>
            <label style={{ width: "120px", marginRight: "20px" }}>
              Per portion 25 g
            </label>
            <label style={{ width: "100px", marginRight: "10px" }}>Unit</label>
          </div>
          <hr style={{ borderTop: "1px solid #cecece", width: "100%" }} />
          <div style={{ padding: "20px 20px 20px 10px", marginRight: "10px" }}>
            {formValues.map((element, index) => (
              <Stack wrap={false} className="form-inline" key={index}>
                <Stack.Item fill>
                  <TextField
                    type="text"
                    name="name"
                    value={element.name || ""}
                    onChange={(e) => handleChange(e, index, "name")}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <TextField
                    type="text"
                    name="per100g"
                    value={element.per100g || ""}
                    onChange={(e) => handleChange(e, index, "per100g")}
                  />
                </Stack.Item>
                <Stack.Item fill></Stack.Item>
                <Stack.Item fill>
                  <TextField
                    type="text"
                    name="perportion"
                    value={element.perportion || ""}
                    onChange={(e) => handleChange(e, index, "perportion")}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <SelectElement />
                </Stack.Item>
                <Stack.Item fill>
                  <PopoverElement
                    element={element}
                    removeFormFields={removeFormFields}
                    handleChange={handleChange}
                    index={index}
                  />
                </Stack.Item>
              </Stack>
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

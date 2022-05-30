import {
  Banner,
  Button,
  Card,
  FormLayout,
  Page,
  Popover,
  Select,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";

const Edit = ({ index, element, handleChange, handleDelete }) => {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const activator = (
    <Button onClick={togglePopoverActive} primary>
      Edit
    </Button>
  );

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
      ariaHaspopup={false}
      autofocusTarget="none"
      preventFocusOnClose={false}
      sectioned
    >
      <FormLayout>
        <TextField
          label="Name"
          value={element.name}
          onChange={(e) => handleChange(e, index, "name")}
          autoComplete="off"
          inputMode="text"
        />
        <TextField
          label="Quantity"
          value={element.quantity}
          onChange={(e) => handleChange(e, index, "quantity")}
          autoComplete="off"
          inputMode="number"
        />
        <Select
          label="Show all customers where:"
          value={element.unit}
          onChange={(e) => handleChange(e, index, "unit")}
          options={["Grams", "Milligrams"]}
        />
        <Button destructive outline onClick={() => handleDelete(index)}>
          Delete
        </Button>
      </FormLayout>
    </Popover>
  );
};

const rows = [
  { name: "Energy", quantity: "2000", unit: "Grams" },
  { name: "Fat", quantity: "44", unit: "Grams" },
  { name: "Of which Saturates", quantity: "", unit: "Grams" },
  { name: "Carbohydrates", quantity: "00", unit: "Grams" },
  { name: "Of which Sugars", quantity: "00", unit: "Grams" },
  { name: "Protein", quantity: "00", unit: "Grams" },
  { name: "Salt", quantity: "00", unit: "Grams" },
  { name: "Vitamin C", quantity: "00", unit: "Grams" },
];
const newRow = { name: "", quantity: "", unit: "Grams" };
function RecommendedIntake() {
  const [elementData, setElementData] = useState(rows);

  const handleChange = useCallback((value, i, tag) => {
    let newValues = [...elementData];
    newValues[i][tag] = value;
    setElementData(newValues);
  }, []);

  const handleAddNewRow = () => {
    setElementData([...elementData, newRow]);
  };
  const handleDelete = (i) => {
    let newValues = [...elementData];
    newValues.splice(i, 1);
    setElementData(newValues);
  };
  return (
    <div>
      <div style={{ margin: "0px 30px 0px 30px" }}>
        <Banner status="warning">
          <p>
            Please make sure that the names you give the nutrients on this page
            exactly match the names of the nutrients you want to use on the
            label pages. This is the only way we can automatically calculate the
            recommended daily intake properly.
          </p>
        </Banner>
      </div>
      <Page
        title="Recommended Intake Standards"
        fullWidth
        primaryAction={
          <Button onClick={handleAddNewRow} primary>
            Add Reference
          </Button>
        }
      >
        <Card sectioned>
          <table style={{ width: "100%" }}>
            <tr
              style={{
                width: "100%",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <th>Nutrient</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th></th>
            </tr>
            <tbody>
              {elementData.map((elem, index) => (
                <>
                  <tr
                    style={{
                      width: "100%",
                      borderTop: "1px solid #E1E3E5",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    {elem.name.length ? (
                      <>
                        <td>{elem.name}</td>
                        <td>{elem.quantity || 0}</td>
                        <td>{elem.unit || 0}</td>
                      </>
                    ) : (
                      <>
                        <td>New Reference</td>
                      </>
                    )}
                    <td>
                      <Edit
                        index={index}
                        element={elem}
                        handleChange={handleChange}
                        handleDelete={handleDelete}
                      />
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </Card>
      </Page>
    </div>
  );
}

export default RecommendedIntake;

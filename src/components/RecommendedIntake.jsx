import {
  Button,
  Card,
  DataTable,
  FormLayout,
  Page,
  Popover,
  Select,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";

const Edit = ({ index }) => {
  const [popoverActive, setPopoverActive] = useState(false);
  const [tagValue, setTagValue] = useState("");
  const [selected, setSelected] = useState("today");

  const handleSelectChange = useCallback((value) => setSelected(value), []);
  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const handleTagValueChange = useCallback((value) => {
    setTagValue(value);
  }, []);
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
      sectioned
    >
      <FormLayout>
        <TextField
          label="Name"
          value={tagValue}
          onChange={handleTagValueChange}
          autoComplete="off"
          inputMode="text"
        />
        <TextField
          label="Quantity"
          value={tagValue}
          onChange={handleTagValueChange}
          autoComplete="off"
          inputMode="number"
        />
        <Select
          label="Show all customers where:"
          value={selected}
          onChange={handleSelectChange}
          options={["Grams", "Milligrams"]}
        />
        <Button destructive outline>
          Delete
        </Button>
      </FormLayout>
    </Popover>
  );
};

const row = { name: "", quantity: "", unit: "", editbutton: "" };
function RecommendedIntake() {
  const rows = [
    ["Energy", "2000", "Grams"],
    ["Fat", "00", "Grams"],
    ["Of which Saturates", "00", "Grams"],
    ["Carbohydrates", "00", "Grams"],
    ["Of which Sugars", "00", "Grams"],
    ["Protein", "00", "Grams"],
    ["Salt", "00", "Grams"],
    ["Vitamin C", "00", "Grams"],
  ];
  const [createdRow, setCreatedRow] = useState([]);
  const keys = Object.keys(row);
  const handleCreateRow = () => {
    for (var i = 0; i < rows.length; i++) {
      rows[i].push(<Edit index={i} />);
    }
  };
  useEffect(() => {
    handleCreateRow();
    console.log(createdRow);
  }, []);
  return (
    <Page title="Recommended Intake Standards">
      <Card>
        <DataTable
          verticalAlign="bottom"
          columnContentTypes={["text", "numeric", "text"]}
          headings={["Nutrient", "Quantity", "Unit", ""]}
          rows={rows}
          stickyHeader={true}
        />
      </Card>
    </Page>
  );
}

export default RecommendedIntake;

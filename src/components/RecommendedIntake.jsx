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
import React, { useCallback, useEffect, useState } from "react";

const Edit = ({
  index,
  element,
  handleChange,
  handleDelete,
  storeId,
  saveRecomIntake,
  recommendedIntake,
  recommendedIntakeData,
}) => {
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
          onBlur={(e) => saveRecomIntake(recommendedIntake, storeId)}
          autoComplete="off"
          inputMode="text"
        />
        <TextField
          label="Quantity"
          value={element.quantity}
          onChange={(e) => handleChange(e, index, "quantity")}
          onBlur={(e) => saveRecomIntake(recommendedIntake, storeId)}
          autoComplete="off"
          inputMode="number"
          type="number"
        />
        <Select
          label="Show all customers where:"
          value={element.unit}
          onChange={(e) => handleChange(e, index, "unit")}
          onBlur={(e) => saveRecomIntake(recommendedIntake, storeId)}
          options={["Grams", "Milligrams", "Micrograms"]}
        />
        <Button
          destructive
          outline
          onClick={() => {
            handleDelete(index);
            console.log(recommendedIntakeData);
            // saveRecomIntake(rows, storeId);
          }}
        >
          Delete
        </Button>
      </FormLayout>
    </Popover>
  );
};

const newRow = { name: "", quantity: "", unit: "Grams" };
function RecommendedIntake({
  rows,
  setStoreData,
  storeData,
  saveRecomIntake,
  recommendedIntakeData,
}) {
  const handleChange = useCallback((value, i, tag) => {
    let newValues = { ...storeData };
    newValues["recommendedIntake"][i][tag] = value;
    setStoreData(newValues);
  }, []);

  const handleAddNewRow = () => {
    setStoreData([...storeData.recommendedIntake, newRow]);
  };
  const handleDelete = async (i) => {
    let newValues = [...storeData.recommendedIntake];
    newValues.splice(i, 1);
    setStoreData(() => ({ ...storeData, recommendedIntake: newValues }));
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
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              borderSpacing: "0 1em",
            }}
          >
            <thead style={{ width: "100%" }}>
              <tr style={{ width: "100%" }}>
                <th style={{ verticalAlign: "bottom", textAlign: "start" }}>
                  Nutrient
                </th>
                <th style={{ verticalAlign: "bottom", textAlign: "start" }}>
                  Quantity
                </th>
                <th
                  style={{
                    verticalAlign: "bottom",
                  }}
                >
                  Unit
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((elem, index) => (
                <tr
                  style={{
                    borderTop: "1px solid #E1E3E5",
                    lineHeight: "50px",
                  }}
                  key={index}
                >
                  {elem.name.length ? (
                    <>
                      <td style={{ verticalAlign: "top" }}>{elem.name}</td>
                      <td style={{ verticalAlign: "top" }}>
                        {elem.quantity || 0}
                      </td>
                      <td style={{ verticalAlign: "top", textAlign: "center" }}>
                        {elem.unit || 0}
                      </td>
                    </>
                  ) : (
                    <>
                      <td>New Reference</td>
                    </>
                  )}
                  <td
                    style={{
                      textAlign: "end",
                    }}
                  >
                    <Edit
                      index={index}
                      element={elem}
                      handleChange={handleChange}
                      handleDelete={handleDelete}
                      storeId={storeData.shop_id}
                      saveRecomIntake={saveRecomIntake}
                      recommendedIntake={storeData.recommendedIntake}
                      recommendedIntakeData={recommendedIntakeData}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Page>
    </div>
  );
}

export default RecommendedIntake;

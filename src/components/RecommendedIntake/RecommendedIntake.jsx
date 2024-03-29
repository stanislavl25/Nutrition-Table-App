import {
  Banner,
  Button,
  Card,
  FormLayout,
  Page,
  Popover,
  Select,
  TextContainer,
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
          type="number"
        />
        <Select
          label="Show all customers where:"
          value={element.unit}
          onChange={(e) => handleChange(e, index, "unit")}
          options={["Grams", "Milligrams", "Micrograms", "Kcal", "Kj"]}
        />
        <Button
          destructive
          outline
          onClick={() => {
            handleDelete(index);
          }}
        >
          Delete
        </Button>
      </FormLayout>
    </Popover>
  );
};

function RecommendedIntake({
  setStoreData,
  storeData,
  saveRecomIntake,
  toggleActive,
  setToastMessage,
  handleRIDataReset,
}) {
  const handleChange = useCallback((value, i, tag) => {
    let newSotreData = { ...storeData };
    newSotreData.recommendedIntake[i][tag] = value;
    setStoreData(newSotreData);
  }, []);

  const handleAddNewRow = () => {
    let length = storeData.recommendedIntake.length - 1;
    if (storeData.recommendedIntake[length].name.length > 0) {
      const newStoreData = { ...storeData };
      newStoreData.recommendedIntake.push({
        name: "",
        quantity: "",
        unit: "Grams",
      });
      setStoreData(newStoreData);
    } else {
      setToastMessage("You have an empty Refernce!");
      toggleActive();
    }
  };
  const handleDelete = async (i) => {
    let newSotreData = { ...storeData };
    newSotreData.recommendedIntake.splice(i, 1);
    setStoreData(newSotreData);
  };
  return (
    <div>
      <div style={{ margin: "0px 30px 0px 30px" }}>
        <Banner status="warning">
          <TextContainer spacing="tight">
            <p>
              Please make sure that the names you give the nutrients on this
              page exactly match the names of the nutrients you want to use on
              the label pages. This is the only way we can automatically
              calculate the recommended daily intace properly.
            </p>
            <p>
              If you change the calculation basis for the daily recommended
              intake on this page, we will automatically recalculate the
              percentage recommended intake for all of your products. The values
              will be changed automatically for all your products.
            </p>
          </TextContainer>
        </Banner>
      </div>
      <Page
        title="Recommended Intake Standards"
        fullWidth
        primaryAction={
          <Button onClick={saveRecomIntake} primary>
            Save
          </Button>
        }
        secondaryActions={[
          {
            content: "Reset",
            destructive: true,
            onAction: () => handleRIDataReset(),
          },
          {
            content: "Add Reference",
            onAction: () => {
              handleAddNewRow();
            },
          },
        ]}
      >
        <Card sectioned>
          <div style={{ width: "100%", overflowX: "scroll" }}>
            <table
              style={{
                borderCollapse: "collapse",
                borderSpacing: "0 1em",

                width: "100%",
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
              <tbody
                style={{
                  width: "100%",
                }}
              >
                {storeData?.recommendedIntake?.map((elem, index) => (
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
                        <td
                          style={{ verticalAlign: "top", textAlign: "center" }}
                        >
                          {elem.unit || 0}
                        </td>
                      </>
                    ) : (
                      <>
                        <td>New Reference</td>
                        <td></td>
                        <td></td>
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
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Page>
    </div>
  );
}

export default RecommendedIntake;

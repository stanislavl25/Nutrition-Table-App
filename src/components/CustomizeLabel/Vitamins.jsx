import {
  Button,
  Card,
  Heading,
  Popover,
  FormLayout,
  Select,
  TextField,
  TextContainer,
  Banner,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";

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
          type="number"
          name="Name"
          value={element.RI || ""}
          onChange={(e) => handleChange(e, "vitamins", "RI", index)}
        />
        <TextField
          label="Left Spacing (Table)"
          name="Name"
          type="number"
          min={0}
          max={30}
          value={element.LeftSpacing || ""}
          onChange={(e) => handleChange(e, "vitamins", "LeftSpacing", index)}
        />
        {/* <TextField
          label="Order"
          type="text"
          name="Name"
          value={element.order || ""}
          onChange={(e) => handleChange(e, "vitamins", "order", index)}
        /> */}
        <Button destructive outline onClick={() => removeFormFields(index)}>
          Delete
        </Button>
      </FormLayout>
    </Popover>
  );
};

const SelectElement = ({ index, handleChange, unit }) => {
  const options = [
    { label: "Grams", value: "Grams" },
    { label: "Milligrams", value: "Milligrams" },
  ];

  return (
    <div style={{ maxWidth: "80px" }}>
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
  allData,
}) {
  // const elements = data.filter((elem) => {
  //   console.log(elem.per100g);
  //   return elem.per100g > 0;
  // });
  const handleAutoCalculs = () => {
    data.forEach((elem, index) => {
      const division =
        allData?.servingSize.EU.DefaultAmount /
        allData?.servingSize.EU.PortionSize;
      const newVitamonPortion = elem.per100g / division;
      if (Math.floor(newVitamonPortion).toString() !== elem.perportion) {
        handleChange(
          Math.floor(newVitamonPortion).toString(),
          "vitamins",
          "perportion",
          index
        );
      }
      return;
    });
  };
  useEffect(() => {
    // console.log("hey", elements);
    return handleAutoCalculs();
  }, [
    data.filter((elem) => {
      return elem.per100g > 0;
    }),
  ]);

  // !!!!!! the use effect is taking array of objects and its making the perportion input not updating on it's own
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
        <div
          style={{
            borderCollapse: "separate",
            display: "inline-table",
            borderSpacing: "1em .5em",
            marginBottom: "10px",
            width: "100%",
          }}
        >
          {locationPlan.location === "CA" || locationPlan.location === "NA" ? (
            <div
              style={{
                display: "table-header-group",
                width: "100%",
              }}
            >
              <label style={{ display: "table-cell" }}>Name</label>
              <label style={{ display: "table-cell" }}>Quantity</label>
              <label style={{ display: "table-cell" }}>Unit</label>
              <label style={{ display: "table-cell" }}>% Daily value*</label>
            </div>
          ) : (
            <div
              style={{
                display: "table-header-group",
                width: "100%",
              }}
            >
              <label style={{ display: "table-cell" }}>Name</label>
              <label style={{ display: "table-cell" }}>Per 100 g</label>
              <label style={{ display: "table-cell" }}>
                Per portion {allData?.servingSize.EU.PortionSize}{" "}
                {allData?.servingSize.EU.PortionSizeUnit === "Grams"
                  ? "g"
                  : "mg"}
              </label>
              <label style={{ display: "table-cell" }}>Unit</label>
            </div>
          )}
          <div
            style={{
              marginRight: "10px",
              display: "table-row-group",
              width: "100%",
            }}
          >
            {locationPlan.location === "CA" || locationPlan.location === "NA"
              ? data.map((element, index) => (
                  <div
                    key={index}
                    style={{
                      display: "table-row",
                    }}
                  >
                    <div
                      style={{
                        flex: "1 0 0 auto",
                        display: "table-cell",
                      }}
                    >
                      <TextField
                        type="text"
                        name="name"
                        value={element.name || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "name", index)
                        }
                      />
                    </div>
                    <div
                      style={{
                        flex: "1 0 0 auto",
                        display: "table-cell",
                      }}
                    >
                      <TextField
                        name="quantity"
                        value={element.quantity || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "quantity", index)
                        }
                        type="number"
                      />
                    </div>
                    <div
                      style={{
                        display: "table-cell",
                      }}
                    >
                      <SelectElement
                        index={index}
                        handleChange={handleChange}
                        unit={element.unit}
                      />
                    </div>
                    <div
                      style={{
                        flex: "1 0 0 auto",
                        display: "table-cell",
                      }}
                    >
                      <TextField
                        name="dailyValue"
                        type="number"
                        value={element.dailyValue || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "dailyValue", index)
                        }
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto" }}>
                      <PopoverElement
                        element={element}
                        removeFormFields={handleRemoveVitamins}
                        handleChange={handleChange}
                        index={index}
                      />
                    </div>
                  </div>
                ))
              : data.map((element, index) => (
                  <div
                    key={index}
                    style={{
                      display: "table-row",
                    }}
                  >
                    <div
                      style={{
                        flex: "1 0 0 auto",
                        display: "table-cell",
                      }}
                    >
                      <TextField
                        type="text"
                        name="name"
                        value={element.name || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "name", index)
                        }
                      />
                    </div>
                    <div
                      style={{
                        flex: "1 0 0 auto",
                        display: "table-cell",
                      }}
                    >
                      <TextField
                        type="number"
                        name="per100g"
                        value={element.per100g || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "per100g", index)
                        }
                      />
                    </div>
                    <div
                      style={{
                        flex: "1 0 0 auto",
                        display: "table-cell",
                      }}
                    >
                      <TextField
                        type="number"
                        name="perportion"
                        value={element.perportion || ""}
                        onChange={(e) =>
                          handleChange(e, "vitamins", "perportion", index)
                        }
                      />
                    </div>
                    <div
                      style={{
                        display: "table-cell",
                      }}
                    >
                      <SelectElement
                        index={index}
                        handleChange={handleChange}
                        unit={element.unit}
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto" }}>
                      <PopoverElement
                        element={element}
                        removeFormFields={handleRemoveVitamins}
                        handleChange={handleChange}
                        index={index}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )}
    </Card>
  );
}

export default Vitamins;

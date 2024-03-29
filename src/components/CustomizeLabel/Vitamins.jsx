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
          label="% DV*"
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
  storeData,
  handleTabChange,
  setNewRiName,
}) {
  const handleRiAutoCalculs = () => {
    allData.vitamins.forEach((vitamin, index) => {
      storeData.recommendedIntake.forEach((elem, i) => {
        if (vitamin.name === elem.name) {
          if (elem.quantity > 0) {
            const newRI = (vitamin.perportion / elem.quantity) * 100;
            var num = Number(newRI);
            var roundedString =
              elem.unit === "Milligrams"
                ? (num / 1000).toFixed(1)
                : elem.unit === "Micrograms"
                ? (num / 1000000).toFixed(1)
                : num.toFixed(1);
            if (roundedString[2] !== "0") {
              let numAfterUnitCheck;
              if (elem.unit === "Milligrams") {
                numAfterUnitCheck = roundedString + "k";
              } else if (elem.unit === "Micrograms") {
                numAfterUnitCheck = roundedString + "m";
              } else {
                numAfterUnitCheck = roundedString;
              }
              handleChange(numAfterUnitCheck, "vitamins", "RI", index);
            } else {
              handleChange("0", "vitamins", "RI", index);
            }
          } else {
            handleChange("0", "vitamins", "RI", index);
          }
        }
      });
    });
  };

  useEffect(() => {
    handleRiAutoCalculs();
  }, []);

  const handleAutoCalculsOnChange = useCallback((val, index) => {
    handleChange(val, "vitamins", "per100g", index);
    const division =
      allData?.servingSize.EU.DefaultAmount /
      allData?.servingSize.EU.PortionSize;
    const newVitamonPortion = data[index].per100g / division;
    var num = Number(newVitamonPortion);
    var roundedString = num.toFixed(1);
    handleChange(roundedString, "vitamins", "perportion", index);
    handleRiAutoCalculs();
  });
  const handleAutoCalculsOnPortionChange = () => {
    const division =
      allData?.servingSize.EU.DefaultAmount /
      allData?.servingSize.EU.PortionSize;
    allData?.vitamins.forEach((elem, index) => {
      const newVitamonPortion = elem.per100g / division;
      var num = Number(newVitamonPortion);
      var roundedString = num.toFixed(1);
      handleChange(roundedString, "vitamins", "perportion", index);
    });
    handleRiAutoCalculs();
  };
  useEffect(() => {
    let isSubscribed = true;
    if (allData?.vitamins.length === 0 || locationPlan.location !== "EU")
      return;
    handleAutoCalculsOnPortionChange();
    return () => (isSubscribed = false);
  }, [allData?.servingSize.EU.PortionSize]);

  const handleNewRIElem = useCallback(
    (value) => {
      setNewRiName(value);
      let check;
      storeData.recommendedIntake.forEach((elem) => {
        if (elem.name === value) {
          check = true;
        }
      });
      if (!check) {
        document.getElementById("missing_RI").click();
      }
      return;
    },
    [storeData.recommendedIntake]
  );

  const handleAutoCalculsOnChangeDV = useCallback((val, index, tag) => {
    handleChange(val, "vitamins", tag, index);
    const newNutritionDV =
      (allData.vitamins[index].quantity / allData.vitamins[index].dailyValue) *
      100;
    var num = Number(newNutritionDV);
    var roundedString = num.toFixed(1);
    handleChange(roundedString, "vitamins", "RI", index);
  });

  return (
    <Card>
      {locationPlan?.plan === "Basic" && locationPlan?.location !== "EU" ? (
        <Banner status="warning">
          <Button onClick={() => handleTabChange(5)} plain>
            Upgrade your plan
          </Button>{" "}
          to add more Vitamins
        </Banner>
      ) : (
        <></>
      )}
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
            locationPlan?.plan === "Basic" && locationPlan?.location !== "EU"
              ? true
              : false
          }
        >
          Add
        </Button>
      </div>

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
                        onBlur={(e) => handleNewRIElem(e.target.value)}
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
                          handleAutoCalculsOnChangeDV(e, index, "quantity")
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
                          handleAutoCalculsOnChangeDV(e, index, "dailyValue")
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
                        onBlur={(e) => handleNewRIElem(e.target.value)}
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
                          // handleChange(e, "vitamins", "per100g", index)
                          handleAutoCalculsOnChange(e, index)
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
                        onChange={(e) => {
                          handleChange(e, "vitamins", "perportion", index);
                          handleRiAutoCalculs();
                        }}
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

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
import React, { useCallback, useEffect, useState } from "react";

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
          type="number"
          name="RI"
          value={element.RI || ""}
          onChange={(e) => handleChange(e, "minerals", "RI", index)}
        />{" "}
        <TextField
          label="Left Spacing (Table)"
          type="number"
          name="LeftSpacing"
          min={0}
          max={30}
          value={element.LeftSpacing || ""}
          onChange={(e) => handleChange(e, "minerals", "LeftSpacing", index)}
        />
        {/* <TextField
          label="Order"
          type="number"
          name="Name"
          value={element.order || ""}
          onChange={(e) => handleChange(e, "minerals", "order", index)}
          inputMode="numeric"
        /> */}
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

const options = [
  { label: "Grams", value: "Grams" },
  { label: "Milligrams", value: "Milligrams" },
];
const SelectElement = ({ unit, handleChange, index }) => {
  return (
    <div style={{ width: "80px" }}>
      <Select
        label=""
        options={options}
        onChange={(e) => handleChange(e, "minerals", "unit", index)}
        value={unit}
      />
    </div>
  );
};

function Minerals({
  data,
  locationPlan,
  handleAddMinerals,
  handleRemoveMinerals,
  handleChange,
  allData,
  storeData,
  handleTabChange,
}) {
  const handleRiAutoCalculs = () => {
    allData.minerals.forEach((vitamin, index) => {
      storeData.recommendedIntake.forEach((elem, i) => {
        if (vitamin.name === elem.name) {
          if (elem.quantity > 0) {
            const newRI = Math.floor(
              (vitamin.perportion / elem.quantity) * 100
            ).toString();
            handleChange(newRI, "minerals", "RI", index);
          } else {
            handleChange("0", "minerals", "RI", index);
          }
        }
      });
    });
  };

  useEffect(() => {
    handleRiAutoCalculs();
  }, []);

  const handleAutoCalculsOnChange = useCallback((val, index) => {
    handleChange(val, "minerals", "per100g", index);
    const division =
      allData?.servingSize.EU.DefaultAmount /
      allData?.servingSize.EU.PortionSize;
    const newVitamonPortion = data[index].per100g / division;
    handleChange(
      Math.floor(newVitamonPortion).toString(),
      "minerals",
      "perportion",
      index
    );
    handleRiAutoCalculs();
  });

  const handleAutoCalculsOnPortionChange = () => {
    const division =
      allData?.servingSize.EU.DefaultAmount /
      allData?.servingSize.EU.PortionSize;
    allData?.minerals.forEach((elem, index) => {
      const newMineralPortion = elem.per100g / division;
      handleChange(
        Math.floor(newMineralPortion).toString(),
        "minerals",
        "perportion",
        index
      );
    });
    handleRiAutoCalculs();
  };

  useEffect(() => {
    let isSubscribed = true;
    if (allData?.minerals.length === 0 || locationPlan.location !== "EU")
      return;
    handleAutoCalculsOnPortionChange();
    return () => (isSubscribed = false);
  }, [allData?.servingSize.EU.PortionSize]);

  const handleNewRIElem = useCallback(
    (e) => {
      let check;
      storeData.recommendedIntake.forEach((elem) => {
        if (elem.name === e) {
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
    handleChange(val, "minerals", tag, index);
    const newNutritionDV =
      (allData.minerals[index].quantity / allData.minerals[index].dailyValue) *
      100;
    handleChange(
      Math.floor(newNutritionDV).toString(),
      "minerals",
      "RI",
      index
    );
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
          padding: "20px 20px 10px 20px",
        }}
      >
        <Heading>Minerals</Heading>
        <Button
          variant="contained"
          className="button add"
          type="button"
          onClick={() => handleAddMinerals()}
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
          <p>Click add to create a new Mineral</p>
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
            <div style={{ display: "table-header-group", width: "100%" }}>
              <label style={{ display: "table-cell" }}>Name</label>
              <label style={{ display: "table-cell" }}>Quantity</label>
              <label style={{ display: "table-cell" }}>Unit</label>
              <label style={{ display: "table-cell" }}>% Daily value*</label>
            </div>
          ) : (
            <div style={{ display: "table-header-group", width: "100%" }}>
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
          {/* <hr style={{ borderTop: "1px solid #cecece" }} /> */}
          <div
            style={{
              display: "table-row-group",
              width: "100%",
            }}
          >
            {locationPlan.location === "CA" || locationPlan.location === "NA"
              ? data.map((element, index) => (
                  <div
                    className="form-inline"
                    key={index}
                    style={{
                      display: "table-row",
                      paddingTop: "10px",
                    }}
                  >
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <TextField
                        size="small"
                        type="text"
                        variant="outlined"
                        name="Name"
                        value={element.name || ""}
                        onChange={(e) =>
                          handleChange(e, "minerals", "name", index)
                        }
                        onBlur={(e) => handleNewRIElem(e.target.value)}
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <TextField
                        size="small"
                        variant="outlined"
                        type="number"
                        name="quantity"
                        value={element.quantity || ""}
                        onChange={(e) =>
                          handleAutoCalculsOnChangeDV(e, index, "quantity")
                        }
                      />
                    </div>
                    <div style={{ display: "table-cell" }}>
                      <SelectElement
                        unit={element.unit}
                        handleChange={handleChange}
                        index={index}
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <TextField
                        size="small"
                        variant="outlined"
                        type="number"
                        name="dailyValue"
                        value={element.dailyValue || ""}
                        onChange={(e) =>
                          handleAutoCalculsOnChangeDV(e, index, "dailyValue")
                        }
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto" }}>
                      <PopoverElement
                        element={element}
                        removeFormFields={handleRemoveMinerals}
                        handleChange={handleChange}
                        index={index}
                      />
                    </div>
                  </div>
                ))
              : data.map((element, index) => (
                  <div
                    className="form-inline"
                    key={index}
                    style={{
                      display: "table-row",
                      paddingTop: "10px",
                    }}
                  >
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <TextField
                        size="small"
                        type="text"
                        variant="outlined"
                        name="Name"
                        value={element.name || ""}
                        onChange={(e) =>
                          handleChange(e, "minerals", "name", index)
                        }
                        onBlur={(e) => handleNewRIElem(e.target.value)}
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <TextField
                        size="small"
                        variant="outlined"
                        type="number"
                        name="per100g"
                        value={element.per100g || ""}
                        onChange={(e) =>
                          // handleChange(e, "minerals", "per100g", index)
                          handleAutoCalculsOnChange(e, index)
                        }
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto", display: "table-cell" }}>
                      <TextField
                        size="small"
                        variant="outlined"
                        type="number"
                        name="perportion"
                        value={element.perportion || ""}
                        onChange={(e) => {
                          handleChange(e, "minerals", "perportion", index);
                          handleRiAutoCalculs();
                        }}
                      />
                    </div>
                    <div style={{ display: "table-cell" }}>
                      <SelectElement
                        unit={element.unit}
                        handleChange={handleChange}
                        index={index}
                      />
                    </div>
                    <div style={{ flex: "1 0 0 auto" }}>
                      <PopoverElement
                        element={element}
                        removeFormFields={handleRemoveMinerals}
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

export default Minerals;

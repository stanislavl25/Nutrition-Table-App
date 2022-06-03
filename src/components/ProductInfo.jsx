import {
  Button,
  Card,
  Checkbox,
  Heading,
  Icon,
  Select,
  Stack,
  Subheading,
  Tag,
  TextField,
  Tooltip,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { CircleInformationMajor } from "@shopify/polaris-icons";
const newBadgeFormSet = {
  name: "",
};
function ProductInfo({
  productToPrepare,
  handleproductToPrepare,
  handleNutriScoreCheckElem,
  setNonFoodProduct,
  nonFoodProduct,
  handleNonFoodProduct,
  locationPlan,
}) {
  const [nutriScoreCheck, setNutriScore] = useState(false);
  const [selected, setSelected] = useState("");
  const [badgesFormValue, setBadgeFormValue] = useState([]);
  const [badgeName, setBadgeName] = useState("");
  const handleBadgeAdding = useCallback((name) => {
    setBadgeName(name);
  });
  const handleSettingNewBadge = useCallback(() => {
    try {
      if (badgeName.length) {
        newBadgeFormSet.name = badgeName;
        setBadgeFormValue([...badgesFormValue, newBadgeFormSet]);
      }
    } catch (err) {
      console.log(err);
    }
  });
  const handleSelectChange = useCallback((value) => {
    handleNutriScoreCheckElem(value);
    setSelected(value);
  }, []);
  const handleNutriScore = useCallback(
    (newChecked) => setNutriScore(newChecked),
    []
  );

  const options = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
  ];
  const removeTag = useCallback(
    (tag) => () => {
      setBadgeFormValue((previousTags) =>
        previousTags.filter((previousTag) => previousTag !== tag)
      );
    },
    []
  );
  const tagMarkup = badgesFormValue.map((option, index) => (
    <Tag key={index} onRemove={removeTag(option)}>
      {option.name}
    </Tag>
  ));

  return (
    <Card sectioned title="Product Info">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Subheading>
            {/* // todo Product name goes here */}
            Product
          </Subheading>
          <Button plain>Manage</Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <TextField
            inputMode="text"
            placeholder="Assign products to this label"
            autoComplete="false"
            autoFocus={false}
            onChange={handleBadgeAdding}
            onBlur={handleSettingNewBadge}
            value={badgeName}
          />

          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Stack>{tagMarkup}</Stack>
          </div>
          <Checkbox
            label="This is a non-food product"
            checked={nonFoodProduct}
            onChange={handleNonFoodProduct}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
              gap: "5px",
            }}
          >
            <Checkbox
              label="Product to prepare"
              checked={productToPrepare}
              onChange={handleproductToPrepare}
              disabled={locationPlan.plan === "Basic" ? true : false}
            />
            <Tooltip
              dismissOnMouseOut
              content={
                <p>
                  Some products are prepared with other foods and therefore have
                  different nutrients per serving than per base unit. You can
                  find more information in our{" "}
                  <a style={{ textDecoration: "none" }} href="#">
                    documentation
                  </a>
                  .
                </p>
              }
            >
              <Icon source={CircleInformationMajor} color="base" />
            </Tooltip>
            {locationPlan.plan === "Basic" ? (
              <div style={{ marginLeft: "5px" }}>
                <Button plain>Upgrade your plan to use this feature</Button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
              gap: "5px",
            }}
          >
            {locationPlan.location === "EU" ? (
              <>
                <Checkbox
                  label="Show Nutri-Score"
                  checked={nutriScoreCheck}
                  onChange={handleNutriScore}
                  disabled={locationPlan.plan === "Basic" ? true : false}
                />
                <Tooltip
                  dismissOnMouseOut
                  content={
                    <p>
                      In some European countries the use of the Nutri Score is
                      permitted on a voluntary basis.
                    </p>
                  }
                >
                  <Icon source={CircleInformationMajor} color="base" />
                </Tooltip>
              </>
            ) : (
              <></>
            )}

            {locationPlan.plan === "Basic" && locationPlan.location === "EU" ? (
              <div style={{ marginLeft: "5px" }}>
                <Button plain>Upgrade your plan to use this feature</Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {nutriScoreCheck ? (
          <div style={{ marginTop: "10px" }}>
            <Subheading>Nutri-Score Letter</Subheading>
            <div style={{ marginTop: "10px" }}>
              <Stack distribution="fillEvenly">
                <Select
                  label=""
                  options={options}
                  onChange={handleSelectChange}
                  value={selected}
                />
                <></>
                <></>
                <></>
              </Stack>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Card>
  );
}

export default ProductInfo;

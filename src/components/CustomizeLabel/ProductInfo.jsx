import {
  Banner,
  Button,
  Card,
  Checkbox,
  Combobox,
  Icon,
  Listbox,
  Select,
  Stack,
  Subheading,
  Tag,
  TextContainer,
  Tooltip,
} from "@shopify/polaris";
import React, { useCallback, useMemo, useState } from "react";
import { CircleInformationMajor, SearchMinor } from "@shopify/polaris-icons";

function ProductInfo({
  productToPrepare,
  handleproductToPrepare,
  handleNutriScoreCheckElem,
  nonFoodProduct,
  handleNonFoodProduct,
  locationPlan,
  selectedOptions,
  setSelectedOptions,
  deselectedOptions,
  memoOptions,
  setMemoOptions,
  removeTag,
}) {
  const [inputValue, setInputValue] = useState("");
  const [nutriScoreCheck, setNutriScore] = useState(false);
  const [selectedNutriScore, setSelectedNutriScore] = useState("");

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setMemoOptions(deselectedOptions);
        return;
      }
      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setMemoOptions(resultOptions);
    },
    [deselectedOptions]
  );
  const updateSelection = useCallback(
    (selected) => {
      if (selectedOptions?.includes(selected)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== selected)
        );
      } else {
        setSelectedOptions([...selectedOptions, selected]);
      }

      const matchedOption = memoOptions.find((option) => {
        return option.value.match(selected);
      });

      updateText("");
    },
    [memoOptions, selectedOptions]
  );

  const handleSelectChange = useCallback((value) => {
    handleNutriScoreCheckElem(value);
    setSelectedNutriScore(value);
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

  const optionsMarkup =
    memoOptions?.length > 0
      ? memoOptions?.map((option) => {
          const { label, value } = option;
          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOptions?.includes(value)}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;
  console.log(selectedOptions);
  const tagsMarkup =
    selectedOptions?.length !== 0 ? (
      <Stack>
        {selectedOptions?.map((option) => (
          <Tag key={`option-${option}`} onRemove={removeTag(option)}>
            {option}
          </Tag>
        ))}
      </Stack>
    ) : (
      <div
        style={{
          width: "100%",
          marginTop: "15px",
        }}
      >
        <Banner title="">
          <p>With no products selected a default data is set!</p>
        </Banner>
      </div>
    );
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
          <Combobox
            activator={
              <Combobox.TextField
                prefix={<Icon source={SearchMinor} />}
                onChange={updateText}
                label="Assign products to this label"
                labelHidden
                value={inputValue}
                placeholder="Assign products to this label"
              />
            }
          >
            {memoOptions?.length > 0 ? (
              <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
            ) : null}
          </Combobox>
          {nonFoodProduct ? (
            <></>
          ) : (
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <TextContainer>{tagsMarkup}</TextContainer>
            </div>
          )}
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
                  value={selectedNutriScore}
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

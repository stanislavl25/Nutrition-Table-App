import { useEffect } from "react";
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
import "../../assets/style.css";

function ProductInfo({
  locationPlan,
  selectedOptions,
  setSelectedOptions,
  deselectedOptions,
  memoOptions,
  setMemoOptions,
  removeTag,
  productsAredifferent,
  handleSelectedProducts,
  data,
  handleChange,
  productsArray,
  handleTabChange,
}) {
  const [inputValue, setInputValue] = useState("");
  const [nutriScoreCheck, setNutriScore] = useState(data.nutriScoreCheck);
  const handleNonFoodProduct = useCallback((food_product) => {
    if (!food_product && data.productToPrepare) {
      handleChange(true, "productToPrepare");
    }
    handleChange(!food_product, "food_product");
  }, []);
  const handleproductToPrepare = useCallback((productToPrepare) => {
    handleChange(productToPrepare, "productToPrepare");
  }, []);
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
    handleChange(value, "nutriScore");
  }, []);
  const handleNutriScore = useCallback((newChecked) => {
    handleChange(newChecked, "nutriScoreCheck");
    setNutriScore(newChecked);
  }, []);

  const options = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
  ];
  useEffect(() => {
    if (selectedOptions.length === 1) return;
    handleSelectedProducts(selectedOptions, false);
  }, [selectedOptions]);

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
  const tagsMarkup =
    selectedOptions?.length !== 0 ? (
      <>
        <Stack>
          {Array.isArray(productsArray) ? (
            productsArray?.map((elem, index) =>
              selectedOptions.includes(elem._id) ? (
                <Tag key={`option-${index}`} onRemove={removeTag(elem._id)}>
                  {elem.name}
                </Tag>
              ) : (
                <></>
              )
            )
          ) : (
            <></>
          )}
        </Stack>
        {(productsAredifferent &&
          data.food_product === false &&
          selectedOptions.length > 1) ||
        (productsAredifferent && selectedOptions.length > 1) ? (
          <Banner title="" status="critical">
            <p>
              You have made different settings in the past for the products you
              selected. If you make settings on this page and save them, you
              will overwrite all previous settings of these products.
            </p>
          </Banner>
        ) : (
          <></>
        )}
      </>
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
          <Subheading>Product</Subheading>
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

          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <TextContainer>{tagsMarkup}</TextContainer>
          </div>
          <div>
            <Checkbox
              ariaControls="food_product"
              ariaDescribedBy="food_product"
              id="food_product"
              name="food_product"
              label="This is a non-food product"
              checked={selectedOptions.length > 0 ? !data.food_product : false}
              onChange={handleNonFoodProduct}
              disabled={selectedOptions.length === 0 ? true : false}
            />
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
            <Checkbox
              ariaControls="productToPrepare"
              ariaDescribedBy="productToPrepare"
              id="productToPrepare"
              name="productToPrepare"
              label="Product to prepare"
              checked={
                data.food_product === false ? false : data.productToPrepare
              }
              onChange={handleproductToPrepare}
              disabled={
                locationPlan.plan === "Basic" ||
                data.food_product === false ||
                selectedOptions.length === 0
                  ? true
                  : false
              }
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "start",
                gap: "5px",
              }}
            >
              {locationPlan.plan === "Basic" ? (
                <div style={{ marginLeft: "5px" }}>
                  <Button onClick={() => handleTabChange(5)} plain>
                    Upgrade your plan to use this feature
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>
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
                  checked={
                    data.food_product === false ? false : nutriScoreCheck
                  }
                  onChange={handleNutriScore}
                  disabled={
                    locationPlan.plan === "Basic" ||
                    data.food_product === false ||
                    selectedOptions.length === 0
                      ? true
                      : false
                  }
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
                <Button onClick={() => handleTabChange(5)} plain>
                  Upgrade your plan to use this feature
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {data.food_product && nutriScoreCheck ? (
          <div style={{ marginTop: "10px" }}>
            <Subheading>Nutri-Score Letter</Subheading>
            <div style={{ marginTop: "10px" }}>
              <Stack distribution="fillEvenly">
                <Select
                  label=""
                  options={options}
                  onChange={handleSelectChange}
                  value={data.nutriScore}
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

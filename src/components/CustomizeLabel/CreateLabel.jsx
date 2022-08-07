import React, { useState, useCallback, useEffect } from "react";
import TablePreview from "./TablePreview";
import ProductInfo from "./ProductInfo";
import ServingSize from "./ServingSize";
import CalsEnergyInfos from "./CalsEnergyInfos";
import Vitamins from "./Vitamins";
import Minerals from "./Minerals";
import Notes from "./Notes";
import Ingredients from "./Ingredients";
import AllergyInfo from "./AllergyInfo";
import LegalNotes from "./LegalNotes";
import {
  Heading,
  Card,
  Button,
  Page,
  TextStyle,
  SkeletonPage,
  Layout,
  SkeletonBodyText,
  TextContainer,
  SkeletonDisplayText,
} from "@shopify/polaris";
import NutritionInfoEU from "./NutritionInfoEU";
import {
  formDataCA,
  formDataEU,
  formDataNA,
  vitaminsCA,
  vitaminsEU,
  vitaminsNA,
  mineralsCA,
  mineralsEU,
  mineralsNA,
  calsEnergyInfo,
} from "../defaultData.js";
import BasicVitaminsMineralsPage from "./BasicVitaminsMineralsPage";
const formLablesEU = ["Name", "Per 100 g", "Per portion", "Unit"];
const formLablesCA_NA = ["Name", "Quantity", "Unit", "% Daily Value*"];
const formLables = {
  formLablesCA_NA,
  formLablesEU,
};

function CreateLabel({
  langState,
  location,
  selectedProducts,
  handleTabChange,
  productsArray,
  handleSaveSelectedProducts,
  data,
  setData,
  deselectedOptions,
  memoOptions,
  setMemoOptions,
  removeTag,
  selectedOptions,
  setSelectedOptions,
  handleChange,
  handleAddNutritionData,
  handleRemoveNutritionData,
  handleAddVitamins,
  handleRemoveVitamins,
  handleAddMinerals,
  handleRemoveMinerals,
  productsAredifferent,
  shop_plan,
  portionSizeModalCheckBox,
}) {
  const [locationPlan, setLocationPlan] = useState({
    location: location,
    plan: shop_plan,
  });

  const [formValues, setFormValues] = useState([]);
  const [productToPrepare, setProductToPrepare] = useState(false);
  const [nonFoodProduct, setNonFoodProduct] = useState(false);
  const [rightSideWidth, setRightSideWidth] = useState("35%");
  const [leftSideWidth, setLeftSideWidth] = useState("60%");
  const [flexDirection, setFlexDirection] = useState("row");
  const [productExist, setProductExist] = useState(false);
  const handleOrderSet = () => {
    for (var i = 0; i < data.nutritionData.length; i++) {
      const num = i;
      let newData = [...data.nutritionData];
      newData[i]["order"] = num.toString();
      setFormValues(newData);
    }
    setProductExist(true);
  };

  const updateProducts = async () => {
    if (data.richText.notesText === undefined) {
      if (location === "EU")
        data.richText.notesText =
          "<p>Salt content is exclusively due to the presence of naturally occurring sodium.</p>";
      if (location === "NA")
        data.richText.notesText =
          "<p>* The % Daily Value (DV) tells you how much a nutrient in a serving of a food contributs to a daily diet.<hr /> 2,000 caloriesaday is used for general nutrition advice.</p>";
      if (location === "CA") {
        data.richText.notesText =
          "<p>*5% or less is <strong>a little</strong> , 15% or more is <strong>a lot</strong> *5% ou moins c’est <strong>peu</strong>, 15% ou plus c’est <strong>beaucoup</strong></p>";
      }
    }
    if (data.nutritionData?.length === 0) {
      if (location === "CA") data.nutritionData = formDataCA;
      if (location === "NA") data.nutritionData = formDataNA;
      if (location === "EU") data.nutritionData = formDataEU;
    }
    if (data.vitamins?.length === 0) {
      if (location === "CA") data.vitamins = vitaminsCA;
      if (location === "NA") data.vitamins = vitaminsNA;
      if (location === "EU") data.vitamins = vitaminsEU;
    }
    if (data.minerals?.length === 0) {
      if (location === "CA") data.minerals = mineralsCA;
      if (location === "NA") data.minerals = mineralsNA;
      if (location === "EU") data.minerals = mineralsEU;
    }
    if (!Object.keys(data?.calsEnergyInfo).length > 0) {
      data.calsEnergyInfo = calsEnergyInfo;
    }
    await handleOrderSet();
    // console.log(data);
  };
  useEffect(() => {
    window.addEventListener("DOMContentLoaded", updateProducts());

    window.removeEventListener("DOMContentLoaded", () => {
      // console.log("done!");
    });
  }, []);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 960) {
        setRightSideWidth("100%");
        setLeftSideWidth("100%");
        setFlexDirection("column");
      } else {
        setRightSideWidth("35%");
        setLeftSideWidth("65%");
        setFlexDirection("row");
      }
    });
    window.removeEventListener("resize", () => {
      // console.log(window.innerWidth);
    });
  });

  const handleNutriScoreCheckElem = (newState) => {
    setData((prevState) => ({ ...prevState, nutriScore: newState }));
    // console.log(newState);
  };

  const handleproductToPrepare = useCallback(
    (newChecked) => setProductToPrepare(newChecked),
    []
  );

  const handleNonFoodProduct = useCallback(
    (newChecked) => setNonFoodProduct(newChecked),
    []
  );

  const handleIngredientsTextChange = async (e, editor) => {
    const editedText = await editor.getData();
    let newData = { ...data };
    newData["richText"]["ingredientsText"] = editedText;
    setData(newData);
  };

  const handleAllergyInfoTextChange = async (e, editor) => {
    const editedText = await editor.getData();
    let newData = { ...data };
    newData["richText"]["allergyInfoText"] = editedText;
    setData(newData);
  };

  const handleLEGALNOTICETextChange = async (e, editor) => {
    const editedText = await editor.getData();
    let newData = { ...data };
    newData["richText"]["lEGALNOTICEText"] = editedText;
    setData(newData);
  };

  const handleNotesTextChange = async (e, editor) => {
    const editedText = await editor.getData();
    let newData = { ...data };
    newData["richText"]["notesText"] = editedText;
    setData(newData);
  };

  return (
    <Page
      title="Create Label"
      primaryAction={{
        content: "Save Label",
        onAction: () => {
          handleSaveSelectedProducts(
            selectedProducts,
            nonFoodProduct,
            data,
            selectedOptions
          );
        },
      }}
      fullWidth
      breadcrumbs={[
        {
          content: "Back",
          onAction: () => {
            handleTabChange(0);
          },
        },
      ]}
    >
      {productExist ? (
        <div style={{ display: "flex", flexDirection: flexDirection }}>
          {/* //  Todo left side page */}
          <div
            style={{
              width: leftSideWidth,
              marginTop: "10px",
              marginRight: "20px",
            }}
          >
            <ProductInfo
              productToPrepare={productToPrepare}
              handleproductToPrepare={handleproductToPrepare}
              nonFoodProduct={nonFoodProduct}
              handleNonFoodProduct={handleNonFoodProduct}
              handleNutriScoreCheckElem={handleNutriScoreCheckElem}
              locationPlan={locationPlan}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              deselectedOptions={deselectedOptions}
              memoOptions={memoOptions}
              setMemoOptions={setMemoOptions}
              removeTag={removeTag}
              productsAredifferent={productsAredifferent}
            />
            {nonFoodProduct ? (
              <Card sectioned>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Heading>
                    This product doesn’t need a nutrition label.
                  </Heading>
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <TextStyle variation="subdued">
                      Since this product is a non-food item, you do not need to
                      enter any further information. By default, no nutrition
                      label is displayed for this product on the product detail
                      page.
                    </TextStyle>
                  </div>
                </div>
              </Card>
            ) : (
              <div>
                <ServingSize
                  productToPrepare={productToPrepare}
                  servingSize={data.servingSize}
                  locationPlan={locationPlan}
                  data={data}
                  handleChange={handleChange}
                  portionSizeModalCheckBox={portionSizeModalCheckBox}
                />
                {locationPlan.location === "EU" ? (
                  <CalsEnergyInfos
                    data={data ? data : {}}
                    handleChange={handleChange}
                    energyKj100={data.calsEnergyInfo.energyKj100}
                    langState={langState.values}
                  />
                ) : (
                  <></>
                )}

                <NutritionInfoEU
                  locationPlan={locationPlan}
                  formLables={
                    locationPlan.location === "EU"
                      ? formLables.formLablesEU
                      : formLables.formLablesCA_NA
                  }
                  data={data}
                  handleAddNutritionData={handleAddNutritionData}
                  handleRemoveNutritionData={handleRemoveNutritionData}
                  handleChange={handleChange}
                  productToPrepare={productToPrepare}
                />
                {locationPlan.plan === "Basic" && location === "EU" ? (
                  <BasicVitaminsMineralsPage
                    handleTabChange={handleTabChange}
                  />
                ) : (
                  <>
                    <Vitamins
                      data={data.vitamins}
                      locationPlan={locationPlan}
                      handleAddVitamins={handleAddVitamins}
                      handleRemoveVitamins={handleRemoveVitamins}
                      handleChange={handleChange}
                      allData={data}
                    />
                    <Minerals
                      data={data.minerals}
                      locationPlan={locationPlan}
                      handleAddMinerals={handleAddMinerals}
                      handleRemoveMinerals={handleRemoveMinerals}
                      handleChange={handleChange}
                      allData={data}
                    />
                  </>
                )}
                <Notes
                  notesText={data.richText.notesText}
                  handleTextChange={handleNotesTextChange}
                />
                <Ingredients
                  data={langState.values.Ingredients}
                  ingredientsText={data.richText.ingredientsText}
                  handleTextChange={handleIngredientsTextChange}
                />
                <AllergyInfo
                  data={langState.values.AllergyInformation}
                  allergyInfoText={data.richText.allergyInfoText}
                  handleTextChange={handleAllergyInfoTextChange}
                />
                <LegalNotes
                  data={langState.values.LEGALNOTICE}
                  lEGALNOTICEText={data.richText.lEGALNOTICEText}
                  handleTextChange={handleLEGALNOTICETextChange}
                />
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Button
                destructive
                outline
                style={{ margin: "4px" }}
                type="button"
                className="button remove"
                onClick={() => {}}
              >
                Delete Label
              </Button>
              <Button
                primary
                style={{ margin: "4px" }}
                type="button"
                className="button remove"
                onClick={() =>
                  handleSaveSelectedProducts(
                    selectedProducts,
                    nonFoodProduct,
                    data,
                    selectedOptions
                  )
                }
              >
                Save Label
              </Button>
            </div>
          </div>
          {/* //  Todo right side page */}
          <div style={{ width: rightSideWidth, marginTop: "10px" }}>
            {nonFoodProduct ? (
              <></>
            ) : (
              <TablePreview
                data={data}
                productToPrepare={productToPrepare}
                locationPlan={locationPlan}
                langState={langState.values}
              />
            )}
          </div>
        </div>
      ) : (
        <SkeletonPage primaryAction>
          <Layout>
            <Layout.Section>
              <Card sectioned>
                <SkeletonBodyText />
              </Card>
              <Card sectioned>
                <TextContainer>
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText />
                </TextContainer>
              </Card>
              <Card sectioned>
                <TextContainer>
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText />
                </TextContainer>
              </Card>
            </Layout.Section>
            <Layout.Section secondary>
              <Card>
                <Card.Section>
                  <TextContainer>
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText lines={2} />
                  </TextContainer>
                </Card.Section>
                <Card.Section>
                  <SkeletonBodyText lines={1} />
                </Card.Section>
              </Card>
              <Card subdued>
                <Card.Section>
                  <TextContainer>
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText lines={2} />
                  </TextContainer>
                </Card.Section>
                <Card.Section>
                  <SkeletonBodyText lines={2} />
                </Card.Section>
              </Card>
            </Layout.Section>
          </Layout>
        </SkeletonPage>
      )}
    </Page>
  );
}

export default CreateLabel;

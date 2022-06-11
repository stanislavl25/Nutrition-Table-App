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
import { Heading, Card, Button, Page, TextStyle } from "@shopify/polaris";
import NutritionInfo from "./NutritionInfoEU";
import CheckLocation from "./CheckLocation";
import BasicVitaminsMineralsPage from "./BasicVitaminsMineralsPage";
const formLablesEU = ["Name", "Per 100 g", "Per portion", "Unit"];
const formLablesCA_NA = ["Name", "Quantity", "Unit", "% Daily Value*"];
const formLables = {
  formLablesCA_NA,
  formLablesEU,
};

function CreateLabel({
  langState,
  newFormSet,
  formData,
  location,
  setLocation,
  selectedProducts,
  navigateToProducts,
  productsArray,
}) {
  const [productExist, setProductExist] = useState(false);
  const [data, setData] = useState({
    richText: {
      ingredientsText:
        "<p>Mandarin Oranges (37.9%), Light Whipping Cream (<strong>Milk</strong>), Peras (12.4%), Peaches (7.7%), Thompson Seedles Grapes (7.6%), Apple (7.5%), Banana (5.9%), English Walnuts (<strong>Tree Nuts</strong>)</p>",
      allergyInfoText:
        "<p>Contains Wheat, Almond, Peanut, Soy, and Milk, It May contain other tree nuts.</p>",
      lEGALNOTICEText:
        "<p><strong>*LEGAL NOTICE </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum risus tempor, blandit nisi sollicitudin, varius diam.</p>",
      nutriScore: "",
    },
    servingSize: {
      CA: {
        servingSizeBasic: "250",
        servingRefBasic: "per 1 cup",
        bilingualRefBasic: "pour 1 tasse",
        unitBasic: "Milliliters",
        caloriesPerServingBasic: "110",
      },
      EU: {
        DefaultAmoount: "100",
        DefaultAmoountUnit: "Grams",
        PortionSize: "25",
        PortionSizeUnit: "Grams",
      },
      NA: {
        Servingspercontainer: "8",
        Servingreference: "2/3 cup",
        servingsize: "55",
        unit: "Grams",
        Caloriesperserving: "230",
        UnpreparedReference: "Per 2/3 cup",
        Unpreparedcalories: "140",
        PreparedReference: "As prepared",
        Preparedcalories: "230",
      },
    },
  });

  const [locationPlan, setLocationPlan] = useState({
    location: location,
    plan: "Advanced",
  });
  const handleLocation = (newlocation) => {
    setLocation(newlocation);
  };
  const handlePlan = (newPlan) => {
    let newData = { ...locationPlan };
    locationPlan["plan"] = newPlan;
    setLocationPlan(newData);
  };

  const [formValues, setFormValues] = useState(formData);

  const [productToPrepare, setProductToPrepare] = useState(false);
  const [nonFoodProduct, setNonFoodProduct] = useState(false);
  const handleOrderSet = () => {
    for (var i = 0; i < formValues.length; i++) {
      let newFormValues = [...formValues];
      newFormValues[i]["order"] = i;
      setFormValues(newFormValues);
    }
  };
  const SetBasicPlanEUPerPortion = () => {
    if (locationPlan.plan === "Basic") {
      for (var i = 0; i < formValues.length; i++) {
        let newFormValues = [...formValues];
        newFormValues[i]["perportion"] = "";
        setFormValues(newFormValues);
      }
    }
  };
  const handleSelectedProducts = () => {
    if (selectedProducts && selectedProducts.length > 0) {
      for (var i = 0; i < productsArray.length; i++) {
        if (selectedProducts.includes(productsArray[i]._id)) {
          console.log(true);
          setData(productsArray[i]);
          return;
        }
      }
    }
    console.log("!selectedProducts");
    if (!selectedProducts) {
      console.log("no products");
      if (location === "CA") {
        const valueCA =
          "<p>*5% or less is <strong>a little</strong> , 15% or more is <strong>a lot</strong>   *5% ou moins c’est <strong>peu</strong>, 15% ou plus c’est <strong>beaucoup</strong></p>";
        let newData = { ...data };
        newData["richText"]["notesText"] = valueCA;
        setData(newData);
        return;
      }
      if (location === "NA") {
        const valueNA =
          "<p>* The % Daily Value (DV) tells you how muchanutrient in aserving of a food contributs to a daily diet.<hr /> 2,000 caloriesaday is used for general nutrition advice.</p>";
        let newData = { ...data };
        newData["richText"]["notesText"] = valueNA;
        setData(newData);
        return;
      }
      if (location === "EU") {
        const valueEU =
          "<p>Salt content is exclusively due to the presence of naturally occurring sodium.</p>";
        let newData = { ...data };
        newData["richText"]["notesText"] = valueEU;
        setData(newData);
        return;
      }
    }
  };
  useEffect(() => {
    handleSelectedProducts();
    handleOrderSet();
    SetBasicPlanEUPerPortion();
    console.log(data.richText.notesText);
  }, []);
  const handleOrderChange = (toIndex, prevIndex) => {
    const element = formValues.splice(prevIndex, 1)[0];
    formValues.splice(toIndex, 0, element);
    console.log(formValues);
  };
  const handleNutriScoreCheckElem = (newState) => {
    setData((prevState) => ({ ...prevState, nutriScore: newState }));
    console.log(newState);
  };
  const handleServingSizeChange = useCallback((value, tag, name) => {
    let newData = { ...data };
    newData["servingSize"][tag][name] = value;
    setData(newData), [];
  });
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
    setData((prevState) => ({ ...prevState, ingredientsText: editedText }));
  };
  const handleAllergyInfoTextChange = (e, editor) => {
    const editedText = editor.getData();
    setData((prevState) => ({ ...prevState, allergyInfoText: editedText }));
  };
  const handleLEGALNOTICETextChange = (e, editor) => {
    const editedText = editor.getData();
    setData((prevState) => ({
      ...prevState,
      lEGALNOTICEText: editedText,
    }));
  };
  const handleNotesTextChange = async (e, editor) => {
    const editedText = await editor.getData();
    setData((prevState) => ({ ...prevState, notesText: editedText }));
  };
  return (
    <Page
      title="Create Label"
      primaryAction={{
        content: "Save Label",
        onAction: () => {
          console.log("clicked");
          // todo save
        },
      }}
      fullWidth
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* //  Todo left side page */}
        <div style={{ width: "65%", marginTop: "10px", marginRight: "20px" }}>
          <CheckLocation
            handleLocation={handleLocation}
            handlePlan={handlePlan}
          />
          <ProductInfo
            productToPrepare={productToPrepare}
            handleproductToPrepare={handleproductToPrepare}
            nonFoodProduct={nonFoodProduct}
            handleNonFoodProduct={handleNonFoodProduct}
            handleNutriScoreCheckElem={handleNutriScoreCheckElem}
            locationPlan={locationPlan}
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
                <Heading>This product doesn’t need a nutrition label.</Heading>
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
                handleServingSizeChange={handleServingSizeChange}
                locationPlan={locationPlan}
              />
              {locationPlan.location === "EU" ? <CalsEnergyInfos /> : <></>}

              <NutritionInfo
                locationPlan={locationPlan}
                formValues={formValues}
                setFormValues={setFormValues}
                handleOrderChange={handleOrderChange}
                newFormSet={newFormSet}
                formLables={
                  locationPlan.location === "EU"
                    ? formLables.formLablesEU
                    : formLables.formLablesCA_NA
                }
              />
              {locationPlan.plan === "Basic" ? (
                <BasicVitaminsMineralsPage />
              ) : (
                <>
                  <Vitamins />
                  <Minerals />
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
              onClick={() => console.log("clicked")}
            >
              Delete Label
            </Button>
            <Button
              primary
              style={{ margin: "4px" }}
              type="button"
              className="button remove"
              onClick={() => console.log("clicked")}
            >
              Save Label
            </Button>
          </div>
        </div>
        {/* //  Todo right side page */}
        <div style={{ width: "35%", marginTop: "10px" }}>
          {nonFoodProduct ? (
            <></>
          ) : (
            <TablePreview
              data={data}
              formValues={formValues}
              productToPrepare={productToPrepare}
            />
          )}
        </div>
      </div>
    </Page>
  );
}

export default CreateLabel;

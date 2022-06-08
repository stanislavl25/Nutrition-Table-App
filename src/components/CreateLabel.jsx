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
}) {
  console.log(selectedProducts);
  const [data, setData] = useState({
    ingredientsText:
      "<p>Mandarin Oranges (37.9%), Light Whipping Cream (<strong>Milk</strong>), Peras (12.4%), Peaches (7.7%), Thompson Seedles Grapes (7.6%), Apple (7.5%), Banana (5.9%), English Walnuts (<strong>Tree Nuts</strong>)</p>",
    notesText:
      "<p>* The % Daily Value (DV) tells you how muchanutrient in aserving ofafood contributs toadaily diet.<hr/> 2,000 caloriesaday is used for general nutrition advice.</p>",
    allergyInfoText:
      "<p>Contains Wheat, Almond, Peanut, Soy, and Milk, It May contain other tree nuts.</p>",
    lEGALNOTICEText:
      "<p><strong>*LEGAL NOTICE </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum risus tempor, blandit nisi sollicitudin, varius diam.</p>",
    nutriScore: "",
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
    locationPlan: {
      location: location,
      plan: "Advanced",
    },
  });

  const handleLocation = (newlocation) => {
    setLocation(newlocation);
  };
  const handlePlan = (newPlan) => {
    let newData = { ...data };
    newData["locationPlan"]["plan"] = newPlan;
    setData(newData);
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
    if (data.locationPlan.plan === "Basic") {
      for (var i = 0; i < formValues.length; i++) {
        let newFormValues = [...formValues];
        newFormValues[i]["perportion"] = "";
        setFormValues(newFormValues);
      }
    }
  };
  useEffect(() => {
    handleOrderSet();
    SetBasicPlanEUPerPortion();
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
        },
      }}
      fullWidth
      subtitle=""
      compactTitle
      secondaryActions={[]}
      actionGroups={[]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
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
            locationPlan={data.locationPlan}
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
                locationPlan={data.locationPlan}
              />
              {data.locationPlan.location === "EU" ? (
                <CalsEnergyInfos />
              ) : (
                <></>
              )}
              {/* <NutritionInfoCheck
            locationPlan={data.locationPlan}
            formValues={formValues}
            setFormValues={setFormValues}
            formLables={formLables}
            handleOrderChange={handleOrderChange}
            newFormSet={newFormSet}
          /> */}
              <NutritionInfo
                locationPlan={data.locationPlan}
                formValues={formValues}
                setFormValues={setFormValues}
                handleOrderChange={handleOrderChange}
                newFormSet={newFormSet}
                formLables={
                  data.locationPlan.location === "EU"
                    ? formLables.formLablesEU
                    : formLables.formLablesCA_NA
                }
              />
              {data.locationPlan.plan === "Basic" ? (
                <BasicVitaminsMineralsPage />
              ) : (
                <>
                  <Vitamins />
                  <Minerals />
                </>
              )}
              <Notes
                notesText={data.notesText}
                handleTextChange={handleNotesTextChange}
              />
              <Ingredients
                data={langState.values.Ingredients}
                ingredientsText={data.ingredientsText}
                handleTextChange={handleIngredientsTextChange}
              />
              <AllergyInfo
                data={langState.values.AllergyInformation}
                allergyInfoText={data.allergyInfoText}
                handleTextChange={handleAllergyInfoTextChange}
              />
              <LegalNotes
                data={langState.values.LEGALNOTICE}
                lEGALNOTICEText={data.lEGALNOTICEText}
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

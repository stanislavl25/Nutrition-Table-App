import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
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
  location,
  selectedProducts,
  handleTabChange,
  productsArray,
  handleSaveSelectedProducts,
  data,
  setData,
  defaultSet,
}) {
  const [locationPlan, setLocationPlan] = useState({
    location: location,
    plan: "Advanced",
  });

  const [formValues, setFormValues] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(selectedProducts);
  const [productToPrepare, setProductToPrepare] = useState(false);
  const [nonFoodProduct, setNonFoodProduct] = useState(false);
  const [rightSideWidth, setRightSideWidth] = useState("35%");
  const [leftSideWidth, setLeftSideWidth] = useState("60%");
  const [flexDirection, setFlexDirection] = useState("row");

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
      console.log(window.innerWidth);
    });
  });

  const handleOrderSet = () => {
    for (var i = 0; i < formValues.length; i++) {
      let newFormValues = [...formValues];
      newFormValues[i]["order"] = i;
      setFormValues(newFormValues);
    }
  };

  useEffect(() => {
    handleOrderSet();
  }, [productsArray, selectedProducts, data]);

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
          handleSaveSelectedProducts(selectedProducts, nonFoodProduct, data);
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
            productsArray={productsArray}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            defaultSet={defaultSet}
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
                data={data}
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
                data={data}
              />
              {locationPlan.plan === "Basic" && location === "EU" ? (
                <BasicVitaminsMineralsPage handleTabChange={handleTabChange} />
              ) : (
                <>
                  <Vitamins
                    data={data.vitamins}
                    defaultSet={defaultSet}
                    locationPlan={locationPlan}
                  />
                  <Minerals
                    data={data.minerals}
                    defaultSet={defaultSet}
                    locationPlan={locationPlan}
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
              onClick={() => console.log("clicked")}
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
                  data
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

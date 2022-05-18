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
import { Heading, Card, Button } from "@shopify/polaris";
import NutritionInfoCheck from "./NutritionInfoCheck";
import NutritionInfo from "./NutritionInfoEU";
const formData = [
  {
    name: "Fat",
    per100g: "9.2",
    perportion: "8",
    unit: "Grams",
    bold: "No",
    leftSpacing: "0",
    order: "",
  },
  {
    name: "Of which Saturates",
    per100g: "5.6",
    perportion: "3.7",
    unit: "Grams",
    bold: "Yes",
    leftSpacing: "0",
    order: "",
  },
  {
    name: "Carbohydrate",
    per100g: "46",
    perportion: "9",
    unit: "Grams",
    bold: "Yes",
    leftSpacing: "0",
    order: "",
  },
  {
    name: "Of which Sugars",
    per100g: "21",
    perportion: "8",
    unit: "Grams",
    bold: "Yes",
    leftSpacing: "0",
    order: "",
  },
  {
    name: "Protein",
    per100g: "5.0",
    perportion: "2.7",
    unit: "Grams",
    bold: "Yes",
    leftSpacing: "0",
    order: "",
  },
  {
    name: "Salt",
    per100g: "0.2",
    perportion: "0.11",
    unit: "Grams",
    bold: "Yes",
    leftSpacing: "0",
    order: "",
  },
];
const formLablesEU = ["Name", "Per 100 g", "Per portion", "Unit"];
const formLablesCA_NA = ["Name", "Quantity", "Unit", "% Daily Value*"];
const formLables = {
  formLablesCA_NA,
  formLablesEU,
};
const order = formData.length;

const newFormSet = {
  name: "",
  per100g: "",
  perportion: "",
  unit: "Grams",
  bold: "Yes",
  leftSpacing: "0",
  order: order,
};

function CreateLabel({ langState }) {
  const [formValues, setFormValues] = useState(formData);
  const [data, setData] = useState({
    ingredientsText:
      "<p>Mandarin Oranges (37.9%), Light Whipping Cream (<strong>Milk</strong>), Peras (12.4%), Peaches (7.7%), Thompson Seedles Grapes (7.6%), Apple (7.5%), Banana (5.9%), English Walnuts (<strong>Tree Nuts</strong>)</p>",
    notesText:
      "<p>*The%Daily Value (DV) tells you how muchanutrient in aserving ofafood contributs toadaily diet. 2,000 caloriesaday is used for general nutrition advice.</p>",
    allergyInfoText:
      "<p>Contains Wheat, Almond, Peanut, Soy, and Milk, It May contain other tree nuts.</p>",
    lEGALNOTICEText:
      "<p><strong>*LEGAL NOTICE </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum risus tempor, blandit nisi sollicitudin, varius diam.</p>",
    nutriScore: "",
    servingSizeCA: {
      servingSizeBasic: "250",
      servingRefBasic: "per 1 cup",
      bilingualRefBasic: "pour 1 tasse",
      unitBasic: "Milliliters",
      caloriesPerServingBasic: "110",
    },
    locationPlan: {
      location: "EU",
      plan: "Basic",
    },
  });
  const [productToPrepare, setProductToPrepare] = useState(false);
  const [editableProduct, setEditableProduct] = useState(false);
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
  const handleServingSizeCAChange = useCallback((value, name) => {
    let newData = { ...data };
    newData["servingSizeCA"][name] = value;
    setData(newData), [];
  });
  const handleproductToPrepare = useCallback(
    (newChecked) => setProductToPrepare(newChecked),
    []
  );
  const handleEditableProduct = useCallback(
    (newChecked) => setEditableProduct(newChecked),
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
    <div>
      <Heading element="h1"> Create Label</Heading>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* //  Todo left side page */}
        <div style={{ width: "65%", marginTop: "10px", marginRight: "20px" }}>
          <ProductInfo
            productToPrepare={productToPrepare}
            handleproductToPrepare={handleproductToPrepare}
            editableProduct={editableProduct}
            handleEditableProduct={handleEditableProduct}
            handleNutriScoreCheckElem={handleNutriScoreCheckElem}
          />
          <ServingSize
            productToPrepare={productToPrepare}
            servingSizeCA={data.servingSizeCA}
            handleServingSizeCAChange={handleServingSizeCAChange}
          />
          {data.locationPlan === "EU" ? <CalsEnergyInfos /> : <></>}
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
          <Vitamins />
          <Minerals />
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10px",
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
        <div style={{ width: "30%", marginTop: "10px" }}>
          <TablePreview data={data} />
        </div>
      </div>
    </div>
  );
}

export default CreateLabel;

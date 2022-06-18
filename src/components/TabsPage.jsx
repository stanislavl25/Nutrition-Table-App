import React, { useCallback, useEffect, useState } from "react";
import { Toast, Card, Page, Tabs, Frame } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";
import MyLables from "./MyLables";
import Translations from "./Translations";
import CreateLabel from "./CreateLabel";
import RecommendedIntake from "./RecommendedIntake";
import PricinPlans from "./PricingPlans";
import Documentation from "./Documentation";

const formDataEU = [
  {
    name: "Fat",
    per100g: "9.2",
    perportion: "8",
    unit: "Grams",
    bold: "No",
    leftSpacing: "0",
    order: "",
    RI: "10",
  },
  {
    name: "Of which Saturates",
    per100g: "5.6",
    perportion: "3.7",
    unit: "Grams",
    bold: "Yes",
    leftSpacing: "0",
    order: "",
    RI: "10",
  },
  {
    name: "Carbohydrate",
    per100g: "46",
    perportion: "9",
    unit: "Grams",
    bold: "Yes",
    leftSpacing: "0",
    order: "",
    RI: "10",
  },
  {
    name: "Of which Sugars",
    per100g: "21",
    perportion: "8",
    unit: "Grams",
    bold: "Yes",
    leftSpacing: "0",
    order: "",
    RI: "10",
  },
  {
    name: "Protein",
    per100g: "5.0",
    perportion: "2.7",
    unit: "Grams",
    bold: "Yes",
    leftSpacing: "0",
    order: "",
    RI: "10",
  },
  {
    name: "Salt",
    per100g: "0.2",
    perportion: "0.11",
    unit: "Grams",
    bold: "Yes",
    leftSpacing: "0",
    order: "",
    RI: "10",
  },
];
const formDataNA = [
  {
    name: "Total Fat",
    quantity: "8",
    unit: "Grams",
    dailyValue: "10",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProductQuantity: "",
    preparedProductDV: "",
    preparedProductUnit: "Grams",
  },
  {
    name: "Saturated Fat",
    quantity: "1",
    unit: "Grams",
    dailyValue: "5",
    bold: "No",
    order: "",
    leftSpacing: "1",
    preparedProductQuantity: "",
    preparedProductDV: "",
    preparedProductUnit: "Grams",
  },
  {
    name: "Trans Fat",
    quantity: "0",
    unit: "MilliGrams",
    dailyValue: "",
    bold: "No",
    order: "",
    leftSpacing: "1",
    preparedProductQuantity: "",
    preparedProductDV: "",
    preparedProductUnit: "Grams",
  },
  {
    name: "Cholesterol",
    quantity: "0",
    unit: "MilliGrams",
    dailyValue: "0",
    bold: "No",
    order: "",
    leftSpacing: "",
    preparedProductQuantity: "",
    preparedProductDV: "",
    preparedProductUnit: "Grams",
  },
  {
    name: "Sodium ",
    quantity: "160",
    unit: "Milligrams",
    dailyValue: "7",
    bold: "No",
    order: "",
    leftSpacing: "",
    preparedProductQuantity: "",
    preparedProductDV: "",
    preparedProductUnit: "Grams",
  },
  {
    name: "Total Carbohydrate",
    quantity: "37",
    unit: "Grams",
    dailyValue: "13",
    bold: "No",
    order: "",
    leftSpacing: "",
    preparedProductQuantity: "",
    preparedProductDV: "",
    preparedProductUnit: "Grams",
  },
  {
    name: "Dietary Fiber",
    quantity: "4",
    unit: "Grams",
    dailyValue: "14",
    bold: "No",
    order: "",
    leftSpacing: "1",
    preparedProductQuantity: "",
    preparedProductDV: "",
    preparedProductUnit: "Grams",
  },
  {
    name: "Total Sugars",
    quantity: "12",
    unit: "Grams",
    dailyValue: "",
    bold: "No",
    order: "",
    leftSpacing: "",
    preparedProductQuantity: "",
    preparedProductDV: "",
    preparedProductUnit: "Grams",
  },
  {
    name: "Includes Added Sugars",
    quantity: "10",
    unit: "Grams",
    dailyValue: "20",
    bold: "No",
    order: "",
    leftSpacing: "2",
    preparedProductQuantity: "",
    preparedProductDV: "",
    preparedProductUnit: "Grams",
  },
  {
    name: "Protein",
    quantity: "3",
    unit: "Grams",
    dailyValue: "10",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProductQuantity: "",
    preparedProductDV: "",
    preparedProductUnit: "Grams",
  },
];
const formDataCA = [
  {
    name: "Fat / Lipides",
    quantity: "0",
    Unit: "Grams",
    dailyValue: "0",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "Saturated / saturés",
    quantity: "0",
    Unit: "Grams",
    dailyValue: "0",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "+ Trans / trans",
    quantity: "0",
    Unit: "Grams",
    dailyValue: "",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "Carbohydrate / Glucid",
    quantity: "26",
    Unit: "Grams",
    dailyValue: "",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "Fibre & Fibres",
    quantity: "0",
    Unit: "Grams",
    dailyValue: "0",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "Sugars / sucres",
    quantity: "22",
    Unit: "Grams",
    dailyValue: "22",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "Protein / Protéines",
    quantity: "2",
    Unit: "Grams",
    dailyValue: "",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "Cholesterol / Cholest",
    quantity: "0",
    Unit: "Grams",
    dailyValue: "",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "Sodium",
    quantity: "0",
    Unit: "Grams",
    dailyValue: "0",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
];
const recommendedIntakeRows = [
  { name: "Energy", quantity: "2000", unit: "Grams" },
  { name: "Fat", quantity: "44", unit: "Grams" },
  { name: "Of which Saturates", quantity: "", unit: "Grams" },
  { name: "Carbohydrates", quantity: "00", unit: "Grams" },
  { name: "Of which Sugars", quantity: "00", unit: "Grams" },
  { name: "Protein", quantity: "00", unit: "Grams" },
  { name: "Salt", quantity: "00", unit: "Grams" },
  { name: "Vitamin C", quantity: "00", unit: "Grams" },
];
const vitaminsEU = [
  {
    name: "Vitamin C",
    per100g: "14.81",
    perportion: "4.5",
    LeftSpacing: "",
    order: "",
    RI: "",
    unit: "Grams",
  },
];
const mineralsEU = [];
const vitaminsNA = [
  {
    name: "Vitamin D",
    quantity: "2",
    dailyValue: "10",
    LeftSpacing: "",
    order: "",
    RI: "",
    unit: "Micrograms",
  },
];
const mineralsNA = [
  {
    name: "Calcium",
    quantity: "260",
    dailyValue: "20",
    LeftSpacing: "",
    order: "",
    RI: "",
    unit: "Miligrams",
  },
  {
    name: "Vitamin D",
    quantity: "8",
    dailyValue: "45",
    LeftSpacing: "",
    order: "",
    RI: "",
    unit: "Miligrams",
  },
  {
    name: "Vitamin D",
    quantity: "240",
    dailyValue: "6",
    LeftSpacing: "",
    order: "",
    RI: "",
    unit: "Miligrams",
  },
];
const vitaminsCA = [];
const mineralsCA = [
  {
    name: "Potassium",
    quantity: "450",
    dailyValue: "10",
    LeftSpacing: "",
    order: "",
    RI: "",
    unit: "Miligrams",
  },
  {
    name: "Calcium",
    quantity: "30",
    dailyValue: "2",
    LeftSpacing: "",
    order: "",
    RI: "",
    unit: "Miligrams",
  },
  {
    name: "Iron / Fer",
    quantity: "0",
    dailyValue: "0",
    LeftSpacing: "",
    order: "",
    RI: "",
    unit: "Miligrams",
  },
];
const order = formDataCA.length;
const newFormSet = {
  name: "",
  per100g: "",
  perportion: "",
  unit: "Grams",
  bold: "Yes",
  leftSpacing: "0",
  order: order,
};
function TabsPage() {
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const [langState, setLangState] = useState({
    values: {},
    checked: {},
  });

  const [selected, setSelected] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState();
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
  const [productsArray, setProductsArray] = useState();
  const [location, setLocation] = useState("");
  const [locationObj, setlocationObj] = useState({});
  const [emptyStore, setEmptyStore] = useState(false);
  const [checkPlan, setCheckPlan] = useState(true);
  const [categories, setCategories] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [active, setActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [defaultSet, setDefaultSet] = useState(false);
  const [recommendedIntakeData, setRecommendedIntakeData] = useState(
    storeData.recommendedIntake
  );
  const [arraydata, setArrayData] = useState({});
  const [defaultData, setDefaultData] = useState({
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
        unpreparedReference: "As sold",
        unpreparedBilingualReference: "Tel que vendu",
        unpreparedCalories: "110",
        preparedReference: "Prepared",
        preparedBilingualReference: "préparé",
        preparedCalories: "70",
      },
      EU: {
        DefaultAmount: "100",
        DefaultAmountUnit: "Grams",
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
    minerals: [],
    nutritionData: [],
    vitamins: [],
  });

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  // ! fix recommended intake late update for useState
  useEffect(async () => {
    console.log(storeData.recommendedIntake !== recommendedIntakeData);
    if (storeData.recommendedIntake !== recommendedIntakeData) {
      setTimeout(async () => {
        await setRecommendedIntakeData(storeData.recommendedIntake);
        console.log(recommendedIntakeData);
      }, 1000);
    }
  }, [storeData]);

  /*** save store products if not saved and get store needed data */
  const saveProductsGetStoreData = async () => {
    const shopData = await fetch("/products-save").then((res) => res.json());
    if (shopData.recommendedIntake.length === 0) {
      shopData.recommendedIntake = recommendedIntakeRows;
    }
    setStoreData(shopData);
  };

  /*** get store location */
  const fetchLocations = async () => {
    try {
      const data = await fetch("/locations").then((res) => res.json());
      setlocationObj(data);
      if (data.length) {
        const countryCode = data[0].country_code;
        if (countryCode.includes("US") || countryCode.includes("UM")) {
          setLocation("NA");
        }
        if (countryCode.includes("CA")) {
          setLocation("CA");
        } else {
          setLocation("EU");
        }
      }
    } catch (err) {
      //Todo
      console.log(err);
    }
  };

  const handleSettingDefaultData = () => {
    if (location === "CA") {
      defaultData.nutritionData = formDataCA;
      defaultData.richText.notesText =
        "<p>*5% or less is <strong>a little</strong> , 15% or more is <strong>a lot</strong> *5% ou moins c’est <strong>peu</strong>, 15% ou plus c’est <strong>beaucoup</strong></p>";
      defaultData.minerals = mineralsCA;
      defaultData.vitamins = vitaminsCA;
    }
    if (location === "NA") {
      defaultData.nutritionData = formDataNA;
      defaultData.richText.notesText =
        "<p>* The % Daily Value (DV) tells you how muchanutrient in aserving of a food contributs to a daily diet.<hr /> 2,000 caloriesaday is used for general nutrition advice.</p>";
      defaultData.minerals = mineralsNA;
      defaultData.vitamins = vitaminsNA;
    }
    if (location === "EU") {
      defaultData.nutritionData = formDataEU;
      defaultData.richText.notesText =
        "<p>Salt content is exclusively due to the presence of naturally occurring sodium.</p>";
      defaultData.minerals = mineralsEU;
      defaultData.vitamins = vitaminsEU;
    }
  };

  /*** get store products and check if some primary elements empty */
  const fetchProducts = async () => {
    try {
      const data = await fetch("products-list").then((res) => res.json());
      if (data.length) {
        await data.forEach((elem) => {
          if (elem.richText.notesText === undefined) {
            if (location === "EU")
              elem.richText.notesText =
                "<p>Salt content is exclusively due to the presence of naturally occurring sodium.</p>";
            if (location === "NA")
              elem.richText.notesText =
                "<p>* The % Daily Value (DV) tells you how muchanutrient in aserving of a food contributs to a daily diet.<hr /> 2,000 caloriesaday is used for general nutrition advice.</p>";
            if (location === "CA") {
              elem.richText.notesText =
                "<p>*5% or less is <strong>a little</strong> , 15% or more is <strong>a lot</strong> *5% ou moins c’est <strong>peu</strong>, 15% ou plus c’est <strong>beaucoup</strong></p>";
            }
          }
          if (!elem.nutritionData?.length > 0) {
            if (location === "CA") elem.nutritionData = formDataCA;
            if (location === "NA") elem.nutritionData = formDataNA;
            if (location === "EU") elem.nutritionData = formDataEU;
          }
          if (!elem.vitamins?.length > 0) {
            if (location === "CA") elem.vitamins = vitaminsCA;
            if (location === "NA") elem.vitamins = vitaminsNA;
            if (location === "EU") elem.vitamins = vitaminsEU;
          }
          if (!elem.minerals?.length > 0) {
            if (location === "CA") elem.minerals = mineralsCA;
            if (location === "NA") elem.minerals = mineralsNA;
            if (location === "EU") elem.minerals = mineralsEU;
          }
        });
        setProductsArray(data);
        setArrayData(defaultData);
        setDefaultSet(true);
        var array = [];
        var uniqueValues = [];
        const handlecategories = (element) => {
          var newCategorie = { label: "", value: "" };
          newCategorie.label = element.product_type;
          newCategorie.value = element.product_type;
          array.push(newCategorie);
        };
        data.forEach((elem) => handlecategories(elem));
        const unique = array.filter((element) => {
          const isDuplicate = uniqueValues.includes(element.label);
          if (!isDuplicate) {
            uniqueValues.push(element.label);
            return true;
          }
          return false;
        });
        setCategories(unique);
      } else {
        //Todo
        setEmptyStore(true);
      }
    } catch (err) {
      console.log(err);
      setEmptyStore(true);
    }
  };

  const fetchLang = async () => {
    const data = await fetch("/LangData")
      .then((res) => res.json())
      .then((response) => {
        if (response.success && response.data.values !== undefined) {
          const data = response.data[0];
          setLangState((langState) => ({
            ...langState,
            values: data,
            checked: data,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // todo clean up after the use effect
  useEffect(async () => {
    await fetchLocations();
    await saveProductsGetStoreData();
    await fetchLang();
    handleSettingDefaultData();
    setTimeout(async () => {
      await fetchProducts();
    }, 500);
  }, []);

  /**
   * Handle recommended intake save to backend
   *
   * @param {recommendedIntake data, store id}
   */

  const saveRecomIntake = async (formVal, storeId) => {
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formVal, storeId }),
    };
    console.log(formVal, storeId);
    // const data = await fetch("/recommendedIntake_save", fetchOptions)
    //   .then((res) => res.json())
    //   .then((response) => {
    //     console.log(response);
    //     // handleSnackToggle(messages.message);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // handleSnackToggle("Something wrong happend!");
    //   });
  };

  const fetchLangChanges = async (name, value) => {
    const formValues = { name, value };
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    };
    if (langState.checked[name] !== value) {
      const data = await fetch("/LangFieldsSave", fetchOptions)
        .then((res) => res.json())
        .then((response) => {
          console.log(response, "translation data");
          // handleSnackToggle(messages.message);
        })
        .catch((err) => {
          console.log(err);
          // handleSnackToggle("Something wrong happend!");
        });
    }
  };

  /***handle save non food products to database */
  const handleSaveNonFoodProducts = async (products) => {
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products, shop_id: storeData.shop_id }),
    };
    try {
      const data = await fetch("/save_non-food", fetchOptions)
        .then((res) => res.json())
        .then(async (response) => {
          if (response.success) {
            await fetchProducts();
            setSelected(0);
            setToastMessage(response.message);
            toggleActive();
          }
          // handleSnackToggle(messages.message);
        });
    } catch (err) {
      console.log(err);
    }
  };
  /** saving food products */
  const handleSaveProducts = async (products) => {
    console.log(products, "handle save");
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products, shop_id: storeData.shop_id }),
    };
    try {
      // const data = await fetch("/save_foodProducts", fetchOptions)
      //   .then((res) => res.json())
      //   .then(async (response) => {
      //     if (response.success) {
      //       await fetchProducts();
      //       setSelected(0);
      //       setToastMessage(response.message);
      //       toggleActive();
      //     }
      //    });
    } catch (err) {
      console.log(err);
    }
  };

  /***handle saving products labels to database */
  const handleSaveSelectedProducts = async (
    selectedProducts,
    nonFoodProduct,
    data
  ) => {
    if (nonFoodProduct) {
      handleSaveNonFoodProducts(selectedProducts);
    }
    if (!nonFoodProduct) {
      handleSaveProducts(selectedProducts);
    }
  };

  const handleSelectedProducts = (selectedPro) => {
    if (selectedPro && selectedPro.length > 0) {
      setSelectedProducts(selectedPro);
      const products = productsArray;
      setProductsArray("none");
      setDefaultSet(false);
      setTimeout(() => {
        setProductsArray(products);
        setSelected(1);
      }, 300);
      for (var i = 0; i < productsArray.length; i++) {
        if (selectedPro.includes(productsArray[i].name)) {
          setArrayData(productsArray[i]);
          return;
        }
      }
    } else {
      setToastMessage("No products selected");
      toggleActive();
    }
  };
  const handleEditProduct = (id) => {
    setSelected(1);
    setSelectedProducts(id);
  };

  const toastMarkup = active ? (
    <Toast content={toastMessage} onDismiss={toggleActive} duration={3000} />
  ) : null;

  const TranslationsPage = (
    <Translations
      langState={langState}
      setLangState={setLangState}
      fetchLang={fetchLangChanges}
      location={location}
    />
  );
  const tabs = [
    {
      id: "Products",
      content: "Products",
      tab: (
        <MyLables
          handleTabChange={handleTabChange}
          handleSelectedProducts={handleSelectedProducts}
          handleEditProduct={handleEditProduct}
          productsArray={productsArray}
          setProductsArray={setProductsArray}
          emptyStore={emptyStore}
          categories={categories}
          checkPlan={checkPlan}
        />
      ),
    },
    {
      id: "Customize Label",
      content: "Customize Label",
      tab: (
        <CreateLabel
          langState={langState}
          newFormSet={newFormSet}
          location={location}
          setLocation={setLocation}
          selectedProducts={selectedProducts}
          handleTabChange={handleTabChange}
          productsArray={productsArray}
          handleSaveSelectedProducts={handleSaveSelectedProducts}
          data={arraydata}
          setData={setArrayData}
          defaultSet={defaultSet}
        />
      ),
    },
    {
      id: "Recommended Intake",
      content: "Recommended Intake",
      tab: (
        <RecommendedIntake
          saveRecomIntake={saveRecomIntake}
          rows={storeData.recommendedIntake}
          setStoreData={setStoreData}
          storeData={storeData}
          recommendedIntakeData={recommendedIntakeData}
        />
      ),
    },
    {
      id: "Translations",
      content: "Translations",
      tab: TranslationsPage,
    },
    {
      id: "Documentation",
      content: "Documentation",
      tab: <Documentation />,
    },
    {
      id: "PricinPlans",
      content: "Pricing Plans",
      tab: <PricinPlans />,
    },
  ];

  return (
    <div>
      <Frame>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section>{tabs[selected].tab}</Card.Section>
        </Tabs>
        {toastMarkup}
      </Frame>
    </div>
  );
}

export default TabsPage;

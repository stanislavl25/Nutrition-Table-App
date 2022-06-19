import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Toast, Card, Page, Tabs, Frame } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../../App";
import MyLables from "../MyLabels/MyLables";
import Translations from "../Translations/Translations";
import CreateLabel from "../CustomizeLabel/CreateLabel";
import RecommendedIntake from "../RecommendedIntake/RecommendedIntake";
import PricinPlans from "../PricingPlans/PricingPlans";
import Documentation from "../Documentaion/Documentation";
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
} from "../defaultData.js";

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
    if (storeData.recommendedIntake !== recommendedIntakeData) {
      setTimeout(async () => {
        await setRecommendedIntakeData(storeData.recommendedIntake);
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
          console.log(response, "translation data saved");
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

  /** handle memo set for filter functionality */
  const handleMemo = () => {
    let array = [];
    if (productsArray?.length === 0) return array;
    if (productsArray?.length > 0 && productsArray !== "none") {
      productsArray.forEach((element) => {
        const name = element.name;
        array.push({ value: name, label: name });
      });
    }
    return array;
  };
  const deselectedOptions = useMemo(handleMemo);
  const [memoOptions, setMemoOptions] = useState(deselectedOptions);
  const [selectedOptions, setSelectedOptions] = useState();
  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions]
  );

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
          deselectedOptions={deselectedOptions}
          memoOptions={memoOptions}
          setMemoOptions={setMemoOptions}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
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
          deselectedOptions={deselectedOptions}
          memoOptions={memoOptions}
          setMemoOptions={setMemoOptions}
          removeTag={removeTag}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
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

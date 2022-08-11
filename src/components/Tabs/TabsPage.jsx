import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Toast,
  Card,
  Tabs,
  Frame,
  useIndexResourceState,
} from "@shopify/polaris";
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
  { name: "Energy", quantity: "2000", unit: "Kcal" },
  { name: "Fat", quantity: "44", unit: "Grams" },
  { name: "Of which Saturates", quantity: "", unit: "Grams" },
  { name: "Carbohydrates", quantity: "00", unit: "Grams" },
  { name: "Of which Sugars", quantity: "00", unit: "Grams" },
  { name: "Protein", quantity: "00", unit: "Grams" },
  { name: "Salt", quantity: "00", unit: "Grams" },
  { name: "Vitamin C", quantity: "00", unit: "Grams" },
];

function TabsPage() {
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const [langState, setLangState] = useState({
    values: {},
    checked: {},
  });

  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
  const [productsArray, setProductsArray] = useState([]);
  const [location, setLocation] = useState("");
  const [locationObj, setlocationObj] = useState({});
  const [emptyStore, setEmptyStore] = useState(false);
  const [checkPlan, setCheckPlan] = useState(false);
  const [categories, setCategories] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [active, setActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [defaultSet, setDefaultSet] = useState(false);
  const [productsAredifferent, setProductsAredifferent] = useState(false);
  const [shop_plan, setShopPlan] = useState("");
  const [recommendedIntakeData, setRecommendedIntakeData] = useState(
    storeData.recommendedIntake
  );
  const [arraydata, setArrayData] = useState({});
  const [productExist, setProductExist] = useState(false);
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
    calsEnergyInfo: {},
  });

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  useEffect(async () => {
    let isSubscribed = true;
    if (storeData.recommendedIntake !== recommendedIntakeData) {
      setTimeout(async () => {
        await setRecommendedIntakeData(storeData.recommendedIntake);
      }, 1000);
    }
    return () => (isSubscribed = false);
  }, [storeData]);

  /*** get store needed data */
  const getStoreData = async () => {
    const shopData = await fetch("/store-data").then((res) => res.json());
    if (shopData.success) {
      if (shopData.data.recommendedIntake.length === 0) {
        shopData.data.recommendedIntake = recommendedIntakeRows;
      }
      setStoreData(shopData.data);
      setShopPlan(shopData.data.shop_plan);
    }
  };

  /*** get store location */
  const fetchLocations = async () => {
    try {
      const data = await fetch("/locations").then((res) => res.json());
      setlocationObj(data);
      setLocation("EU");
      return;
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
      // console.log(err);
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
      if (data.data.length > 999) {
        setCheckPlan(true);
      }
      if (data.success) {
        setProductsArray(data.data);
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
        data.data.forEach((elem) => handlecategories(elem));
        const unique = array.filter((element) => {
          const isDuplicate = uniqueValues.includes(element.label);
          if (!isDuplicate && element.value !== null) {
            uniqueValues.push(element.label);
            return true;
          }
          return false;
        });
        setCategories(unique);
        // console.log(unique);
      } else {
        //Todo
        setEmptyStore(true);
      }
    } catch (err) {
      // console.log(err);
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
   * @param {recommendedIntake data}
   */

  const saveRecomIntake = async (formVal) => {
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formVal }),
    };
    const data = await fetch("/recommendedIntake_save", fetchOptions)
      .then((res) => res.json())
      .then((response) => {
        setToastMessage(response.message);
        toggleActive();
      })
      .catch((err) => {
        handleSnackToggle("Something wrong happend!");
      });
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
          // console.log(response, "translation data saved");
          setToastMessage(response.message);
          toggleActive();
        })
        .catch((err) => {
          console.log(err);
          // handleSnackToggle("Something wrong happend!");
        });
    }
  };

  /***handle save non food products to database */
  const handleSaveNonFoodProducts = async (products) => {
    console.log("here non food ##########");
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }),
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
  const handleSaveProducts = async (products, data) => {
    try {
      productsArray.forEach(async (elem) => {
        if (products.includes(elem.name)) {
          console.log(elem);
          const fetchOptions = {
            method: "POST",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: elem._id, data: data }),
          };
          const update = await fetch("/save_foodProducts", fetchOptions)
            .then((res) => res.json())
            .then(async (response) => {
              if (response.success) {
                await fetchProducts();
                setSelected(0);
                setToastMessage(response.message);
                toggleActive();
              } else {
                setToastMessage(response.message);
                toggleActive();
              }
            });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  /***handle saving products labels to database */
  const handleSaveSelectedProducts = async (
    nonFoodProduct,
    data,
    selectedOptions
  ) => {
    if (!selectedOptions) {
      setToastMessage("No products selected!");
      toggleActive();
      return;
    }
    if (nonFoodProduct) {
      handleSaveNonFoodProducts(selectedOptions);
    }
    if (!nonFoodProduct) {
      handleSaveProducts(selectedOptions, data);
    }
  };

  const handleSelectedProducts = (selectedPro, boolean) => {
    if (!boolean || boolean === undefined) {
      setSelectedOptions(selectedPro);
      const products = productsArray;
      setProductsArray("none");
      setDefaultSet(false);
      setTimeout(() => {
        setProductsArray(products);
        setSelected(1);
      }, 500);
      for (var i = 0; i < productsArray.length; i++) {
        if (selectedPro.includes(productsArray[i].name)) {
          setArrayData(productsArray[i]);
          break;
        }
      }
    }
    let selectedElements = [];
    if (selectedPro.length > 1) {
      productsArray.forEach((elem) => {
        if (selectedPro.includes(elem.name)) {
          selectedElements.push(elem);
        }
      });
      for (var i = 1; i < selectedElements.length; i++) {
        if (
          selectedElements[0].food_product !==
            selectedElements[i].food_product ||
          selectedElements[0].product_type !==
            selectedElements[i].product_type ||
          selectedElements[0].nutriScore !== selectedElements[i].nutriScore ||
          selectedElements[0].richText.ingredientsText !==
            selectedElements[i].richText.ingredientsText ||
          selectedElements[0].richText.allergyInfoText !==
            selectedElements[i].richText.allergyInfoText ||
          selectedElements[0].richText.lEGALNOTICEText !==
            selectedElements[i].richText.lEGALNOTICEText ||
          selectedElements[0].richText.notesText !==
            selectedElements[i].richText.notesText ||
          selectedElements[0].servingSize.CA.servingSizeBasic !==
            selectedElements[i].servingSize.CA.servingSizeBasic ||
          selectedElements[0].servingSize.CA.servingRefBasic !==
            selectedElements[i].servingSize.CA.servingRefBasic ||
          selectedElements[0].servingSize.CA.bilingualRefBasic !==
            selectedElements[i].servingSize.CA.bilingualRefBasic ||
          selectedElements[0].servingSize.CA.unitBasic !==
            selectedElements[i].servingSize.CA.unitBasic ||
          selectedElements[0].servingSize.CA.caloriesPerServingBasic !==
            selectedElements[i].servingSize.CA.caloriesPerServingBasic ||
          selectedElements[0].servingSize.CA.unpreparedReference !==
            selectedElements[i].servingSize.CA.unpreparedReference ||
          selectedElements[0].servingSize.CA.unpreparedBilingualReference !==
            selectedElements[i].servingSize.CA.unpreparedBilingualReference ||
          selectedElements[0].servingSize.CA.unpreparedCalories !==
            selectedElements[i].servingSize.CA.unpreparedCalories ||
          selectedElements[0].servingSize.CA.preparedReference !==
            selectedElements[i].servingSize.CA.preparedReference ||
          selectedElements[0].servingSize.CA.preparedBilingualReference !==
            selectedElements[i].servingSize.CA.preparedBilingualReference ||
          selectedElements[0].servingSize.CA.preparedCalories !==
            selectedElements[i].servingSize.CA.preparedCalories ||
          selectedElements[0].servingSize.EU.DefaultAmount !==
            selectedElements[i].servingSize.EU.DefaultAmount ||
          selectedElements[0].servingSize.EU.DefaultAmountUnit !==
            selectedElements[i].servingSize.EU.DefaultAmountUnit ||
          selectedElements[0].servingSize.EU.PortionSize !==
            selectedElements[i].servingSize.EU.PortionSize ||
          selectedElements[0].servingSize.EU.PortionSizeUnit !==
            selectedElements[i].servingSize.EU.PortionSizeUnit ||
          selectedElements[0].servingSize.NA.Servingspercontainer !==
            selectedElements[i].servingSize.NA.Servingspercontainer ||
          selectedElements[0].servingSize.NA.Servingreference !==
            selectedElements[i].servingSize.NA.Servingreference ||
          selectedElements[0].servingSize.NA.servingsize !==
            selectedElements[i].servingSize.NA.servingsize ||
          selectedElements[0].servingSize.NA.unit !==
            selectedElements[i].servingSize.NA.unit ||
          selectedElements[0].servingSize.NA.Caloriesperserving !==
            selectedElements[i].servingSize.NA.Caloriesperserving ||
          selectedElements[0].servingSize.NA.UnpreparedReference !==
            selectedElements[i].servingSize.NA.UnpreparedReference ||
          selectedElements[0].servingSize.NA.Unpreparedcalories !==
            selectedElements[i].servingSize.NA.Unpreparedcalories ||
          selectedElements[0].servingSize.NA.PreparedReference !==
            selectedElements[i].servingSize.NA.PreparedReference ||
          selectedElements[0].servingSize.NA.Preparedcalories !==
            selectedElements[i].servingSize.NA.Preparedcalories ||
          selectedElements[0].calsEnergyInfo.energyKj100 !==
            selectedElements[i].calsEnergyInfo.energyKj100 ||
          selectedElements[0].calsEnergyInfo.energyKj25 !==
            selectedElements[i].calsEnergyInfo.energyKj25 ||
          selectedElements[0].calsEnergyInfo.energyKcal100 !==
            selectedElements[i].calsEnergyInfo.energyKcal100 ||
          selectedElements[0].calsEnergyInfo.energyKcal25 !==
            selectedElements[i].calsEnergyInfo.energyKcal25 ||
          selectedElements[0].calsEnergyInfo.Ri !==
            selectedElements[i].calsEnergyInfo.Ri ||
          selectedElements[0].minerals !== selectedElements[i].minerals ||
          selectedElements[0].vitamins !== selectedElements[i].vitamins ||
          selectedElements[0].nutritionData !==
            selectedElements[i].nutritionData
        ) {
          setProductsAredifferent(true);
          return;
        }
      }
    }
  };
  const handleEditProduct = (id) => {
    setSelectedOptions([id]);
    const products = productsArray;
    setProductsArray("none");
    setDefaultSet(false);
    setTimeout(() => {
      setProductsArray(products);
      setSelected(1);
    }, 500);
  };
  const resourceIDResolver = (products) => {
    return products.name;
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(productsArray, {
      resourceIDResolver,
    });
  const handleRecommendedIntakeData = () => {
    // recommendedIntakeData.forEach((elem, index) => {
    //   console.log(elem.name);
    // });
  };
  // todo clean up after the use effect
  useEffect(async () => {
    let isSubscribed = true;
    await fetchLocations();
    await getStoreData();
    await fetchLang();
    return () => (isSubscribed = false);
  }, []);
  useEffect(async () => {
    let isSubscribed = true;
    await getStoreData();
    return () => (isSubscribed = false);
  }, [storeData?.portionSizeModalCheckBox, shop_plan]);

  useEffect(async () => {
    let isSubscribed = true;
    await fetchProducts();
    handleSettingDefaultData();
    handleRecommendedIntakeData();
    return () => (isSubscribed = false);
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
  const [selectedOptions, setSelectedOptions] = useState(selectedResources);
  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions]
  );
  /**
   * handle change of any value
   */
  const handleChange = useCallback(async (val, tag, name, secondTag) => {
    /***
     * handle change if not secondTag is an index (number)
     */
    if (!name && name === undefined) {
      let newData = { ...arraydata };
      newData[tag] = val;
      setArrayData(newData);
      return;
    }

    if (!secondTag && typeof secondTag !== "number") {
      let newData = { ...arraydata };
      newData[tag][name] = val;
      setArrayData(newData);
      return;
    }
    /**
     * handle change if secondeTag is a number (index)
     */
    if (
      secondTag.length > 0 ||
      typeof secondTag === "number" ||
      secondTag.length > 0
    ) {
      let newData = { ...arraydata };
      newData[tag][secondTag][name] = val;
      setArrayData(newData);
      return;
    }
  });
  const handleAddNutritionData = () => {
    if (location === "EU")
      setArrayData({
        ...arraydata,
        nutritionData: [
          ...arraydata.nutritionData,
          {
            name: "",
            per100g: "",
            perportion: "",
            unit: "Grams",
            bold: "Yes",
            leftSpacing: "0",
            order: arraydata.nutritionData.length.toString(),
          },
        ],
      });
    else
      setArrayData({
        ...arraydata,
        nutritionData: [
          ...arraydata.nutritionData,
          {
            name: "",
            quantity: "",
            Unit: "Grams",
            dailyValue: "",
            bold: "No",
            order: arraydata.nutritionData.length.toString(),
            leftSpacing: "",
            preparedProduct: "",
          },
        ],
      });
  };
  const handleRemoveNutritionData = (i) => {
    let newArrayData = { ...arraydata };
    newArrayData.nutritionData.splice(i, 1);
    setArrayData(newArrayData);
  };
  const handleAddVitamins = () => {
    if (location === "EU")
      setArrayData({
        ...arraydata,
        vitamins: [
          ...arraydata.vitamins,
          {
            name: "",
            per100g: "",
            perportion: "",
            LeftSpacing: "",
            order: arraydata.vitamins.length.toString(),
            RI: "",
          },
        ],
      });
    else
      setArrayData({
        ...arraydata,
        vitamins: [
          ...arraydata.vitamins,
          {
            name: "",
            quantity: "",
            unit: "Grams",
            dailyValue: "",
            order: arraydata.vitamins.length.toString(),
            RI: "",
            LeftSpacing: "",
          },
        ],
      });
  };
  const handleRemoveVitamins = (i) => {
    let newArrayData = { ...arraydata };
    newArrayData.vitamins.splice(i, 1);
    setArrayData(newArrayData);
  };
  const handleAddMinerals = () => {
    if (location === "EU")
      setArrayData({
        ...arraydata,
        minerals: [
          ...arraydata.minerals,
          {
            name: "",
            per100g: "",
            perportion: "",
            LeftSpacing: "",
            order: arraydata.minerals.length.toString(),
            RI: "",
          },
        ],
      });
    else
      setArrayData({
        ...arraydata,
        minerals: [
          ...arraydata.minerals,
          {
            name: "",
            quantity: "",
            unit: "Grams",
            dailyValue: "",
            order: arraydata.minerals.length.toString(),
            RI: "",
            LeftSpacing: "",
          },
        ],
      });
  };
  const handleRemoveMinerals = (i) => {
    let newArrayData = { ...arraydata };
    newArrayData.minerals.splice(i, 1);
    setArrayData(newArrayData);
  };

  const handlePlan = async (planType) => {
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planType }),
    };
    try {
      const data = await fetch("/recurring-subscribtion", fetchOptions)
        .then((res) => res.json())
        .then(async (response) => {
          if (response.success) {
            setToastMessage(response.message);
            toggleActive();
          }
        });
      setShopPlan(planType);
    } catch (err) {
      console.log(err);
    }
  };
  const handlePortionSizeModal = async (boolean) => {
    if (boolean) {
      const newStoreData = { ...storeData };
      newStoreData.portionSizeModalCheckBox = boolean;
      setStoreData(boolean);
    }
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ check: boolean }),
    };
    if (boolean) {
      const update = await fetch("/portionSizeModal", fetchOptions)
        .then((res) => res.json)
        .then((response) => console.log(response));
    }
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
          deselectedOptions={deselectedOptions}
          memoOptions={memoOptions}
          setMemoOptions={setMemoOptions}
          selectedResources={selectedResources}
          allResourcesSelected={allResourcesSelected}
          handleSelectionChange={handleSelectionChange}
          shop_plan={shop_plan}
          setToastMessage={setToastMessage}
          toggleActive={toggleActive}
          fetchProducts={fetchProducts}
        />
      ),
    },
    {
      id: "Customize Label",
      content: "Customize Label",
      tab: (
        <CreateLabel
          langState={langState}
          location={location}
          setLocation={setLocation}
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
          handleChange={handleChange}
          handleAddNutritionData={handleAddNutritionData}
          handleRemoveNutritionData={handleRemoveNutritionData}
          handleAddVitamins={handleAddVitamins}
          handleRemoveVitamins={handleRemoveVitamins}
          handleAddMinerals={handleAddMinerals}
          handleRemoveMinerals={handleRemoveMinerals}
          productsAredifferent={productsAredifferent}
          shop_plan={shop_plan}
          portionSizeModalCheckBox={storeData.portionSizeModalCheckBox}
          handlePortionSizeModal={handlePortionSizeModal}
          productExist={productExist}
          setProductExist={setProductExist}
          storeData={storeData}
          setStoreData={setStoreData}
          handleSelectedProducts={handleSelectedProducts}
          handleSettingDefaultData={handleSettingDefaultData}
          saveRecomIntake={saveRecomIntake}
          setToastMessage={setToastMessage}
          toggleActive={toggleActive}
          fetchProducts={fetchProducts}
        />
      ),
    },
    {
      id: "Recommended Intake",
      content: "Recommended Intake",
      tab: (
        <RecommendedIntake
          saveRecomIntake={saveRecomIntake}
          setStoreData={setStoreData}
          storeData={storeData}
          recommendedIntakeData={recommendedIntakeData}
          setToastMessage={setToastMessage}
          toggleActive={toggleActive}
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
      tab: <PricinPlans plan={shop_plan} handlePlan={handlePlan} />,
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

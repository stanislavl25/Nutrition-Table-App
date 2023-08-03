import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Toast,
  Card,
  Tabs,
  Frame,
  useIndexResourceState,
  Loading,
  Modal,
  TextContainer,
  Spinner,
  Badge,
  ButtonGroup,
  Button,
  Link,
} from "@shopify/polaris";
import { Redirect } from "@shopify/app-bridge/actions";
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
import { subscribe } from "graphql";

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
  const [emptyStore, setEmptyStore] = useState(false);
  const [checkPlan, setCheckPlan] = useState(false);
  const [categories, setCategories] = useState([]);
  const [storeData, setStoreData] = useState({});
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
  const [shopifyData, setShopifyData] = useState({});
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
  const [hasPages, setHasPages] = useState();
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const [isSaving, setIsSaving] = useState(false);

  // modal settings
  const [activeModal, setActiveModal] = useState(false);
  const [activeUpdateModal, setActiveUpdateModal] = useState(false);

  const [isSpinnerActive, setIsSpinnerActive] = useState(false);

  /************************* INDEX TABLE INFORMATION *****************************/
  const [shopName, setShop] = useState("");
  const [collections, setCollections] = useState([]);
  const [collectionSelected, setCollectionSelected] = useState([""]);
  const [queryValue, setQueryValue] = useState("");
  const [allProductsSelected, setAllproductsSelected] = useState(false);
  /******************************************************************************/

  const handleChangeModal = useCallback(
    () => setActiveModal(!activeModal),
    [activeModal]
  );
  const handleChangeModalAndUpdateData = async () => {
    handleChangeModal();
    window.location.reload(false);
  };
  const handleChangeModalAndRedirectDocumentation = () => {
    handleChangeModal();
    handleTabChange(4);
  };

  /*** get store needed data */
  const getStoreData = async () => {
    const shopData = await fetch("/store-data").then((res) => res.json());
    if (shopData.success) {
      if (shopData.data.recommendedIntake.length === 0) {
        shopData.data.recommendedIntake = recommendedIntakeRows;
      }
      if (shopData.data.recommendedIntake.length > 0)
        setRecommendedIntakeData(storeData.recommendedIntake);
      setShop(shopData.shopName);
      setStoreData(shopData.data);
      setShopPlan(shopData.data.shop_plan);
    }
  };

  /// handle recommended Intake reset
  const handleRIDataReset = () => {
    let newSotreData = { ...storeData };
    newSotreData.recommendedIntake = recommendedIntakeData;
    setStoreData(newSotreData);
    setLangState((langState) => ({
      ...langState,
      values: newSotreData,
      checked: newSotreData,
    }));
  };

  /*** get store location */
  const fetchLocations = async () => {
    try {
      const data = await fetch("/locations")
        .then((res) => res.json())
        .then((response) => {
          // console.log(response);
          setLocation(response.location);
        });
      // setLocation("EU");
      return;
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

  /** check app updates **/
  const check_updates = async () => {
    try {
      const checkUpdateResponse = await fetch("check-updates").then((res) =>
        res.json()
      );
      if (
        checkUpdateResponse.success === true &&
        checkUpdateResponse.check === true
      ) {
        setActiveUpdateModal(true);
        const updateResponse = await fetch("update").then((res) => res.json());
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
      console.log("error occured!");
    }
    setActiveUpdateModal(false);
  };

  /*** get store products and check if some primary elements empty */
  const fetchProducts = async () => {
    try {
      const fetchOptions = {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filters: { collections: collectionSelected, query: queryValue },
        }),
      };
      const data = await fetch("products-list", fetchOptions).then((res) =>
        res.json()
      );

      if (data.success) {
        if (data.data.length > 999) {
          setCheckPlan(true);
        }
        setCollections(data.collections);
        setProductsArray(data.data);
        setHasPages(data.hasPages);
        setShopifyData(data.shopifyData);
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

  const saveRecomIntake = async () => {
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formVal: storeData.recommendedIntake }),
    };
    const data = await fetch("/recommendedIntake_save", fetchOptions)
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setToastMessage(response.message);
          toggleActive();
          setRecommendedIntakeData(response.data.recommendedIntake);
        }
      })
      .catch((err) => {
        handleSnackToggle("Something wrong happend!");
      });
  };

  /// handle translations updates
  const fetchLangChanges = async () => {
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updates: langState.values }),
    };
    const data = await fetch("/LangFieldsSave", fetchOptions)
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setToastMessage(response.message);
          toggleActive();
          const updatedLang = langState.values;
          setLangState((langState) => ({
            ...langState,
            values: updatedLang,
            checked: updatedLang,
          }));
          setStoreData(updatedLang);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /***handle save non food products to database */
  const handleSaveNonFoodProducts = async (products, data) => {
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products, data }),
    };
    try {
      const data = await fetch("/save_non-food", fetchOptions)
        .then((res) => res.json())
        .then(async (response) => {
          if (response.success) {
            setIsSaving(false);
            await fetchProducts();
            setSelected(0);
            setToastMessage(response.message);
            toggleActive();
          } else {
            setIsSaving(false);
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
      const fetchOptions = {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products, data: data }),
      };
      const update = await fetch("/save_foodProducts", fetchOptions)
        .then((res) => res.json())
        .then(async (response) => {
          if (response.success) {
            setIsSaving(false);
            await fetchProducts();
            setSelected(0);
            setToastMessage(response.message);
            toggleActive();
          } else {
            setIsSaving(false);
            setToastMessage(response.message);
            toggleActive();
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
    if (!selectedOptions.length) {
      setToastMessage("No products selected!");
      toggleActive();
      return;
    }
    setIsSaving(true);
    if (!nonFoodProduct) {
      handleSaveNonFoodProducts(selectedOptions, data);
    }
    if (nonFoodProduct) {
      handleSaveProducts(selectedOptions, data);
    }
  };

  const handleSelectedProducts = (selectedPro, boolean) => {
    if (selectedPro.length === 0) {
      setSelectedOptions(selectedPro);
      return;
    }
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
        if (selectedPro.includes(productsArray[i]._id)) {
          setArrayData(productsArray[i]);
          break;
        }
      }
    }
    let selectedElements = [];
    if (selectedPro.length > 1) {
      productsArray.forEach((elem) => {
        if (selectedPro.includes(elem._id)) {
          selectedElements.push(elem);
        }
      });
      for (var i = 1; i < selectedElements.length; i++) {
        if (
          selectedElements[0].food_product !==
            selectedElements[i].food_product ||
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
            selectedElements[i].calsEnergyInfo.Ri
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
  const resourceIDResolver = (product) => {
    return product._id;
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(productsArray, {
      resourceIDResolver,
    });

  /** check if we have products in our dataBase **/

  const check_init = async () => {
    try {
      const checkInitProductResponse = await fetch("/check-init-product").then(
        (res) => res.json()
      );
      if (
        checkInitProductResponse.success === true &&
        !checkInitProductResponse.message
      ) {
        setIsSpinnerActive(true);
        setActiveModal(true);
        const productInitiateResponse = await fetch("product-initiate").then(
          (res) => res.json()
        );
      }
    } catch (err) {
      console.log(err);
      console.log("error occured!");
    }
    setIsSpinnerActive(false);
  };

  useEffect(async () => {
    // await check_updates();
    await check_init();
    await fetchLocations();
  }, []);

  useEffect(async () => {
    await getStoreData();
  }, [storeData?.portionSizeModalCheckBox, shop_plan]);

  useEffect(async () => {
    await fetchLang();
    await handlePlan();
  }, []);

  useEffect(async () => {
    await fetchProducts();
    handleSettingDefaultData();
    // handleRecommendedIntakeData();
  }, [collectionSelected, queryValue]);

  /** handle memo set for filter functionality */
  const handleMemo = () => {
    let array = [];
    if (productsArray?.length === 0) return array;
    if (
      productsArray?.length > 0 &&
      productsArray !== "none" &&
      !productsArray !== null
    ) {
      productsArray?.forEach((element) => {
        const name = element.name;
        array.push({ value: element._id, label: name });
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
          // if (response.success) {
          //   setToastMessage(response.message);
          //   toggleActive();
          // }
          if (
            response.confirmation_url !== undefined &&
            response.confirmation_url.length > 0
          ) {
            app.dispatch(
              Redirect.toRemote({
                url: response.confirmation_url,
              })
            );
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
        .then((res) => res.json())
        .then((response) => console.log(response));
    }
  };

  const handleNextPrevious = async (type) => {
    setProductsArray("none");
    let check;
    let filters = {};
    if (type === "next") {
      check = {
        type: "last",
        cursor: shopifyData.lastCursor,
        filters: { collections: collectionSelected, query: queryValue },
      };
    } else {
      check = {
        type: "first",
        cursor: shopifyData.firstCursor,
        filters: filters,
      };
    }
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(check),
    };
    const data = await fetch("/handle_nextProducts", fetchOptions)
      .then((res) => res.json())
      .then(async (response) => {
        if (response.success) {
          setProductsArray(response.data);
          setHasPages(response.hasPages);
          setShopifyData(response.shopifyData);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const synchronizeData = async () => {
    try {
      const data = await fetch("synchronize-products").then((res) =>
        res.json()
      );
      return { success: data.success, message: data.message };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message:
          "an error has occured during the synchronization of the products",
      };
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
      setStoreData={setStoreData}
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
          handleNextPrevious={handleNextPrevious}
          hasPages={hasPages}
          synchronizeData={synchronizeData}
          isSaving={isSaving}
          setIsSaving={setIsSaving}
          shopName={shopName}
          collections={collections}
          collectionSelected={collectionSelected}
          setCollectionSelected={setCollectionSelected}
          setQueryValue={setQueryValue}
          setAllproductsSelected={setAllproductsSelected}
          allProductsSelected={allProductsSelected}
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
          handleRIDataReset={handleRIDataReset}
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
        {isSaving ? <Loading /> : <></>}
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section>{tabs[selected].tab}</Card.Section>
        </Tabs>
        {toastMarkup}
      </Frame>
      <Modal
        open={activeModal}
        title="Welcome! We are glad that you have installed our app 🎉"
      >
        {isSpinnerActive ? (
          <Modal.Section>
            <TextContainer>
              <p>
                Hey and welcome! Thank you so much for installing our app!
                <br />
                We are currently checking your shop and indexing all your
                products. This may take a few minutes. In the meantime, you can
                watch{" "}
                <Link url="https://www.youtube.com">this short video</Link> to
                learn everything there is to know about our App.
              </p>
            </TextContainer>
            <br />
            <br />
            <div style={{ textAlign: "center" }}>
              <Spinner accessibilityLabel="Spinner" size="large" />
              <p>
                Product indexing in progress. Please be patient, this may take
                several minutes depending on the number of products/variants you
                have in your store.
              </p>
            </div>
          </Modal.Section>
        ) : (
          <Modal.Section>
            <Card>
              <Card.Section>
                <TextContainer>
                  Product indexing successful! Congratulations, you can now
                  configure the app according to your needs! Once you have
                  configured the app, the price change indication will be
                  visible in your store. Depending on which theme you use and
                  how much it is customized, there may be display problems. If
                  you experience these problems, please contact our support.
                </TextContainer>
                <div style={{ textAlign: "center" }}>
                  <br />
                  <br />
                  <Badge status="success">Success</Badge>
                  <br />
                  <br />
                  <p>Product indexing completed successfully!</p>
                </div>
                <br />
                <br />
              </Card.Section>
              <Card.Section>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>The app is now ready to use.</p>
                  <ButtonGroup>
                    <Button
                      onClick={() =>
                        handleChangeModalAndRedirectDocumentation()
                      }
                    >
                      Documentation
                    </Button>
                    <Button
                      primary
                      onClick={() => handleChangeModalAndUpdateData()}
                    >
                      Start configuration
                    </Button>
                  </ButtonGroup>
                </div>
              </Card.Section>
            </Card>
          </Modal.Section>
        )}
      </Modal>

      {/* <Modal
        open={activeUpdateModal}
        title="Update in progress - please wait a short moment"
      >
        <Modal.Section>
          <Card>
            <Card.Section>
              <TextContainer>
                Good news! We just launched a big update for your App. This will significantly improve the loading time. You can read more details in our <Link url="https://feedback.cronum.app/updates">changelog</Link>. Please be patient for a moment while we install the update for you in your store. This will not take long, please wait a little while.
              </TextContainer>
              <div style={{ textAlign: "center" }}>
                <Spinner accessibilityLabel="Spinner" size="large" />
                <p>
                  App update in progress. Please be patient for a moment.
                </p>
              </div>
            </Card.Section>
          </Card>
        </Modal.Section>
      </Modal> */}
    </div>
  );
}

export default TabsPage;

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
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../../App";
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
  Modal,
  Stack,
  TextField,
  Select,
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

const DeleteLabel = ({ handleBulkProductsReset }) => {
  const [active, setActive] = useState(false);
  const handleChange = () => {
    setActive(!active);
  };

  const activator = (
    <div style={{ width: "164px" }} onClick={handleChange} id="portionSizeID">
      <Button destructive outline style={{ margin: "4px" }} type="button">
        Delete Label
      </Button>
    </div>
  );
  const handleDelete = () => {
    handleChange();
    handleBulkProductsReset();
  };
  const handleCancel = () => {
    handleChange();
  };
  return (
    <Modal
      activator={activator}
      open={active}
      onClose={handleChange}
      title="Delete label"
      primaryAction={{
        content: "Delete",
        onAction: handleDelete,
        destructive: true,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleCancel,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer spacing="loose">
          <p>
            Are you sure you want to delete this label and all of its data? This
            action is irreversible.
          </p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};

const MissingRIModal = ({
  handleTabChange,
  setStoreData,
  storeData,
  saveRecomIntake,
  newRiName,
}) => {
  const [active, setActive] = useState(false);
  const handleChange = () => {
    setActive(!active);
  };
  useEffect(() => {
    if (active) {
      const newData = { ...newRIdata };
      newData["name"] = newRiName;
      setNewRIdata(newData);
    }
  }, [active]);
  const [newRIdata, setNewRIdata] = useState({
    name: newRiName,
    quantity: "",
    unit: "Grams",
  });

  const handleChangeData = useCallback(
    (val, tag) => {
      const newData = { ...newRIdata };
      newData[tag] = val;
      setNewRIdata(newData);
    },
    [newRIdata]
  );

  const activator = (
    <div style={{ width: "164px" }} onClick={handleChange} id="missing_RI">
      <Button style={{ margin: "4px" }} type="button">
        Missing recommended intake
      </Button>
    </div>
  );

  const handleSave = () => {
    const newStoreData = { ...storeData };
    newStoreData.recommendedIntake.push(newRIdata);
    setStoreData(newStoreData);
    handleChange();
    saveRecomIntake(newStoreData.recommendedIntake);
    setNewRIdata({
      name: "",
      quantity: "",
      unit: "Grams",
    });
  };

  const handleCancel = () => {
    handleChange();
  };

  const options = ["Grams", "Milligrams", "Micrograms", "Kcal", "Kj"];

  return (
    <Modal
      activator={activator}
      open={active}
      onClose={handleChange}
      title="Missing recommended intake "
      primaryAction={{
        content: "Save",
        onAction: handleSave,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleCancel,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer spacing="loose">
          <p style={{ marginBottom: "10px" }}>
            Unfortunately, we could not find any recommended daily intake values
            for this vitamin. But don't worry, you can add the recommended daily
            intake right here and we'll save it for the future so you only have
            to enter it once.
            <br /> Of course, you can change the stored values at any time on
            the{" "}
            <Button onClick={() => handleTabChange(2)} plain>
              Recommended Intake page.
            </Button>
          </p>
        </TextContainer>
        <Stack>
          <Stack.Item fill>
            {" "}
            <TextField
              label="Name*"
              type="text"
              name="Name"
              value={newRIdata.name}
              onChange={(e) => handleChangeData(e, "name")}
            />
          </Stack.Item>
          <Stack.Item fill>
            {" "}
            <TextField
              label="Quantity*"
              type="number"
              name="Quantity"
              value={newRIdata.quantity}
              onChange={(e) => handleChangeData(e, "quantity")}
            />
          </Stack.Item>
          <Stack.Item fill>
            {" "}
            <div style={{ width: "100px" }}>
              <Select
                options={options}
                label="Unit"
                value={newRIdata.unit}
                onChange={(e) => handleChangeData(e, "unit")}
              />
            </div>
          </Stack.Item>
        </Stack>
      </Modal.Section>
    </Modal>
  );
};

function CreateLabel({
  langState,
  location,
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
  handlePortionSizeModal,
  productExist,
  setProductExist,
  storeData,
  setStoreData,
  handleSelectedProducts,
  handleSettingDefaultData,
  saveRecomIntake,
  setToastMessage,
  toggleActive,
  fetchProducts,
}) {
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const [locationPlan, setLocationPlan] = useState({
    location: location,
    plan: shop_plan,
  });
  const [rightSideWidth, setRightSideWidth] = useState("35%");
  const [leftSideWidth, setLeftSideWidth] = useState("60%");
  const [flexDirection, setFlexDirection] = useState("row");
  const [newRiName, setNewRiName] = useState("");

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
    setProductExist(true);
  };
  useEffect(() => {
    window.addEventListener("DOMContentLoaded", updateProducts());

    window.removeEventListener("DOMContentLoaded", () => {});
  }, [data]);
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
    window.removeEventListener("resize", () => {});
  }, []);

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

  useEffect(() => {
    let subscription = false;
    if (!subscription) {
      if (selectedOptions && selectedOptions.length > 0)
        handleSettingDefaultData();
    }
    return (subscription = true);
  }, [selectedOptions]);

  const handleBulkProductsReset = async () => {
    const products = [];
    await productsArray.forEach((elem) => {
      if (selectedOptions.includes(elem.name)) products.push(elem._id);
    });
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }),
    };
    const data = await fetch("/product_bulk_Reset", fetchOptions)
      .then((res) => res.json())
      .then(async (response) => {
        if (response.success) {
          handleTabChange(0);
          await fetchProducts();
          setToastMessage(response.message);
          toggleActive();
        } else {
          console.warn(response.message);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <Page
      title="Create Label"
      primaryAction={{
        content: "Save Label",
        onAction: () => {
          handleSaveSelectedProducts(data.food_product, data, selectedOptions);
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
              locationPlan={locationPlan}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              deselectedOptions={deselectedOptions}
              memoOptions={memoOptions}
              setMemoOptions={setMemoOptions}
              removeTag={removeTag}
              productsAredifferent={productsAredifferent}
              handleSelectedProducts={handleSelectedProducts}
              data={data}
              handleChange={handleChange}
              productsArray={productsArray}
              handleTabChange={handleTabChange}
            />
            {selectedOptions.length > 0 && data.food_product === false ? (
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
                  productToPrepare={data.productToPrepare}
                  servingSize={data.servingSize}
                  locationPlan={locationPlan}
                  data={data}
                  handleChange={handleChange}
                  portionSizeModalCheckBox={portionSizeModalCheckBox}
                  handlePortionSizeModal={handlePortionSizeModal}
                />
                {locationPlan.location === "EU" ? (
                  <CalsEnergyInfos
                    data={data}
                    handleChange={handleChange}
                    energyKj100={data.calsEnergyInfo.energyKj100}
                    langState={langState.values}
                    storeData={storeData}
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
                  productToPrepare={data.productToPrepare}
                  storeData={storeData}
                  setNewRiName={setNewRiName}
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
                      storeData={storeData}
                      handleTabChange={handleTabChange}
                      setNewRiName={setNewRiName}
                    />
                    <Minerals
                      data={data.minerals}
                      locationPlan={locationPlan}
                      handleAddMinerals={handleAddMinerals}
                      handleRemoveMinerals={handleRemoveMinerals}
                      handleChange={handleChange}
                      allData={data}
                      storeData={storeData}
                      handleTabChange={handleTabChange}
                      setNewRiName={setNewRiName}
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
              <DeleteLabel handleBulkProductsReset={handleBulkProductsReset} />
              <Button
                primary
                style={{ margin: "4px" }}
                type="button"
                className="button remove"
                onClick={() =>
                  handleSaveSelectedProducts(
                    data.food_product,
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
            {selectedOptions.length > 0 && data.food_product === false ? (
              <></>
            ) : (
              <TablePreview
                data={data}
                productToPrepare={data.productToPrepare}
                locationPlan={locationPlan}
                langState={langState?.values}
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
      <div style={{ display: "none" }}>
        <MissingRIModal
          handleTabChange={handleTabChange}
          setStoreData={setStoreData}
          storeData={storeData}
          saveRecomIntake={saveRecomIntake}
          newRiName={newRiName}
        />
      </div>
    </Page>
  );
}

export default CreateLabel;

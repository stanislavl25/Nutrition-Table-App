import React, { useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import {
  Button,
  Heading,
  Card,
  Page,
  EmptyState,
  Link,
} from "@shopify/polaris";
import MyLablesTable from "./MyLablesTable";
import star from "../../assets/nta_star_for_plan_banner.png";
import chair from "../../assets/empty_chair.png";
function MyLables({
  handleTabChange,
  handleSelectedProducts,
  handleEditProduct,
  productsArray,
  setProductsArray,
  emptyStore,
  checkPlan,
  deselectedOptions,
  memoOptions,
  setMemoOptions,
  selectedOptions,
  setSelectedOptions,
  selectedResources,
  allResourcesSelected,
  handleSelectionChange,
  shop_plan,
  toggleActive,
  setToastMessage,
  fetchProducts,
  handleNextPrevious,
  hasPages,
  setIsSaving,
  isSaving,
  synchronizeData,
  shopName,
  collections,
  collectionSelected,
  setCollectionSelected,
  setQueryValue,
  setAllproductsSelected,
  allProductsSelected,
}) {
  const [loadingSynchronize, setLoadingSynchronize] = useState(false);
  const app = useAppBridge();
  const GeneralHandleSelectionChange = (
    selectionType,
    isSelecting,
    selection
  ) => {
    handleSelectionChange(selectionType, isSelecting, selection);
    setAllproductsSelected(selectionType === "all");
  };
  const handleProductSynchronisation = async () => {
    if (!loadingSynchronize) {
      setIsSaving(true);
      try {
        setLoadingSynchronize(true);
        const synchronizeResponse = await synchronizeData();
        setLoadingSynchronize(false);

        if (synchronizeResponse.success === true) {
          let count;
          let minutesWait = 0;
          let secondsWait = 0;
          if (allResourcesSelected) {
            count = await fetch("/product-count").then((res) => res.json());
            count = count.count;
          } else {
            count = selectedResources.length;
          }
          minutesWait = parseInt(((count / 25) * 2) / 60);
          secondsWait = parseInt(((count / 25) * 2) % 60);
          toggleActive(false);
          setToastMessage(
            `Success! Changes to your store have been saved and will become effective in approximately ${minutesWait} minutes and ${secondsWait} seconds.`
          );
        } else {
          toggleActive(true);
          setToastMessage(synchronizeResponse.message);
        }
        window.location.reload(false);
      } catch (e) {
        toggleActive(true);
        setToastMessage(
          "an error has occured during the synchronization of the products"
        );
        console.log(e);
      }
      setIsSaving(false);
    }
  };

  return (
    <div>
      {shop_plan && shop_plan === "Basic" && productsArray?.length < 999 ? (
        <div style={{ marginBottom: "10px" }}>
          <Card sectioned>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* //Todo star position */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <img
                  src={star}
                  alt=""
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "4px",
                  }}
                />
                <div>
                  <Heading element="h5">
                    Take advantage of the priceless benefits of the Advanced
                    Plan.
                  </Heading>
                  <p>
                    Customize your Label, add Vitamins and Minerals, and more!
                  </p>
                </div>
              </div>
              <div>
                <Button
                  primary
                  onClick={() => {
                    handleTabChange(5);
                  }}
                >
                  Get the Advanced plan
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <></>
      )}
      {checkPlan && shop_plan && shop_plan === "Advanced" ? (
        <div style={{ marginBottom: "10px" }}>
          <Card sectioned>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* //Todo star position */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <img
                  src={star}
                  alt=""
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "4px",
                  }}
                />
                <div>
                  <Heading element="h5">
                    You have more than 999 products in your online store.
                  </Heading>
                  <p>
                    stores with more than 999 products are only supported with
                    the Enterprise Plan. Upgrade now.
                  </p>
                </div>
              </div>
              <div>
                <Button
                  primary
                  onClick={() => {
                    handleTabChange(5);
                  }}
                >
                  Get the Enterprise plan
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <></>
      )}

      <Page
        fullWidth
        title="Products"
        primaryAction={{
          content: "Create Label",
          onAction: () => {
            if (!selectedResources || !selectedResources.length) {
              setToastMessage("No products selected!");
              toggleActive();
              return;
            }
            handleSelectedProducts(selectedResources);
          },
        }}
      >
        <div style={{ marginTop: "10px" }}>
          <Card sectioned>
            {emptyStore ? (
              <EmptyState
                heading="This is where you'll manage the nutrition table of your products"
                image={chair}
              >
                <div style={{ marginBottom: "10px", color: "#808080" }}>
                  No products found
                  <br />
                  <div style={{ marginLeft: "20px" }}>
                    You can create a new product in the{" "}
                    <span style={{ color: "#0b78b4" }}>Shopify admin</span>.
                  </div>
                </div>
                <Button
                  primary
                  onClick={() => {
                    app.dispatch(
                      Redirect.toRemote({
                        url: `https://admin.shopify.com/store/${shopName}/products/new`,
                      })
                    );
                  }}
                >
                  Create a new product
                </Button>
              </EmptyState>
            ) : (
              <MyLablesTable
                productsArray={
                  productsArray.length === 0 ? "none" : productsArray
                }
                setProductsArray={setProductsArray}
                handleSelectedProducts={handleSelectedProducts}
                handleEditProduct={handleEditProduct}
                deselectedOptions={deselectedOptions}
                memoOptions={memoOptions}
                setMemoOptions={setMemoOptions}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                selectedResources={selectedResources}
                allResourcesSelected={allResourcesSelected}
                handleSelectionChange={handleSelectionChange}
                fetchProducts={fetchProducts}
                setToastMessage={setToastMessage}
                toggleActive={toggleActive}
                handleNextPrevious={handleNextPrevious}
                hasPages={hasPages}
                isSaving={isSaving}
                setIsSaving={setIsSaving}
                collections={collections}
                collectionSelected={collectionSelected}
                setCollectionSelected={setCollectionSelected}
                setQueryValue={setQueryValue}
                GeneralHandleSelectionChange={GeneralHandleSelectionChange}
                setAllproductsSelected={setAllproductsSelected}
              />
            )}
          </Card>
        </div>
        {!loadingSynchronize ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span style={{ opacity: "0.5" }}>
              {" "}
              Do you have problems with finding specific products?{" "}
              <Link onClick={handleProductSynchronisation}>
                Make a manual synchronisiaton
              </Link>
            </span>
          </div>
        ) : (
          <div style={{ width: "100%", textAlign: "center" }}>
            <span style={{ opacity: "0.5" }}>
              {" "}
              Please wait while we synchronize your data.
            </span>
          </div>
        )}
      </Page>
    </div>
  );
}

export default MyLables;

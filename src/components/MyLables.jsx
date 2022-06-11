import React, { useEffect, useState } from "react";
import { Toast, useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";
import {
  Button,
  Heading,
  Card,
  Layout,
  Page,
  DisplayText,
  EmptyState,
  Stack,
} from "@shopify/polaris";
import MyLablesTable from "./MyLablesTable";
import star from "../assets/nta_star_for_plan_banner.png";
function MyLables({
  handleTabChange,
  handleSelectedProducts,
  handleEditProduct,
  productsArray,
  setProductsArray,
  emptyStore,
  categories,
  checkPlan,
}) {
  return (
    <div>
      {checkPlan ? (
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
                <Button primary>Get the Advanced plan</Button>
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
          onAction: () => handleTabChange(1),
        }}
      >
        <div style={{ marginTop: "10px" }}>
          <Card sectioned>
            {emptyStore ? (
              <EmptyState
                heading="This is where you'll manage your lables"
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <div style={{ marginBottom: "10px", color: "#808080" }}>
                  You can create a new label or edit
                  <br />
                  <div style={{ marginLeft: "20px" }}>
                    your products label here
                  </div>
                </div>
                <Button primary>Create a new Label</Button>
              </EmptyState>
            ) : (
              <MyLablesTable
                productsArray={
                  productsArray === undefined ? "none" : productsArray
                }
                setProductsArray={setProductsArray}
                handleSelectedProducts={handleSelectedProducts}
                categories={categories}
                handleEditProduct={handleEditProduct}
              />
            )}
          </Card>
        </div>
      </Page>
    </div>
  );
}

export default MyLables;

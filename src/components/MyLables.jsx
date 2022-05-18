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
} from "@shopify/polaris";

const mendatoryData = [
  "cals",
  "fat",
  "satfat",
  "transfat",
  "carbs",
  "sugars",
  "protein",
  "salt",
];

function MyLables({ handleTabChange }) {
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const [checkPlan, setCheckPlan] = useState(true);
  const [productobj, setProductobj] = useState();

  const fetchProducts = async () => {
    const data = await fetch("/products-list").then((res) => res.json());
    if (data.length) {
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < mendatoryData.length; j++) {
          data[i][mendatoryData[j]] = 0;
        }
      }
      setProductobj(data);
      // const food = [];
      // const handleFood = () => {
      //   for (var i = 0; i < data.length; i++) {
      //     if (
      //       data[i].product_type === "Food, Beverages & Tobacco" ||
      //       data[i].product_type === "Health & Beauty"
      //     ) {
      //       food.push(data[i]);
      //     }
      //   }
      // };
      // await handleFood();
      // setProductobj(food);
      console.log(data);
    } else {
      //Todo
      console.log("No products found!");
    }
  };
  // todo clean up after the use effect
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
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
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <Heading element="h5">
                    Take advantage of the priceless benefits of the Advanced
                    Plan.
                  </Heading>
                  <p>
                    Customize your Label, add Vitamins and Minerals, and more!
                  </p>
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
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Heading element="h1">Products</Heading>
        <Button onClick={() => handleTabChange(1)} primary>
          Create Label
        </Button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Card sectioned>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* //Todo image position */}
            <img src="" type="" />
            <Heading>This is where you'll manage your lables</Heading>
            <div style={{ marginBottom: "10px", color: "#808080" }}>
              You can create a new label or edit
              <br />
              <div style={{ marginLeft: "20px" }}>your products label here</div>
            </div>
            <Button
              onClick={() =>
                location.replace(
                  "https://nutritiontable.myshopify.com/admin/products?selectedView=all"
                )
              }
              primary
            >
              Create a new Label
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MyLables;

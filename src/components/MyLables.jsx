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
function MyLables({ handleTabChange }) {
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const [checkPlan, setCheckPlan] = useState(true);
  const [productobj, setProductobj] = useState();
  const [emptyStore, setEmptyStore] = useState(false);
  const [locationObj, setlocationObj] = useState({});
  const fetchProducts = async () => {
    const data = await fetch("/products-list").then((res) => res.json());
    setProductobj(data);
    console.log(data);
    if (data.length) {
    } else {
      //Todo
      setEmptyStore(true);
      console.log("No products found!");
    }
  };
  const fetchLocations = async () => {
    const data = await fetch("/locations").then((res) => res.json());
    setlocationObj(data);
    console.log(data);
    if (data.length) {
    } else {
      //Todo
      // setEmptyStore(true);
      console.log("No products found!");
    }
  };
  // todo clean up after the use effect
  useEffect(() => {
    fetchProducts();
    fetchLocations();
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
      </div>
      <Stack distribution="equalSpacing">
        <Heading element="h1">Products</Heading>
        <Button onClick={() => handleTabChange(1)} primary>
          Create Label
        </Button>
      </Stack>
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
              products={productobj === undefined ? "none" : productobj}
            />
          )}
        </Card>
      </div>
    </div>
  );
}

export default MyLables;

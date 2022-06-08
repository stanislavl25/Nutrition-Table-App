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
function MyLables({ handleTabChange, handleSelectedProducts }) {
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const [checkPlan, setCheckPlan] = useState(true);
  const [productobj, setProductobj] = useState();
  const [emptyStore, setEmptyStore] = useState(false);
  const [locationObj, setlocationObj] = useState({});
  const [categories, setCategories] = useState([]);
  const fetchProducts = async () => {
    try {
      const data = await fetch("/products-list").then((res) => res.json());
      // setEmptyStore(true);
      if (data.length) {
        setProductobj(data);
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
        console.log("No products found!");
      }
    } catch (err) {
      console.log(err);
      setEmptyStore(true);
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
                products={productobj === undefined ? "none" : productobj}
                setProductobj={setProductobj}
                handleSelectedProducts={handleSelectedProducts}
                categories={categories}
              />
            )}
          </Card>
        </div>
      </Page>
    </div>
  );
}

export default MyLables;

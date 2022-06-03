import { Card, Heading, Subheading, TextStyle, Icon } from "@shopify/polaris";
import React from "react";
import { CircleTickMajor } from "@shopify/polaris-icons";

function PricingPlanTable() {
  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <Card title="Plan comparison">
        <table style={{ width: "100%" }}>
          <thead>
            <tr
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: "40px",
                width: "100%",
                marginTop: "30px",
              }}
            >
              <div
                style={{
                  marginLeft: "18px",
                  textAlign: "start",
                  width: "30%",
                }}
              >
                <Subheading>FEATURE</Subheading>
              </div>
              <div>
                <Subheading>BASIC PLAN</Subheading>
              </div>
              <div>
                <Subheading>ADVANCED PLAN</Subheading>
              </div>
              <div>
                <Subheading>ENTERPRISE PLAN</Subheading>
              </div>
            </tr>
          </thead>
          <tbody style={{ width: "100%" }}>
            <tr>
              <hr
                style={{
                  borderColor: "#E1E3E5",
                  border: "1px solid #E1E3E5",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: "80px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    marginLeft: "18px",
                    textAlign: "start",
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextStyle variation="strong">Number of products</TextStyle>
                  <TextStyle variation="subdued">
                    You can have so many products in your store.
                  </TextStyle>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  {" "}
                  <TextStyle variation="strong">999</TextStyle>
                </div>
                <div
                  style={{
                    marginLeft: "40px",
                  }}
                >
                  {" "}
                  <TextStyle variation="strong">999</TextStyle>
                </div>
                <div
                  style={{
                    marginLeft: "10px",
                    fontWeight: "500",
                  }}
                >
                  {" "}
                  <TextStyle variation="positive">Unlimited</TextStyle>
                </div>
              </div>
            </tr>
            <tr>
              <hr
                style={{
                  borderColor: "#E1E3E5",
                  border: "1px solid #E1E3E5",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: "80px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    marginLeft: "18px",
                    textAlign: "start",
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextStyle variation="strong">
                    Basic Appearance Customization
                  </TextStyle>
                  <TextStyle variation="subdued">
                    Change the basic setting of how the table is displayed in
                    the front end of your shop.
                  </TextStyle>
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
              </div>
            </tr>
            <tr>
              <hr
                style={{
                  borderColor: "#E1E3E5",
                  border: "1px solid #E1E3E5",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: "80px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    marginLeft: "18px",
                    textAlign: "start",
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextStyle variation="strong">
                    Basic label data editing
                  </TextStyle>
                  <TextStyle variation="subdued">
                    You can add all legally required nutritional information
                    based on your country.
                  </TextStyle>
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
              </div>
            </tr>
            <tr>
              <hr
                style={{
                  borderColor: "#E1E3E5",
                  border: "1px solid #E1E3E5",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: "80px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    marginLeft: "18px",
                    textAlign: "start",
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextStyle variation="strong">
                    European, American, and Canadian labels
                  </TextStyle>
                  <TextStyle variation="subdued">
                    The table is optically adapted to the standard
                    representation of your individual country.
                  </TextStyle>
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
              </div>
            </tr>
            <tr>
              <hr
                style={{
                  borderColor: "#E1E3E5",
                  border: "1px solid #E1E3E5",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: "80px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    marginLeft: "18px",
                    textAlign: "start",
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextStyle variation="strong">
                    Ingredients and Allergens list{" "}
                  </TextStyle>
                  <TextStyle variation="subdued">
                    Add ingredient and allergen information in a text box that
                    will appear below the nutrition table.
                  </TextStyle>
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
              </div>
            </tr>
            <tr>
              <hr
                style={{
                  borderColor: "#E1E3E5",
                  border: "1px solid #E1E3E5",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: "80px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    marginLeft: "18px",
                    textAlign: "start",
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextStyle variation="strong">Bulk edit products </TextStyle>
                  <TextStyle variation="subdued">
                    Bulk edit products and categories to speed up the work.
                  </TextStyle>
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
              </div>
            </tr>
            <tr>
              <hr
                style={{
                  borderColor: "#E1E3E5",
                  border: "1px solid #E1E3E5",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: "80px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    marginLeft: "18px",
                    textAlign: "start",
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextStyle variation="strong">Language settings </TextStyle>
                  <TextStyle variation="subdued">
                    Translate all frontend terms and words to display the
                    information in your shop's language.
                  </TextStyle>
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
              </div>
            </tr>
            <tr>
              <hr
                style={{
                  borderColor: "#E1E3E5",
                  border: "1px solid #E1E3E5",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: "80px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    marginLeft: "18px",
                    textAlign: "start",
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextStyle variation="strong">
                    Advanced Appearance Customization{" "}
                  </TextStyle>
                  <TextStyle variation="subdued">
                    Customize the design of the table to match your company's
                    look and feel. Edit fonts, colors, border, add background
                    images and much more!
                  </TextStyle>
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                </div>
                <div
                  style={{
                    marginRight: "20px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
              </div>
            </tr>
            <tr>
              <hr
                style={{
                  borderColor: "#E1E3E5",
                  border: "1px solid #E1E3E5",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: "80px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    marginLeft: "18px",
                    textAlign: "start",
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextStyle variation="strong">
                    Advanced label data editing{" "}
                  </TextStyle>
                  <TextStyle variation="subdued">
                    Edit, move and delete the standard fields and much more to
                    create customized nutrient tables.
                  </TextStyle>
                </div>
                <div
                  style={{
                    marginRight: "45px",
                  }}
                >
                  {" "}
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
              </div>
            </tr>
            <tr>
              <hr
                style={{
                  borderColor: "#E1E3E5",
                  border: "1px solid #E1E3E5",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: "80px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    marginLeft: "18px",
                    textAlign: "start",
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextStyle variation="strong">Custom fields </TextStyle>
                  <TextStyle variation="subdued">
                    Add custom fields at any point in the table to implement
                    individual requirements.
                  </TextStyle>
                </div>
                <div
                  style={{
                    marginRight: "45px",
                  }}
                >
                  {" "}
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
              </div>
            </tr>
            <tr>
              <hr
                style={{
                  borderColor: "#E1E3E5",
                  border: "1px solid #E1E3E5",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: "80px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    marginLeft: "18px",
                    textAlign: "start",
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextStyle variation="strong">Minerals & Vitamins </TextStyle>
                  <TextStyle variation="subdued">
                    Add your own minerals and vitamins to the product nutrition
                    table.
                  </TextStyle>
                </div>
                <div
                  style={{
                    marginRight: "45px",
                  }}
                >
                  {" "}
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
              </div>
            </tr>
            <tr>
              <hr
                style={{
                  borderColor: "#E1E3E5",
                  border: "1px solid #E1E3E5",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: "80px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    marginLeft: "18px",
                    textAlign: "start",
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextStyle variation="strong">
                    Automatic data calculation
                  </TextStyle>
                  <TextStyle variation="subdued">
                    Information on the recommended daily intake is automatically
                    calculated by the app.
                  </TextStyle>
                </div>
                <div
                  style={{
                    marginRight: "45px",
                  }}
                >
                  {" "}
                </div>
                <div
                  style={{
                    marginRight: "30px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  {" "}
                  <Icon source={CircleTickMajor} color="primary" />{" "}
                </div>
              </div>
            </tr>
          </tbody>
        </table>
      </Card>
      <div style={{ marginTop: "5px" }}>
        <TextStyle variation="subdued">
          This is a summary of the main features of our app. As we are
          constantly working on the further development of our app, it may
          happen that the presentation of the range of functions on this page
          changes from time to time. Feel free to use our free test phase to try
          out the app and convince yourself of the range of functions. Do you
          have questions about pricing? Then please contact us by email at
          <a href="#" style={{ textDecoration: "none", marginLeft: "4px" }}>
            support@cronum.app
          </a>
        </TextStyle>
      </div>
    </div>
  );
}

export default PricingPlanTable;

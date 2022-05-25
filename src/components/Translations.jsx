import { TextField, Typography } from "@mui/material";
import { Card, Heading, Layout, Page } from "@shopify/polaris";
import React from "react";

function Translatins({ langState, setLangState, fetchLang }) {
  /**
   * Handle field change
   *
   * @param {*} event
   */
  const handleChange = (event) => {
    event.persist();

    setLangState((langState) => ({
      ...langState,
      values: {
        ...langState.values,
        [event.target.name]: event.target.value,
      },
    }));
  };
  const handleFetch = (event) => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    fetchLang(name, value);
  };

  return (
    <div>
      <Heading element="h1">Language</Heading>
      <Page fullWidth>
        <Layout>
          <Layout.Section>
            <Card>
              <div
                style={{
                  padding: "15px",
                }}
              >
                <Typography
                  style={{ margin: "15px 0px 15px 0px", fontWeight: "bold" }}
                  variant="body1"
                >
                  Label Titles
                </Typography>
                <div
                  style={{
                    margin: "0px 0px 15px 0px",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ margin: "0px 0px 5px 0px" }}
                  >
                    Nutrition Information
                  </Typography>
                  <TextField
                    style={{
                      "&:focus": {
                        borderColor: "red",
                      },
                    }}
                    name="NutritionInformation"
                    value={langState.values.NutritionInformation || ""}
                    onChange={handleChange}
                    onBlur={handleFetch}
                    fullWidth
                  />
                </div>

                <div
                  style={{
                    margin: "0px 0px 15px 0px",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ margin: "0px 0px 5px 0px" }}
                  >
                    Ingredients
                  </Typography>
                  <TextField
                    name="Ingredients"
                    value={langState.values.Ingredients || ""}
                    onChange={handleChange}
                    onBlur={handleFetch}
                    fullWidth
                  />
                </div>
                <div
                  style={{
                    margin: "0px 0px 15px 0px",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ margin: "0px 0px 5px 0px" }}
                  >
                    Allergy Information
                  </Typography>
                  <TextField
                    name="AllergyInformation"
                    value={langState.values.AllergyInformation || ""}
                    onChange={handleChange}
                    onBlur={handleFetch}
                    fullWidth
                  />
                </div>
                <div
                  style={{
                    margin: "0px 0px 15px 0px",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ margin: "0px 0px 5px 0px" }}
                  >
                    LEGAL NOTICE
                  </Typography>
                  <TextField
                    name="LEGALNOTICE"
                    value={langState.values.LEGALNOTICE || ""}
                    onChange={handleChange}
                    onBlur={handleFetch}
                    fullWidth
                  />
                </div>
              </div>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}

export default Translatins;

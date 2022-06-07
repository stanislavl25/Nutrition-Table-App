import { Card, Heading, Layout, Page, TextField } from "@shopify/polaris";
import React, { useCallback } from "react";

function Translatins({ langState, setLangState, fetchLang, location }) {
  /**
   * Handle field change
   *
   * @param {*} event
   */
  const handleChange = useCallback((e, tag) => {
    setLangState((langState) => ({
      ...langState,
      values: {
        ...langState.values,
        [tag]: e,
      },
    }));
  });

  const handleFetch = useCallback((e, tag) => {
    const name = tag;
    const value = e.target.value;
    fetchLang(name, value);
  });

  return (
    <Page fullWidth title="Language">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Heading>Label Titles</Heading>
            {location === "NA" || location === "CA" ? (
              <div
                style={{
                  marginBottom: "15px",
                }}
              >
                <TextField
                  label="Nutrition Facts"
                  value={langState.values.nutritionFacts || "Nutrition Facts"}
                  onChange={(e) => handleChange(e, "nutritionFacts")}
                  onBlur={(e) => handleFetch(e, "nutritionFacts")}
                />
              </div>
            ) : (
              <></>
            )}
            {location === "NA" ? (
              <div
                style={{
                  marginBottom: "15px",
                }}
              >
                <TextField
                  label="servings per container"
                  value={
                    langState.values.servingsPerContainer ||
                    "servings per container"
                  }
                  onChange={(e) => handleChange(e, "servingsPerContainer")}
                  onBlur={(e) => handleFetch(e, "servingsPerContainer")}
                />
              </div>
            ) : (
              <></>
            )}

            {location === "EU" ? (
              <>
                <div
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <TextField
                    label="per"
                    value={langState.values.per || "per"}
                    onChange={(e) => handleChange(e, "per")}
                    onBlur={(e) => handleFetch(e, "per")}
                  />
                </div>
                <div
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <TextField
                    label="portion"
                    value={langState.values.portion || "portion"}
                    onChange={(e) => handleChange(e, "portion")}
                    onBlur={(e) => handleFetch(e, "portion")}
                  />
                </div>
                <div
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <TextField
                    label="energy"
                    value={langState.values.energy || "energy"}
                    onChange={(e) => handleChange(e, "energy")}
                    onBlur={(e) => handleFetch(e, "energy")}
                  />
                </div>
                <div
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <TextField
                    label="Nutrition Information"
                    name="NutritionInformation"
                    value={
                      langState.values.NutritionInformation ||
                      "Nutrition Information"
                    }
                    onChange={(e) => handleChange(e, "NutritionInformation")}
                    onBlur={(e) => handleFetch(e, "NutritionInformation")}
                    fullWidth
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            {location === "EU" || location === "NA" ? (
              <div
                style={{
                  marginBottom: "15px",
                }}
              >
                <TextField
                  label="Serving size"
                  value={langState.values.servingSize || "Serving size"}
                  onChange={(e) => handleChange(e, "servingSize")}
                  onBlur={(e) => handleFetch(e, "servingSize")}
                />
              </div>
            ) : (
              <></>
            )}
            {location === "EU" ? (
              <>
                <div
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <TextField
                    label="Prepared portion"
                    value={
                      langState.values.preparedPortion || "Prepared portion"
                    }
                    onChange={(e) => handleChange(e, "preparedPortion")}
                    onBlur={(e) => handleFetch(e, "preparedPortion")}
                  />
                </div>
                <div
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <TextField
                    label="A prepared portion is equivalent to"
                    value={
                      langState.values.aPreparedPortionIsEquivalentTo ||
                      "A prepared portion is equivalent to"
                    }
                    onChange={(e) =>
                      handleChange(e, "aPreparedPortionIsEquivalentTo")
                    }
                    onBlur={(e) =>
                      handleFetch(e, "aPreparedPortionIsEquivalentTo")
                    }
                  />
                </div>
                <div
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <TextField
                    label="Reference intake disclaimer"
                    value={
                      langState.values.referenceIntakeDisclaimer ||
                      "*Reference intake of an average adult (8 400 kJ / 2 000 kcal)"
                    }
                    onChange={(e) =>
                      handleChange(e, "referenceIntakeDisclaimer")
                    }
                    onBlur={(e) => handleFetch(e, "referenceIntakeDisclaimer")}
                  />
                </div>
              </>
            ) : (
              <></>
            )}

            {location === "NA" ? (
              <div
                style={{
                  marginBottom: "15px",
                }}
              >
                <TextField
                  label="Amount per serving"
                  value={
                    langState.values.amountPerServing || "Amount per serving"
                  }
                  onChange={(e) => handleChange(e, "amountPerServing")}
                  onBlur={(e) => handleFetch(e, "amountPerServing")}
                />
              </div>
            ) : (
              <></>
            )}

            {location === "CA" ? (
              <>
                <div
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <TextField
                    label="Valeur nutritive"
                    value={
                      langState.values.valeurNutritive || "Valeur nutritive"
                    }
                    onChange={(e) => handleChange(e, "valeurNutritive")}
                    onBlur={(e) => handleFetch(e, "valeurNutritive")}
                  />
                </div>
                <div
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <TextField
                    label="% Daily Value*"
                    value={langState.values.dailyValue || "% Daily Value*"}
                    onChange={(e) => handleChange(e, "dailyValue")}
                    onBlur={(e) => handleFetch(e, "dailyValue")}
                  />
                </div>
                <div
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <TextField
                    label="% valeur quotidienne*"
                    value={
                      langState.values.valeurQuotidienne ||
                      "% valeur quotidienne*"
                    }
                    onChange={(e) => handleChange(e, "valeurQuotidienne")}
                    onBlur={(e) => handleFetch(e, "valeurQuotidienne")}
                  />
                </div>
              </>
            ) : (
              <></>
            )}

            {location === "NA" || location === "CA" ? (
              <div
                style={{
                  marginBottom: "15px",
                }}
              >
                <TextField
                  label="Calories"
                  value={langState.values.calories || "Calories"}
                  onChange={(e) => handleChange(e, "calories")}
                  onBlur={(e) => handleFetch(e, "calories")}
                />
              </div>
            ) : (
              <></>
            )}
            <div
              style={{
                marginBottom: "15px",
              }}
            >
              <TextField
                label="Ingredients"
                name="Ingredients"
                value={langState.values.Ingredients || "Ingredients"}
                onChange={(e) => handleChange(e, "Ingredients")}
                onBlur={(e) => handleFetch(e, "Ingredients")}
                fullWidth
              />
            </div>
            <div
              style={{
                marginBottom: "15px",
              }}
            >
              <TextField
                label="Allergy Information"
                name="AllergyInformation"
                value={
                  langState.values.AllergyInformation || "Allergy Information"
                }
                onChange={(e) => handleChange(e, "AllergyInformation")}
                onBlur={(e) => handleFetch(e, "AllergyInformation")}
                fullWidth
              />
            </div>

            {/* {location === "EU" ? (
              <></>
            ) : (
              <div
                style={{
                  marginBottom: "15px",
                }}
              >
                <TextField
                  label="LEGAL NOTICE"
                  name="LEGALNOTICE"
                  value={langState.values.LEGALNOTICE || ""}
                  onChange={(e) => handleChange(e, "LEGALNOTICE")}
                  onBlur={(e) => handleFetch(e, "LEGALNOTICE")}
                  fullWidth
                />
              </div>
            )} */}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default Translatins;

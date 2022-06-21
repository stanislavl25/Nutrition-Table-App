import { Banner, Card, Heading } from "@shopify/polaris";
import React, { useState } from "react";
import "../../assets/previewStyles.css";
import { Markup } from "interweave";
function TablePreview({ data, formValues, productToPrepare, locationPlan }) {
  const [bannerDismissed, setBannerDismissed] = useState(true);

  return (
    <Card sectioned title="Label Preview">
      {bannerDismissed ? (
        <Banner
          status="info"
          onDismiss={() => {
            setBannerDismissed(false);
          }}
        >
          <p>You can costumize how your label looks on the theme editor!</p>
        </Banner>
      ) : null}
      <div className="table_conatiner">
        <div
          className="table_header"
          style={{ borderBottom: "1px solid rgb(190, 190, 190)" }}
        >
          <Heading>Nutrition Information</Heading>
        </div>
        {locationPlan.location === "EU" && productToPrepare ? (
          <div
            style={{
              color: "white",
              textAlign: "center",
              backgroundColor: "black",
              width: "100%",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <strong>
              A prepared portion is equivalent to{" "}
              {data.servingSize.EU.PortionSize} g
            </strong>
          </div>
        ) : (
          <></>
        )}
        {locationPlan.location === "NA" ? (
          <div style={{ borderBottom: "3px solid black" }}>
            <div>
              {data.servingSize.NA.Servingspercontainer} servings per container
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <strong>Serving size</strong>
              <strong>
                {data.servingSize.NA.Servingreference}(
                {data.servingSize.NA.servingsize})
              </strong>
            </div>
          </div>
        ) : (
          <></>
        )}
        {locationPlan.location === "NA" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderBottom: "3px solid black",
            }}
          >
            <strong>Amount per serving</strong>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <strong>Calories </strong>
              <strong>{data.servingSize.NA.Preparedcalories}</strong>
            </div>
          </div>
        ) : (
          <></>
        )}
        {locationPlan.location === "CA" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderBottom: "3px solid black",
            }}
          >
            <strong>Valeur nutritive</strong>
            <div>
              <p>
                {data.servingSize.CA.servingRefBasic} (
                {data.servingSize.CA.servingSizeBasic}{" "}
                {data.servingSize.CA.unitBasic === "Milliliters" ? "ml" : "l"})
              </p>
              <p>
                {data.servingSize.CA.bilingualRefBasic}(
                {data.servingSize.CA.servingSizeBasic}{" "}
                {data.servingSize.CA.unitBasic === "Milliliters" ? "ml" : "l"})
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
        {locationPlan.location === "CA" ? (
          <div>
            <Heading element="h1">
              Calories{data.servingSize.CA.caloriesPerServingBasic}
            </Heading>
            <strong>% Daily Value*</strong>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <hr style={{ border: "2px solid black", width: "70%" }} />
              <p style={{ width: "30%" }}>
                <strong style={{ display: "inline-flex" }}>
                  % valeur quotidienne*
                </strong>
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}

        <table className="table_cont" style={{ borderCollapse: "collapse" }}>
          <thead className="thead">
            {locationPlan.location === "EU" ? (
              <tr>
                <th scope="col" style={{ textAlign: "left" }}>
                  Serving size
                </th>
                <th scope="col">Per 100 g</th>
                <th scope="col">
                  <p>
                    <strong>
                      {productToPrepare ? "Prepared" : 1} <br />
                    </strong>
                    portion
                    <br /> {data.servingSize.EU.PortionSize} g
                  </p>
                </th>
                <td scope="col" style={{ borderRight: "none" }}>
                  % RI*
                </td>
              </tr>
            ) : (
              <></>
            )}
            {locationPlan.location === "NA" ? (
              <tr>
                <th style={{ width: "100%", textAlign: "right" }} scope="col">
                  <strong>% Daily Value*</strong>
                </th>
              </tr>
            ) : (
              <></>
            )}
          </thead>
          <tbody className="tbody">
            <tr>
              {locationPlan.location === "EU" ? (
                <>
                  <th className="thtd" style={{ textAlign: "left" }}>
                    <b>Energy</b>
                  </th>
                  <td className="thtd td">
                    <div>
                      <div>{data.calsEnergyInfo.energyKj100}</div>
                      <div>{data.calsEnergyInfo.energyKcal100}</div>
                    </div>
                  </td>
                  <td className="thtd td">
                    <div>
                      <div>{data.calsEnergyInfo.energyKj25}</div>
                      <div>{data.calsEnergyInfo.energyKcal25}</div>
                    </div>
                  </td>
                  <td className="thtd td" style={{ borderRight: "none" }}>
                    {data.calsEnergyInfo.Ri} %
                  </td>
                </>
              ) : (
                <></>
              )}
            </tr>

            {locationPlan.location === "EU" ? (
              data.nutritionData.map((element, index) => (
                <tr key={index}>
                  <th
                    className="thtd"
                    scope="row"
                    style={{ textAlign: "left" }}
                  >
                    <b>{element.name}</b>
                  </th>
                  <td className="thtd td">{element.per100g}</td>
                  <td className="thtd td"> {element.perportion}</td>
                  <td className="thtd td" style={{ borderRight: "none" }}>
                    {element.RI} %
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
            {locationPlan.location === "NA" ? (
              data.nutritionData.map((element, index) => (
                <tr key={index} scope="row">
                  <td
                    style={{
                      borderBottom: "1px solid rgb(190, 190, 190)",
                      textAlign: "left",
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {element.name}
                      <p>
                        {element.quantity}
                        {element.unit === "Grams" ? "g" : "mg"}
                      </p>
                    </p>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <strong
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {element.dailyValue ? element.dailyValue : 0} %
                    </strong>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}

            {locationPlan.location === "CA" ? (
              <tr>
                <td>nutrition data</td>
              </tr>
            ) : (
              <></>
            )}

            {locationPlan.location === "EU" ? (
              data.vitamins.map((element, index) => (
                <tr key={index}>
                  <th
                    className="thtd"
                    scope="row"
                    style={{ textAlign: "left" }}
                  >
                    <b>{element.name}</b>
                  </th>
                  <td className="thtd td">{element.per100g}</td>
                  <td className="thtd td"> {element.perportion}</td>
                  <td
                    className="thtd td"
                    style={{
                      borderRight: "none",
                    }}
                  >
                    {element.RI || 0} %
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
            {locationPlan.location === "EU" ? (
              data.minerals.map((element, index) => (
                <tr key={index}>
                  <th
                    className="thtd"
                    scope="row"
                    style={{ textAlign: "left" }}
                  >
                    <b>{element.name}</b>
                  </th>
                  <td className="thtd td">{element.per100g}</td>
                  <td className="thtd td"> {element.perportion}</td>
                  <td
                    className="thtd td"
                    style={{
                      borderRight: "none",
                    }}
                  >
                    {element.RI || 0} %
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
            {locationPlan.location === "NA" ? (
              data.vitamins.map((element, index) => (
                <tr
                  key={index}
                  scope="row"
                  style={{ borderTop: "3px solid black" }}
                >
                  <td
                    style={{
                      borderBottom: "1px solid rgb(190, 190, 190)",
                      textAlign: "left",
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {element.name}
                      <p>
                        {element.quantity}
                        {element.unit === "Grams" ? "g" : "mg"}
                      </p>
                    </p>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <strong
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {element.dailyValue ? element.dailyValue : 0} %
                    </strong>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
            {locationPlan.location === "NA" ? (
              data.minerals.map((element, index) => (
                <tr key={index} scope="row">
                  <td
                    style={{
                      borderBottom: "1px solid rgb(190, 190, 190)",
                      textAlign: "left",
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {element.name}
                      <p>
                        {element.quantity}
                        {element.unit === "Grams" ? "g" : "mg"}
                      </p>
                    </p>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <strong
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {element.dailyValue ? element.dailyValue : 0} %
                    </strong>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
            {locationPlan.location === "CA" ? (
              <tr>
                <td>heyy</td>
              </tr>
            ) : (
              <></>
            )}
            {locationPlan.location === "CA" ? (
              <tr>
                <td>heyy 2</td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>
        {data.richText.notesText.length > 0 ? (
          <div className="small-info topBorderThick">
            <Markup content={data.richText.notesText} />
          </div>
        ) : (
          <></>
        )}
        <hr style={{ width: "100%", borderCollapse: "collapse" }} />
        <div className="Ingredients_container">
          <div className="topBorderThin thin-end">
            <Heading>Ingredients</Heading>
          </div>
          <hr style={{ width: "100%" }} />
          <Markup content={data.richText.ingredientsText} />
        </div>
        <hr />
        <div className="Allergy_information thin-end">
          <div className="topBorderThin thin-end">
            <Heading>Allergy information</Heading>
          </div>
          <hr style={{ width: "100%" }} />
          <Markup content={data.richText.allergyInfoText} />
        </div>
        <hr />
        <div className="LEGAL_NOTICE">
          <Markup content={data.richText.lEGALNOTICEText} />
        </div>
      </div>
    </Card>
  );
}

export default TablePreview;

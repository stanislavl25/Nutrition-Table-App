import { Banner, Card, Heading } from "@shopify/polaris";
import React, { useState } from "react";
import "../../assets/previewStyles.css";
import { Markup } from "interweave";
function TablePreview({ data, productToPrepare, locationPlan }) {
  const [bannerDismissed, setBannerDismissed] = useState(true);

  return (
    <Card title="Label Preview">
      <div style={{ padding: "10px" }}>
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
        <div className="table_container">
          <div style={{ padding: "10px" }}>
            <div
              className="table_header"
              style={{
                borderBottom: "1px solid rgb(190, 190, 190)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Heading>Nutrition Information</Heading>
              <p style={{ marginRight: "30px" }}>
                <i className="arrow up"></i>
              </p>
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
                  {data.servingSize.NA.Servingspercontainer} servings per
                  container
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
                    {data.servingSize.CA.unitBasic === "Milliliters"
                      ? "ml"
                      : "l"}
                    )
                  </p>
                  <p>
                    {data.servingSize.CA.bilingualRefBasic}(
                    {data.servingSize.CA.servingSizeBasic}{" "}
                    {data.servingSize.CA.unitBasic === "Milliliters"
                      ? "ml"
                      : "l"}
                    )
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}
            {locationPlan.location === "CA" ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Heading element="h1">
                    Calories {data.servingSize.CA.caloriesPerServingBasic}
                  </Heading>
                  <strong>% Daily Value*</strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <hr style={{ borderTop: "3px solid black", width: "140%" }} />
                  <p style={{ width: "100%" }}>
                    <strong
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      % valeur quotidienne*
                    </strong>
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}

            <table
              className="table_cont"
              style={{ borderCollapse: "collapse", marginBottom: "10px" }}
            >
              <thead className="thead">
                {locationPlan.location === "EU" ? (
                  <tr>
                    <th scope="col" style={{ textAlign: "left" }}>
                      Serving size
                    </th>
                    <th scope="col">Per 100 g</th>
                    {locationPlan.plan === "Basic" ? (
                      <></>
                    ) : (
                      <>
                        <th scope="col">
                          {productToPrepare ? "Prepared" : 1} <br />
                          portion
                          <br /> {data.servingSize.EU.PortionSize} g
                        </th>
                        <th scope="col" style={{ borderRight: "none" }}>
                          % RI*
                        </th>
                      </>
                    )}
                  </tr>
                ) : (
                  <></>
                )}
                {locationPlan.location === "NA" ? (
                  <tr>
                    <th
                      style={{ width: "100%", textAlign: "right" }}
                      scope="col"
                    >
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
                      {locationPlan.plan === "Basic" ? (
                        <></>
                      ) : (
                        <>
                          <td className="thtd td">
                            <div>
                              <div>{data.calsEnergyInfo.energyKj25}</div>
                              <div>{data.calsEnergyInfo.energyKcal25}</div>
                            </div>
                          </td>
                          <td
                            className="thtd td"
                            style={{ borderRight: "none" }}
                          >
                            {data.calsEnergyInfo.Ri} %
                          </td>
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </tr>

                {locationPlan.location === "EU" ? (
                  data.nutritionData.map((element, index) => (
                    <tr key={index}>
                      <td
                        className="thtd"
                        scope="row"
                        style={{ textAlign: "left" }}
                      >
                        <p
                          style={{
                            fontWeight: element.bold === "Yes" ? "bold" : "",
                            marginLeft: element.leftSpacing + "px",
                          }}
                        >
                          {element.name}
                        </p>
                      </td>
                      <td className="thtd td">{element.per100g}</td>
                      {locationPlan.plan === "Basic" ? (
                        <></>
                      ) : (
                        <>
                          <td className="thtd td"> {element.perportion}</td>
                          <td
                            className="thtd td"
                            style={{ borderRight: "none" }}
                          >
                            {element.RI} %
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <></>
                )}
                {locationPlan.location === "NA" ? (
                  data.nutritionData.map((element, index) => (
                    <tr
                      key={index}
                      scope="row"
                      style={{
                        borderBottom: "1px solid rgb(190, 190, 190)",
                      }}
                    >
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <p
                            style={{
                              fontWeight: element.bold === "Yes" ? "bold" : "",
                              marginLeft: element.leftSpacing + "px",
                            }}
                          >
                            {element.name}
                          </p>
                          <p>
                            {element.quantity}
                            {element.unit === "Grams" ? "g" : "mg"}
                          </p>
                        </div>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "end",
                        }}
                      >
                        <p>
                          <strong>
                            {element.dailyValue ? element.dailyValue : 0}
                          </strong>
                        </p>
                        <strong>%</strong>
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}

                {locationPlan.location === "CA" ? (
                  data.nutritionData.map((element, index) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: "1px solid rgb(190, 190, 190)",
                      }}
                      scope="row"
                    >
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <p
                            style={{
                              fontWeight: element.bold === "Yes" ? "bold" : "",
                              marginLeft: element.leftSpacing + "px",
                            }}
                          >
                            {element.name}
                          </p>
                          <p>
                            {element.quantity}
                            {element.Unit === "Grams" ? "g" : "mg"}
                          </p>
                        </div>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {element.dailyValue || 0} %
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
              <tfoot
                style={{
                  borderTop: "3px solid black",
                  borderBottom: "3px solid black",
                }}
              >
                {locationPlan.location === "EU" &&
                locationPlan.plan != "Basic" ? (
                  data.vitamins.map((element, index) => (
                    <tr key={index}>
                      <td
                        className="thtd"
                        scope="row"
                        style={{ textAlign: "left" }}
                      >
                        <p
                          style={{
                            marginLeft: element.LeftSpacing + "px",
                          }}
                        >
                          {element.name}
                        </p>
                      </td>
                      <td className="thtd td">{element.per100g}</td>
                      {locationPlan.plan === "Basic" ? (
                        <></>
                      ) : (
                        <>
                          <td className="thtd td"> {element.perportion}</td>
                          <td
                            className="thtd td"
                            style={{
                              borderRight: "none",
                            }}
                          >
                            {element.RI || 0} %
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <></>
                )}
                {locationPlan.location === "EU" &&
                locationPlan.plan != "Basic" ? (
                  data.minerals.map((element, index) => (
                    <tr key={index}>
                      <td
                        className="thtd"
                        scope="row"
                        style={{ textAlign: "left" }}
                      >
                        <p
                          style={{
                            marginLeft: element.LeftSpacing + "px",
                          }}
                        >
                          {element.name}
                        </p>
                      </td>
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
                      style={{
                        borderBottom: "1px solid rgb(190, 190, 190)",
                      }}
                    >
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <p
                            style={{
                              marginLeft: element.LeftSpacing + "px",
                            }}
                          >
                            {element.name}
                          </p>
                          <p>
                            {element.quantity}
                            {element.unit === "Grams" ? "g" : "mg"}
                          </p>
                        </div>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "right",
                        }}
                      >
                        <p>
                          <strong>
                            {element.dailyValue ? element.dailyValue : 0}
                          </strong>
                        </p>
                        <strong>%</strong>
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
                {locationPlan.location === "NA" ? (
                  data.minerals.map((element, index) => (
                    <tr
                      key={index}
                      scope="row"
                      style={{
                        borderBottom: "1px solid rgb(190, 190, 190)",
                      }}
                    >
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <p
                            style={{
                              marginLeft: element.LeftSpacing + "px",
                            }}
                          >
                            {element.name}
                          </p>
                          <p>
                            {element.quantity}
                            {element.unit === "Grams" ? "g" : "mg"}
                          </p>
                        </div>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "right",
                        }}
                      >
                        <p>
                          <strong>
                            {element.dailyValue ? element.dailyValue : 0}
                          </strong>
                        </p>
                        <strong>%</strong>
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
                {locationPlan.location === "CA" ? (
                  data.vitamins.map((element, index) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: "1px solid rgb(190, 190, 190)",
                      }}
                      scope="row"
                    >
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <p
                            style={{
                              fontWeight: element.bold === "Yes" ? "bold" : "",
                              marginLeft: element.LeftSpacing + "px",
                            }}
                          >
                            {element.name}
                          </p>
                          <p>
                            {element.quantity}
                            {element.unit === "Grams" ? "g" : "mg"}
                          </p>
                        </div>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {element.dailyValue || 0} %
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}

                {locationPlan.location === "CA" ? (
                  data.minerals.map((element, index) => (
                    <tr
                      key={index}
                      style={{ borderBottom: "1px solid rgb(190, 190, 190)" }}
                      scope="row"
                    >
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <p
                            style={{
                              fontWeight: element.bold === "Yes" ? "bold" : "",
                              marginLeft: element.LeftSpacing + "px",
                            }}
                          >
                            {element.name}
                          </p>
                          <p>
                            {element.quantity}
                            {element.unit === "Grams" ? "g" : "mg"}
                          </p>
                        </div>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {element.dailyValue || 0} %
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tfoot>
            </table>
          </div>

          <div style={{ padding: "0px" }}>
            {data.richText.notesText.length > 0 ? (
              <div style={{ marginBottom: "10px", width: "100%" }}>
                <div style={{ paddingRight: "10px", paddingLeft: "10px" }}>
                  <Markup content={data.richText.notesText} />
                </div>
              </div>
            ) : (
              <></>
            )}
            <div
              style={{
                borderTop: "1px solid rgb(190, 190, 190)",
                width: "100%",
                paddingRight: "10px",
                paddingLeft: "10px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  width: "90%",
                }}
              >
                <Heading>Ingredients</Heading>
                <p>
                  <i className="arrow up"></i>
                </p>
              </div>

              <hr
                style={{
                  width: "100%",
                  borderTop: "1px solid rgb(190, 190, 190)",
                }}
              />
              <Markup content={data.richText.ingredientsText} />
            </div>

            <div
              style={{
                borderTop: "1px solid rgb(190, 190, 190)",
                width: "100%",
                paddingRight: "10px",
                paddingLeft: "10px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  width: "90%",
                }}
              >
                <Heading>Allergy information</Heading>
                <p>
                  <i className="arrow up"></i>
                </p>
              </div>
              <hr
                style={{
                  width: "100%",
                  marginTop: "10px",
                  borderTop: "1px solid rgb(190, 190, 190)",
                }}
              />
              <Markup content={data.richText.allergyInfoText} />
            </div>
            <hr
              style={{
                borderTop: "1px solid rgb(190, 190, 190)",
              }}
            />
            <div
              className="LEGAL_NOTICE"
              style={{ marginTop: "10px", padding: "10px" }}
            >
              <Markup content={data.richText.lEGALNOTICEText} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default TablePreview;

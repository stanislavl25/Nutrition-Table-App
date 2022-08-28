import { Banner, Card, Heading } from "@shopify/polaris";
import React, { useState } from "react";
import "../../assets/previewStyles.css";
import { Markup } from "interweave";
function TablePreview({ data, productToPrepare, locationPlan, langState }) {
  const [bannerDismissed, setBannerDismissed] = useState(true);
  console.log(langState);
  //!!! get inputs to mode number all in NA and CA
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
            <p>You can customize how your label looks on the theme editor!</p>
          </Banner>
        ) : null}
        <div className="table_container" style={{ wordBreak: "break-word" }}>
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
              <Heading>
                {locationPlan === "EU"
                  ? langState.NutritionInformation
                  : langState.nutritionFacts}
              </Heading>
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
                  {langState.aPreparedPortionIsEquivalentTo}{" "}
                  {data.servingSize.EU.PortionSize}
                  {data.servingSize.EU.PortionSizeUnit === "MilliGrams"
                    ? "mg"
                    : "g"}
                </strong>
              </div>
            ) : (
              <></>
            )}
            {locationPlan.location === "NA" ? (
              <div style={{ borderBottom: "3px solid black" }}>
                <div>
                  {data.servingSize.NA.Servingspercontainer}{" "}
                  {langState.servingsPerContainer}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <strong>{langState.servingSize}</strong>
                  <strong>
                    {data.servingSize.NA.Servingreference}(
                    {data.servingSize.NA.servingsize})
                  </strong>
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
                  <hr style={{ borderTop: "3px solid black", width: "130%" }} />
                  <p style={{ width: "100%", textAlign: "end" }}>
                    <strong
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        textAlign: "end",
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
              style={{
                borderCollapse: "collapse",
                marginBottom: "10px",
                overflow: "hidden",
              }}
            >
              <thead
                className="thead"
                style={{
                  borderBottom:
                    locationPlan.location === "NA" && productToPrepare
                      ? "1px solid #ccc"
                      : "3px solid black",
                }}
              >
                {locationPlan.location === "EU" ? (
                  <tr style={{ wordBreak: "break-word" }}>
                    <th scope="col" style={{ textAlign: "left" }}>
                      Serving size
                    </th>
                    <th scope="col">
                      {langState.per} {data.servingSize.EU.DefaultAmount}{" "}
                      {data.servingSize.EU.DefaultAmountUnit === "MilliGrams"
                        ? "mg"
                        : "g"}
                    </th>
                    {locationPlan.plan === "Basic" ? (
                      <></>
                    ) : (
                      <>
                        <th scope="col">
                          {productToPrepare ? langState.preparedPortion : 1}{" "}
                          <br />
                          {productToPrepare ? (
                            <></>
                          ) : (
                            <>
                              {" "}
                              {langState.portion} <br />
                            </>
                          )}
                          {data.servingSize.EU.PortionSize}{" "}
                          {data.servingSize.EU.PortionSizeUnit === "MilliGrams"
                            ? "mg"
                            : "g"}
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
                  <>
                    <tr>
                      <th style={{ textAlign: "left" }}>
                        <strong>{langState.amountPerServing}</strong>
                      </th>
                      {productToPrepare ? (
                        <>
                          <th
                            style={{
                              borderRight: "1px solid #ccc",
                              borderLeft: "1px solid #ccc",
                              textAlign: "right",
                            }}
                          >
                            <strong>
                              {data.servingSize.NA.Servingreference}
                            </strong>
                          </th>
                          <th style={{ textAlign: "right" }}>
                            <strong>As prepared</strong>
                          </th>
                        </>
                      ) : (
                        <></>
                      )}
                    </tr>
                    <tr style={{ borderBottom: "3px solid black" }}>
                      <th style={{ textAlign: "left" }}>
                        <strong>{langState.calories}</strong>
                      </th>
                      <th
                        style={{
                          borderRight: "1px solid #ccc",
                          borderLeft: "1px solid #ccc",
                          textAlign: "right",
                        }}
                      >
                        {productToPrepare ? (
                          <strong style={{ textAlign: "right" }}>
                            {data.servingSize.NA.Unpreparedcalories}
                          </strong>
                        ) : (
                          <></>
                        )}
                      </th>
                      <th style={{ textAlign: "right" }}>
                        <strong>{data.servingSize.NA.Preparedcalories}</strong>
                      </th>
                    </tr>
                  </>
                ) : (
                  <></>
                )}
                {locationPlan.location === "NA" ? (
                  <tr>
                    {productToPrepare ? (
                      <>
                        <th></th>
                        <th
                          style={{
                            borderRight: "1px solid #ccc",
                            borderLeft: "1px solid #ccc",
                            textAlign: "right",
                          }}
                        >
                          % DV*
                        </th>
                        <th style={{ textAlign: "right" }}>% DV*</th>
                      </>
                    ) : (
                      <th
                        style={{
                          width: "100%",
                          textAlign: "right",
                          borderBottom: "none",
                        }}
                      >
                        <strong>% Daily Value*</strong>
                      </th>
                    )}
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
                          <div>{data.calsEnergyInfo.energyKj100}kj</div>
                          <div>{data.calsEnergyInfo.energyKcal100}kcal</div>
                        </div>
                      </td>
                      {locationPlan.plan === "Basic" ? (
                        <></>
                      ) : (
                        <>
                          <td className="thtd td">
                            <div>
                              <div>{data.calsEnergyInfo.energyKj25}kj</div>
                              <div>{data.calsEnergyInfo.energyKcal25}kcal</div>
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
                      <td className="thtd td">
                        {element.per100g}{" "}
                        {element.unit === "MilliGrams" ? "mg" : "g"}
                      </td>
                      {locationPlan.plan === "Basic" ? (
                        <></>
                      ) : (
                        <>
                          <td className="thtd td">
                            {element.perportion}{" "}
                            {element.unit === "MilliGrams" ? "mg" : "g"}
                          </td>
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
                  data.nutritionData.map((element, index) =>
                    productToPrepare ? (
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
                                fontWeight:
                                  element.bold === "Yes" ? "bold" : "",
                                marginLeft: element.leftSpacing + "px",
                              }}
                            >
                              {element.name}
                            </p>
                          </div>
                        </td>
                        <td
                          style={{
                            borderRight: "1px solid #ccc",
                            borderLeft: "1px solid #ccc",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>
                            {element.quantity}
                            {element.unit === "Grams" ? "g" : "mg"}
                          </p>
                          <p>
                            <strong>
                              {element.dailyValue ? element.dailyValue : 0}%
                            </strong>
                          </p>
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                          }}
                        >
                          <p>
                            <strong>
                              {element.preparedProductDV
                                ? element.preparedProductDV
                                : 0}
                              %
                            </strong>
                          </p>
                        </td>
                      </tr>
                    ) : (
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
                                fontWeight:
                                  element.bold === "Yes" ? "bold" : "",
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
                          <p style={{ whiteSpace: "nowrap" }}>
                            <strong>
                              {element.dailyValue ? element.dailyValue : 0}%
                            </strong>
                          </p>
                        </td>
                      </tr>
                    )
                  )
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
                      <td className="thtd td">
                        {element.per100g}{" "}
                        {element.unit === "Milligrams" ? "mg" : "g"}
                      </td>
                      {locationPlan.plan === "Basic" ? (
                        <></>
                      ) : (
                        <>
                          <td className="thtd td">
                            {element.perportion}{" "}
                            {element.unit === "Milligrams" ? "mg" : "g"}
                          </td>
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
                      <td className="thtd td">
                        {element.per100g}{" "}
                        {element.unit === "Milligrams" ? "mg" : "g"}
                      </td>
                      <td className="thtd td">
                        {" "}
                        {element.perportion}{" "}
                        {element.unit === "Milligrams" ? "mg" : "g"}
                      </td>
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
                  data.vitamins.map((element, index) =>
                    productToPrepare ? (
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
                          </div>
                        </td>
                        <td
                          style={{
                            borderRight: "1px solid #ccc",
                            borderLeft: "1px solid #ccc",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {" "}
                          <p>
                            {element.quantity}
                            {element.unit === "Grams" ? "g" : "mg"}
                          </p>
                          <p>
                            <strong>
                              {element.dailyValue ? element.dailyValue : 0}%
                            </strong>
                          </p>
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                          }}
                        >
                          <p>
                            <strong>
                              {element.dailyValue ? element.RI : 0}%
                            </strong>
                          </p>
                        </td>
                      </tr>
                    ) : (
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
                          <p style={{ whiteSpace: "nowrap" }}>
                            <strong>
                              {element.dailyValue ? element.dailyValue : 0}
                            </strong>
                          </p>
                          <strong>%</strong>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <></>
                )}
                {locationPlan.location === "NA" ? (
                  data.minerals.map((element, index) =>
                    productToPrepare ? (
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
                          </div>
                        </td>
                        <td
                          style={{
                            borderRight: "1px solid #ccc",
                            borderLeft: "1px solid #ccc",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>
                            {element.quantity}
                            {element.unit === "Grams" ? "g" : "mg"}
                          </p>
                          <p style={{ whiteSpace: "nowrap" }}>
                            <strong>
                              {element.dailyValue ? element.dailyValue : 0}%
                            </strong>
                          </p>
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                          }}
                        >
                          <p style={{ whiteSpace: "nowrap" }}>
                            <strong>
                              {element.dailyValue ? element.dailyValue : 0}%
                            </strong>
                          </p>
                        </td>
                      </tr>
                    ) : (
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
                          <p style={{ whiteSpace: "nowrap" }}>
                            <strong>
                              {element.dailyValue ? element.dailyValue : 0}
                            </strong>
                          </p>
                          <strong>%</strong>
                        </td>
                      </tr>
                    )
                  )
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
            {data?.richText?.notesText?.length > 0 ? (
              <div style={{ marginBottom: "10px", width: "100%" }}>
                <div style={{ paddingRight: "10px", paddingLeft: "10px" }}>
                  <Markup content={data?.richText?.notesText} />
                </div>
              </div>
            ) : (
              <></>
            )}
            {locationPlan === "EU" ? (
              <>
                <hr
                  style={{
                    width: "95%",
                    borderTop: "1px solid rgb(190, 190, 190)",
                  }}
                />

                <div
                  style={{
                    paddingRight: "10px",
                    paddingLeft: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {langState.referenceIntakeDisclaimer}
                </div>
              </>
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
                <Heading>{langState.Ingredients}</Heading>
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
              <Markup content={data?.richText?.ingredientsText} />
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
                <Heading>{langState.AllergyInformation}</Heading>
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
              <Markup content={data?.richText?.allergyInfoText} />
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
              <Markup content={data?.richText?.lEGALNOTICEText} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default TablePreview;

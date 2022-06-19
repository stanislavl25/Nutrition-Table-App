import { Banner, Card, Heading } from "@shopify/polaris";
import React, { useState } from "react";
import "../../assets/previewStyles.css";
import { Markup } from "interweave";
function TablePreview({ data, formValues, productToPrepare }) {
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
        <div className="table_header">
          <Heading>Nutrition Information</Heading>
        </div>
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
          <strong>A prepared portion is equivalent to 25 g</strong>
        </div>
        <table className="table_cont">
          <thead className="thead">
            <tr>
              <th scope="col" style={{ textAlign: "left" }}>
                Serving size
              </th>
              <th scope="col">Per 100 g</th>
              {productToPrepare ? (
                <th scope="col">
                  <p>
                    <strong>
                      Prepared <br />
                    </strong>
                    portion
                    <br /> 25 g
                  </p>
                </th>
              ) : (
                <></>
              )}
              <th scope="col" style={{ borderRight: "none" }}>
                % RI*
              </th>
            </tr>
          </thead>
          <tbody className="tbody">
            <tr>
              <th className="thtd" style={{ textAlign: "left" }}>
                <b>Energy</b>
              </th>
              <td className="thtd td">
                <div>
                  <div>{data && data.length ? data.energyKj : 0}</div>
                  <div>{data && data.length ? data.energyKcal : 0}</div>
                </div>
              </td>
              {productToPrepare ? (
                <td className="thtd td">
                  <div>
                    <div>{data && data.length ? data.energyKj : 0}</div>
                    <div>{data && data.length ? data.energyKcal : 0}</div>
                  </div>
                </td>
              ) : (
                <></>
              )}

              <td className="thtd td" style={{ borderRight: "none" }}>
                {data && data.length ? data.energyKcal : 8} %
              </td>
            </tr>

            {formValues ? (
              formValues.map((element, index) => (
                <tr key={index}>
                  <th
                    className="thtd"
                    scope="row"
                    style={{ textAlign: "left" }}
                  >
                    <b>{element.name}</b>
                  </th>
                  <td className="thtd td">{element.per100g || 0}</td>

                  {productToPrepare ? (
                    <td className="thtd td"> {element.perportion || 0}</td>
                  ) : (
                    <></>
                  )}
                  <td className="thtd td" style={{ borderRight: "none" }}>
                    {element.RI || 0} %
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
        <div className="small-info topBorderThick">
          <Markup content={data && data.length ? data.notesText : ""} />
        </div>
        <hr style={{ width: "100%", borderCollapse: "collapse" }} />
        <div className="Ingredients_container">
          <div className="topBorderThin thin-end">
            <Heading>Ingredients</Heading>
          </div>
          <hr style={{ width: "100%" }} />
          <Markup content={data && data.length ? data.ingredientsText : ""} />
        </div>
        <hr />
        <div className="Allergy_information thin-end">
          <div className="topBorderThin thin-end">
            <Heading>Allergy information</Heading>
          </div>
          <hr style={{ width: "100%" }} />
          <Markup content={data && data.length ? data.allergyInfoText : ""} />
        </div>
        <hr />
        <div className="LEGAL_NOTICE">
          <Markup content={data && data.length ? data.lEGALNOTICEText : ""} />
        </div>
      </div>
    </Card>
  );
}

export default TablePreview;

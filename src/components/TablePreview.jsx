import { Banner, Card, Heading } from "@shopify/polaris";
import React, { useState } from "react";
import "../assets/previewStyles.css";
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
        <header className="performance-facts__header">
          <Heading>Nutrition Information</Heading>
        </header>
        <table
          className="performance-facts__table"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <tbody>
            <tr
              style={{
                textAlign: "left",
                width: "100%",
              }}
            >
              <th>Serving size</th>
              <th>Per 100 g</th>
              {productToPrepare ? (
                <th>
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
              <th>% RI*</th>
            </tr>
            <tr>
              <th colSpan="2">
                <b>Energy</b>
              </th>
              <td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div>{data.energyKj || 0}</div>
                  <div>{data.energyKcal || 0}</div>
                </div>
              </td>
            </tr>

            {formValues ? (
              formValues.map((element, index) => (
                <tr key={index}>
                  <th colSpan="2">
                    <b>{element.name}</b>
                  </th>
                  <td>{element.per100g || 0}</td>
                  <td>{element.perportion || 0}</td>
                  <td>{element.RI || 0}</td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      <div className="small-info topBorderThick">
        <Markup content={data.notesText} />
      </div>
      <div className="Ingredients_container">
        <div className="topBorderThin thin-end">
          <Heading>Ingredients</Heading>
        </div>
        <Markup content={data.ingredientsText} />
      </div>
      <div className="Allergy_information thin-end">
        <div className="topBorderThin thin-end">
          <Heading>Allergy information</Heading>
        </div>
        <Markup content={data.allergyInfoText} />
      </div>
      <div className="LEGAL_NOTICE">
        <Markup content={data.lEGALNOTICEText} />
      </div>
    </Card>
  );
}

export default TablePreview;

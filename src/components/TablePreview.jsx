import { Banner, Card, Heading } from "@shopify/polaris";
import React, { useState } from "react";
import "../assets/previewStyles.css";
import { Markup } from "interweave";
function TablePreview({ data }) {
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
          <div className="performance-facts__header">
            <Heading>Nutrition Information</Heading>
          </div>
          <hr style={{ margin: "0" }} />
          {/* <h4>6 serving per container</h4> */}
          <div className="performance-facts_secondaryHeader">
            <h3>Serving size </h3>
            <h3>{data.servingSize || 0}</h3>
          </div>
        </header>
        <table className="performance-facts__table">
          <tbody>
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
            <tr>
              <th colSpan="2">
                <b>Fat</b>
              </th>
              <td>{data.fat || 0}</td>
            </tr>
            <tr>
              <th colSpan="2">
                <b>Of which Saturates</b>
              </th>
              <td>{data.fatSaturates || 0}</td>
            </tr>
            <tr>
              <th colSpan="2">
                <b>Carbohydrate</b>
              </th>
              <td>{data.carbs || 0}</td>
            </tr>
            <tr>
              <th colSpan="2">
                <b>Of which Sugars</b>
              </th>
              <td>{data.carbsSugars || 0}</td>
            </tr>
            <tr>
              <th colSpan="2">
                <b>Protein</b>
              </th>
              <td>{data.protein || 0}</td>
            </tr>
            <tr>
              <th colSpan="2">
                <b>Salt</b>
              </th>
              <td>{data.salt || 0}</td>
            </tr>
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

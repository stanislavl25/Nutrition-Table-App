import { Badge, Card, Heading, Page, Stack, TextStyle } from "@shopify/polaris";
import React from "react";

function PricinPlans() {
  return (
    <Page
      title="Plans and Pricing"
      // titleMetadata={}
    >
      <Badge status="info">Basic</Badge>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Card sectioned>
          <Heading>Basic plan</Heading>
          <p>No more than 999 products.</p>
          <div style={{ marginTop: "20px" }}>
            <p>
              <span
                style={{
                  fontSize: "32",
                  color: "#007F60",
                  fontWeight: "bolder",
                }}
              >
                5$
              </span>
              USD/month
            </p>
          </div>
        </Card>
        <Card sectioned>
          <Heading>Advanced plan</Heading>
          <p>No more than 999 products.</p>
        </Card>
        <Card sectioned>
          <Heading>Enterprise plan</Heading>
          <TextStyle variation="strong">Unlimited products.</TextStyle>
        </Card>
      </div>
    </Page>
  );
}

export default PricinPlans;

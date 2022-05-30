import {
  Badge,
  Button,
  Card,
  Heading,
  Page,
  Stack,
  TextStyle,
} from "@shopify/polaris";
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
        <Card>
          <Card.Section>
            <Heading>Basic plan</Heading>
            <p>No more than 999 products.</p>
            <div style={{ marginTop: "20px", width: "100%" }}>
              <p>
                <span
                  style={{
                    fontSize: "32px",
                    color: "#007F60",
                    fontWeight: "bolder",
                  }}
                >
                  $5
                </span>
                USD/month
              </p>
            </div>
            <div
              style={{ marginTop: "20px", width: "100%", textAlign: "center" }}
            >
              <Button size="large">Current Plan</Button>
            </div>
          </Card.Section>
          <Card.Section title="MAIN FEATURES"></Card.Section>
        </Card>
        <Card>
          <Card.Section>
            <Heading>Advanced plan</Heading>
            <p>No more than 999 products.</p>
            <div style={{ marginTop: "20px" }}>
              <p>
                <span
                  style={{
                    fontSize: "32px",
                    color: "#007F60",
                    fontWeight: "bolder",
                  }}
                >
                  $20
                </span>
                USD/month
              </p>
            </div>
            <div
              style={{ marginTop: "20px", width: "100%", textAlign: "center" }}
            >
              <Button size="large" primary>
                Upgrade
              </Button>
            </div>
          </Card.Section>
          <Card.Section title="MAIN FEATURES"></Card.Section>
        </Card>
        <Card>
          <Card.Section>
            <Heading>Enterprise plan</Heading>
            <TextStyle variation="strong">Unlimited products.</TextStyle>
            <div style={{ marginTop: "20px" }}>
              <p>
                <span
                  style={{
                    fontSize: "32px",
                    color: "#007F60",
                    fontWeight: "bolder",
                  }}
                >
                  $100
                </span>
                USD/month
              </p>
            </div>
            <div
              style={{ marginTop: "20px", width: "100%", textAlign: "center" }}
            >
              <Button size="large" primary>
                Upgrade
              </Button>
            </div>
          </Card.Section>
          <Card.Section title="MAIN FEATURES"></Card.Section>
        </Card>
      </div>
    </Page>
  );
}

export default PricinPlans;

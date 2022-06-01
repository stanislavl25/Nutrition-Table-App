import {
  Badge,
  Button,
  Card,
  Heading,
  Icon,
  Layout,
  Page,
  Stack,
  TextContainer,
  TextStyle,
} from "@shopify/polaris";
import { CircleTickMajor } from "@shopify/polaris-icons";
import React from "react";
import PricingPlanTable from "./PricingPlanTable";

function PricinPlans() {
  return (
    <Page
      title="Plans and Pricing"
      divider
      subtitle={<Badge status="info">Basic</Badge>}
    >
      <Layout>
        <Layout.Section oneThird>
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

                      textAlign: "center",
                    }}
                  >
                    $5
                  </span>
                  USD/month
                </p>
              </div>
              <div
                style={{
                  marginTop: "20px",
                }}
              >
                <Button size="large" fullWidth>
                  Current Plan
                </Button>
              </div>
            </Card.Section>
            <Card.Section title="MAIN FEATURES">
              <div style={{ marginTop: "10px" }}>
                <TextContainer>
                  <Stack wrap={false}>
                    <Icon source={CircleTickMajor} color="primary" />{" "}
                    <p>Basic Appearance Customization</p>
                  </Stack>
                  <Stack wrap={false}>
                    <Icon source={CircleTickMajor} color="primary" />{" "}
                    <p>Basic label data editing </p>
                  </Stack>
                  <Stack wrap={false}>
                    <Icon source={CircleTickMajor} color="primary" />{" "}
                    <p>European, American, and Canadian labels</p>
                  </Stack>
                  <Stack wrap={false}>
                    <Icon source={CircleTickMajor} color="primary" />{" "}
                    <p>Ingredients and Allergens list</p>
                  </Stack>
                  <Stack wrap={false}>
                    <Icon source={CircleTickMajor} color="primary" />{" "}
                    <p>Bulk edit products</p>
                  </Stack>
                  <Stack wrap={false}>
                    <Icon source={CircleTickMajor} color="primary" />{" "}
                    <p>Language settings</p>
                  </Stack>
                </TextContainer>
              </div>
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section oneThird>
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
                style={{
                  marginTop: "20px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Button size="large" primary fullWidth>
                  Upgrade
                </Button>
              </div>
            </Card.Section>
            <Card.Section title="MAIN FEATURES">
              <div style={{ marginTop: "10px" }}>
                <TextContainer>
                  <TextStyle variation="strong">
                    Everything included on Basic Plan.
                  </TextStyle>
                  <Stack wrap={false}>
                    <Icon source={CircleTickMajor} color="primary" />{" "}
                    <p>Advanced Appearance Customization</p>
                  </Stack>
                  <Stack wrap={false}>
                    <Icon source={CircleTickMajor} color="primary" />{" "}
                    <p>Advanced label data editing </p>
                  </Stack>
                  <Stack wrap={false}>
                    <Icon source={CircleTickMajor} color="primary" />{" "}
                    <p>Custom fields</p>
                  </Stack>
                  <Stack wrap={false}>
                    <Icon source={CircleTickMajor} color="primary" />{" "}
                    <p>Minerals & Vitamins</p>
                  </Stack>
                  <Stack wrap={false}>
                    <Icon source={CircleTickMajor} color="primary" />{" "}
                    <p>Automatic data calculation</p>
                  </Stack>
                </TextContainer>
              </div>
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section oneThird>
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
                style={{
                  marginTop: "20px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Button size="large" primary fullWidth>
                  Upgrade
                </Button>
              </div>
            </Card.Section>
            <Card.Section title="MAIN FEATURES">
              <div style={{ paddingBottom: "207px", marginTop: "10px" }}>
                <TextContainer>
                  <TextStyle variation="strong">
                    Everything included on Advanced Plan.
                  </TextStyle>
                  <Stack wrap={false}>
                    <Icon source={CircleTickMajor} color="primary" />{" "}
                    <p>Unlimited Products</p>
                  </Stack>
                </TextContainer>
              </div>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
      <PricingPlanTable />
    </Page>
  );
}

export default PricinPlans;

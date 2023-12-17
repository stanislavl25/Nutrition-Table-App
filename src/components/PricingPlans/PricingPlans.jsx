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

function PricinPlans({ plan, handlePlan }) {
  return (
    <Page
      title="Plans and Pricing"
      divider
      subtitle={<Badge status="info">{plan}</Badge>}
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
                    $10
                  </span>
                  USD/month
                </p>
              </div>
              <div
                style={{
                  marginTop: "20px",
                }}
              >
                {plan && plan === "Basic" ? (
                  <Button size="large" fullWidth>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    size="large"
                    primary
                    fullWidth
                    onClick={() => handlePlan("Basic")}
                  >
                    Downgrade Plan
                  </Button>
                )}
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
                    <p>
                      European, American, and Canadian <br /> labels
                    </p>
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
                    $25
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
                {plan && plan !== "Advanced" ? (
                  plan === "Enterprise" ? (
                    <Button
                      size="large"
                      primary
                      fullWidth
                      onClick={() => handlePlan("Advanced")}
                    >
                      Downgrade Plan
                    </Button>
                  ) : (
                    <Button
                      size="large"
                      primary
                      fullWidth
                      onClick={() => handlePlan("Advanced")}
                    >
                      Upgrade
                    </Button>
                  )
                ) : (
                  <Button size="large" fullWidth>
                    Current Plan
                  </Button>
                )}
              </div>
            </Card.Section>
            <Card.Section title="MAIN FEATURES">
              <div style={{ marginTop: "10px", paddingBottom: "18px" }}>
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
                {plan && plan === "Enterprise" ? (
                  <Button size="large" fullWidth>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    size="large"
                    primary
                    fullWidth
                    onClick={() => handlePlan("Enterprise")}
                  >
                    Upgrade
                  </Button>
                )}
              </div>
            </Card.Section>
            <Card.Section title="MAIN FEATURES">
              <div style={{ paddingBottom: "225px", marginTop: "10px" }}>
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

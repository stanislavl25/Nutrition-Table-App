import React from "react";
import {
  Card,
  TextStyle,
  TextField,
  Stack,
  Tooltip,
  Link,
  Icon,
} from "@shopify/polaris";
import { CircleInformationMajor } from "@shopify/polaris-icons";
function CalsEnergyInfos() {
  return (
    <div style={{ marginTop: "20px" }}>
      <Card title="Calories/Energy Information" sectioned>
        <TextStyle variation="subdued">
          You only need to enter the calories information in KJ or Kcal, we will
          calculate the rest.
        </TextStyle>
        <div style={{ marginTop: "10px" }}>
          <Stack distribution="fillEvenly">
            <TextField label="Energy (KJ) per 100 g" value="ea" />
            <TextField label="Energy (KJ) per 25 g" value="ea" />
          </Stack>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Stack distribution="fillEvenly">
            <TextField label="Energy (Kcal) per 100 g" value="ea" />
            <TextField label="Energy (Kcal) per 25 g" value="ea" />
          </Stack>
        </div>
        <div style={{ marginTop: "10px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "start",
            }}
          >
            <TextField label="% RI* Recommended intake" value="8" />
            <Tooltip
              dismissOnMouseOut
              content={
                <p>
                  The RI* percentage is automatically calculated based on your
                  country standard %RI*: you can still edit these valueson{" "}
                  <a href="#" style={{ textDecoration: "none" }}>
                    the Recommended Intake page
                  </a>
                  .
                </p>
              }
            >
              <Icon source={CircleInformationMajor} color="base" />
            </Tooltip>
          </div>
        </div>
        <div>
          <div></div>
        </div>
      </Card>
    </div>
  );
}

export default CalsEnergyInfos;

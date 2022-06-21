import React from "react";
import {
  Card,
  TextStyle,
  TextField,
  Stack,
  Tooltip,
  Icon,
} from "@shopify/polaris";
import { CircleInformationMajor } from "@shopify/polaris-icons";
function CalsEnergyInfos({ data, handleChange }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <Card title="Calories/Energy Information" sectioned>
        <TextStyle variation="subdued">
          You only need to enter the calories information in KJ or Kcal, we will
          calculate the rest.
        </TextStyle>
        <div style={{ marginTop: "10px" }}>
          <Stack distribution="fillEvenly">
            <TextField
              label="Energy (KJ) per 100 g"
              value={data?.calsEnergyInfo?.energyKj100}
              onChange={(e) => {
                handleChange(e, "calsEnergyInfo", "energyKj100");
              }}
            />
            <TextField
              label="Energy (KJ) per 25 g"
              value={data?.calsEnergyInfo?.energyKj25}
              onChange={(e) => {
                handleChange(e, "calsEnergyInfo", "energyKj25");
              }}
            />
          </Stack>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Stack distribution="fillEvenly">
            <TextField
              label="Energy (Kcal) per 100 g"
              value={data?.calsEnergyInfo?.energyKcal100}
              onChange={(e) => {
                handleChange(e, "calsEnergyInfo", "energyKcal100");
              }}
            />
            <TextField
              label="Energy (Kcal) per 25 g"
              value={data?.calsEnergyInfo?.energyKcal25}
              onChange={(e) => {
                handleChange(e, "calsEnergyInfo", "energyKcal25");
              }}
            />
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
            <TextField
              label="% RI* Recommended intake"
              value={data?.calsEnergyInfo?.Ri}
              onChange={(e) => {
                handleChange(e, "calsEnergyInfo", "Ri");
              }}
            />
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

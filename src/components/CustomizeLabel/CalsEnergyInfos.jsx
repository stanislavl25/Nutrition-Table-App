import React, { useEffect } from "react";
import {
  Card,
  TextStyle,
  TextField,
  Stack,
  Tooltip,
  Icon,
} from "@shopify/polaris";
import { CircleInformationMajor } from "@shopify/polaris-icons";
function CalsEnergyInfos({ data, handleChange, energyKj100, langState }) {
  const handleAutoCalculs = () => {
    const division =
      data?.servingSize.EU.DefaultAmount / data?.servingSize.EU.PortionSize;
    const newEnergyKj25 = data.calsEnergyInfo.energyKj100 / division;
    const newEnergyKcal100 = data.calsEnergyInfo.energyKj100 / 4.184;
    const newEnergyKcal25 = newEnergyKcal100 / division;
    handleChange(
      Math.floor(newEnergyKj25).toString(),
      "calsEnergyInfo",
      "energyKj25"
    );
    handleChange(
      Math.floor(newEnergyKcal25).toString(),
      "calsEnergyInfo",
      "energyKcal25"
    );
    handleChange(
      Math.floor(newEnergyKcal100).toString(),
      "calsEnergyInfo",
      "energyKcal100"
    );
  };
  useEffect(() => {
    let isSubscribed = true;
    handleAutoCalculs();
    return () => (isSubscribed = false);
  }, [energyKj100, data?.servingSize.EU.PortionSize]);
  useEffect(() => {
    let isSubscribed = true;
    handleAutoCalculs();
    return () => (isSubscribed = false);
  }, []);

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
              label={`${langState.energy} (KJ) per ${
                data?.servingSize.EU.DefaultAmount
              } ${
                data?.servingSize.EU.DefaultAmountUnit === "Grams" ? "g" : "mg"
              }`}
              value={data?.calsEnergyInfo?.energyKj100}
              onChange={(e) => {
                handleChange(e, "calsEnergyInfo", "energyKj100");
              }}
              type="number"
            />
            <TextField
              label={`${langState.energy} (KJ) per ${
                data?.servingSize.EU.PortionSize
              } ${
                data?.servingSize.EU.PortionSizeUnit === "Grams" ? "g" : "mg"
              }`}
              value={data?.calsEnergyInfo?.energyKj25}
              onChange={(e) => {
                handleChange(e, "calsEnergyInfo", "energyKj25");
              }}
              type="number"
            />
          </Stack>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Stack distribution="fillEvenly">
            <TextField
              label={`${langState.energy} (Kcal) per ${
                data?.servingSize.EU.DefaultAmount
              } ${
                data?.servingSize.EU.DefaultAmountUnit === "Grams" ? "g" : "mg"
              }`}
              value={data?.calsEnergyInfo?.energyKcal100}
              onChange={(e) => {
                handleChange(e, "calsEnergyInfo", "energyKcal100");
              }}
              type="number"
            />
            <TextField
              label={`${langState.energy} (Kcal) per ${
                data?.servingSize.EU.PortionSize
              } ${
                data?.servingSize.EU.PortionSizeUnit === "Grams" ? "g" : "mg"
              }`}
              value={data?.calsEnergyInfo?.energyKcal25}
              onChange={(e) => {
                handleChange(e, "calsEnergyInfo", "energyKcal25");
              }}
              type="number"
            />
          </Stack>
        </div>
        <div style={{ marginTop: "10px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
              position: "relative",
            }}
          >
            <div>
              <TextField
                label="% RI* Recommended intake"
                value={data?.calsEnergyInfo?.Ri}
                onChange={(e) => {
                  handleChange(e, "calsEnergyInfo", "Ri");
                }}
                type="number"
              />
            </div>
            <div style={{ position: "absolute", marginLeft: "178px" }}>
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
        </div>
        <div>
          <div></div>
        </div>
      </Card>
    </div>
  );
}

export default CalsEnergyInfos;

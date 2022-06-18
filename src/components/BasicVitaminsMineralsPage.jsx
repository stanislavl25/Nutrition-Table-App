import {
  Button,
  Card,
  Select,
  Stack,
  TextField,
  TextStyle,
  Heading,
} from "@shopify/polaris";
import React from "react";
import star from "../assets/nta_star_for_plan_banner.png";

const formLables = ["Name", "Per 100 g", "Per portion 25 g", "Unit"];
function BasicVitaminsMineralsPage({ handleTabChange }) {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          zIndex: "1000000000000000000000",
          alignSelf: "center",
          width: "60%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <img
            src={star}
            alt=""
            style={{
              width: "40px",
              height: "40px",
            }}
          />
        </div>
        <div style={{ display: "block", marginLeft: "5px" }}>
          <TextStyle>
            Customize your Label, add Vitamins and Minerals, and more!
          </TextStyle>
        </div>
        <div style={{ display: "block" }}>
          <TextStyle variation="strong">
            Take advantage of the priceless benefits of the Advanced Plan.
          </TextStyle>
        </div>
        <div>
          <Button
            primary
            onClick={() => {
              handleTabChange(5);
            }}
          >
            Get the Advanced plan
          </Button>
        </div>
      </div>
      <div
        style={{
          filter: "blur(2px)",
          marginBottom: "20px",
          zIndex: "1",
          position: "relative",
        }}
      >
        <Card>
          <Card.Section>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Heading>Vitamins</Heading>
              <Button primary>Add</Button>
            </div>
            <Stack wrap={false}>
              {formLables.map((name, index) => (
                <label style={{ marginRight: "80px" }} key={index}>
                  {name}
                </label>
              ))}
            </Stack>
            <Stack wrap={false}>
              <Stack.Item fill>
                <TextField placeholder="Vitamin C" readOnly={true} />
              </Stack.Item>
              <Stack.Item fill>
                <TextField placeholder="2" readOnly={true} />
              </Stack.Item>
              <Stack.Item fill>
                <TextField placeholder="1" readOnly={true} />
              </Stack.Item>
              <Stack.Item>
                <Select
                  placeholder="Grams"
                  options={[
                    { label: "Grams", value: "Grams" },
                    { label: "Milligrams", value: "Milligrams" },
                  ]}
                  readOnly={true}
                  disabled
                />
              </Stack.Item>
              <Button>More</Button>
            </Stack>
          </Card.Section>
          <Card.Section>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Heading>Minerals</Heading>
              <Button primary>Add</Button>
            </div>
            <Stack wrap={false}>
              {formLables.map((name, index) => (
                <label style={{ marginRight: "80px" }} key={index}>
                  {name}
                </label>
              ))}
            </Stack>
            <Stack wrap={false}>
              <Stack.Item fill>
                <TextField placeholder="Vitamin C" readOnly={true} />
              </Stack.Item>
              <Stack.Item fill>
                <TextField placeholder="2" readOnly={true} />
              </Stack.Item>
              <Stack.Item fill>
                <TextField placeholder="1" readOnly={true} />
              </Stack.Item>
              <Stack.Item>
                <Select
                  placeholder="Milligrams"
                  options={[
                    { label: "Grams", value: "Grams" },
                    { label: "Milligrams", value: "Milligrams" },
                  ]}
                  readOnly={true}
                  disabled
                />
              </Stack.Item>
              <Button>More</Button>
            </Stack>
          </Card.Section>
        </Card>
      </div>
    </div>
  );
}

export default BasicVitaminsMineralsPage;

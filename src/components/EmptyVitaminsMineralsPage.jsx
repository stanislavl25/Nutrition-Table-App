import {
  Button,
  Card,
  Select,
  Stack,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import React from "react";
import star from "../assets/nta_star_for_plan_banner.png";

const formLables = ["Name", "Per 100 g", "Per portion 25 g", "Unit"];
function EmptyVitaminsMineralsPage() {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: "1000000000000000",
          display: "flex",
        }}
      >
        <div
          style={{
            marginLeft: "120px",
            marginTop: "80px",
          }}
        >
          <div style={{ marginLeft: "160px" }}>
            <img
              src={star}
              alt=""
              style={{
                width: "40px",
                height: "40px",
                marginRight: "4px",
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
          <div style={{ marginLeft: "100px", marginTop: "10px" }}>
            <Button primary>Get the Advanced plan</Button>
          </div>
        </div>
      </div>
      <div
        style={{
          opacity: ".5",
          filter: "alpha(opacity=50)",
          marginBottom: "20px",
        }}
      >
        <Card>
          <Card.Section
            title="Vitamins"
            actions={[
              {
                content: (
                  <>
                    <Button primary>Add</Button>
                  </>
                ),
              },
            ]}
          >
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
          <Card.Section
            title="Minerals"
            actions={[
              {
                content: (
                  <>
                    <Button primary>Add</Button>
                  </>
                ),
              },
            ]}
          >
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

export default EmptyVitaminsMineralsPage;
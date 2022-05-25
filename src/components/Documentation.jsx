import {
  Button,
  Card,
  DataTable,
  FormLayout,
  List,
  Page,
  Popover,
  Select,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";

function Documentation() {
  return (
    <Page title="How to use">
      <Card title="Theme Installation steps" sectioned>
        <TextContainer>
          <p>
            {" "}
            Duis luctus nibh quis lorem ullamcorper faucibus. Vivamus molestie
            dolor id cursus ultrices. Pellentesque vitae turpis ac lectus cursus
            auctor. Maecenas massa mauris, ultrices quis semper et.
          </p>
          <p>
            {" "}
            Pellentesque vitae turpis ac lectus cursus auctor. Maecenas massa
            mauris, ultrices quis semper et.
          </p>
        </TextContainer>
      </Card>
      <Card title="Label creation steps" sectioned>
        <TextContainer spacing="loose">
          <p>
            {" "}
            Duis luctus nibh quis lorem ullamcorper faucibus. Vivamus molestie
            dolor id cursus ultrices. Pellentesque vitae turpis ac lectus cursus
            auctor. Maecenas massa mauris, ultrices quis semper et.
          </p>
          <p>
            {" "}
            Pellentesque vitae turpis ac lectus cursus auctor. Maecenas massa
            mauris, ultrices quis semper et.
          </p>
        </TextContainer>
        <div style={{ marginTop: "10px" }}>
          <List type="number">
            <TextContainer spacing="loose">
              <List.Item>
                Pellentesque vitae turpis ac lectus cursus auctor.
              </List.Item>
              <List.Item>Maecenas massa mauris.</List.Item>
              <List.Item>Pellentesque vitae turpis.</List.Item>
              <List.Item>
                Pellentesque vitae turpis ac lectus cursus auctor.
              </List.Item>
            </TextContainer>
          </List>
        </div>
      </Card>
    </Page>
  );
}

export default Documentation;

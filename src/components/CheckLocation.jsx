import { Button, Card } from "@shopify/polaris";
import React, { useState } from "react";

function CheckLocation({ handleLocation }) {
  return (
    <Card>
      <Button onClick={() => handleLocation("EU")}>EU</Button>
      <Button onClick={() => handleLocation("CA")}>CA</Button>
      <Button onClick={() => handleLocation("NA")}>NA</Button>
    </Card>
  );
}

export default CheckLocation;

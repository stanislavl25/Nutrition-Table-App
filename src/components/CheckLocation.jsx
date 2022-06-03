import { Button, Card } from "@shopify/polaris";
import React, { useState } from "react";

function CheckLocation({ handleLocation, handlePlan }) {
  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <Button onClick={() => handleLocation("EU")}>EU</Button>
        <Button onClick={() => handleLocation("CA")}>CA</Button>
        <Button onClick={() => handleLocation("NA")}>NA</Button>
        <Button onClick={() => handlePlan("Basic")}>Basic</Button>
        <Button onClick={() => handlePlan("Advanced")}>Advanced</Button>
        <Button onClick={() => handlePlan("Entreprise")}>Entreprise</Button>
      </div>
    </Card>
  );
}

export default CheckLocation;

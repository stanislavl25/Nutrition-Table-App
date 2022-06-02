import { Button, Card } from "@shopify/polaris";
import React, { useState } from "react";

function CheckLocation() {
  const [location, setLocation] = useState({
    country: "",
    region: "",
  });

  const getLocation = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    await fetch(
      "https://country-list-js.npm.now.sh/?method=findByIso2&code=DK",
      {
        headers: myHeaders,
        mode: "no-cors",
      }
    )
      .then((res) => console.log(res))
      .then((o) => {
        console.log(o); // will show Denmark
      })
      .catch((err) => console.log(err));
  };
  return (
    <Card>
      <Button onClick={() => getLocation()}>get location</Button>
    </Card>
  );
}

export default CheckLocation;

import React, { useCallback, useEffect, useState } from "react";
import { Card, Page, Tabs } from "@shopify/polaris";
import { Toast, useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";
import { SubscriptionPage } from "./SubscriptionPage";
import { ProductsManagement } from "./ProductsManagement";
import { BulkProductManagement } from "./BulkProductManagement";
import MyLables from "./MyLables";
import LanguagePage from "./Language";
import CreateLabel from "./CreateLabel";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div sx={{ p: 3 }}>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabsPage({ host, shop }) {
  console.log(host);
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  // const [value, setValue] = React.useState(0);
  const [snack, setSnack] = useState({ open: false, message: "" });
  const [langState, setLangState] = useState({
    values: {},
    checked: {},
  });
  const [selected, setSelected] = useState(0);
  const [selectedData, setSelectedData] = useState(["d", "s"]);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
  //   const handleTabChangeTest=(n)=>{
  // setSelected(n)
  //   }
  /**
   * get language page data from server
   */
  const fetchLang = async () => {
    const data = await fetch("/LangData")
      .then((res) => res.json())
      .then((response) => {
        // console.log(response);
        if (response.success && response.data.values !== undefined) {
          // console.log(response.data[0]);
          const data = response.data[0];
          setLangState((langState) => ({
            ...langState,
            values: data,
            checked: data,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchLang();
  }, []);

  /**
   * Handle tab change
   *
   * @param {*}
   */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchLangChanges = async (name, value) => {
    const formValues = { name, value };
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    };
    if (langState.checked[name] !== value) {
      const data = await fetch("/LangFieldsSave", fetchOptions)
        .then((res) => res.json())
        .then((messages) => {
          console.log(messages);
          fetchLang();
          // handleSnackToggle(messages.message);
        })
        .catch((err) => {
          console.log(err);
          // handleSnackToggle("Something wrong happend!");
        });
    }
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack((snack) => ({ open: false }));
  };

  const handleSnackToggle = (message) => {
    setSnack((snack) => ({ open: !snack.open, message: message || "" }));
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const LangPage = (
    <LanguagePage
      langState={langState}
      setLangState={setLangState}
      fetchLang={fetchLangChanges}
    />
  );
  const tabs = [
    {
      id: "My Lables",
      content: "My Lables",
      tab: <MyLables handleTabChange={handleTabChange} />,
    },
    {
      id: "Create Label",
      content: "Create Label",
      tab: <CreateLabel langState={langState} />,
    },
    {
      id: "Language",
      content: "Language",
      tab: LangPage,
    },
  ];

  return (
    <div>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section>{tabs[selected].tab}</Card.Section>
      </Tabs>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snack.open}
        onClose={handleSnackToggle}
        message={snack.message}
        autoHideDuration={4000}
        action={action}
      />
    </div>
  );
}

export default TabsPage;

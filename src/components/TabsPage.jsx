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
const formData = [
  {
    name: "Fat",
    per100g: "9.2",
    perportion: "8",
    unit: "Grams",
    bold: "No",
    leftSpacing: "0",
    order: "",
    RI: "10",
  },
  {
    name: "Of which Saturates",
    per100g: "5.6",
    perportion: "3.7",
    unit: "Grams",
    bold: "Yes",
    leftSpacing: "0",
    order: "",
    RI: "10",
  },
  {
    name: "Carbohydrate",
    per100g: "46",
    perportion: "9",
    unit: "Grams",
    bold: "Yes",
    leftSpacing: "0",
    order: "",
    RI: "10",
  },
  {
    name: "Of which Sugars",
    per100g: "21",
    perportion: "8",
    unit: "Grams",
    bold: "Yes",
    leftSpacing: "0",
    order: "",
    RI: "10",
  },
  {
    name: "Protein",
    per100g: "5.0",
    perportion: "2.7",
    unit: "Grams",
    bold: "Yes",
    leftSpacing: "0",
    order: "",
    RI: "10",
  },
  {
    name: "Salt",
    per100g: "0.2",
    perportion: "0.11",
    unit: "Grams",
    bold: "Yes",
    leftSpacing: "0",
    order: "",
    RI: "10",
  },
];

const formDataCA_NA = [
  {
    name: "Fat / Lipides",
    quantity: "0",
    Unit: "Grams",
    dailyValue: "0",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "Saturated / saturés",
    quantity: "0",
    Unit: "Grams",
    dailyValue: "0",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "+ Trans / trans",
    quantity: "0",
    Unit: "Grams",
    dailyValue: "",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "Carbohydrate / Glucid",
    quantity: "26",
    Unit: "Grams",
    dailyValue: "",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "Fibre & Fibres",
    quantity: "0",
    Unit: "Grams",
    dailyValue: "0",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "Sugars / sucres",
    quantity: "22",
    Unit: "Grams",
    dailyValue: "22",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "Protein / Protéines",
    quantity: "2",
    Unit: "Grams",
    dailyValue: "",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "Cholesterol / Cholest",
    quantity: "0",
    Unit: "Grams",
    dailyValue: "",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
  {
    name: "Sodium",
    quantity: "0",
    Unit: "Grams",
    dailyValue: "0",
    bold: "Yes",
    order: "",
    leftSpacing: "",
    preparedProduct: "5",
  },
];
const order = formData.length;
const newFormSet = {
  name: "",
  per100g: "",
  perportion: "",
  unit: "Grams",
  bold: "Yes",
  leftSpacing: "0",
  order: order,
};
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
      tab: (
        <CreateLabel
          langState={langState}
          formData={formData}
          newFormSet={newFormSet}
          formDataCA_NA={formDataCA_NA}
        />
      ),
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

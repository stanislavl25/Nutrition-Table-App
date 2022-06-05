import React, { useCallback, useEffect, useState } from "react";
import { Card, Page, Tabs } from "@shopify/polaris";
import { Toast, useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";
import { SubscriptionPage } from "./SubscriptionPage";
import { ProductsManagement } from "./ProductsManagement";
import { BulkProductManagement } from "./BulkProductManagement";
import MyLables from "./MyLables";
import Translations from "./Translations";
import CreateLabel from "./CreateLabel";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RecommendedIntake from "./RecommendedIntake";
import PricinPlans from "./PricingPlans";
import PropTypes from "prop-types";
import Documentation from "./Documentation";

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
const formDataEU = [
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
const formDataNA = [
  {
    name: "Total Fat",
    quantity: "8",
    unit: "Grams",
    dailyValue: "10",
    bold: "Yes",
    order: "",
    leftSpacing: "",
  },
  {
    name: "Saturated Fat",
    quantity: "1",
    unit: "Grams",
    dailyValue: "5",
    bold: "No",
    order: "",
    leftSpacing: "1",
  },
  {
    name: "Trans Fat",
    quantity: "0",
    unit: "MilliGrams",
    dailyValue: "",
    bold: "No",
    order: "",
    leftSpacing: "1",
  },
  {
    name: "Cholesterol",
    quantity: "0",
    unit: "MilliGrams",
    dailyValue: "0",
    bold: "No",
    order: "",
    leftSpacing: "",
  },
  {
    name: "Sodium ",
    quantity: "160",
    unit: "Milligrams",
    dailyValue: "7",
    bold: "No",
    order: "",
    leftSpacing: "",
  },
  {
    name: "Total Carbohydrate",
    quantity: "37",
    unit: "Grams",
    dailyValue: "13",
    bold: "No",
    order: "",
    leftSpacing: "",
  },
  {
    name: "Dietary Fiber",
    quantity: "4",
    unit: "Grams",
    dailyValue: "14",
    bold: "No",
    order: "",
    leftSpacing: "1",
  },
  {
    name: "Total Sugars",
    quantity: "12",
    unit: "Grams",
    dailyValue: "",
    bold: "No",
    order: "",
    leftSpacing: "",
  },
  {
    name: "Includes Added Sugars",
    quantity: "10",
    unit: "Grams",
    dailyValue: "20",
    bold: "No",
    order: "",
    leftSpacing: "2",
  },
  {
    name: "Protein",
    quantity: "3",
    unit: "Grams",
    dailyValue: "10",
    bold: "Yes",
    order: "",
    leftSpacing: "",
  },
];
const formDataCA = [
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
const order = formDataCA.length;
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
  const [location, setLocation] = useState("NA");
  const [formData, setFormData] = useState([]);
  //   const handleTabChangeTest=(n)=>{
  // setSelected(n)
  //   }
  /**
   * get language page data from server
   */
  const checkLocation = () => {
    if (location === "CA") setFormData(formDataCA);
    if (location === "NA") setFormData(formDataNA);
    if (location === "EU") setFormData(formDataEU);
  };
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
    checkLocation();
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
  const TranslationsPage = (
    <Translations
      langState={langState}
      setLangState={setLangState}
      fetchLang={fetchLangChanges}
    />
  );
  const tabs = [
    {
      id: "Prodcuts",
      content: "Prodcuts",
      tab: <MyLables handleTabChange={handleTabChange} />,
    },
    {
      id: "Customize Label",
      content: "Customize Label",
      tab: (
        <CreateLabel
          langState={langState}
          newFormSet={newFormSet}
          formData={formData}
          location={location}
          setLocation={setLocation}
        />
      ),
    },
    {
      id: "Recommended Intake",
      content: "Recommended Intake",
      tab: <RecommendedIntake />,
    },
    {
      id: "Translations",
      content: "Translations",
      tab: TranslationsPage,
    },
    {
      id: "Documentation",
      content: "Documentation",
      tab: <Documentation />,
    },
    {
      id: "PricinPlans",
      content: "Pricing Plans",
      tab: <PricinPlans />,
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

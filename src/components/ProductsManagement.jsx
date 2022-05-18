import React, { useEffect, useState } from "react";
import { Toast, useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import CustomFieldPage from "./CustomFieldsPage";

function Row(props) {
  const { row, customFields, setCustomFields, clicked, handleSave } = props;
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState(row);
  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    // console.log(values);
  };

  // todo check use effect state
  useEffect(() => {
    // if (clicked) {
    // }
    handleSave(values);
  }, [clicked]);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="right">
          <input
            style={{ width: "60px", height: "30px" }}
            placeholder={row.cals}
            // value={row.cals || ""}
            // defaultValue={row.cals || ""}
            name="cals"
            onChange={handleChange}
            type="number"
            min={0}
          />
        </TableCell>
        <TableCell align="right">
          <input
            style={{ width: "60px", height: "30px" }}
            placeholder={row.fat}
            name="fat"
            onChange={handleChange}
            type="number"
            min={0}
          />
        </TableCell>
        <TableCell align="right">
          <input
            // value={row.cals}
            style={{ width: "60px", height: "30px" }}
            placeholder={row.satfat}
            name="satfat"
            onChange={handleChange}
            type="number"
            min={0}
          />
        </TableCell>
        <TableCell align="right">
          <input
            style={{ width: "60px", height: "30px" }}
            placeholder={row.transfat}
            name="transfat"
            onChange={handleChange}
            type="number"
            min={0}
          />
        </TableCell>
        <TableCell align="right">
          <input
            style={{ width: "60px", height: "30px" }}
            placeholder={row.carbs}
            name="carbs"
            onChange={handleChange}
            type="number"
            min={0}
          />
        </TableCell>
        <TableCell align="right">
          <input
            style={{ width: "60px", height: "30px" }}
            placeholder={row.sugars}
            name="sugars"
            onChange={handleChange}
            type="number"
            min={0}
          />
        </TableCell>
        <TableCell align="right">
          <input
            style={{ width: "60px", height: "30px" }}
            placeholder={row.protein}
            name="protein"
            onChange={handleChange}
            type="number"
            min={0}
          />
        </TableCell>
        <TableCell align="right">
          <input
            style={{ width: "60px", height: "30px" }}
            placeholder={row.salt}
            name="salt"
            onChange={handleChange}
            type="number"
            min={0}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <Typography style={{ color: "#8997a7" }}>Custom Fields</Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {customFields && customFields.success ? (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: "50%" }}>Title</TableCell>
                      <TableCell style={{ width: "50%" }}>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customFields.data.map((field) => (
                      <TableRow key={field.id}>
                        <TableCell>{field.title}</TableCell>
                        <TableCell align="right">{field.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography>No custom fields to review</Typography>
              )}
              <div>
                <Button
                  style={{
                    paddingBottom: "8px",
                    marginLeft: "4px",
                    textTransform: "none",
                  }}
                  variant="contained"
                  // onClick={() => {
                  //   window.push(<CustomFieldPage productId={row.id} />);
                  // }}
                >
                  Add/Edit
                </Button>
              </div>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const mendatoryData = [
  "cals",
  "fat",
  "satfat",
  "transfat",
  "carbs",
  "sugars",
  "protein",
  "salt",
];

export function ProductsManagement() {
  const [productobj, setProductobj] = useState();
  const [customFields, setCustomFields] = useState();
  const [clicked, setClicked] = useState(false);
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  const fetchCostumFields = async () => {
    const data = await fetch("/costum-fields").then((res) => res.json());
    if (data.success) {
      setCustomFields(data);
    }
    console.log(data);
  };

  const fetchProducts = async () => {
    const data = await fetch("/products-list").then((res) => res.json());

    if (data.length) {
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < mendatoryData.length; j++) {
          data[i][mendatoryData[j]] = 0;
        }
      }
      setProductobj(data);
    } else {
      //Todo
      console.log("No products found!");
    }
    // console.log(data);
    // const fetchOptions = {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name: "pro" }),
    // };

    // const data = await fetch("/addCustomFields", fetchOptions)
    //   .then((res) => res.json())
    //   .then((messages) => {
    //     (response) => console.log(response);
    //   });
    // const data = await fetch("/createPlan", fetchOptions)
    //   .then(
    //     (res) => res.json()
    //     // console.log(res.json())
    //   )
    //   .then((messages) => {
    //     console.log(messages);
    //   });
  };

  useEffect(() => {
    fetchCostumFields();
    fetchProducts();
  }, []);

  const handleSave = async (data) => {
    // console.log(data);
    setClicked(false);

    // Todo check state
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          justifyContent: "flex-end",
          display: "flex",
          marginBottom: "14px",
        }}
      >
        <Button
          style={{ position: "fixed", right: "110px", top: "60px" }}
          onClick={() => {
            setClicked(true);
            console.log("clicked");
          }}
          variant="contained"
        >
          Edit
        </Button>
        <Button
          style={{
            position: "fixed",
            right: "30px",
            top: "60px",
          }}
          variant="contained"
          onClick={() => {
            setClicked(true);
            console.log("clicked");
          }}
        >
          Save
        </Button>
      </div>
      {productobj ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Products</TableCell>
                <TableCell align="right">Cals&nbsp;(kcal)</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Sat fat&nbsp;(g)</TableCell>
                <TableCell align="right">Trans fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Sugars&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                <TableCell align="right">Salt&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productobj.map((row) => (
                <Row
                  key={row.id}
                  row={row}
                  setCustomFields={setCustomFields}
                  customFields={customFields}
                  clicked={clicked}
                  handleSave={handleSave}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CircularProgress
          style={{
            marginTop: "80px",
            marginBottom: "80px",
          }}
        />
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Toast, useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "title", headerName: "title", width: 150 },
  // { field: "g/Cal/kCal", headerName: "g/Cal/kCal", width: 150 },
];

export function BulkProductManagement() {
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const [productobj, setProductobj] = useState();
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [type, setType] = React.useState("");
  const [types, setTypes] = useState();

  const updateProductobj = async () => {
    const data = await fetch("/products-list").then((res) => res.json());
    setProductobj(data);
    let arr = [];
    if (data) {
      for (var i = 0; i < data.length; i++) {
        arr.push(data[i].product_type);
      }
      let uniqueTypes = [...new Set(arr)];
      setTypes(uniqueTypes);
    }
  };

  useEffect(() => {
    updateProductobj();
  }, []);

  const handleSelect_Bytype = (value) => {
    let result = [];
    for (var i = 0; i < productobj.length; i++) {
      if (value === productobj[i].product_type) {
        result.push(productobj[i].id);
      }
    }
    setSelectionModel(result);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
    handleSelect_Bytype(event.target.value);
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {types && types.length ? (
        <FormControl style={{ width: "300px" }}>
          <InputLabel>Type</InputLabel>
          <Select value={type} label="Type" onChange={handleTypeChange}>
            {types.map((product_type) => (
              <MenuItem value={product_type} key={product_type}>
                {product_type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <></>
      )}
      <Button
        variant="contained"
        style={{
          margin: "4px",
          // position: "fixed",
          // right: "110px",
          // top: "60px",
        }}
      >
        Bulk Save
      </Button>
      {productobj ? (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={productobj}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
          />
        </div>
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

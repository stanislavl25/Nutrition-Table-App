import {
  ActionList,
  Button,
  Card,
  Filters,
  IndexTable,
  Select,
  Spinner,
  TextField,
  TextStyle,
  Thumbnail,
  useIndexResourceState,
  Stack,
  FormLayout,
  Popover,
  ChoiceList,
  RangeSlider,
} from "@shopify/polaris";
import { Toast, useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";
import React, { useCallback, useState } from "react";

const PopOverElem = ({ index, productId, removeFormFields }) => {
  const [popoverActive, setPopoverActive] = useState(false);
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );
  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      More
    </Button>
  );
  const handleProductRemove = async () => {
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    };
    removeFormFields(index);
    console.log(productId, index);
    const data = await fetch("/product_delete", fetchOptions)
      .then((res) => res.text())
      .then((messages) => {
        console.log(messages);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ marginLeft: "15px" }}>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
        sectioned
        autofocusTarget="none"
        ariaHaspopup={false}
      >
        <FormLayout>
          <Button plain destructive onClick={handleProductRemove}>
            Delete Label
          </Button>
        </FormLayout>
      </Popover>
    </div>
  );
};

function MyLablesTable({
  products,
  setProductobj,
  handleSelectedProducts,
  categories,
  handleEditProduct,
}) {
  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);
  const [taggedWith, setTaggedWith] = useState("");
  const [queryValue, setQueryValue] = useState(null);
  const [sortValue, setSortValue] = useState("");

  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);

  const handleSortChange = useCallback((value) => {
    setSortValue(value);
    selectedResources.splice(0, selectedResources.length);
    for (var i = 0; i < products.length; i++) {
      if (products[i].product_type === value) {
        selectedResources.push(products[i]._id);
      }
    }
  }, []);
  let removeFormFields = (i) => {
    let newproductsValues = [...products];
    newproductsValues.splice(i, 1);
    setProductobj(newproductsValues);
  };

  const filters = [];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
        {
          key: "taggedWith",
          label: disambiguateLabel("taggedWith", taggedWith),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : [];

  const handleBulkDelete = () => {
    products.forEach((element, index) => {
      console.log(selectedResources.includes(element.id));
      if (selectedResources.includes(element.id)) {
        removeFormFields(index);
      }
    });
  };
  const categorieOptions = categories;
  const bulkActions = [];
  const promotedBulkActions = [
    {
      content: "Edit Labels",
      onAction: () => handleSelectedProducts(selectedResources),
    },
    {
      title: "More actions",
      actions: [
        {
          content: (
            <div style={{ width: "164px" }}>
              <TextStyle variation="negative">Delete</TextStyle>
            </div>
          ),
          onAction: () => handleBulkDelete(),
        },
      ],
    },
  ];
  const rowMarkup =
    products !== "none" ? (
      products.map(
        (
          {
            _id,
            name,
            Calories,
            totalFat,
            Carbohydrate,
            Protein,
            Salt,
            food_product,
            images,
          },
          index
        ) => (
          <IndexTable.Row
            id={_id}
            key={_id}
            selected={selectedResources.includes(_id)}
            position={index}
          >
            <IndexTable.Cell>
              <Thumbnail source={images[0] ? images[0].src : ""} alt="" />
            </IndexTable.Cell>
            <IndexTable.Cell>
              <TextStyle variation="strong">{name}</TextStyle>
            </IndexTable.Cell>
            <IndexTable.Cell>{Calories ? Calories : "0"} g</IndexTable.Cell>
            <IndexTable.Cell>{totalFat ? totalFat : "0"} g</IndexTable.Cell>
            <IndexTable.Cell>
              {Carbohydrate ? Carbohydrate : "0"} g
            </IndexTable.Cell>
            <IndexTable.Cell>{Protein ? Protein : "0"} g</IndexTable.Cell>
            <IndexTable.Cell>{Salt ? Salt : "0"} g</IndexTable.Cell>
            <IndexTable.Cell>
              {food_product === true ? "Yes" : "No"}
            </IndexTable.Cell>
            <IndexTable.Cell>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Button primary onClick={() => handleEditProduct(_id)}>
                  Edit
                </Button>
                <PopOverElem
                  index={index}
                  productId={_id}
                  removeFormFields={removeFormFields}
                />
              </div>
            </IndexTable.Cell>
          </IndexTable.Row>
        )
      )
    ) : (
      <></>
    );

  return (
    <div>
      {products === "none" ? (
        <div
          style={{
            paddingTop: "40px",
            paddingBottom: "40px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Spinner accessibilityLabel="Spinner example" size="large" />
        </div>
      ) : (
        <div>
          <div style={{ padding: "16px", display: "flex" }}>
            <div style={{ flex: 1 }}>
              <Filters
                queryValue={queryValue}
                filters={filters}
                appliedFilters={appliedFilters}
                onQueryChange={setQueryValue}
                onQueryClear={handleQueryValueRemove}
                onClearAll={handleClearAll}
              />
            </div>
            <div
              style={{
                paddingLeft: "0.25rem",
                maxWidth: "130px",
                marginLeft: "10px",
              }}
            >
              <Select
                labelInline
                label="Categories"
                options={categorieOptions}
                value={sortValue}
                onChange={handleSortChange}
              />
            </div>
          </div>

          <IndexTable
            resourceName={resourceName}
            itemCount={products.length}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            bulkActions={bulkActions}
            promotedBulkActions={promotedBulkActions}
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: "" },
              { title: "Products" },
              { title: "Calories" },
              { title: "Total Fat" },
              { title: "Carbohydrate" },
              { title: "Protein" },
              { title: "Salt" },
              { title: "Food Product" },
            ]}
          >
            {rowMarkup}
          </IndexTable>
        </div>
      )}
    </div>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case "taggedWith":
        return `Tagged with ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
}

export default MyLablesTable;

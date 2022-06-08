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
import React, { useCallback, useState } from "react";

const PopOverElem = ({ index, productId, removeFormFields }) => {
  const [popoverActive, setPopoverActive] = useState(false);

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
      body: JSON.stringify(productId),
    };
    removeFormFields(index);
    console.log(productId, index);
    // const data = await fetch("/product_delete", fetchOptions)
    //   .then((res) => res.json())
    //   .then((messages) => {
    //     console.log(messages);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
  const [moneySpent, setMoneySpent] = useState(null);
  const [accountStatus, setAccountStatus] = useState(null);

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    []
  );
  const handleAccountStatusChange = useCallback(
    (value) => setAccountStatus(value),
    []
  );
  const handleMoneySpentChange = useCallback(
    (value) => setMoneySpent(value),
    []
  );

  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    []
  );
  const handleAccountStatusRemove = useCallback(
    () => setAccountStatus(null),
    []
  );
  const handleMoneySpentRemove = useCallback(() => setMoneySpent(null), []);
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);
  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleAccountStatusRemove,
    handleMoneySpentRemove,
    handleQueryValueRemove,
    handleTaggedWithRemove,
  ]);
  const handleSortChange = useCallback((value) => {
    setSortValue(value);
    selectedResources.splice(0, selectedResources.length);
    for (var i = 0; i < products.length; i++) {
      if (products[i].product_type === value) {
        selectedResources.push(products[i].id);
      }
    }
  }, []);
  let removeFormFields = (i) => {
    let newproductsValues = [...products];
    newproductsValues.splice(i, 1);
    setProductobj(newproductsValues);
  };
  const filters = [
    {
      key: "accountStatus",
      label: "Account status",
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            { label: "Enabled", value: "enabled" },
            { label: "Not invited", value: "not invited" },
            { label: "Invited", value: "invited" },
            { label: "Declined", value: "declined" },
          ]}
          selected={accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "taggedWith",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: "moneySpent",
      label: "Money spent",
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleMoneySpentChange}
        />
      ),
    },
  ];
  const firstFilters = [];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
        {
          key: "taggedWith",
          label: disambiguateLabel("taggedWith", taggedWith),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : [];

  const categorieOptions = categories;

  const rowMarkup =
    products !== "none" ? (
      products.map(
        (
          {
            id,
            title,
            Calories,
            totalFat,
            Carbohydrate,
            Protein,
            Salt,
            foodProduct,
            images,
          },
          index
        ) => (
          <IndexTable.Row
            id={id}
            key={id}
            selected={selectedResources.includes(id)}
            position={index}
          >
            <IndexTable.Cell>
              <Thumbnail source={images[0] ? images[0].src : ""} alt="" />
            </IndexTable.Cell>
            <IndexTable.Cell>
              <TextStyle variation="strong">{title}</TextStyle>
            </IndexTable.Cell>
            <IndexTable.Cell>{Calories ? Calories : "0"} g</IndexTable.Cell>
            <IndexTable.Cell>{totalFat ? totalFat : "0"} g</IndexTable.Cell>
            <IndexTable.Cell>
              {Carbohydrate ? Carbohydrate : "0"} g
            </IndexTable.Cell>
            <IndexTable.Cell>{Protein ? Protein : "0"} g</IndexTable.Cell>
            <IndexTable.Cell>{Salt ? Salt : "0"} g</IndexTable.Cell>
            <IndexTable.Cell>{foodProduct ? foodProduct : "@"}</IndexTable.Cell>
            <IndexTable.Cell>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Button
                  primary
                  onClick={() => handleSelectedProducts(selectedResources)}
                >
                  Edit
                </Button>
                <PopOverElem
                  index={index}
                  productId={id}
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
                filters={firstFilters}
                appliedFilters={appliedFilters}
                onQueryChange={setQueryValue}
                onQueryClear={handleQueryValueRemove}
                onClearAll={handleClearAll}
              />
            </div>
            <div style={{ paddingLeft: "0.25rem", maxWidth: "150px" }}>
              <Select
                labelInline
                label="Categories"
                options={categorieOptions}
                value={sortValue}
                onChange={handleSortChange}
              />
            </div>
          </div>
          <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={handleFiltersQueryChange}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleFiltersClearAll}
            hideQueryField
          />
          <IndexTable
            resourceName={resourceName}
            itemCount={products.length}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
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

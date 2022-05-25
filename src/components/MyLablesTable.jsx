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
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";

const PopOverElem = ({ index }) => {
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
  return (
    <Popover
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
      sectioned
      autofocusTarget="none"
      ariaHaspopup={false}
    >
      <FormLayout>
        <Button plain destructive>
          Delete Label
        </Button>
      </FormLayout>
    </Popover>
  );
};

function MyLablesTable({ products }) {
  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);
  const [taggedWith, setTaggedWith] = useState("VIP");
  const [queryValue, setQueryValue] = useState(null);
  const [sortValue, setSortValue] = useState("today");

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    []
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);
  const handleSortChange = useCallback((value) => setSortValue(value), []);

  //   const filters = [
  //     {
  //       key: "taggedWith",
  //       label: "Tagged with",
  //       filter: (
  //         <TextField
  //           label="Tagged with"
  //           value={taggedWith}
  //           onChange={handleTaggedWithChange}
  //           autoComplete="off"
  //           labelHidden
  //         />
  //       ),
  //       shortcut: true,
  //     },
  //   ];

  //   const appliedFilters = !isEmpty(taggedWith)
  //     ? [
  //         {
  //           key: "taggedWith",
  //           label: disambiguateLabel("taggedWith", taggedWith),
  //           onRemove: handleTaggedWithRemove,
  //         },
  //       ]
  //     : [];

  const categorieOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 days", value: "lastWeek" },
  ];

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
              <Stack>
                <Button primary>Edit</Button>
                <PopOverElem index={index} />
              </Stack>
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
            {/* <div style={{ flex: 1 }}>
          <Filters
          queryValue={queryValue}
          // filters={filters}
          appliedFilters={appliedFilters}
            onQueryChange={setQueryValue}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleClearAll}
          />
        </div> */}
            <div style={{ paddingLeft: "0.25rem" }}>
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

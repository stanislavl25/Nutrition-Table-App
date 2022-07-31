import {
  Button,
  IndexTable,
  Select,
  Spinner,
  TextStyle,
  Thumbnail,
  FormLayout,
  Popover,
  Combobox,
  Listbox,
  Icon,
} from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../../App";
import React, { useCallback, useState } from "react";
import { SearchMinor } from "@shopify/polaris-icons";

const PopOverElem = ({ index, productId, handleProductRemove }) => {
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
          <Button
            plain
            destructive
            onClick={() => handleProductRemove(productId, index)}
          >
            Delete Label
          </Button>
        </FormLayout>
      </Popover>
    </div>
  );
};

function MyLablesTable({
  productsArray,
  setProductsArray,
  handleSelectedProducts,
  categories,
  handleEditProduct,
  deselectedOptions,
  memoOptions,
  setMemoOptions,
  selectedResources,
  allResourcesSelected,
  handleSelectionChange,
}) {
  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const [sortValue, setSortValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setMemoOptions(deselectedOptions);
        return;
      }
      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setMemoOptions(resultOptions);
    },
    [deselectedOptions]
  );
  const updateSelection = useCallback(
    (selected) => {
      if (selectedResources.includes(selected)) {
        const updatedSelectedResources = selectedResources.filter(
          (option) => option !== selected
        );
        selectedResources.splice(0, selectedResources.length);
        updatedSelectedResources.forEach((elem) => {
          selectedResources.push(elem);
        });
      } else {
        selectedResources.push(selected);
      }

      const matchedOption = memoOptions.find((option) => {
        return option.value.match(selected);
      });

      updateText("");
    },
    [memoOptions, selectedResources]
  );

  const optionsMarkup =
    memoOptions?.length > 0
      ? memoOptions?.map((option, index) => {
          const { label, value } = option;
          return (
            <Listbox.Option
              key={index}
              value={value}
              selected={selectedResources.includes(value)}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  const handleSortChange = useCallback(
    (value) => {
      setSortValue(value);
      selectedResources.splice(0, selectedResources.length);
      productsArray.forEach((elem) => {
        if (elem.product_type.includes(value)) {
          selectedResources.push(elem.name);
        }
      });
    },
    [selectedResources, productsArray]
  );
  let removeFormFields = (i) => {
    let newproductsValues = [...productsArray];
    newproductsValues.splice(i, 1);
    setProductsArray(newproductsValues);
  };

  //!!!!! todo message to inform that products are deleted
  //!!!!! todo also update selected products A.splice(0,A.length)
  const handleProductRemove = async (productId, index) => {
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    };
    if (typeof index == "number") {
      removeFormFields(index);
      selectedResources.splice(0, selectedResources.length);
    }
    const data = await fetch("/product_delete", fetchOptions)
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          console.log(response.message);
        } else {
          console.warn(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleBulkDelete = () => {
    productsArray.forEach((element) => {
      if (selectedResources.includes(element.name)) {
        handleProductRemove(element._id, "");
      }
    });
    const neProductsArray = productsArray.filter(
      (value) => !selectedResources.includes(value.name)
    );
    setProductsArray(neProductsArray);
    selectedResources.splice(0, selectedResources.length);
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
    productsArray !== "none" ? (
      productsArray?.map(
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
            image,
          },
          index
        ) => (
          <IndexTable.Row
            id={name}
            key={index}
            selected={selectedResources.includes(name)}
            position={index}
          >
            <IndexTable.Cell>
              <Thumbnail source={image !== null ? image : ""} alt="" />
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
                <Button primary onClick={() => handleEditProduct(name)}>
                  Edit
                </Button>
                <PopOverElem
                  index={index}
                  productId={_id}
                  handleProductRemove={handleProductRemove}
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
      {productsArray === "none" ? (
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
              <Combobox
                activator={
                  <Combobox.TextField
                    prefix={<Icon source={SearchMinor} />}
                    onChange={updateText}
                    label="Filter"
                    labelHidden
                    value={inputValue}
                    placeholder="Filter"
                  />
                }
              >
                {memoOptions?.length > 0 ? (
                  <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
                ) : null}
              </Combobox>
            </div>
            <div
              style={{
                paddingLeft: "0.25rem",
                maxWidth: "130px",
                marginLeft: "10px",
              }}
            >
              {categorieOptions?.length > 0 ? (
                <Select
                  labelInline
                  label="Categories"
                  options={categorieOptions}
                  value={sortValue}
                  onChange={(e) => handleSortChange(e)}
                  key={sortValue}
                />
              ) : (
                <></>
              )}
            </div>
          </div>

          <IndexTable
            resourceName={resourceName}
            itemCount={productsArray.length}
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
}

export default MyLablesTable;

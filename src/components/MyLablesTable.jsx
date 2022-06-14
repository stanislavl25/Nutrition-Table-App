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
  Combobox,
  Listbox,
  Icon,
  TextContainer,
  Tag,
} from "@shopify/polaris";
import { Toast, useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";
import React, { useCallback, useMemo, useState } from "react";
import { SearchMinor } from "@shopify/polaris-icons";

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
  productsArray,
  setProductArray,
  handleSelectedProducts,
  categories,
  handleEditProduct,
}) {
  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const resourceIDResolver = (products) => {
    return products.name;
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(productsArray, {
      resourceIDResolver,
    });
  const [taggedWith, setTaggedWith] = useState("");
  const [queryValue, setQueryValue] = useState(null);
  const [sortValue, setSortValue] = useState("");
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const [inputValue, setInputValue] = useState("");
  // const [selectedOptions, setSelectedOptions] = useState([]);
  const handleMemo = () => {
    let array = [];
    if (productsArray.length === 0) return array;
    if (productsArray != "none") {
      productsArray.forEach((element) => {
        const name = element.name;
        array.push({ value: name, label: name });
      });
    }
    return array;
  };
  const deselectedOptions = useMemo(handleMemo);
  const [memoOptions, setMemoOptions] = useState(deselectedOptions);

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
        // setSelectedOptions(
        // selectedResources.filter((option) => option !== selected)
        // selectedResources.push(
        //   selectedResources.filter((option) => option !== selected)
        // );
        // );
        const options = selectedResources.filter(
          (option) => option != selected
        );
        selectedResources.splice(0, selectedResources.length);
        options.forEach((elem) => {
          selectedResources.push(elem);
        });
      } else {
        selectedResources.push(selected);
        // setSelectedOptions([...selectedResources, selected]);
      }

      const matchedOption = memoOptions.find((option) => {
        return option.value.match(selected);
      });

      updateText("");
    },
    [memoOptions, selectedResources]
  );
  const removeTag = useCallback(
    (tag) => () => {
      const index = selectedResources.indexOf(tag);
      console.log(index);
      selectedResources.splice(index, 1);
    },
    [selectedResources]
  );

  const optionsMarkup =
    memoOptions.length > 0
      ? memoOptions.map((option) => {
          const { label, value } = option;
          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedResources.includes(value)}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;
  const tagsMarkup = selectedResources.map((option) => (
    <Tag key={`option-${option}`} onRemove={removeTag(option)}>
      {option}
    </Tag>
  ));

  const handleSortChange = useCallback((value) => {
    setSortValue(value);
    selectedResources.splice(0, selectedResources.length);
    for (var i = 0; i < productsArray.length; i++) {
      if (productsArray[i].product_type === value) {
        selectedResources.push(productsArray[i].name);
      }
    }
  }, []);
  let removeFormFields = (i) => {
    let newproductsValues = [...productsArray];
    newproductsValues.splice(i, 1);
    setProductArray(newproductsValues);
  };
  const handleBulkDelete = () => {
    productsArray.forEach((element, index) => {
      console.log(selectedResources.includes(element.name));
      if (selectedResources.includes(element.name)) {
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
    productsArray !== "none" ? (
      productsArray.map(
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
            id={name}
            key={_id}
            selected={selectedResources.includes(name)}
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
                    label="Assign products to this label"
                    labelHidden
                    value={inputValue}
                    placeholder="Assign products to this label"
                  />
                }
              >
                {memoOptions.length > 0 ? (
                  <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
                ) : null}
              </Combobox>
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <TextContainer>
                  <Stack>{tagsMarkup}</Stack>
                </TextContainer>
              </div>
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

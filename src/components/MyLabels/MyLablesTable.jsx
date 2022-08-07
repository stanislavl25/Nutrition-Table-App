import {
  Button,
  IndexTable,
  Select,
  TextStyle,
  Thumbnail,
  FormLayout,
  Popover,
  Combobox,
  Listbox,
  Icon,
  Modal,
  TextContainer,
} from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../../App";
import React, { useCallback, useState } from "react";
import { SearchMinor } from "@shopify/polaris-icons";

const ResetProducts = () => {
  const [active, setActive] = useState(false);

  const handleChange = () => {
    setActive(!active);
  };

  const activator = (
    <div style={{ width: "164px" }} onClick={handleChange}>
      <TextStyle variation="negative">Reset products</TextStyle>
    </div>
  );

  return (
    <Modal
      activator={activator}
      open={active}
      onClose={handleChange}
      title="Reset products"
      primaryAction={{
        content: "Reset products",
        onAction: handleChange,
        destructive: true,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleChange,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <p>
            Do you really want to delete all data for the selected products. The
            data for the selected products will all be reset to zero. This
            action is irreversible.
          </p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};
const HideLablesModal = () => {
  const [active, setActive] = useState(false);

  const handleChange = () => {
    setActive(!active);
  };

  const activator = (
    <div style={{ width: "164px" }} onClick={handleChange}>
      <TextStyle variation="negative">Hide lables</TextStyle>
    </div>
  );

  return (
    <Modal
      activator={activator}
      open={active}
      onClose={handleChange}
      title="Hide Labels"
      primaryAction={{
        content: "Hide Labels",
        onAction: handleChange,
        destructive: true,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleChange,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer spacing="loose">
          <p>
            We will mark these products as non-food products, so that no
            nutrition table is displayed for the selected products in your
            online store.
          </p>
          <p>
            The information for the selected products will not be deleted from
            our database by this action. If you want to display a nutritional
            value table for the selected products later on, this is possible.
            Just select the products you want, go to the Customize Label page
            and uncheck the checkbox "This is a non-food product". This will
            again display a nutritional value table for the selected products in
            your store.
          </p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};

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
            onClick={() => {
              //  handleProductRemove(productId, index)
              console.log("clicked");
            }}
          >
            Hidel label
          </Button>
          <Button
            plain
            destructive
            onClick={() => {
              //  handleProductRemove(productId, index)
              console.log("clicked");
            }}
          >
            Reset products
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
          content: <HideLablesModal />,
          onAction: () => {
            // handleBulkDelete()
            console.log("heyyyy#######################");
          },
        },
        {
          content: <ResetProducts />,
          onAction: () => {
            console.log("clicked");
          },
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
        loading={productsArray === "none" ? true : false}
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
      <div style={{ marginTop: "20px", cursor: "pointer" }}>
        <HideLablesModal />
      </div>
      <div style={{ marginTop: "20px", cursor: "pointer" }}>
        <ResetProducts />
      </div>
    </div>
  );
}

export default MyLablesTable;

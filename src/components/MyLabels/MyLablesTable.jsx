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

const ResetProducts = ({ handleBulkProductsReset }) => {
  const [active, setActive] = useState(false);

  const handleChange = () => {
    setActive(!active);
  };

  const activator = (
    <div style={{ width: "164px" }} id="Reset_products" onClick={handleChange}>
      <TextStyle variation="negative">Reset products</TextStyle>
    </div>
  );
  const handleReset = () => {
    handleChange();
    handleBulkProductsReset();
  };
  return (
    <Modal
      activator={activator}
      open={active}
      onClose={handleChange}
      title="Reset products"
      primaryAction={{
        content: "Reset products",
        onAction: handleReset,
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
const HideLablesModal = ({ handleBulkProductsHide }) => {
  const [active, setActive] = useState(false);

  const handleChange = () => {
    setActive(!active);
  };

  const activator = (
    <div style={{ width: "164px" }} id="Hide_Lables" onClick={handleChange}>
      <TextStyle variation="negative">Hide lables</TextStyle>
    </div>
  );
  const handleHideLables = () => {
    handleBulkProductsHide();
    handleChange();
  };
  return (
    <Modal
      activator={activator}
      open={active}
      onClose={handleChange}
      title="Hide Labels"
      primaryAction={{
        content: "Hide Labels",
        onAction: handleHideLables,
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

const PopOverElem = ({
  index,
  productId,
  handleProductHide,
  handleProductReset,
}) => {
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
              handleProductHide(productId);
              togglePopoverActive();
            }}
          >
            Hidel label
          </Button>
          <Button
            plain
            destructive
            onClick={() => {
              handleProductReset(productId);
              togglePopoverActive();
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
  fetchProducts,
  setToastMessage,
  toggleActive,
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
        if (elem.product_type !== null && elem.product_type.includes(value)) {
          selectedResources.push(elem.name);
        }
      });
    },
    [selectedResources, productsArray]
  );

  const handleProductHide = async (productId) => {
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    };
    const data = await fetch("/product_Hide", fetchOptions)
      .then((res) => res.json())
      .then(async (response) => {
        if (response.success) {
          await fetchProducts();
          setToastMessage(response.message);
          toggleActive();
        } else {
          console.warn(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleProductReset = async (productId) => {
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    };
    const data = await fetch("/product_Reset", fetchOptions)
      .then((res) => res.json())
      .then(async (response) => {
        if (response.success) {
          await fetchProducts();
          setToastMessage(response.message);
          toggleActive();
        } else {
          console.warn(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleBulkProductsReset = async () => {
    const products = [];
    await productsArray.forEach((elem) => {
      if (selectedResources.includes(elem.name)) products.push(elem._id);
    });
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }),
    };
    const data = await fetch("/product_bulk_Reset", fetchOptions)
      .then((res) => res.json())
      .then(async (response) => {
        if (response.success) {
          await fetchProducts();
          setToastMessage(response.message);
          toggleActive();
        } else {
          console.warn(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleBulkProductsHide = async () => {
    const products = [];
    await productsArray.forEach((elem) => {
      if (selectedResources.includes(elem.name)) products.push(elem._id);
    });
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }),
    };
    console.log(products);
    const data = await fetch("/product_bulk_Hide", fetchOptions)
      .then((res) => res.json())
      .then(async (response) => {
        if (response.success) {
          await fetchProducts();
          setToastMessage(response.message);
          toggleActive();
        } else {
          console.warn(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
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
          content: "Hide Labels",
          onAction: () => {
            document.getElementById("Hide_Lables").click();
          },
          destructive: true,
        },
        {
          content: "Reset products",
          onAction: () => {
            document.getElementById("Reset_products").click();
          },
          destructive: true,
        },
      ],
    },
  ];

  const rowMarkup =
    productsArray !== "none" ? (
      productsArray?.map(
        ({ _id, name, Calories, food_product, image }, index) => (
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
            <IndexTable.Cell>
              {food_product === true ? "Yes" : "No"}
            </IndexTable.Cell>
            <IndexTable.Cell></IndexTable.Cell>
            <IndexTable.Cell></IndexTable.Cell>
            <IndexTable.Cell></IndexTable.Cell>
            <IndexTable.Cell></IndexTable.Cell>
            <IndexTable.Cell></IndexTable.Cell>

            <IndexTable.Cell>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Button primary onClick={() => handleSelectedProducts([name])}>
                  Edit
                </Button>
                <PopOverElem
                  index={index}
                  productId={_id}
                  handleProductHide={handleProductHide}
                  handleProductReset={handleProductReset}
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
          { title: "Product" },
          { title: "Calories" },
          { title: "Food Product" },
        ]}
      >
        {rowMarkup}
      </IndexTable>
      <div style={{ display: "none" }}>
        <HideLablesModal handleBulkProductsHide={handleBulkProductsHide} />
        <ResetProducts handleBulkProductsReset={handleBulkProductsReset} />
      </div>
    </div>
  );
}

export default MyLablesTable;

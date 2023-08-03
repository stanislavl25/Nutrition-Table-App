import {
  Button,
  IndexTable,
  TextStyle,
  Thumbnail,
  FormLayout,
  Popover,
  Listbox,
  Modal,
  TextContainer,
  Pagination,
  Filters,
  ChoiceList,
} from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../../App";
import React, { useCallback, useEffect, useRef, useState } from "react";

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
  handleNextPrevious,
  hasPages,
  setIsSaving,
  isSaving,
  collections,
  collectionSelected,
  setCollectionSelected,
  setQueryValue,
  GeneralHandleSelectionChange,
  setAllproductsSelected,
}) {
  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const [sortValue, setSortValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  // collection filter states
  const [searchValue, setSearchValue] = useState("");
  const TimerRef = useRef(null);

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
          selectedResources.push(elem._id);
        }
      });
    },
    [selectedResources, productsArray]
  );

  const handleProductHide = async (productId) => {
    setIsSaving(true);
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
    setIsSaving(false);
  };
  const handleProductReset = async (productId) => {
    setIsSaving(true);
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
    setIsSaving(false);
  };
  const bulkActions = [];
  const promotedBulkActions = [
    {
      content: "Edit Labels",
      onAction: () => handleSelectedProducts(selectedResources),
      disabled: isSaving,
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
          disabled: isSaving,
        },
        {
          content: "Reset products",
          onAction: () => {
            document.getElementById("Reset_products").click();
          },
          destructive: true,
          disabled: isSaving,
        },
      ],
    },
  ];

  const handleBulkProductsReset = async () => {
    const products = [];
    await productsArray.forEach((elem) => {
      if (selectedResources.includes(elem._id)) products.push(elem._id);
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
          selectedResources.splice(0, selectedResources.length);
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
      if (selectedResources.includes(elem._id)) products.push(elem._id);
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
    const data = await fetch("/product_bulk_Hide", fetchOptions)
      .then((res) => res.json())
      .then(async (response) => {
        if (response.success) {
          selectedResources.splice(0, selectedResources.length);
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

  // *filter settings

  const handleCollectionSelected = useCallback(async (value) => {
    selectedResources.splice(0, selectedResources.length);
    GeneralHandleSelectionChange("page", false, undefined);
    handleSelectedProducts([]);
    setQueryValue(() => {
      return "";
    });
    setSearchValue("");
    setCollectionSelected((prev) => {
      return [...value];
    });
    setAllproductsSelected(false);
    setProductsArray("none");
  }, []);

  const handleCollectionSelectedRemove = useCallback(() => {
    GeneralHandleSelectionChange("page", false, undefined);
    handleSelectedProducts([]);
    setCollectionSelected([""]);
    setAllproductsSelected(false);
    setProductsArray("none");
  }, []);

  const filters = [
    {
      key: "Collections",
      label: "Collections",
      filter: (
        <ChoiceList
          title="Collections"
          choices={collections}
          selected={collectionSelected}
          onChange={handleCollectionSelected}
        />
      ),
      shortcut: true,
    },
  ];
  const appliedFilters = !isEmpty(collectionSelected)
    ? [
        {
          key: "Collections",
          label: disambiguateLabel(
            "Collections",
            collectionSelected,
            collections
          ),
          onRemove: handleCollectionSelectedRemove,
        },
      ]
    : [];

  const handleOnQueryChange = (newQuery) => {
    setSearchValue(newQuery);
    clearTimeout(TimerRef.current);
    TimerRef.current = setTimeout(() => {
      selectedResources.splice(0, selectedResources.length);
      GeneralHandleSelectionChange("page", false, undefined);
      handleSelectedProducts([]);
      setAllproductsSelected(false);
      setProductsArray("none");
      setCollectionSelected(() => {
        return [""];
      });
      setQueryValue((previous) => {
        return newQuery;
      });
    }, 1500);
  };
  const handleQueryValueRemove = () => {
    setSearchValue("");
    setQueryValue("");
  };
  const handleClearAll = useCallback(() => {
    GeneralHandleSelectionChange("page", false, undefined);
    handleCollectionSelectedRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleCollectionSelectedRemove]);

  const handleBeforeNextPrevious = (value) => {
    GeneralHandleSelectionChange("page", false, undefined);
    setAllproductsSelected(false);
    handleNextPrevious(value);
  };

  const rowMarkup =
    productsArray !== "none" ? (
      productsArray?.map(
        (
          { _id, name, Calories, food_product, image, product_variants_ids },
          index
        ) => (
          <IndexTable.Row
            id={_id}
            key={_id}
            selected={selectedResources.includes(_id)}
            position={index}
          >
            <IndexTable.Cell>
              <Thumbnail
                source={!!image && image !== null ? image : ""}
                alt=""
              />
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
                <Button primary onClick={() => handleSelectedProducts([_id])}>
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
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Filters
            queryValue={searchValue}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={handleOnQueryChange}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleClearAll}
            disableQueryField={collectionSelected[0].length > 0}
          />
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
        hasMoreItems={hasPages?.hasPreviousPage || hasPages?.hasNextPage}
        headings={[
          { title: "" },
          { title: "Product" },
          { title: "Calories" },
          { title: "Food Product" },
        ]}
      >
        {rowMarkup}
      </IndexTable>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Pagination
          previousTooltip={"Previous"}
          nextTooltip={"Next"}
          hasPrevious={hasPages?.hasPreviousPage}
          onPrevious={() => {
            handleBeforeNextPrevious("previous");
          }}
          hasNext={hasPages?.hasNextPage}
          onNext={() => {
            handleBeforeNextPrevious("next");
          }}
        />
      </div>
      <div style={{ display: "none" }}>
        <HideLablesModal handleBulkProductsHide={handleBulkProductsHide} />
        <ResetProducts handleBulkProductsReset={handleBulkProductsReset} />
      </div>
    </div>
  );
}

function disambiguateLabel(key, value, collections) {
  switch (key) {
    case "Collections":
      return `Collection: ${
        collections.filter((collect) => collect.value === value[0])[0]?.label
      }`;
    default:
      return value;
  }
}

function isEmpty(value) {
  if (Array.isArray(value)) {
    let temp = value;
    temp = temp.filter((elm) => elm.length !== 0);
    return temp.length === 0;
  } else {
    return value === "" || value == null;
  }
}

export default MyLablesTable;

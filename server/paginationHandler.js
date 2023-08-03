import { Shopify } from "@shopify/shopify-api";
import Products from "./models/productModel.js";
export async function handleProductsPagination(type, cursor, res, session) {
  const numberOfProducts = "50";
  console.log("get data without filter ###############");
  if (type === "first") {
    const store = session.shop;
    const client = new Shopify.Clients.Graphql(store, session.accessToken);
    const data = await client.query({
      data: `query {
        products(last: ${numberOfProducts},before:"${cursor}") {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              title
              productType
              images(first: 1) {
                edges {
                  node {
                    src
                  }
                }
              }
            }
            cursor
          }
          pageInfo {
            hasNextPage
          }
        }
      }`,
    });
    const elements = data.body.data.products.edges;
    const synchronisedElements = await handleDataSyncronzation(
      elements,
      session
    );
    const firstCursor = data.body.data.products.edges[0].cursor;
    const lastCursor = data.body.data.products.edges.at(-1).cursor;
    const hasPages = data.body.data.products.pageInfo;
    return { synchronisedElements, firstCursor, lastCursor, hasPages };
  } else if (type === "last") {
    const store = session.shop;
    const client = new Shopify.Clients.Graphql(store, session.accessToken);
    const data = await client.query({
      data: `query {
          products(first: ${numberOfProducts},after:"${cursor}") {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                id
                title
                productType
                images(first: 1) {
                  edges {
                    node {
                      src
                    }
                  }
                }
              }
              cursor
            }
            pageInfo {
              hasNextPage
            }
          }
        }`,
    });
    const elements = data.body.data.products.edges;
    const synchronisedElements = await handleDataSyncronzation(
      elements,
      session
    );
    const firstCursor = data.body.data.products.edges[0].cursor;
    const lastCursor = data.body.data.products.edges.at(-1).cursor;
    const hasPages = data.body.data.products.pageInfo;
    return {
      synchronisedElements,
      firstCursor,
      lastCursor,
      hasPages,
    };
  } else if (type === "load") {
    const store = session.shop;
    const client = new Shopify.Clients.Graphql(store, session.accessToken);
    const data = await client.query({
      data: `query {
          products(first: ${numberOfProducts}) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                id
                title
                productType
                images(first: 1) {
                  edges {
                    node {
                      src
                    }
                  }
                }
              }
              cursor
            }
            pageInfo {
              hasNextPage
            }
          }
        }`,
    });
    const elements = data.body.data.products.edges;
    const synchronisedElements = await handleDataSyncronzation(
      elements,
      session
    );
    const firstCursor = data.body.data.products.edges[0].cursor;
    const lastCursor = data.body.data.products.edges.at(-1).cursor;
    const hasPages = data.body.data.products.pageInfo;
    return { synchronisedElements, firstCursor, lastCursor, hasPages };
  }
}

//** handle product synchronization (shopify/app database)***/

const handleDataSyncronzation = async (data, session) => {
  let productsData = [];
  try {
    for (const elem of data) {
      const productID = `${elem.node.id.match(/Product\/(.*)/)[1]}`;
      const productRetrieve = await Products.findOne({
        store_id: session.shop,
        productId: productID,
      }).select("-store_id -productId -is_deleted");
      if (!!productRetrieve) {
        productsData.push(productRetrieve);
        if (productRetrieve?.product_variants_ids?.length) {
          const variantIds = productRetrieve?.product_variants_ids;
          const variantRetrieve = await Products.find({
            store_id: session.shop,
            productId: { $in: variantIds },
          }).select("-store_id -productId -is_deleted");
          if (!!variantRetrieve) {
            if (Array.isArray(variantRetrieve)) {
              console.log("variant retrieved ######");
              productsData = productsData.concat(variantRetrieve);
            } else {
              productsData.push(variantRetrieve);
            }
          }
        }
      }
    }
  } catch (err) {
    console.log(err, "err at handleDataSyncronzation");
  }
  return productsData;
};

export async function handleProductsPaginationWithFilter(
  session,
  type,
  cursor,
  filters
) {
  console.log("get data with filter ###############");
  let data;
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);
  if (type === "first") {
    data = await client.query({
      data: `query {
        ${
          filters.collections?.length > 0 && filters.collections[0].length > 0
            ? `collection(id: "${filters.collections}") {`
            : ""
        }
          products(last: 50,before:"${cursor}", sortKey: ID${
        filters.query?.length > 0 ? `, query: "*${filters.query}*"` : ""
      }) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                id
                title
                productType
                images(first: 1) {
                  edges {
                    node {
                      src
                    }
                  }
                }
              }
              cursor
            }
          }
        ${
          filters.collections?.length > 0 && filters.collections[0].length > 0
            ? "}"
            : ""
        }
      }`,
    });
  } else if (type === "last") {
    data = await client.query({
      data: `query {
        ${
          filters.collections?.length > 0 && filters.collections[0].length > 0
            ? `collection(id: "${filters.collections}") {`
            : ""
        }
          products(first: 50 ,after:"${cursor}", sortKey: ID${
        filters.query?.length > 0 ? `, query: "*${filters.query}*"` : ""
      }) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                id
                title
                productType
                images(first: 1) {
                  edges {
                    node {
                      src
                    }
                  }
                }
              }
              cursor
            }
          }
        ${
          filters.collections?.length > 0 && filters.collections[0].length > 0
            ? "}"
            : ""
        }
      }`,
    });
  } else {
    data = await client.query({
      data: `query {
        ${
          filters.collections?.length > 0 && filters.collections[0].length > 0
            ? `collection(id: "${filters.collections}") {`
            : ""
        }
          products(first: 50, sortKey: ID${
            filters.query?.length > 0 ? `, query: "*${filters.query}*"` : ""
          }) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                id
                title
                productType
                images(first: 1) {
                  edges {
                    node {
                      src
                    }
                  }
                }
              }
              cursor
            }
          }
        ${
          filters.collections?.length > 0 && filters.collections[0].length > 0
            ? "}"
            : ""
        }
      }`,
    });
  }
  if (filters.collections?.length > 0 && filters.collections[0].length > 0) {
    const elements = data.body.data.collection.products.edges;
    const synchronisedElements = await handleDataSyncronzation(
      elements,
      session
    );
    const firstCursor = data.body.data.collection.products.edges[0].cursor;
    const lastCursor = data.body.data.collection.products.edges.at(-1).cursor;
    const hasPages = data.body.data.collection.products.pageInfo;
    return { synchronisedElements, firstCursor, lastCursor, hasPages };
  } else {
    const elements = data.body.data.products.edges;
    const synchronisedElements = await handleDataSyncronzation(
      elements,
      session
    );
    const firstCursor = data.body.data.products.edges[0].cursor;
    const lastCursor = data.body.data.products.edges.at(-1).cursor;
    const hasPages = data.body.data.products.pageInfo;
    return { synchronisedElements, firstCursor, lastCursor, hasPages };
  }
}

export async function getCollections(session) {
  try {
    const client = new Shopify.Clients.Graphql(
      session.shop,
      session.accessToken
    );
    let collections = [];
    let nextcursor = "";
    let hasNextPage = true;
    do {
      let parametres =
        nextcursor.length > 0
          ? `first: 250, after:"${nextcursor}"`
          : "first: 250";
      let data;
      while (true) {
        try {
          data = await client.query({
            data: `query {
              collections(${parametres}) {
                pageInfo {
                  hasNextPage
                }
                edges {
                  node {
                    title
                    id
                  }
                  cursor
                }
              }
            }`,
          });
          break;
        } catch (err) {
          console.log(err);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
      hasNextPage = data.body.data.collections.pageInfo.hasNextPage;
      collections = [].concat(
        collections,
        data.body.data.collections.edges.map((node) => ({
          label: node.node.title,
          value: node.node.id,
        }))
      );
      nextcursor = data.body.data.collections.edges.at(-1).cursor;
    } while (hasNextPage);
    return collections;
  } catch (err) {
    console.log(err);
    return [];
  }
}

const IMAGE = `url altText width height`;
const MONEY = `amount currencyCode`;

export const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id handle title description productType tags
    featuredImage { ${IMAGE} }
    images(first: 8) { nodes { ${IMAGE} } }
    variants(first: 20) {
      nodes {
        id title availableForSale
        price { ${MONEY} }
        compareAtPrice { ${MONEY} }
      }
    }
  }
`;

export const PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query Products($first: Int!) { products(first: $first) { nodes { ...ProductFields } } }
`;

export const PRODUCT_QUERY = `
  ${PRODUCT_FRAGMENT}
  query Product($handle: String!) { product(handle: $handle) { ...ProductFields } }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id checkoutUrl totalQuantity
    cost { subtotalAmount { ${MONEY} } }
    lines(first: 50) {
      nodes {
        id quantity
        merchandise {
          ... on ProductVariant {
            id title
            price { ${MONEY} }
            compareAtPrice { ${MONEY} }
            image { ${IMAGE} }
            product { handle title featuredImage { ${IMAGE} } }
          }
        }
      }
    }
  }
`;

export const CART_QUERY = `${CART_FRAGMENT} query Cart($id: ID!) { cart(id: $id) { ...CartFields } }`;
export const CART_CREATE = `${CART_FRAGMENT} mutation($lines: [CartLineInput!]) { cartCreate(input: { lines: $lines }) { cart { ...CartFields } userErrors { message } } }`;
export const CART_ADD = `${CART_FRAGMENT} mutation($id: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $id, lines: $lines) { cart { ...CartFields } userErrors { message } } }`;
export const CART_UPDATE = `${CART_FRAGMENT} mutation($id: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $id, lines: $lines) { cart { ...CartFields } userErrors { message } } }`;
export const CART_REMOVE = `${CART_FRAGMENT} mutation($id: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $id, lineIds: $lineIds) { cart { ...CartFields } userErrors { message } } }`;

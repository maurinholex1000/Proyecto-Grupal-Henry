// Products
const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCTS_BY_NAME = "GET_PRODUCTS_BY_NAME";
const GET_PRODUCTS_BY_ID = "GET_PRODUCTS_BY_ID";
const POST_PRODUCT = "POST_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

// Categories
const GET_CATEGORIES = "GET_CATEGORIES";
const GET_CATEGORY_DETAILS = "GET_CATEGORY_DETAILS";
const POST_CATEGORY = "POST_CATEGORY";
const DELETE_CATEGORY = "DELETE_CATEGORY";
const UPDATE_CATEGORY = "UPDATE_CATEGORY";

// Filter
const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
const FILTER_BY_PRICE_RANGE = "FILTER_BY_PRICE_RANGE";

// Order
const ORDER_BY_PRICE = "ORDER_BY_PRICE";

// Orders
const GET_CART_FROM_USER = "GET_CART_FROM_USER";
const UPDATE_ORDER = "UPDATE_ORDER";

// Email
const SEND_HELP_EMAIL = "SEND_HELP_EMAIL";
const SEND_REGISTER_EMAIL = "SEND_REGISTER_EMAIL";
const SEND_PAYMENT_EMAIL = "SEND_PAYMENT_EMAIL";

const TYPES = {
  GET_PRODUCTS,
  GET_PRODUCTS_BY_NAME,
  GET_PRODUCTS_BY_ID,
  POST_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  POST_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORY_DETAILS,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  ORDER_BY_PRICE,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE_RANGE,
  SEND_HELP_EMAIL,
  SEND_REGISTER_EMAIL,
  SEND_PAYMENT_EMAIL,
  GET_CART_FROM_USER,
  UPDATE_ORDER,
};

export default TYPES;

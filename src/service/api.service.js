import CryptoJS from "crypto-js";
import axios from "axios";

// API url
// eslint-disable-next-line no-undef
const url = import.meta.env.REACT_APP_API_URL || process?.env?.REACT_APP_API_URL;

// API Key
// eslint-disable-next-line no-undef
const parol = import.meta.env.REACT_APP_API_KEY || process?.env?.REACT_APP_API_KEY;
const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
const authString = `${parol}_${timestamp}`;

// Get Ids API
export const getIds = async (offset) => {
  const xAuth = CryptoJS.MD5(authString).toString(CryptoJS.enc.Hex);
  const body = {
    action: "get_ids",
    params: {offset, limit: 50},
  };
  const headers = {
    "X-Auth": xAuth,
    "Content-Type": "application/json",
  };
  const response = await axios.post(url, body, { headers });
  return response.data;
};

// Get Products API
export const getProducts = async (ids) => {
  const xAuth = CryptoJS.MD5(authString).toString(CryptoJS.enc.Hex);
  const body = {
    action: "get_items",
    params: { ids },
  };
  const headers = {
    "X-Auth": xAuth,
    "Content-Type": "application/json",
  };
  const response = await axios.post(url, body, { headers });
  return response.data;
};

// Filter API
export const getSortedIds = async (searchFor, searchVal) => {
  const xAuth = CryptoJS.MD5(authString).toString(CryptoJS.enc.Hex);
  let k = searchVal
  if(searchFor == 'price'){
    k = parseFloat(searchVal)
  }
  const body = {
    action: "filter",
    params: {[searchFor]: k},
  };
  const headers = {
    "X-Auth": xAuth,
    "Content-Type": "application/json",
  };
  const response = await axios.post(url, body, { headers });
  return response.data;
};

// Get Fields API
export const getFields = async (field) => {
  const xAuth = CryptoJS.MD5(authString).toString(CryptoJS.enc.Hex);
  const body = {
    action: "get_fields",
    params: {'field': field},
  };
  const headers = {
    "X-Auth": xAuth,
    "Content-Type": "application/json",
  };
  const response = await axios.post(url, body, { headers });
  return response.data;
};
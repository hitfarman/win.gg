import axios, { CreateAxiosDefaults } from "axios";

const apiParamsSSR: CreateAxiosDefaults = {
  baseURL: `https://${process.env.WP_API_DOMAIN}/wp-json`,
  timeout: 20000,
  auth: {
    username: process.env.BASIC_AUTH_USERNAME || "",
    password: process.env.BASIC_AUTH_PASSWORD || ""
  }
};

const apiParamsNext: CreateAxiosDefaults = {
  baseURL: `http://localhost:3000/api`,
  timeout: 20000
};

export const apiSSR = axios.create(apiParamsSSR);

export const apiNext = axios.create(apiParamsNext);

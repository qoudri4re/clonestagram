import axios from "axios";

let baseURL;

if (process.env.REACT_APP_ENVIRONMENT === "development") {
  baseURL = "http://127.0.0.1:8000/";
} else {
  baseURL = "https://clonestagram-api.onrender.com";
}

const client = axios.create({
  baseURL,
});

/**
 * header configuration for requests
 * @param {*} jwtToken
 * @returns header config
 */
function requestHeaderConfig(jwtToken) {
  const config = {
    headers: {
      Authorization: `${jwtToken}`,
    },
  };
  return config;
}

export { client, requestHeaderConfig };

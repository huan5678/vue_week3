import axios from "axios";

const baseUrl = "https://vue3-course-api.hexschool.io/v2/";

export function Api({ method, url, data, token }) {
  let baseURL = `${baseUrl}${url}`;

  axios.defaults.headers.common["Authorization"] = token;

  switch (method) {
    case "get":
      return axios.get(baseURL);
    case "post":
      return axios.post(baseURL, data);
    case "put":
      return axios.put(baseURL, data);
    case "delete":
      return axios.delete(baseURL, data);
    default:
      return axios.get(baseURL);
  }
}

export default Api;

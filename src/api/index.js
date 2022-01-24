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

const imgurUrl = "https://api.imgur.com/3/";

const clientId = import.meta.env.VITE_IMGUR_CLIENT_ID;

export const uploadImg = (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return axios.post(`${imgurUrl}upload`, formData, {
    headers: {
      Authorization: `Client-ID ${clientId}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getImg = (id) => {
  return axios.get(`${imgurUrl}image/${id}`, {
    headers: {
      Authorization: `Client-ID ${clientId}`,
    },
  });
};

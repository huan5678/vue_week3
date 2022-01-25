import axios from "axios";

const baseUrl = "https://vue3-course-api.hexschool.io/v2/";

export function Api({ method, url, data = null, token }) {
  let baseURL = `${baseUrl}${url}`;

  axios.defaults.headers.common["Authorization"] = token;

  return axios[method](baseURL, data);
}

export default Api;

const imgurUrl = "https://api.imgur.com/3/";

const imgurClientSecret = import.meta.env.VITE_IMGUR_CLIENT_SECRET;
const imgurClientID = import.meta.env.VITE_IMGUR_CLIENT_ID;

export const uploadImg = (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return axios.post(`${imgurUrl}upload`, formData, {
    headers: {
      // Authorization: `Bearer ${imgurClientSecret}`,
      // "Content-Type": "multipart/form-data",
      Authorization: `Client-ID ${imgurClientID}`,
    },
  });
};

export const getImg = (id) => {
  return axios.get(`${imgurUrl}image/${id}`, {
    headers: {
      Authorization: `Bearer ${clientSecret}`,
    },
  });
};

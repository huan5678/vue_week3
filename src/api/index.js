import axios from "axios";

const baseUrl = "https://vue3-course-api.hexschool.io/v2/";

export function Api({ method, url, data = null, token }) {
  let baseURL = `${baseUrl}${url}`;

  const requestConfig = {
    method,
    url: baseURL,
    data,
    headers: {
      Authorization: token,
    },
  };

  return axios(requestConfig);
}

export default Api;

const imgurUrl = "https://api.imgur.com/3/";

const imgurAccessToken = import.meta.env.VITE_IMGUR_ACCESS_TOKEN;
const imgurClientID = import.meta.env.VITE_IMGUR_CLIENT_ID;

const album = "qJlhWSN";

export const uploadImg = (file) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("album", album);

  const requestConfig = {
    method: "post",
    url: `${imgurUrl}image`,
    headers: {
      Authorization: `Bearer ${imgurAccessToken}`,
    },
    data: formData,
  };

  return axios(requestConfig);
};

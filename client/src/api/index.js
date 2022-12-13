import axios from "axios";

export const SERVER_URL = "http://localhost:5000";

export const getList = async (page = 0, limit = 20, text = "") => {
  const searchParams = new URLSearchParams();
  searchParams.append("page", page);
  searchParams.append("limit", limit);
  searchParams.append("text", text);

  return await axios.get(
    `${SERVER_URL}/list/getList?${searchParams.toString()}`
  );
};

export const getSearchHistory = async () => {
  return await axios.get(`${SERVER_URL}/search/getSearchHistory`);
};

export const addOneSearch = async (text) => {
  return await axios.post(`${SERVER_URL}/search/addOneSearch?text=${text}`);
};

export const changeSelectionList = async (id) => {
  return await axios.put(`${SERVER_URL}/list/changeSelectedElement?id=${id}`);
};

export const sortList = async (fromId, toId) => {
  const searchParams = new URLSearchParams();
  searchParams.append("fromId", fromId);
  searchParams.append("toId", toId);

  return await axios.get(
    `${SERVER_URL}/list/sortList?${searchParams.toString()}`
  );
};

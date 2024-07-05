import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postBlog = async (data) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, data, config);
  return response.data;
};

const putBlog = async (id, data) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, data, config);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("loggedNoteappUser")}`,
    },
  };

  try {
    const response = await axios.delete(`${baseUrl}/${blogId}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { getAll, setToken, postBlog, putBlog, deleteBlog };

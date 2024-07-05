import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  console.log("Sending login request with credentials:", credentials);
  try {
    const response = await axios.post(baseUrl, credentials);
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export default { login };

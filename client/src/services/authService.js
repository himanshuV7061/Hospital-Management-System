import axios from "axios";

const API_URL = "https://hospital-management-system-4kjr.onrender.com/api/auth";



// REGISTER USER
export const registerUser = async (userData) => {

  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  return response.data;
};




// LOGIN USER
export const loginUser = async (userData) => {

  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  return response.data;
};
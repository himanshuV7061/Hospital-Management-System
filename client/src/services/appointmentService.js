import axios from "axios";

const API_URL =
  "http://localhost:5000/api/appointments";



// CREATE APPOINTMENT
export const createAppointment = async (
  appointmentData
) => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );



  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };



  const response = await axios.post(
    API_URL,
    appointmentData,
    config
  );

  return response.data;
};




// GET MY APPOINTMENTS
export const getMyAppointments = async () => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );



  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };



  const response = await axios.get(
    `${API_URL}/my`,
    config
  );

  return response.data;
};

export const getAllAppointments = async () => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );



  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };



  const response = await axios.get(
    API_URL,
    config
  );

  return response.data;
};
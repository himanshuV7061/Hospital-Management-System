import { Navigate } from "react-router-dom";

function PatientRoute({ children }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (userInfo.role !== "patient") {
    return <Navigate to="/admin-overview" />;
  }

  return children;
}

export default PatientRoute;
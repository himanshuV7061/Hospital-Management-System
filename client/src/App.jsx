import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import Emergency from "./pages/Emergency";
import MyMedicalRecords from "./pages/MyMedicalRecords";
import MyBills from "./pages/MyBills";

import AdminOverview from "./pages/AdminOverview";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEmergency from "./pages/AdminEmergency";
import Doctors from "./pages/Doctors";
import Admissions from "./pages/Admissions";
import Beds from "./pages/Beds";
import MedicalRecords from "./pages/MedicalRecords";
import Billing from "./pages/Billing";

import ProtectedRoute from "./components/ProtectedRoute";
import PatientRoute from "./components/PatientRoute";
import AdminRoute from "./components/AdminRoute";


import MyReports from "./pages/MyReports";
import Reports from "./pages/Reports";
import MyHealthCard from "./pages/MyHealthCard";
import HealthCards from "./pages/HealthCards";


import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* PATIENT ROUTES */}
        <Route
          path="/dashboard"
          element={
            <PatientRoute>
              <Dashboard />
            </PatientRoute>
          }
        />

        <Route
  path="/profile"
  element={
    <PatientRoute>
      <Profile />
    </PatientRoute>
  }
/>
        <Route
  path="/my-health-card"
  element={
    <PatientRoute>
      <MyHealthCard />
    </PatientRoute>
  }
/>
        <Route
          path="/book-appointment"
          element={
            <PatientRoute>
              <BookAppointment />
            </PatientRoute>
          }
        />

        <Route
          path="/my-appointments"
          element={
            <PatientRoute>
              <MyAppointments />
            </PatientRoute>
          }
        />
        <Route
  path="/my-reports"
  element={
    <PatientRoute>
      <MyReports />
    </PatientRoute>
  }
/>

        <Route
          path="/emergency"
          element={
            <PatientRoute>
              <Emergency />
            </PatientRoute>
          }
        />

        <Route
          path="/my-medical-records"
          element={
            <PatientRoute>
              <MyMedicalRecords />
            </PatientRoute>
          }
        />

        <Route
          path="/my-bills"
          element={
            <PatientRoute>
              <MyBills />
            </PatientRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin-overview"
          element={
            <AdminRoute>
              <AdminOverview />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-emergency"
          element={
            <AdminRoute>
              <AdminEmergency />
            </AdminRoute>
          }
        />

        <Route
          path="/doctors"
          element={
            <AdminRoute>
              <Doctors />
            </AdminRoute>
          }
        />

        <Route
          path="/admissions"
          element={
            <AdminRoute>
              <Admissions />
            </AdminRoute>
          }
        />

        <Route
          path="/beds"
          element={
            <AdminRoute>
              <Beds />
            </AdminRoute>
          }
        />

        <Route
          path="/medical-records"
          element={
            <AdminRoute>
              <MedicalRecords />
            </AdminRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <AdminRoute>
              <Billing />
            </AdminRoute>
          }
        />
        <Route
  path="/health-cards"
  element={
    <AdminRoute>
      <HealthCards />
    </AdminRoute>
  }
/>

        <Route
  path="/reports"
  element={
    <AdminRoute>
      <Reports />
    </AdminRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
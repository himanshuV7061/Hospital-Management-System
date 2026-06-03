import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Billing() {
  const [bills, setBills] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [formData, setFormData] = useState({
    patient: "",
    appointment: "",
    amount: "",
    description: "",
    useHealthCard: false,
  });

  useEffect(() => {
    fetchBills();
    fetchAppointments();
  }, []);

  const getConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    return {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  };

  const fetchBills = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/bills",
        getConfig()
      );

      setBills(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/appointments",
        getConfig()
      );

      setAppointments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAppointmentSelect = (e) => {
    const appointmentId = e.target.value;

    const selectedAppointment = appointments.find(
      (appointment) => appointment._id === appointmentId
    );

    setFormData({
      ...formData,
      appointment: appointmentId,
      patient: selectedAppointment?.patient?._id || "",
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "useHealthCard") {
      setFormData({
        ...formData,
        useHealthCard: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const createBill = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/bills",
        formData,
        getConfig()
      );

      alert("Bill Created");

      setFormData({
        patient: "",
        appointment: "",
        amount: "",
        description: "",
        useHealthCard: false,
      });

      fetchBills();
    } catch (error) {
      console.log(error);
      alert("Failed to create bill");
    }
  };

  const markPaid = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bills/${id}/pay`,
        {},
        getConfig()
      );

      alert("Bill Marked Paid");
      fetchBills();
    } catch (error) {
      console.log(error);
      alert("Failed to update bill");
    }
  };

  const statusStyle = (status) => {
    if (status === "Paid") {
      return "bg-green-500/20 text-green-300 border-green-400/30";
    }

    return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-700 via-slate-800 to-black p-8 rounded-3xl shadow-2xl mb-10">
          <div className="absolute right-[-50px] top-[-50px] w-52 h-52 bg-cyan-400/20 rounded-full blur-3xl"></div>

          <p className="text-cyan-300 font-semibold mb-2">
            Revenue & Coverage
          </p>

          <h1 className="text-5xl font-black mb-3">
            Billing Management
          </h1>

          <p className="text-slate-300">
            Generate bills, apply health card coverage, and track payment status.
          </p>
        </div>

        <form
          onSubmit={createBill}
          className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl mb-10"
        >
          <h2 className="text-3xl font-black mb-6">
            Create Bill
          </h2>

          <select
            name="appointment"
            value={formData.appointment}
            onChange={handleAppointmentSelect}
            className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-white mb-4"
          >
            <option value="">Select Appointment</option>

            {appointments.map((appointment) => (
              <option key={appointment._id} value={appointment._id}>
                {appointment.patient?.name} - {appointment.department}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="bg-slate-900 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-400"
            />

            <label className="bg-slate-900 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
              <input
                type="checkbox"
                name="useHealthCard"
                checked={formData.useHealthCard}
                onChange={handleChange}
              />
              Apply verified health card coverage
            </label>
          </div>

          <textarea
            name="description"
            placeholder="Bill Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-400 mt-4"
          />

          <button
            type="submit"
            className="mt-5 bg-cyan-400 text-slate-950 px-6 py-3 rounded-xl font-black hover:bg-cyan-300"
          >
            Create Bill
          </button>
        </form>

        <div className="grid gap-6">
          {bills.map((bill) => (
            <div
              key={bill._id}
              className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl"
            >
              <div className="flex justify-between gap-4 flex-wrap mb-4">
                <div>
                  <h2 className="text-3xl font-black">
                    {bill.patient?.name}
                  </h2>

                  <p className="text-slate-300">
                    {bill.patient?.email}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full border font-bold h-fit ${statusStyle(
                    bill.status
                  )}`}
                >
                  {bill.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
                <p>
                  <span className="text-white font-semibold">Original:</span>{" "}
                  ₹{bill.amount}
                </p>

                <p>
                  <span className="text-white font-semibold">Coverage:</span>{" "}
                  ₹{bill.coverageApplied || 0}
                </p>

                <p>
                  <span className="text-white font-semibold">Final:</span>{" "}
                  ₹
                  {bill.finalAmount !== undefined
                    ? bill.finalAmount
                    : bill.amount}
                </p>
              </div>

              <p className="text-slate-300 mt-4">
                <span className="text-white font-semibold">Description:</span>{" "}
                {bill.description}
              </p>

              <p className="text-slate-300 mt-2">
                <span className="text-white font-semibold">
                  Health Card Used:
                </span>{" "}
                {bill.coveredByHealthCard ? "Yes" : "No"}
              </p>

              {bill.status !== "Paid" && (
                <button
                  onClick={() => markPaid(bill._id)}
                  className="mt-5 bg-green-600 px-5 py-3 rounded-xl font-bold hover:bg-green-500"
                >
                  Mark Paid
                </button>
              )}
            </div>
          ))}

          {bills.length === 0 && (
            <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">
              No bills created yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Billing;
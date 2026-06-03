import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyAppointments } from "../services/appointmentService";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getMyAppointments();
        setAppointments(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
  }, []);

  const statusStyle = (status) => {
    if (status === "Approved") {
      return "bg-green-500/20 text-green-300 border-green-400/30";
    }

    if (status === "Rejected") {
      return "bg-red-500/20 text-red-300 border-red-400/30";
    }

    if (status === "Completed") {
      return "bg-blue-500/20 text-blue-300 border-blue-400/30";
    }

    return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-cyan-600 to-teal-500 p-8 rounded-3xl shadow-2xl mb-10">
          <div className="absolute right-[-50px] top-[-50px] w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

          <p className="text-cyan-100 font-semibold mb-2">
            Patient Schedule
          </p>

          <h1 className="text-5xl font-black mb-3">
            My Appointments
          </h1>

          <p className="text-blue-50">
            Track your bookings, assigned doctor, appointment date and hospital approval status.
          </p>
        </div>

        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl"
            >
              <div className="flex justify-between gap-4 flex-wrap mb-5">
                <div>
                  <h2 className="text-3xl font-black">
                    {appointment.department}
                  </h2>

                  <p className="text-slate-300 mt-1">
                    Symptoms: {appointment.symptoms}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full border font-bold h-fit ${statusStyle(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
                <p>
                  <span className="text-white font-semibold">Date:</span>{" "}
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </p>

                <p>
                  <span className="text-white font-semibold">
                    Assigned Doctor:
                  </span>{" "}
                  {appointment.doctor
                    ? `Dr. ${appointment.doctor.name}`
                    : "Not assigned yet"}
                </p>

                <p>
                  <span className="text-white font-semibold">
                    Specialization:
                  </span>{" "}
                  {appointment.doctor?.specialization || "N/A"}
                </p>
              </div>
            </div>
          ))}

          {appointments.length === 0 && (
            <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">
              No appointments booked yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAppointments;
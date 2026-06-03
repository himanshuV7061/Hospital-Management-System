import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function MyMedicalRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchMyRecords();
  }, []);

  const getConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    return {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  };

  const fetchMyRecords = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/medical-records/my",
        getConfig()
      );

      setRecords(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-600 p-8 rounded-3xl shadow-2xl mb-10">
          <div className="absolute right-[-50px] top-[-50px] w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

          <p className="text-blue-100 font-semibold mb-2">
            Personal Health History
          </p>

          <h1 className="text-5xl font-black mb-3">
            My Medical Records
          </h1>

          <p className="text-blue-50">
            View your diagnosis, prescriptions, notes and appointment-linked treatment history.
          </p>
        </div>

        <div className="grid gap-6">
          {records.map((record) => (
            <div
              key={record._id}
              className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl"
            >
              <h2 className="text-3xl font-black mb-3">
                {record.appointment?.department || "Medical Record"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300 mb-5">
                <p>
                  <span className="text-white font-semibold">Date:</span>{" "}
                  {record.appointment?.appointmentDate
                    ? new Date(
                        record.appointment.appointmentDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>

                <p>
                  <span className="text-white font-semibold">Symptoms:</span>{" "}
                  {record.appointment?.symptoms || "N/A"}
                </p>

                <p>
                  <span className="text-white font-semibold">Diagnosis:</span>{" "}
                  {record.diagnosis}
                </p>
              </div>

              <div className="bg-slate-900/70 border border-white/10 p-5 rounded-2xl">
                <p className="text-cyan-300 font-bold mb-2">
                  Prescription
                </p>

                <p className="text-slate-200">
                  {record.prescription}
                </p>
              </div>

              <div className="bg-slate-900/70 border border-white/10 p-5 rounded-2xl mt-4">
                <p className="text-cyan-300 font-bold mb-2">
                  Notes
                </p>

                <p className="text-slate-200">
                  {record.notes || "No additional notes"}
                </p>
              </div>
            </div>
          ))}

          {records.length === 0 && (
            <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">
              No medical records found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyMedicalRecords;
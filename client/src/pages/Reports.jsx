import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const getConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    return {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  };

  const fetchReports = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/reports",
        getConfig()
      );

      setReports(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-cyan-700 via-blue-700 to-indigo-700 p-8 rounded-3xl shadow-2xl mb-10">
          <div className="absolute right-[-50px] top-[-50px] w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

          <p className="text-cyan-100 font-semibold mb-2">
            Patient Documents
          </p>

          <h1 className="text-5xl font-black mb-3">
            Uploaded Reports
          </h1>

          <p className="text-cyan-50">
            View uploaded patient reports, scans, files and medical documents.
          </p>
        </div>

        <div className="grid gap-6">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl"
            >
              <div className="flex justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-3xl font-black">
                    {report.title}
                  </h2>

                  <p className="text-slate-300 mt-1">
                    Patient: {report.patient?.name}
                  </p>

                  <p className="text-slate-300">
                    Email: {report.patient?.email}
                  </p>
                </div>

                <a
                  href={`http://localhost:5000/${report.file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-cyan-400 text-slate-950 px-5 py-3 rounded-xl font-black h-fit hover:bg-cyan-300"
                >
                  View Report
                </a>
              </div>
            </div>
          ))}

          {reports.length === 0 && (
            <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">
              No reports uploaded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;
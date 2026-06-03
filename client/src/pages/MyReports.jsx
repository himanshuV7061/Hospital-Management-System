import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function MyReports() {
  const [reports, setReports] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    file: null,
  });

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
        "https://hospital-management-system-4kjr.onrender.com/api/reports/my",
        getConfig()
      );

      setReports(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({
        ...formData,
        file: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const uploadReport = async (e) => {
    e.preventDefault();

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const data = new FormData();
      data.append("title", formData.title);
      data.append("file", formData.file);

      await axios.post("https://hospital-management-system-4kjr.onrender.com/api/reports", data, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Report Uploaded");

      setFormData({
        title: "",
        file: null,
      });

      fetchReports();
    } catch (error) {
      console.log(error);
      alert("Failed to upload report");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <Navbar />

      <div className="p-8">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-700 p-8 shadow-xl">
          <p className="text-sm text-cyan-100">Patient Portal</p>
          <h1 className="text-4xl font-bold mt-2">My Reports</h1>
          <p className="text-cyan-100 mt-2">
            Upload and view medical reports, scans, prescriptions, and lab
            files.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <form
            onSubmit={uploadReport}
            className="rounded-3xl bg-white/10 border border-white/10 p-7 shadow-xl backdrop-blur"
          >
            <h2 className="text-2xl font-semibold mb-5">Upload Report</h2>

            <input
              type="text"
              name="title"
              placeholder="Report Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 p-3 mb-4 rounded-xl outline-none"
              required
            />

            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 p-3 mb-5 rounded-xl"
              required
            />

            <button
              type="submit"
              className="w-full bg-cyan-500 text-slate-950 font-semibold py-3 rounded-xl hover:bg-cyan-400"
            >
              Upload Report
            </button>
          </form>

          <div className="rounded-3xl bg-white/10 border border-white/10 p-7 shadow-xl backdrop-blur">
            <h2 className="text-2xl font-semibold mb-5">Uploaded Reports</h2>

            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report._id}
                  className="rounded-2xl bg-white/10 border border-white/10 p-5"
                >
                  <h3 className="text-xl font-bold">{report.title}</h3>

                  <p className="text-slate-300 text-sm mt-1">
                    Uploaded:{" "}
                    {report.createdAt
                      ? new Date(report.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <a
                    href={`https://hospital-management-system-4kjr.onrender.com/${report.file}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 text-cyan-300 underline"
                  >
                    View Report
                  </a>
                </div>
              ))}

              {reports.length === 0 && (
                <p className="text-slate-300">
                  No reports uploaded yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyReports;
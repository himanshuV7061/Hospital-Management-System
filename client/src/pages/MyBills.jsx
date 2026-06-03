import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function MyBills() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
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
        "http://localhost:5000/api/bills/my",
        getConfig()
      );

      setBills(data);
    } catch (error) {
      console.log(error);
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
            Patient Billing
          </p>

          <h1 className="text-5xl font-black mb-3">
            My Bills
          </h1>

          <p className="text-slate-300">
            View hospital charges, insurance coverage, and payment status.
          </p>
        </div>

        <div className="grid gap-6">
          {bills.map((bill) => (
            <div
              key={bill._id}
              className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl"
            >
              <div className="flex justify-between gap-4 flex-wrap mb-5">
                <div>
                  <h2 className="text-3xl font-black">
                    ₹
                    {bill.finalAmount !== undefined
                      ? bill.finalAmount
                      : bill.amount}
                  </h2>

                  <p className="text-slate-300 mt-1">
                    {bill.description}
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
                  <span className="text-white font-semibold">
                    Original Amount:
                  </span>{" "}
                  ₹{bill.amount}
                </p>

                <p>
                  <span className="text-white font-semibold">
                    Coverage Applied:
                  </span>{" "}
                  ₹{bill.coverageApplied || 0}
                </p>

                <p>
                  <span className="text-white font-semibold">
                    Health Card:
                  </span>{" "}
                  {bill.coveredByHealthCard ? "Used" : "Not Used"}
                </p>
              </div>
            </div>
          ))}

          {bills.length === 0 && (
            <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">
              No bills available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBills;
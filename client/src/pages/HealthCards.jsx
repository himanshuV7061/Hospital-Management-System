import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function HealthCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const getConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    return {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  };

  const fetchCards = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/health-cards",
        getConfig()
      );

      setCards(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    const remarks = prompt("Enter remarks:");

    try {
      await axios.put(
        `http://localhost:5000/api/health-cards/${id}/status`,
        { status, remarks },
        getConfig()
      );

      alert("Health card status updated");
      fetchCards();
    } catch (error) {
      console.log(error);
      alert("Failed to update health card");
    }
  };

  const statusStyle = (status) => {
    if (status === "Verified") {
      return "bg-green-500/20 text-green-300 border-green-400/30";
    }

    if (status === "Rejected") {
      return "bg-red-500/20 text-red-300 border-red-400/30";
    }

    return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-green-700 via-emerald-600 to-teal-500 p-8 rounded-3xl shadow-2xl mb-10">
          <div className="absolute right-[-50px] top-[-50px] w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

          <p className="text-green-100 font-semibold mb-2">
            Government Scheme Verification
          </p>

          <h1 className="text-5xl font-black mb-3">
            Health Cards
          </h1>

          <p className="text-green-50">
            Verify Ayushman Bharat and government health card submissions for treatment coverage.
          </p>
        </div>

        <div className="grid gap-6">
          {cards.map((card) => (
            <div
              key={card._id}
              className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl"
            >
              <div className="flex justify-between gap-4 flex-wrap mb-5">
                <div>
                  <h2 className="text-3xl font-black">
                    {card.patient?.name}
                  </h2>

                  <p className="text-slate-300">
                    {card.patient?.email}
                  </p>

                  <p className="text-slate-300">
                    Blood Group: {card.patient?.bloodGroup || "N/A"}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full border font-bold h-fit ${statusStyle(
                    card.status
                  )}`}
                >
                  {card.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
                <p>
                  <span className="text-white font-semibold">Holder:</span>{" "}
                  {card.cardHolderName}
                </p>

                <p>
                  <span className="text-white font-semibold">Card No:</span>{" "}
                  {card.cardNumber}
                </p>

                <p>
                  <span className="text-white font-semibold">Coverage:</span>{" "}
                  ₹{card.coverageAmount}
                </p>
              </div>

              <p className="text-slate-300 mt-4">
                <span className="text-white font-semibold">Scheme:</span>{" "}
                {card.schemeName}
              </p>

              <p className="text-slate-300 mt-2">
                <span className="text-white font-semibold">Remarks:</span>{" "}
                {card.remarks || "No remarks"}
              </p>

              <div className="flex gap-3 flex-wrap mt-5">
                {card.cardFile && (
                  <a
                    href={`http://localhost:5000/${card.cardFile}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-cyan-400 text-slate-950 px-5 py-3 rounded-xl font-black hover:bg-cyan-300"
                  >
                    View Card
                  </a>
                )}

                <button
                  onClick={() => updateStatus(card._id, "Verified")}
                  className="bg-green-600 px-5 py-3 rounded-xl font-bold hover:bg-green-500"
                >
                  Verify
                </button>

                <button
                  onClick={() => updateStatus(card._id, "Rejected")}
                  className="bg-red-600 px-5 py-3 rounded-xl font-bold hover:bg-red-500"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}

          {cards.length === 0 && (
            <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">
              No health cards submitted yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HealthCards;
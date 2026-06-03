import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function MyHealthCard() {
  const [card, setCard] = useState(null);
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    schemeName: "Ayushman Bharat",
    coverageAmount: 500000,
    cardFile: null,
  });

  useEffect(() => {
    fetchMyCard();
  }, []);

  const getConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    return {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  };

  const fetchMyCard = async () => {
    try {
      const { data } = await axios.get(
        "https://hospital-management-system-4kjr.onrender.com/api/health-cards/my",
        getConfig()
      );
      setCard(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "cardFile") {
      setFormData({ ...formData, cardFile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const submitCard = async (e) => {
    e.preventDefault();

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const data = new FormData();
      data.append("cardHolderName", formData.cardHolderName);
      data.append("cardNumber", formData.cardNumber);
      data.append("schemeName", formData.schemeName);
      data.append("coverageAmount", formData.coverageAmount);

      if (formData.cardFile) {
        data.append("cardFile", formData.cardFile);
      }

      await axios.post("https://hospital-management-system-4kjr.onrender.com/api/health-cards", data, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Health card submitted for verification");

      setFormData({
        cardHolderName: "",
        cardNumber: "",
        schemeName: "Ayushman Bharat",
        coverageAmount: 500000,
        cardFile: null,
      });

      fetchMyCard();
    } catch (error) {
      console.log(error);
      alert("Failed to submit health card");
    }
  };

  const statusStyle = {
    Pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    Verified: "bg-green-500/20 text-green-300 border-green-500/30",
    Rejected: "bg-red-500/20 text-red-300 border-red-500/30",
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <Navbar />

      <div className="p-8">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-700 p-8 shadow-xl">
          <p className="text-sm text-cyan-100">Patient Portal</p>
          <h1 className="text-4xl font-bold mt-2">Government Health Card</h1>
          <p className="text-cyan-100 mt-2">
            Submit your Ayushman/government health card for hospital
            verification.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <form
            onSubmit={submitCard}
            className="rounded-3xl bg-white/10 border border-white/10 p-7 shadow-xl backdrop-blur"
          >
            <h2 className="text-2xl font-semibold mb-5">
              Submit Health Card
            </h2>

            <input
              type="text"
              name="cardHolderName"
              placeholder="Card Holder Name"
              value={formData.cardHolderName}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 p-3 mb-4 rounded-xl outline-none"
              required
            />

            <input
              type="text"
              name="cardNumber"
              placeholder="Health Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 p-3 mb-4 rounded-xl outline-none"
              required
            />

            <input
              type="text"
              name="schemeName"
              placeholder="Scheme Name"
              value={formData.schemeName}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 p-3 mb-4 rounded-xl outline-none"
            />

            <input
              type="number"
              name="coverageAmount"
              placeholder="Coverage Amount"
              value={formData.coverageAmount}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 p-3 mb-4 rounded-xl outline-none"
            />

            <input
              type="file"
              name="cardFile"
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 p-3 mb-5 rounded-xl"
            />

            <button
              type="submit"
              className="w-full bg-cyan-500 text-slate-950 font-semibold py-3 rounded-xl hover:bg-cyan-400"
            >
              Submit Card
            </button>
          </form>

          <div className="rounded-3xl bg-white/10 border border-white/10 p-7 shadow-xl backdrop-blur">
            <h2 className="text-2xl font-semibold mb-5">Verification Status</h2>

            {card ? (
              <div className="space-y-3">
                <p>Holder: {card.cardHolderName}</p>
                <p>Card Number: {card.cardNumber}</p>
                <p>Scheme: {card.schemeName}</p>
                <p>Coverage: ₹{card.coverageAmount}</p>

                <span
                  className={`inline-block px-4 py-2 rounded-full border text-sm ${
                    statusStyle[card.status] || statusStyle.Pending
                  }`}
                >
                  {card.status}
                </span>

                <p>Remarks: {card.remarks || "No remarks yet"}</p>

                {card.cardFile && (
                  <a
                    href={`https://hospital-management-system-4kjr.onrender.com/${card.cardFile}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-cyan-300 underline"
                  >
                    View Uploaded Card
                  </a>
                )}
              </div>
            ) : (
              <p className="text-slate-300">
                No health card submitted yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyHealthCard;
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const getConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    return {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  };

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(
        "https://hospital-management-system-4kjr.onrender.com/api/auth/profile",
        getConfig()
      );

      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        "https://hospital-management-system-4kjr.onrender.com/api/auth/profile",
        profile,
        getConfig()
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      alert("Profile updated successfully");
      setEditMode(false);
      fetchProfile();
    } catch (error) {
      console.log(error);
      alert("Profile update failed");
    }
  };

  const fields = [
    ["name", "Full Name"],
    ["age", "Age"],
    ["sex", "Sex"],
    ["bloodGroup", "Blood Group"],
    ["height", "Height"],
    ["weight", "Weight"],
    ["phone", "Phone Number"],
    ["emergencyContact", "Emergency Contact"],
    ["address", "Address"],
    ["allergies", "Allergies"],
    ["medicalHistory", "Medical History"],
  ];

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <Navbar />

      <div className="p-8">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-700 p-8 shadow-xl">
          <p className="text-sm text-cyan-100">Patient Portal</p>
          <h1 className="text-4xl font-bold mt-2">My Profile</h1>
          <p className="text-cyan-100 mt-2">
            View and update your personal medical profile.
          </p>
        </div>

        <div className="rounded-3xl bg-white/10 border border-white/10 p-8 shadow-xl backdrop-blur max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold">{profile.name}</h2>
              <p className="text-slate-300">{profile.email}</p>
            </div>

            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-cyan-500 text-slate-950 px-5 py-2 rounded-xl font-semibold"
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {!editMode ? (
            <div className="grid md:grid-cols-2 gap-4">
              {fields.map(([key, label]) => (
                <div
                  key={key}
                  className="bg-white/10 border border-white/10 rounded-2xl p-4"
                >
                  <p className="text-slate-400 text-sm">{label}</p>
                  <p className="font-semibold">
                    {profile[key] || "Not added"}
                  </p>
                </div>
              ))}

              <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                <p className="text-slate-400 text-sm">Role</p>
                <p className="font-semibold">{profile.role}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={updateProfile} className="grid md:grid-cols-2 gap-4">
              {fields.map(([key, label]) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  placeholder={label}
                  value={profile[key] || ""}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/20 p-3 rounded-xl outline-none"
                />
              ))}

              <button
                type="submit"
                className="md:col-span-2 bg-green-500 text-slate-950 font-semibold py-3 rounded-xl hover:bg-green-400"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
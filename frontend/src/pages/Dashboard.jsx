import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(data);
      } catch (err) {
        setError("Failed to fetch user details.");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold mb-4">Welcome to Dashboard</h2>

        {error && <p className="text-red-500">{error}</p>}
        {user ? (
          <div>
            <p className="text-gray-700 mb-2">Hello, {user.name}</p>
            <button
              onClick={() => navigate("/detection")}
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 mb-4"
            >
              Go to Detection
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white w-full py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

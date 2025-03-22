import { useState } from "react";
import axios from "axios";

const Detection = () => {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!video) {
      setError("Please upload a video first.");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const { data } = await axios.post(
        "http://localhost:5000/api/video/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setResult(data);
    } catch (err) {
      console.error("Upload Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.error || "Failed to process video. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Deep Fake Video Detection
        </h2>

        <input
          type="file"
          accept="video/*"
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleFileChange}
        />

        {preview && (
          <video
            src={preview}
            controls
            className="w-full mb-4 rounded border"
          />
        )}

        {loading ? (
          <p className="text-blue-600">Processing video...</p>
        ) : (
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Upload & Detect
          </button>
        )}

        {result && (
          <div className="mt-4 border-t pt-4">
            <p className="text-gray-700 text-sm">
              <strong>Confidence:</strong>{" "}
              {result.confidence.toFixed(2)}%
            </p>
            <p
              className={`text-lg font-semibold ${
                result.isDeepfake
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {result.isDeepfake
                ? "This video is likely a Deep Fake"
                : "This video is real"}
            </p>
          </div>
        )}

        {error && (
          <p className="text-red-500 mt-4 font-semibold">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Detection;

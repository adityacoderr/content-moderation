import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AnalysisResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result || null;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!result) {
      navigate("/detection");
    } else {
      setLoading(false);
    }
  }, [result, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg font-bold text-blue-600">Processing result...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold mb-4">Analysis Result</h2>

        {result ? (
          <div>
            <p className="text-gray-700 mb-2">
              <strong>Confidence:</strong> {result.confidence ? result.confidence.toFixed(2) + "%" : "0.00%"}
            </p>
            <p
              className={`text-lg font-semibold mb-4 ${
                result.isDeepfake ? "text-red-600" : "text-green-600"
              }`}
            >
              {result.isDeepfake
                ? "This video is likely a Deep Fake"
                : "This video is real"}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No analysis data available.</p>
        )}

        <button
          onClick={() => navigate("/detection")}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 mb-4"
        >
          Analyze Another Video
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-600 text-white w-full py-2 rounded hover:bg-gray-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;

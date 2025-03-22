import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to DeepFake Detector</h1>
      <p className="text-gray-600 mb-6">Upload a video to check for deepfake analysis.</p>
      <Link to="/detection" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700">
        Start Detection
      </Link>
    </div>
  );
};

export default Home;

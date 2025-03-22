const Video = require("../models/Video");
const handleUpload = require("./uploadController");

const uploadVideo = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded!" });
  }

  try {
    const newVideo = new Video({
      user: req.user.id,
      filename: req.file.filename,
      filePath: req.file.path,
      result: "Pending",
    });

    await newVideo.save();

    const filePath = req.file.path;
    console.log(`🔹 Triggering model for file: ${filePath}`);

    try {
      const result = await handleUpload(filePath);

      newVideo.result = result.isDeepfake ? "Deepfake" : "Real";
      newVideo.confidence = result.confidence;
      await newVideo.save();

      res.status(201).json({
        message: "Video uploaded and analyzed successfully!",
        video: newVideo,
      });
    } catch (processingError) {
      console.error(` Processing Error: ${processingError.message}`);
      res.status(500).json({ message: "Error processing video", error: processingError.message });
    }
  } catch (error) {
    console.error(` Upload Error: ${error.message}`);
    res.status(500).json({ message: "Error uploading video", error: error.message });
  }
};

const getMyVideos = async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    console.error(` Fetch Error: ${error.message}`);
    res.status(500).json({ message: "Error fetching videos", error: error.message });
  }
};

module.exports = { uploadVideo, getMyVideos };

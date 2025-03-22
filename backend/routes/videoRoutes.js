const express = require("express");
const { uploadVideo, getMyVideos } = require("../controllers/videoController");
const upload = require("../utils/fileUpload");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("video"), uploadVideo);
router.get("/my-videos", authMiddleware, getMyVideos);

module.exports = router;

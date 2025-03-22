const path = require("path");
const { exec } = require("child_process");

const handleUpload = (filePath) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve(__dirname, "../../ml_model/analyze.py");
    const resolvedFilePath = path.resolve(filePath);

    console.log(`🔹 Triggering model for file: ${resolvedFilePath}`);
    console.log(`🔹 Executing: python "${scriptPath}" "${resolvedFilePath}"`);

    const process = exec(
      `python "${scriptPath}" "${resolvedFilePath}"`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(` Execution Error: ${error.message}`);
          return reject(new Error("Model execution failed."));
        }

        if (stderr) {
          console.error(` Stderr: ${stderr}`);
          return reject(new Error("Model execution error."));
        }

        if (!stdout) {
          console.error(` No Output: Model did not return any result.`);
          return reject(new Error("No output from model."));
        }

        try {
          const result = JSON.parse(stdout);
          console.log(" Model Result:", result);

          if (
            typeof result.isDeepfake === "undefined" ||
            typeof result.confidence === "undefined"
          ) {
            throw new Error("Invalid model output structure.");
          }

          resolve(result);
        } catch (parseError) {
          console.error(` JSON Parse Error: ${parseError.message}`);
          reject(new Error("Failed to parse model output."));
        }
      }
    );

    process.on("exit", (code) => {
      console.log(`🔹 Process exited with code: ${code}`);
    });

    process.on("error", (err) => {
      console.error(` Process Error: ${err.message}`);
      reject(new Error("Process execution error."));
    });
  });
};

module.exports = handleUpload;

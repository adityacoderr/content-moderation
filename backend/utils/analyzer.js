const { exec } = require('child_process');
const path = require('path');

const analyzeVideo = (filePath) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, '../../ml_model/analyze.py');
    const command = `python3 ${scriptPath} ${filePath}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${stderr}`);
        reject(stderr);
        return;
      }
      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch (parseError) {
        reject(`Error parsing JSON: ${parseError}`);
      }
    });
  });
};

module.exports = { analyzeVideo };

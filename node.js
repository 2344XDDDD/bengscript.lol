const fs = require("fs");
const path = require("path");

function updateStatus(newStatus) {
  const statusFile = path.join(__dirname, "public/status.json"); // public 是你的网站目录
  const data = {
    status: newStatus,
    updatedAt: Date.now()
  };
  fs.writeFileSync(statusFile, JSON.stringify(data, null, 2), "utf-8");
}

updateStatus("working");
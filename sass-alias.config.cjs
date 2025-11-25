const path = require("path");

module.exports = {
  aliases: {
    "@": path.resolve(__dirname, "src"),
    "@server": path.resolve(__dirname, "../server/src")
  }
};

// Tiny zero-dependency web server for the game (alternative to the
// "Live Server" VS Code extension).  Usage:  node server.js   (or npm start)
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT) || 8000;
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".gif": "image/gif",
  ".svg": "image/svg+xml", ".ttf": "font/ttf", ".pdf": "application/pdf",
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath.endsWith("/")) urlPath += "index.html";
  const file = path.normalize(path.join(root, urlPath));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end("Forbidden"); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
}).listen(port, () => {
  console.log(`Game running at http://localhost:${port}  (Ctrl+C to stop)`);
});

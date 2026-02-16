const http = require("http");
const crypto = require("crypto");
const { run } = require("../scripts/workflow-engine");

const SECRET = process.env.GITHUB_WEBHOOK_SECRET || "change-me";

function verifySignature(signature, payload) {
  const hmac = crypto.createHmac("sha256", SECRET);
  const digest = "sha256=" + hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

const server = http.createServer((req, res) => {
  if (req.method !== "POST") {
    res.writeHead(405);
    return res.end();
  }

  let body = "";
  req.on("data", chunk => (body += chunk));
  req.on("end", () => {
    const sig = req.headers["x-hub-signature-256"];
    if (!sig || !verifySignature(sig, body)) {
      res.writeHead(401);
      return res.end("Invalid signature");
    }

    const event = req.headers["x-github-event"];
    const safeEvent = String(event || "").replace(/[\r\n]/g, "");
    const payload = JSON.parse(body);

    console.log(`🔔 GitHub event: ${safeEvent}`);

    if (event === "pull_request") {
      const action = payload.action;
      if (["opened", "synchronize", "reopened"].includes(action)) {
        console.log("▶ Running authority workflows for PR...");
        run("issue_credit");
        run("approve_loan");
        run("disburse_funds");
      }
    }

    res.writeHead(200);
    res.end("OK");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});

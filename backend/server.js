import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

let cachedData = null;
let lastFetchTime = 0;

// Fetch crypto data and cache for 60 seconds
app.get("/api/crypto", async (req, res) => {
  const now = Date.now();

  // Use cache if less than 1 minute old
  if (cachedData && now - lastFetchTime < 60 * 1000) {
    return res.json(cachedData);
  }

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
    );
    const json = await response.json();

    // Validate and cache data
    if (json.bitcoin && json.ethereum) {
      cachedData = json;
      lastFetchTime = now;
      return res.json(json);
    } else {
      throw new Error("Invalid data format");
    }
  } catch (err) {
    console.error("Error fetching crypto data:", err);
    res.status(500).json({ error: "Failed to fetch crypto data" });
  }
});

app.get("/", (req, res) => res.send("✅ Backend running with caching"));
app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));

import { createContext, useContext, useEffect, useState } from "react";

const LiveDataContext = createContext(null);

export function LiveDataProvider({ children }) {
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch crypto market data from CoinGecko
  async function fetchCryptoData() {
    try {
      console.log("Fetching crypto data...");
      const res = await fetch("http://localhost:5000/api/crypto");
      console.log("Response status:", res.status);
      const json = await res.json();
      console.log("Backend response:", json);

      // ✅ Ensure the keys exist before using them

      const btcData = json.bitcoin;
      const ethData = json.ethereum;

      // ✅ New safer check
      if (!btcData?.usd || !ethData?.usd) {
        console.warn("Unexpected backend format:", json);
        return;
      }

      console.log("✅ Data fetched:", btcData, ethData);

      const btc = btcData.usd;
      const eth = ethData.usd;
      const btcChange = btcData.usd_24h_change?.toFixed(2);
      const ethChange = ethData.usd_24h_change?.toFixed(2);

      setData({
        metrics: {
          bitcoin: {
            name: "Bitcoin",
            current: btc.toLocaleString(),
            change: `${btcChange}%`,
            trend: btcChange >= 0 ? "up" : "down",
          },
          ethereum: {
            name: "Ethereum",
            current: eth.toLocaleString(),
            change: `${ethChange}%`,
            trend: ethChange >= 0 ? "up" : "down",
          },
        },
        history: [
          ...(data?.history || []),
          {
            t: Date.now(),
            bitcoin: btc,
            ethereum: eth,
          },
        ].slice(-30),
        breakdown: {
          btc: (btc / (btc + eth)) * 100,
          eth: (eth / (btc + eth)) * 100,
        },
      });

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Failed to fetch crypto data:", err);
    }
  }


  // Fetch every 10 seconds
  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LiveDataContext.Provider value={{ data, lastUpdated }}>
      {children}
    </LiveDataContext.Provider>
  );
}

export function useLiveDataContext() {
  const ctx = useContext(LiveDataContext);
  if (!ctx) throw new Error("useLiveDataContext must be used inside LiveDataProvider");
  return ctx;
}

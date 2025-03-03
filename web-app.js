import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: { vs_currency: "usd", order: "market_cap_desc", per_page: 5 },
        }
      );
      setCryptos(response.data);
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Crypto Price Tracker</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        style={{ padding: "8px", marginBottom: "10px" }}
      />
      <button onClick={fetchPrices} style={{ marginLeft: "10px", padding: "8px" }}>
        Refresh
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {cryptos
            .filter((crypto) => crypto.name.toLowerCase().includes(search))
            .map((crypto) => (
              <li key={crypto.id} style={{ margin: "10px 0" }}>
                <strong>{crypto.name}</strong> - ${crypto.current_price}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

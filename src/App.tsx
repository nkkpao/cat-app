import { useEffect, useState, useCallback } from "react";
import Checkbox from "./components/Checkbox";
import Button from "./components/Button/Button";
import CatImage from "./components/CatImage/CatImage";
import "./App.scss";

function App() {
  const [enabled, setEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fetchCat = useCallback(async () => {
    if (!enabled) return;
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search"
      );
      const data = await response.json();
      setImageUrl(data[0].url);
    } catch (err) {
      console.error("Failed to fetch cat:", err);
    }
  }, [enabled]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchCat();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh, fetchCat]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f2f2f2",
        color: "#333",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: 320,
          padding: 24,
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <Checkbox
          label="Enabled"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        />
        <Checkbox
          label="Auto-refresh every 5 second"
          checked={autoRefresh}
          onChange={() => setAutoRefresh(!autoRefresh)}
        />
        <Button onClick={fetchCat}>Get cat</Button>
        <CatImage imageUrl={imageUrl} />
      </div>
    </div>
  );
}

export default App;

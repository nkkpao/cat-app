import { useEffect, useState, useCallback } from "react";
import Checkbox from "./components/Checkbox";
import Button from "./components/Button/Button";
import CatImage from "./components/CatImage/CatImage";

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
        width: 300,
        margin: "30px auto",
        padding: 20,
        boxShadow: "0 0 5px #aaa",
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
  );
}

export default App;

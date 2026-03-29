import { useEffect, useState } from "react";

export default function useReport() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const kitId = localStorage.getItem("kit_id");

    if (!token || !kitId) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      try {
        const res = await fetch(
          `http://35.154.159.18:3000/api/report/${kitId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch report");
        }

        const json = await res.json();

        if (!json.success) {
          throw new Error(json.message);
        }

        setData(json);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();

  }, []);

  return { data, loading, error };
}

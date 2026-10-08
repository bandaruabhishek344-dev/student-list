import { useEffect, useState } from "react";

function useFetch(fetchFunction) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const result = await fetchFunction();

        setData(result);
      } catch (err) {
        setError("Failed to fetch food data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fetchFunction]);

  return {
    data,
    loading,
    error,
  };
}

export default useFetch;
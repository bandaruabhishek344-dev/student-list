import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(url);

      setData(res.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

export default useFetch;
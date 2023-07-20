import { useState, useEffect, SetStateAction } from "react";

interface FetchedData {
  data: {
    result: {
      data: any; // Adjust the type as per your data structure
    };
  };
}

const useGetRequest = (url: string) => {
  const [fetchedData, setData] = useState<FetchedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error as SetStateAction<Error | null>); // Cast 'error' as 'SetStateAction<Error | null>'
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { fetchedData, loading, error };
};

export default useGetRequest;

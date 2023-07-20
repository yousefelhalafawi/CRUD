import { useState } from "react";

const usePatchRequest = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patchData = async (data: any) => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      // Additional logic if needed, such as parsing response or updating state

      setLoading(false);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  return { patchData, loading, error };
};

export default usePatchRequest;

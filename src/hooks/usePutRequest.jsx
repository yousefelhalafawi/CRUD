import { useState } from 'react';

const usePutRequest = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const putData = async (data) => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      // Additional logic if needed, such as parsing response or updating state

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { putData, loading, error };
};

export default usePutRequest;

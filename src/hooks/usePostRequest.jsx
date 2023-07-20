import { useState } from 'react';

const usePostRequest = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (data) => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
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

  return { postData, loading, error };
};

export default usePostRequest;

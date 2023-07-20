import { useState } from 'react';

const useDeleteRequest = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async () => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      // Additional logic if needed, such as updating state

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default useDeleteRequest;

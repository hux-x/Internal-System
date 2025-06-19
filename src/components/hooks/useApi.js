import { useState, useCallback, useContext } from 'react';
import { OverallContext } from '../context/Overall';

const BASE_URL = 'https://internal.bewhoop.com/api';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {postRequestBody} = useContext(OverallContext);

  const request = useCallback(async ({ endpoint, method = 'GET', headers = {}, body = postRequestBody, params = {} }) => {
    setLoading(true);
    setError(null);

    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });

      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new Error(data?.message || response.statusText);
      }

      return data;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
};

export default useApi;

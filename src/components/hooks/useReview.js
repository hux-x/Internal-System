import { useCallback } from 'react';
import useApi from './useApi';

const useReviewApi = () => {
  const { request, loading, error } = useApi();

  // Create a new review
  const createReview = useCallback(async (reviewData) => {
    return await request({
      endpoint: '/api/reviews/create',  // Added '/api' prefix
      method: 'POST',
      body: reviewData
    });
  }, [request]);

  // Get reviews by type
  const getReviewsByType = useCallback(async (type) => {
    if (!['TI', 'PR', 'TS'].includes(type)) {
      throw new Error("Invalid review type. Must be 'TI', 'PR', or 'TS'");
    }
    return await request({
      endpoint: '/api/reviews',  // Added '/api' prefix and removed trailing slash
      params: { type }
    });
  }, [request]);

  // Get a single review by ID
  const getReview = useCallback(async (id) => {
    return await request({
      endpoint: `/api/reviews/${id}`  // Added '/api' prefix and removed trailing slash
    });
  }, [request]);

  // Update a review
  const updateReview = useCallback(async (id, updateData) => {
    return await request({
      endpoint: `/api/reviews/${id}`,  // Added '/api' prefix and removed trailing slash
      method: 'PUT',
      body: updateData
    });
  }, [request]);

  // Delete a review
  const deleteReview = useCallback(async (id) => {
    return await request({
      endpoint: `/api/reviews/${id}`,  // Added '/api' prefix and removed trailing slash
      method: 'DELETE'
    });
  }, [request]);

  return {
    createReview,
    getReviewsByType,
    getReview,
    updateReview,
    deleteReview,
    loading,
    error
  };
};

export default useReviewApi;
import React, { useContext, useEffect, useState } from 'react';
import { ArrowRight, User2 } from 'lucide-react';
import { OverallContext } from '../context/Overall';
import useReviewApi from '../hooks/useReview';
import PeerReviewContent from './PeerReviewContent';
import SelfReviewContent from './SelfReviewContent';

const ViewReviewModal = ({ reviewType = 'TR', ReviewId = 2 }) => {
  const { reviewModal, setReviewModal } = useContext(OverallContext);
  const [currentReviewData, setCurrentReviewData] = useState(null);
  const { getReview } = useReviewApi();

  const onClose = () => setReviewModal(false);

  useEffect(() => {
    const fetchData = async () => {
      const review = await getReview(ReviewId);
      setCurrentReviewData(review);
    };
    fetchData();
  }, [ReviewId]);

  if (!reviewModal || !currentReviewData) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start sm:items-center justify-center p-4 overflow-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b">
          <div className="flex items-center gap-2">
            <User2 className="w-5 h-5 text-black" />
            <h2 className="text-xl font-semibold text-black">View Review</h2>
          </div>
          <ArrowRight
            className="w-5 h-5 text-black cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Conditional Content */}
        {currentReviewData.type === 'PR' ? (
          <SelfReviewContent data={currentReviewData} />
        ) : (
          <PeerReviewContent data={currentReviewData} />
        )}
      </div>
    </div>
  );
};

export default ViewReviewModal;

import React, { useContext, useEffect, useState } from 'react';
import { ArrowRight, User2, TriangleAlert } from 'lucide-react';
import { FaArrowCircleRight, FaIdCard } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { OverallContext } from '../context/Overall';
import useReviewApi from '../hooks/useReview';
import reviewerIcon from '../../assets/review.png'; // Update path if needed

const ViewReviewModal = ({ reviewType = 'TS', ReviewId = 2 }) => {
  const { reviewModal, setReviewModal } = useContext(OverallContext);
  const [currentReviewData, setCurrentReviewData] = useState(null);
  const { getReview } = useReviewApi();

  const onClose = () => setReviewModal(false);

  useEffect(() => {
    const fetchData = async () => {
      const review = await getReview(ReviewId);
      // setCurrentReviewData(review); // Disabled for now
    };
    fetchData();
  }, [ReviewId]);

  // Dummy review data
  const dummyReview = {
    type: 'TI',
    ticket_reference: 'TCK-1234',
    module_name: 'Authentication Module',
    pr_link: 'https://github.com/example/repo/pull/42',
    status: 'In Review',
    reviewer_comments: 'Great implementation. A few edge cases need more tests.',
    check_list: {
      'Code is readable': true,
      'Unit tests included': false,
      'Follows architecture': true
    },
    action_items: [
      { task: 'Add unit tests for edge cases', priority: 'high' },
      { task: 'Refactor variable naming', priority: 'medium' }
    ],
    reviewee_details: {
      first_name: 'John',
      last_name: 'Doe'
    }
  };

  const data = currentReviewData || dummyReview;

  if (!reviewModal || !data) return null;

  const {
    type,
    ticket_reference,
    module_name,
    pr_link,
    status,
    reviewer_comments,
    check_list,
    action_items,
    reviewee_details,
  } = data;

  if (!['TI', 'TS'].includes(type)) return null;

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

        <div className="flex flex-col md:flex-row">
          {/* Checklist */}
          <div className="w-full md:w-1/2 px-8 py-6">
            <h3 className="flex items-center justify-center gap-2 text-base font-bold mb-2">
              <FaArrowCircleRight className="w-5 h-5 text-gray-800" />
              Checklist
            </h3>
            <hr className="mb-6" />
            <ul className="divide-y divide-gray-200">
              {check_list &&
                Object.entries(check_list).map(([label, value], idx) => (
                  <li key={idx} className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2 text-gray-800">
                      <FaArrowCircleRight className="w-4 h-4" />
                      <span className="text-sm font-bold">{label}</span>
                    </div>
                    <span className="text-sm">
                      {value ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-black text-white text-xs font-bold">
                          ✓
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-black text-black text-xs font-bold">
                          ✕
                        </span>
                      )}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-200"></div>

          {/* Meta Info */}
          <div className="w-full md:w-1/2 px-8 py-6">
            <h3 className="flex justify-center items-center gap-2 text-base font-bold mb-2">
              <FaIdCard className="w-5 h-5 text-gray-800" />
              Meta Data
            </h3>
            <hr className='mb-6' />
            <div className="space-y-3 text-gray-800 text-sm">
              <div className="flex justify-between mb-1.5">
                <span className='font-bold'>Type</span>
                <span>{type}</span>
              </div>
              <hr />
              <div className="flex justify-between mb-1.5">
                <span className='font-bold'>Ticket Reference</span>
                <span>{ticket_reference || '—'}</span>
              </div>
              <hr />
              <div className="flex justify-between mb-1.5">
                <span className='font-bold'>Module</span>
                <span>{module_name || '—'}</span>
              </div>
              <hr />
              <div className="flex justify-between mb-1.5">
                <span className='font-bold'>PR Link</span>
                {pr_link ? (
                  <a href={pr_link} target="_blank" rel="noreferrer" className="text-blue-500 underline">{pr_link}</a>
                ) : '—'}
              </div>
              <hr />
              <div className="flex justify-between mb-1.5">
                <span className='font-bold'>Status</span>
                <span>{status}</span>
              </div>
              <hr />
              <div className="flex gap-3 items-center mb-1.5">
                <img src={reviewerIcon} className="h-5" />
                <span className="font-bold">{reviewee_details?.first_name} {reviewee_details?.last_name}</span>
              </div>
              <hr />
            </div>
          </div>
        </div>

        {/* Reviewer Comments */}
        {reviewer_comments && (
          <div className="px-8 py-4 border-t">
            <h4 className="flex items-center gap-2 text-sm font-semibold mb-2">
              <TriangleAlert size={15} /> Reviewer Comments
            </h4>
            <div className="bg-gray-100 rounded-xl p-4 text-center text-sm text-gray-600">
              {reviewer_comments}
            </div>
          </div>
        )}

        {/* Action Items */}
        {action_items?.length > 0 && (
          <div className="px-8 py-6 border-t">
            <h4 className="flex items-center gap-2 text-sm font-semibold mb-2">
              <GiHamburgerMenu /> Action Items
            </h4>
            <div className="bg-gray-100 rounded-xl p-4 text-center text-sm text-gray-600 space-y-1">
              {action_items.map((item, index) => (
                <div key={index}>
                  <span className="font-bold">{item.task}</span>
                  {item.priority && (
                    <span className="ml-2 text-xs text-gray-500">
                      ({item.priority})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReviewModal;

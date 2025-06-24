import React, { useContext, useState } from 'react';
import sideImage from '../assets/performance-review.png';
import PerformanceReviewModal from '../components/blocks/PerformanceReviewModal'; // takes `open` (state) and `close` (func)
import { OverallContext } from '../components/context/Overall';

const PerformanceReviews = ({ editable = false }) => {
  const commonClasses = 'bg-gray-100 p-6 rounded-xl text-gray-500 text-sm flex-1 min-h-[100px] w-[60vw] mb-2';

  const score_card = [
    { label: 'Quality', key: 'score_quality' },
    { label: 'Ownership', key: 'score_ownership' },
    { label: 'Communication', key: 'score_communication' },
    { label: 'Learning', key: 'score_learning' },
    { label: 'Team fit', key: 'score_team_fit' },
  ];

  const [review, setReview] = useState({
    id: 1,
    type: 'PR',
    reviewer: "Hasnain",
    reviewee: "Ali",
    proud_of: "Delivered project X successfully.",
    main_contributions: "Led the backend API development.",
    learnings: "Improved time management.",
    blockers: "Lack of clear requirements.",
    self_improvement: "Wants to improve frontend skills.",
    next_goals: "Lead next sprint planning.",
    support_needed: "More mentorship from seniors.",
    open_notes: "Great team player.",
    score_ownership: 4,
    score_quality: 5,
    score_communication: 4,
    score_learning: 5,
    score_team_fit: 5
  });

  const {isPerformanceModalOpen:open,setIsPerformanceModalOpen: setOpen} = useContext(OverallContext)
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="h-[93vh] flex bg-white font-sans">
        {/* Fixed Side Image */}
        <div className="w-1/3 h-full">
          <img
            src={sideImage}
            alt="Performance Review"
            className="w-full h-full object-cover"
            onClick={() => setOpen(true)}
          />
        </div>

        {/* Scrollable Content Area */}
        <div className="w-2/3 h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-start p-10 pb-4">
            <h1 className="text-4xl font-bold">Performance Reviews</h1>
            <button className="text-2xl" onClick={() => setOpen(true)}>
              &#8594;
            </button>
          </div>

          {/* Scrollable Inner Content */}
          <div className="flex-1 overflow-y-auto px-10 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-full">
              {/* Left Column */}
              <div className="flex flex-col space-y-6">
                {/* Who Is Being Reviewed */}
                <div>
                  <p className="font-semibold mb-2">Who Is Being Reviewed</p>
                  <input
                    className="bg-gray-100 p-4 w-[30vw] rounded-xl text-sm text-gray-600"
                    value={review.reviewee}
                    readOnly={!editable}
                  />
                </div>

                {/* Score Card */}
                <div>
                  <h2 className="text-xl font-bold mb-2">Score Card</h2>
                  {score_card.map(({ label, key }) => (
                    <div key={key} className="border-b py-2 text-gray-700 text-sm">
                      <div className='flex justify-between'>
                        <p>{label}</p>
                        <p>{review[key]}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Wins */}
                <div className="flex-1 flex flex-col">
                  <h2 className="text-xl font-bold mb-2">Key Wins</h2>
                  <div className={commonClasses}>
                    <textarea
                      className="bg-transparent w-full h-full resize-none focus:outline-none"
                      defaultValue={review.proud_of}
                      readOnly={!editable}
                    />
                  </div>
                </div>

                {/* Challenges */}
                <div className="flex-1 flex flex-col">
                  <h2 className="text-xl font-bold mb-2">Challenges</h2>
                  <div className={commonClasses}>
                    <textarea
                      className="bg-transparent w-full h-full resize-none focus:outline-none"
                      defaultValue={review.blockers}
                      readOnly={!editable}
                    />
                  </div>
                </div>

                {/* Support Plan */}
                <div className="flex-1 flex flex-col">
                  <h2 className="text-xl font-bold mb-2">Support Plan</h2>
                  <div className={commonClasses}>
                    <textarea
                      className="bg-transparent w-full h-full resize-none focus:outline-none"
                      defaultValue={review.support_needed}
                      readOnly={!editable}
                    />
                  </div>
                </div>

                {/* Closing Note */}
                <div className="flex-1 flex flex-col">
                  <h2 className="text-xl font-bold mb-2">Closing Note</h2>
                  <div className={commonClasses}>
                    <textarea
                      className="bg-transparent w-full h-full resize-none focus:outline-none"
                      defaultValue={review.open_notes}
                      readOnly={!editable}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Who Is Reviewing */}
                <div>
                  <p className="font-semibold mb-2">Who Is Reviewing</p>
                  <div className="bg-gray-100 p-4 rounded-xl text-sm text-gray-600">
                    <input
                      className="bg-transparent w-full focus:outline-none"
                      value={review.reviewer}
                      readOnly={!editable}
                    />
                  </div>
                </div>

                {/* Next Month Goals */}
                <div>
                  <h2 className="text-xl font-bold mb-2">Next Month Goals</h2>
                  <div className="bg-gray-100 p-4 mb-2 rounded-xl text-sm text-gray-600">
                    <input
                      className="bg-transparent w-full focus:outline-none"
                      defaultValue={review.next_goals}
                      readOnly={!editable}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <PerformanceReviewModal open={open} action={handleClose} />
    </>
  );
};

export default PerformanceReviews;

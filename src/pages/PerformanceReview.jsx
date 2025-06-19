import React from 'react';
import sideImage from '../assets/performance-review.png';

const PerformanceReviews = () => {
  const commonClasses ='bg-gray-100 p-6 rounded-xl text-gray-500 text-sm flex-1 min-h-[100px] w-[60vw] mb-2';

  return (
    <div className="h-[93vh] flex bg-white font-sans ">
      {/* Fixed Side Image */}
      <div className="w-1/3 h-full">
        <img
          src={sideImage}
          alt="Performance Review"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Scrollable Content Area */}
      <div className="w-2/3 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start p-10 pb-4">
          <h1 className="text-4xl font-bold">Performance Reviews</h1>
          <button className="text-2xl">&#8594;</button>
        </div>

        {/* Scrollable Inner Content */}
        <div className="flex-1 overflow-y-auto px-10 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-full">
            {/* Left Column */}
            <div className="flex flex-col space-y-6">
              {/* Who Is Being Reviewed */}
              <div>
                <p className="font-semibold mb-2">Who Is Being Reviewed</p>
                <div className="bg-gray-100 p-4 rounded-xl text-sm text-gray-600">
                  Name of Reviewer
                </div>
              </div>

              {/* Score Card */}
              <div>
                <h2 className="text-xl font-bold mb-2">Score Card</h2>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="border-b py-2 text-gray-700 text-sm">
                    Who Is Being Reviewed
                  </div>
                ))}
              </div>

              {/* Key Wins */}
              <div className="flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-2">Key Wins</h2>
                <div className={commonClasses}>Eg. Feature</div>
              </div>

              {/* Challenges */}
              <div className="flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-2">Challenges</h2>
                <div className={commonClasses}>Eg. Feature</div>
              </div>

              {/* Support Plan */}
              <div className="flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-2">Support Plan</h2>
                <div className={commonClasses}>Eg. Feature</div>
              </div>

              {/* Closing Note */}
              <div className="flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-2">Closing Note</h2>
                <div className={ commonClasses}>Eg. Feature</div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Who Is Reviewing */}
              <div>
                <p className="font-semibold mb-2">Who Is Reviewing</p>
                <div className="bg-gray-100 p-4 rounded-xl text-sm text-gray-600">
                  Name of Reviewer
                </div>
              </div>

              {/* Next Month Goals */}
              <div>
                <h2 className="text-xl font-bold mb-2">Next Month Goals</h2>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-100 p-4 mb-2 rounded-xl text-sm text-gray-600"
                  >
                    Name of Reviewer
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReviews;

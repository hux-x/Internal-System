import React from 'react';
import { FaTimes } from 'react-icons/fa';
import sideImage from '../../assets/performance-review.png';

const PerformanceReviews = ({ editable = true, open, action = () => {}}) => {
  if (!open) return null;

  const commonClasses =
    'bg-gray-100 p-6 rounded-xl text-gray-500 text-sm flex-1 min-h-[100px] w-full mb-2'; // Changed to w-full
  const score_card = ['Quality', 'Ownership', 'Communication', 'Learning', 'Team fit'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {};
    formData.forEach((value, key) => {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    });

    console.log('Form Data:', data);
    action(data);
  };
  if(!open){
    return
  }

  return (
    open && 
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="h-[70vh] w-[80vw] flex bg-white font-sans rounded-xl shadow-2xl overflow-hidden relative">
          {/* Close button */}
          <button 
            onClick={action}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          >
            <FaTimes size={24} />
          </button>
          
          <div className="w-1/3 h-full">
            <img
              src={sideImage}
              alt="Performance Review"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-2/3 h-full flex flex-col overflow-hidden">
            <form className="flex-1 flex flex-col overflow-hidden" onSubmit={handleSubmit}>
              {/* Header */}
              <div className="flex justify-between items-start p-10 pb-4">
                <h1 className="text-4xl font-bold">Performance Reviews</h1>
                {editable ? (
                  <button
                    type="submit"
                    className="bg-red-700 text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-red-800 transition-colors"
                  >
                    Submit
                  </button>
                ) : (
                  <button type="button" className="text-2xl">&#8594;</button>
                )}
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
                        name="reviewee"
                        className="bg-gray-100 p-4 rounded-xl text-sm text-gray-600 w-[20vw]"
                        placeholder="Name of Reviewee"
                        readOnly={!editable}
                      />
                    </div>

                    {/* Score Card */}
                    <div>
                      <h2 className="text-xl font-bold mb-2">Score Card</h2>
                      {score_card.map((label, idx) => (
                        <div
                          key={idx}
                          className="border-b py-2 text-gray-700 text-sm flex justify-between"
                        >
                          <p>{label}</p>
                          <select
                            name={`score_${label.toLowerCase().replace(' ', '_')}`}
                            className="bg-gray-100 rounded-xl px-4 py-2"
                            disabled={!editable}
                          >
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num}>{num}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>

                    {/* Narrower section for these items */}
                    <div className="w-[47VW] space-y-6"> {/* Added width constraint here */}
                      {['Key Wins', 'Challenges', 'Support Plan', 'Closing Note'].map((label, i) => (
                        <div key={i} className="flex-1 flex flex-col">
                          <h2 className="text-xl font-bold mb-2">{label}</h2>
                          <div className={commonClasses}>
                            <textarea
                              name={label.toLowerCase().replace(/ /g, '_')}
                              className="bg-transparent w-full h-full resize-none focus:outline-none"
                              placeholder="Eg. Feature"
                              readOnly={!editable}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Who Is Reviewing */}
                    <div>
                      <p className="font-semibold mb-2">Who Is Reviewing</p>
                      <div className="bg-gray-100 p-4 rounded-xl text-sm text-gray-600">
                        <input
                          name="reviewer"
                          className="bg-transparent w-full focus:outline-none"
                          placeholder="Name of Reviewer"
                          readOnly={!editable}
                        />
                      </div>
                    </div>

                    {/* Next Month Goals */}
                    <div>
                      <h2 className="text-xl font-bold mt-10">Next Month Goals</h2>
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-100 p-4 mb-4 mt-2 rounded-xl text-sm text-gray-600"
                        >
                          <input
                            name={`goal_${idx + 1}`}
                            className="bg-transparent w-full focus:outline-none"
                            placeholder="Next Goal"
                            readOnly={!editable}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  );

};

export default PerformanceReviews;
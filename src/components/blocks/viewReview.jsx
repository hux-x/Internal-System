import React, { useContext, useEffect } from 'react';
import { ArrowRight, Hash, User2,NotepadText,TriangleAlert } from 'lucide-react';
import {FaIdCard,FaArrowCircleRight} from 'react-icons/fa';
import { checklistLabels } from '../utils/demo_data'; // Assuming you have a file with checklist labels
import { OverallContext } from '../context/Overall';
import { GiHamburgerMenu } from "react-icons/gi";
import reviewerIcon from '../../assets/review.png'; // Assuming you have a reviewer icon
const ViewReviewModal = () => {
  const { reviewModal, setReviewModal,currentReviewData } = useContext(OverallContext);
 
  const onClose = () => setReviewModal(false);
//currentReviewData contains the data for the review being viewed so need to extract from here once api functional
  if (!reviewModal) return null; //if not open
useEffect(() => {
    if (!currentReviewData) {
      console.error('No review data available');
    }console.log(currentReviewData)
  } , [currentReviewData]);
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

        {/* Checklist & Meta Data */}
        <div className="flex flex-col md:flex-row">
          
          {/* Checklist Column */}
          <div className="w-full md:w-1/2 px-8 py-6">
            <h3 className="flex items-center justify-center gap-2 text-base font-bold mb-2">
              <NotepadText className="w-5 h-5 text-gray-800" />
              Checklist
            </h3 >
            <hr className="mb-6"/>
            <ul className=" divide-y divide-gray-200">
            {checklistLabels.map((label, idx) => (
               <li key={idx} className="flex justify-between items-center py-2 ">
                 <div className="flex items-center gap-2 text-gray-800">
                   <FaArrowCircleRight className="w-4 h-4" />
                   <span className="text-sm font-bold">{label}</span>
                 </div>
                 <span className="text-sm ">5</span>

               </li>
             ))}
            </ul>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px bg-gray-200"></div>

          {/* Meta Data Column */}
          <div className="w-full md:w-1/2 px-8 py-6">
            <h3 className="flex  justify-center items-center gap-2 text-base font-bold mb-2">
              <FaIdCard className="w-5 h-5 text-gray-800" />
              Meta Data
            </h3>
            <hr className='mb-6'/>
            <div className="space-y-3 text-gray-800 text-sm">
                <div ><div className="flex justify-between mb-1.5">
                <span className='font-bold'>Type</span>
                <span>Feature</span>
              </div>
              <hr /></div>
              <div><div className="flex justify-between mb-1.5">
                <span className='font-bold'>Overall Score</span>
                <span >Feature</span>
              </div><hr /></div>
              
              <div>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-1">
                  <Hash className="w-4 h-4" />
                  <span className='font-bold'>Ticket Number</span>
                </div>
                <span >0005</span>
              </div>
              <hr />
              </div>
              <div><div className="flex gap-3 items-center mb-1.5">
                 <img src={reviewerIcon} className="h-5" />
                <span className="font-bold">{currentReviewData.reviewer||currentReviewData.reviewee}</span>
              </div><hr /></div>
            </div>
          </div>
          <hr className="border-t border-gray-200 mx-8" />
        </div>

        {/* Reviewer Comments */}
        <div className="px-8 py-4 border-t">
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-2">
            <TriangleAlert size={15}/> Reviewer Comments
          </h4>
          <div className="bg-gray-100 rounded-xl p-4 text-center text-sm text-gray-600">
            Example Comments
          </div>
        </div>

        {/* Action Items */}
        <div className="px-8 py-6 border-t">
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-2">
          <GiHamburgerMenu/> Action Items
          </h4>
          <div className="bg-gray-100 rounded-xl p-4 text-center text-sm text-gray-600">
            List form of stuff to do next (if applicable)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReviewModal;

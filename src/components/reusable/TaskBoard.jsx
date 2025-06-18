// SprintBoard.jsx
import React, {  useEffect } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import user from '../../assets/user.png';

const TaskBoard = ({title,data,setData}) => {
  const statusColors = {
    'To Do': 'bg-red-100 text-red-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'In Review': 'bg-green-100 text-green-800'
  };

  const getStatusColor = (status) => statusColors[status] || '';          //needs add card and add group modals

 
  
  useEffect(() => {
    setData(data);
  }, [setData]);

  const handleAddGroup = (group) => {
    setData(prev => [...prev, group]);
  };

  const handleAddCard = (category, newCard) => {
    setData(prev => ({
      ...prev,
      [category]: [...prev[category], newCard]
    }));
  };

  const boardClasses = "-mt-4 sm:-mt-6  overflow-x-hidden";
  const headerClasses = "text-4xl font-extrabold mb-4 mx-60 bg-white p-8 w-4/5";
  const containerClasses = "flex flex-wrap gap-4 mx-80 w-4/5";
  const columnClasses = "w-full md:w-1/4 h-[190] rounded-lg flex flex-col gap-4";
  const cardClasses = "border border-[#EFF0F1] rounded-[15px] p-6 bg-white min-h-fit flex flex-col";
  const addCardButtonClasses = "text-center w-full border border-dashed border-gray-300 py-2 rounded-[15px] text-sm text-black-500 hover:bg-gray-50";
  const addGroupClasses = "w-full md:w-[315px] h-[190px] border-dashed border-2 border-gray-300 rounded-[15px] flex items-center justify-center text-3xl text-gray-800 cursor-pointer hover:bg-gray-50";

  return (
    <div className={boardClasses}> 
      <div className='mx-10 w-[120vw]'>
        <h1 className={headerClasses}>
          {title} <span className="text-gray-400">0001</span>
        </h1>
      </div>

      <div className={containerClasses}>
        {Object.entries(data).map(([status, cards]) => (
          <div key={status} className={columnClasses}>
            <div className="text-sm font-semibold px-1">
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-xl ${getStatusColor(status)}`}>
                {status}
              </span>
            </div>

            {cards.map((card, idx) => (
              <div 
                key={`${status}-${idx}`} 
                className={cardClasses}
                style={{ boxSizing: 'border-box' }}
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-sm">{card.title}</h2>
                  <FaExternalLinkAlt className="text-xs text-black-500" />
                </div>
                <p className="text-16 text-gray-500 leading-tight mt-2 flex-grow overflow-hidden mb-2">
                  {card.description}
                </p>
                {card.footer && <p className="text-sm text-gray-600 pt-1">{card.footer}</p>}
                <div className="flex justify-between items-center pt-2">
                  {card.avatar && (
                    <img
                      src={user}
                      alt="avatar"
                      className="rounded-full w-5 h-5"
                    />
                  )}
                  {card.due && (
                    <span className="text-sm text-red-500 bg-red-100 px-2 py-0.5 rounded-full">
                      {card.due}
                    </span>
                  )}
                  {card.done && (
                    <span className="text-sm text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                      ✓ Done
                    </span>
                  )}
                </div>
              </div>
            ))}

            <button 
              className={addCardButtonClasses}
            >
              + Add another card
            </button>
          </div>
        ))}
        
        <div>
          <h2 className='text-gray-900 mb-4'>Add another group</h2>
          <div 
            className={addGroupClasses}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
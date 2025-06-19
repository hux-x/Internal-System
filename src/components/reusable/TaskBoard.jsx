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



  const boardClasses = "-mt-4 sm:-mt-6  overflow-x-hidden";
  const headerClasses = "text-4xl font-extrabold mb-4 mx-60 bg-white p-8 w-4/5";
  const containerClasses = "flex flex-wrap gap-4 mx-80 w-4/5";
  const columnClasses = "w-full md:w-1/4 h-[190] rounded-lg flex flex-col gap-4";
  const cardClasses = "border border-[#EFF0F1] rounded-[15px] p-6 bg-white min-h-fit flex flex-col";


  return (
    <div className={boardClasses}> 
      <div className='mx-10 w-[120vw] mt-2'>
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
                  <FaExternalLinkAlt className="text-s text-black-800" />
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

          
          </div>
        ))}
        
    
      </div>
    </div>
  );
};

export default TaskBoard;
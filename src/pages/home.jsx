import React, { useContext } from 'react';
import { FaBookOpen, FaArrowCircleUp } from "react-icons/fa";
import Footer from '../components/footer';
import { getPriorityColor, getStatusColor } from '../components/utils/fuctions';
import { myTasks, reviewsReceived, tasksIntern, reviews } from '../components/utils/demo_data';
import { OverallContext } from '../components/context/Overall';
export default function Dashboard() {
  const { user, setReviewModal, setCurrentReviewData, setTaskData, setOpenCTaskModal, setreviewTask ,setViewTask} = useContext(OverallContext);
  return (<div>
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 overflow-x-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Assigned to interns section */}
        {(user.role.includes('admin') || user.role.includes('employee') || user.role.includes('executive')) && (<div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Tasks Assigned To Interns</h2>
              <p className="text-sm text-gray-600 mt-1">This is a List Of Tasks You Have Assigned to Interns</p>
            </div>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm"
             onClick={() => setOpenCTaskModal(true)}
            >
              Create New Task
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket ID
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasksIntern.map((task, i) => (
                  <tr key={i} className="hover:bg-gray-50" onClick={() => {
                    setViewTask(true);
                    
                  }
                  }>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-900">{task.title}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-500">{task.ticket}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
        {/* My Tasks Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 ">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
            <p className="text-sm text-gray-600 mt-1">This is a list of tasks to be completed by you</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket ID
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50" onClick={() => {
                    setViewTask(true);
                  }
                  }>
                    <td className="py-4 px-6">
                      <div className="flex justify-between w-full items-center ">
                        <span className="text-sm font-medium text-gray-900">
                          {task.title}
                        </span>
                        <span className='flex justify-between gap-2'><FaBookOpen className='cursor-pointer' /><FaArrowCircleUp className='cursor-pointer' onClick={() => { setViewTask(true); setTaskData(task) }} /></span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-500">{task.ticketId}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reviews Received Section for interns*/}
        {!(user.role.includes('admin') || user.role.includes('employee') || user.role.includes('executive')) && (<div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Reviews Received</h2>
            <p className="text-sm text-gray-600 mt-1">This is a list of reviews you have received</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task Name
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reviewer
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviewsReceived.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex w-full justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">
                          {review.taskName}
                        </span>
                        <FaArrowCircleUp className="cursor-pointer" size={18} onClick={() => { setReviewModal(true); setCurrentReviewData(review) }} />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                        {review.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-500">{review.reviewer}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.type)}`}>
                        {review.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>)}
        {/* Reviews Pending Section */}
        {(user.role.includes('admin') || user.role.includes('employee') || user.role.includes('executive')) && (<div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Reviews Pending</h2>
              <p className="text-sm text-gray-600 mt-1">This is a List Of Tasks You Have To Review</p>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm" onClick={() => setreviewTask(true)}>
              Create New Review
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Task Name</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewee</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews.map((review, i) => (
                  <tr key={i} className="hover:bg-gray-50" onClick={() => {
                    setReviewModal(true);
                    setCurrentReviewData(review);
                  }}>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900  flex justify-between items-center gap-2">{review.name}  <span className='flex justify-between gap-2'><FaArrowCircleUp className='cursor-pointer' onClick={() => { setReviewModal(true); setCurrentReviewData(review) }} /></span></td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(review.priority)}`}>
                        {review.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                        {review.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">{review.reviewee}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.type)}`}>
                        {review.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );}
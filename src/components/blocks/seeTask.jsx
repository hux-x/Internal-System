import React, { useContext, useState, useEffect, use } from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { FaBullhorn, FaCommentDots, FaBoxOpen, FaSuitcase } from 'react-icons/fa';
import { OverallContext } from '../context/Overall';

const TaskModal = () => {
  const { viewTask, setViewTask, taskData } = useContext(OverallContext);

  // Local state for edits, initialized from taskData
  const [updateTask, setUpdateTask] = useState({
    status: '',
    comments: '',
    prLink: ''
  });
  useEffect(() => {
      setUpdateTask({
        status:   taskData.status   || '',
        comments: taskData.comments || '',
        prLink:   taskData.prLink   || '',
      });
  }, [taskData]);

  if (!viewTask) return null;
  const close = () => setViewTask(false);

  // helper to update any field
  const handleChange = (field) => (e) => {
    setUpdateTask(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-opacity-40 flex items-start sm:items-center justify-center p-4 overflow-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b">
          <div className="flex items-center gap-2">
            <FaSuitcase className="w-5 h-5 text-black" />
            <h2 className="text-xl font-semibold">{taskData.title}</h2>
          </div>
          <ArrowRight
            className="w-5 h-5 text-black cursor-pointer"
            onClick={close}
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row px-8 py-6 gap-8">
          {/* Left: Big Icon */}
          <div className="flex-1 flex items-center justify-center">
            <FaBullhorn className="w-32 h-32 text-red-600" />
          </div>

          {/* Right: Status */}
          <div className="flex-1 flex flex-col">
            <label className="flex items-center gap-2 text-sm font-semibold mb-2">
              <AlertTriangle className="w-4 h-4 text-gray-800" />
              Status
            </label>
            <select
              value={updateTask.status}
              onChange={handleChange('status')}
              className="w-full px-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Eg. Needs Review</option>
              <option>Not Started</option>
              <option>In progress</option>
              <option>Needs Review</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-200 mx-8" />

        {/* Add Comments */}
        <div className="px-8 py-6">
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-2">
            <FaCommentDots className="w-4 h-4 text-gray-800" />
            Add Comments
          </h4>
          <textarea
            value={updateTask.comments}
            onChange={handleChange('comments')}
            rows={4}
            placeholder="This is just a bit of filler text..."
            className="w-full bg-gray-100 rounded-xl p-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Your Work */}
        <div className="px-8 py-6 border-t">
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-2">
            <FaBoxOpen className="w-4 h-4 text-gray-800" />
            Submit Your Work
          </h4>
          <input
            type="text"
            value={updateTask.prLink}
            onChange={handleChange('prLink')}
            placeholder="https://github.com/ExampleName/ExampleLink/PR_Link"
            className="w-full bg-gray-100 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end items-center px-8 py-6 gap-4 border-t">
          <button
            onClick={close}
            className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-medium hover:bg-red-100 transition"
          >
            Close
          </button>
          <button
            onClick={() => {
              // TODO: submit updateTask (status, comments, prLink) to your API
              console.log('Submitting:', updateTask);
              close();
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-red-700 transition"
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

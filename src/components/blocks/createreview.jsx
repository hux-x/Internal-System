import React, { useContext, useState } from 'react';
import { ArrowRight, User2, ClipboardList, AlertTriangle, Star, Hash } from 'lucide-react';
import { FaCheckCircle } from 'react-icons/fa';
import { OverallContext } from '../context/Overall';
import { checklistLabels, reviews } from '../utils/demo_data';

const CreateReview = () => {
  const { setreviewTask, user,reviewTask } = useContext(OverallContext);
  const [formData, setFormData] = useState({comments: '', actions: '', type: '', score: '',ticketId: '', taskName: '', priority: '' });
  const close = () => setreviewTask(false);

  const complete = () => {
    const { taskName, priority, type } = formData;
    if (!taskName || !priority || !type) {
      alert('Task Name, Priority and Type are required');
      return;
    }
    reviews.push({
      name: taskName,
      priority,
      status: 'In progress',
      reviewee: user?.name || 'Unknown',
      type,
    });

    console.log({
      ...formData,
      actionItems: formData.actions.split('\n').filter(Boolean),
      reviewee: user?.name || 'Unknown',
      status: 'In progress'
    });

    close();
  };

  const update = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  return (<>
  {reviewTask &&(<div className="fixed inset-0 bg-black bg-opacity-40 flex items-start sm:items-center justify-center p-4 overflow-auto z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pt-4">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b">
          <div className="flex items-center gap-2">
            <User2 className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Review Task</h2>
          </div>
          <ArrowRight className="h-6 font-bold cursor-pointer" onClick={close} />
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row px-8 py-6 gap-8">
          <div className="w-full md:w-1/2">
            <h3 className="flex items-center gap-2 font-semibold mb-3">
              <ClipboardList className="w-5 h-5" /> Checklist
            </h3>
            <ul className="divide-y divide-gray-200">
              {checklistLabels.map((lab, i) => (
                <li key={i} className="flex items-center gap-2 py-2">
                  <FaCheckCircle className="w-4 h-4" />
                  <span className="text-sm">{lab}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block w-px bg-gray-200" />

          <div className="w-full md:w-1/2 space-y-4 text-sm">
            <div>
              <label className="flex items-center gap-2 mb-1 font-medium">
                <AlertTriangle className="w-4 h-4" /> Type
              </label>
              <select
                value={formData.type}
                onChange={update('type')}
                className="w-full bg-gray-100 rounded-xl px-4 py-2"
              >
                <option value="" disabled>Select type</option>
                <option>Ticket</option>
                <option>Task</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 mb-1 font-medium">
                <Star className="w-4 h-4" /> Overall Score
              </label>
              <input
                type="text"
                value={formData.score}
                onChange={update('score')}
                placeholder="Enter score"
                className="w-full bg-gray-100 rounded-xl px-4 py-2"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-1 font-medium">
                <Hash className="w-4 h-4" /> Ticket Number
              </label>
              <input
                type="text"
                value={formData.ticketId}
                onChange={update('ticketId')}
                placeholder="Enter ticket ID"
                className="w-full bg-gray-100 rounded-xl px-4 py-2"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-1 font-medium">
                <ClipboardList className="w-4 h-4" /> Task Name
              </label>
              <input
                type="text"
                value={formData.taskName}
                onChange={update('taskName')}
                placeholder="Enter task name"
                className="w-full bg-gray-100 rounded-xl px-4 py-2"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-1 font-medium">
                <AlertTriangle className="w-4 h-4" /> Priority
              </label>
              <select
                value={formData.priority}
                onChange={update('priority')}
                className="w-full bg-gray-100 rounded-xl px-4 py-2"
              >
                <option value="" disabled>Select priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="px-8 py-4 border-t">
          <label className="flex items-center gap-2 font-medium mb-2">
            <AlertTriangle className="w-4 h-4" /> Reviewer Comments
          </label>
          <textarea
            value={formData.comments}
            onChange={update('comments')}
            rows={4}
            className="w-full bg-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Items */}
        <div className="px-8 py-6 border-t">
          <label className="flex items-center gap-2 font-medium mb-2">
            <ClipboardList className="w-4 h-4" /> Action Items
          </label>
          <textarea
            value={formData.actions}
            onChange={update('actions')}
            rows={4}
            placeholder="One per line"
            className="w-full bg-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end px-8 py-6 border-t">
          <button
            onClick={complete}
            className="bg-red-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-red-700"
          >
            Complete Review
          </button>
        </div>
      </div>
    </div>)}
  </>
  );
};

export default CreateReview;

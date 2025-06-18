import React, { useContext, useState } from 'react';
import {
  ArrowRight,
  ClipboardList,
  AlertTriangle,
  User2,
  FileText,
  Hash
} from 'lucide-react';
import { OverallContext } from '../context/Overall';
import { tasksIntern } from '../utils/demo_data';

const CreateTaskModal = () => {
  const { openCTaskModal, setOpenCTaskModal } = useContext(OverallContext);

  const [formData, setFormData] = useState({
    taskType: '',
    taskPriority: '',
    department: '',
    assignee: '',
    description: '',
    definition: '',
    sprintSerial: '',
    attachments: []
  });

  const close = () => setOpenCTaskModal(false);

  const updateField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const removeAttachment = (idx) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (toBacklog = false) => {
    tasksIntern.push({
      title: formData.description || 'Untitled Task',
      priority: formData.taskPriority,
      ticket: `#${String((formData.description).length).padStart(4, '0')}`, // auto-generating ticket
      status: toBacklog ? 'Backlog' : 'In progress'
    });
    console.log({ ...formData, toBacklog });
    close();
  };

  return (
    <>
      {openCTaskModal && (
        <div className="fixed inset-0 z-50 bg-opacity-30 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b mt-5">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Task Title</h2>
              </div>
              <ArrowRight className="w-5 h-5 cursor-pointer" onClick={close} />
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-4 mt-3">
              {/* Left Section */}
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium text-sm">
                    <ClipboardList className="w-4 h-4" /> Task Type
                  </label>
                  <select
                    value={formData.taskType}
                    onChange={updateField('taskType')}
                    className="w-full bg-gray-100 rounded-xl px-4 py-2 text-sm"
                  >
                    <option value="" disabled>Eg. Feature</option>
                    <option>Feature</option>
                    <option>Bug</option>
                    <option>Chore</option>
                  </select>
                </div>
              
                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium text-sm">
                    <User2 className="w-4 h-4" /> Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={updateField('department')}
                    className="w-full bg-gray-100 rounded-xl px-4 py-2 text-sm"
                  >
                    <option value="" disabled>Eg. Technology</option>
                    <option>Technology</option>
                    <option>Design</option>
                    <option>Marketing</option>
                  </select>
                </div>
              </div>

              {/* Right Section */}
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium text-sm">
                    <AlertTriangle className="w-4 h-4" /> Task Priority
                  </label>
                  <select
                    value={formData.taskPriority}
                    onChange={updateField('taskPriority')}
                    className="w-full bg-gray-100 rounded-xl px-4 py-2 text-sm"
                  >
                    <option value="" disabled>Eg. High</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium text-sm">
                    <User2 className="w-4 h-4" /> Assignee
                  </label>
                  <select
                    value={formData.assignee}
                    onChange={updateField('assignee')}
                    className="w-full bg-gray-100 rounded-xl px-4 py-2 text-sm"
                  >
                    <option value="" disabled>Eg. Assignee</option>
                    <option>Alice</option>
                    <option>Bob</option>
                    <option>Charlie</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="px-6 py-4">
              <label className="font-medium text-sm">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={updateField('description')}
                className="w-full bg-gray-100 rounded-xl px-4 py-2 text-sm resize-none"
                placeholder="Type your description here…"
              />
            </div>

            {/* Definition of Done */}
            <div className="px-6 py-4">
              <label className="font-medium text-sm">Definition Of Done</label>
              <textarea
                rows={3}
                value={formData.definition}
                onChange={updateField('definition')}
                className="w-full bg-gray-100 rounded-xl px-4 py-2 text-sm resize-none"
                placeholder="Type your DoD here…"
              />
            </div>

            {/* Sprint & Files */}
            <div className="flex flex-col md:flex-row items-start md:items-center px-6 py-4 gap-6">
              {/* Sprint Serial */}
              <div className="flex-1">
                <label className="flex items-center gap-2 mb-1 font-medium text-sm">
                  <Hash className="w-4 h-4" /> Enter Sprint Serial
                </label>
                <input
                  value={formData.sprintSerial}
                  onChange={updateField('sprintSerial')}
                  placeholder="Eg. 0005"
                  className="w-full bg-gray-100 rounded-xl px-4 py-2 text-sm"
                />
              </div>

              {/* File Upload */}
              <div className="flex-1">
                <label className="font-medium text-sm">Files Attached</label>
                <ul className="mt-2 space-y-2 text-sm max-h-28 overflow-auto pr-1">
                  {formData.attachments.map((file, idx) => (
                    <li key={idx} className="flex justify-between items-center bg-gray-100 rounded-xl px-4 py-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span className="truncate max-w-[150px]">{file.name}</span>
                      </div>
                      <button onClick={() => removeAttachment(idx)} className="text-red-500 hover:text-red-700">✕</button>
                    </li>
                  ))}
                </ul>

                {/* File input */}
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormData(prev => ({
                        ...prev,
                        attachments: [...prev.attachments, file]
                      }));
                    }
                  }}
                  className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:bg-gray-100 file:hover:bg-gray-200"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end px-6 py-4 gap-4 border-t">
              <button
                onClick={() => handleSubmit(true)}
                className="bg-red-100 text-red-600 px-6 py-2 rounded-xl font-medium hover:bg-red-200 transition"
              >
                Add To Back Log
              </button>
              <button
                onClick={() => handleSubmit(false)}
                className="bg-red-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-red-700 transition"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTaskModal;

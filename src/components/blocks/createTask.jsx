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
import { useTicketApi } from '../hooks/useTaskApi';

const CreateTaskModal = () => {
  const { openCTaskModal, setOpenCTaskModal } = useContext(OverallContext);
  const { createTicket, loading, error } = useTicketApi();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    priority: '',
    department: '',
    assigned_to: '', 
    definition_of_done: '',
    sprint_serial: '',
    attachments: []
  });

  // Mock user data - will later be replaced with people to whom the task can be assigned to based on the logged in user's role
  const availableUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];

  const close = () => setOpenCTaskModal(false);

  const updateField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const removeAttachment = (idx) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = async (toBacklog = false) => {
    const ticketData = {
      title: formData.title || 'Untitled Task', // Fallback title
      description: formData.description,
      type: formData.type,
      priority: formData.priority,
      department: formData.department,
      assigned_to: Number(formData.assigned_to), 
      definition_of_done: formData.definition_of_done,
      sprint_serial: formData.sprint_serial,
      status: 'IP'
    };

  

    const created = await createTicket(ticketData);
    console.log(ticketData)
    if (created) {
      close();
      // Reset form
      setFormData({
        title: '',
        description: '',
        type: '',
        priority: '',
        department: '',
        assigned_to: '2',
        definition_of_done: '',
        sprint_serial: '',
        attachments: [],
        status:"IP"
      
      });
    }
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
                <h2 className="text-lg font-semibold">Create New Ticket</h2>
              </div>
              <ArrowRight className="w-5 h-5 cursor-pointer" onClick={close} />
            </div>

            {/* Error Message */}
            {error && (
              <div className="px-6 py-2 bg-red-100 text-red-600 text-sm">
                Error: {error}
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-4 mt-3">
              {/* Left Section */}
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium text-sm">
                    <ClipboardList className="w-4 h-4" /> Task Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={updateField('type')}
                    className="w-full bg-gray-100 rounded-xl px-4 py-2 text-sm"
                    required
                  >
                    <option value="" disabled>Select task type</option>
                    <option value="FE">Feature</option>
                    <option value="BU">Bug</option>
                    <option value="CH">Chore</option>
                    <option value="RE">Research</option>
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
                    required
                  >
                    <option value="" disabled>Select department</option>
                    <option value="TE">Technology</option>
                    <option value="BU">Business</option>
                    <option value="CR">Creative</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium text-sm">
                    <Hash className="w-4 h-4" /> Title
                  </label>
                  <input
                    value={formData.title}
                    onChange={updateField('title')}
                    placeholder="Task title"
                    className="w-full bg-gray-100 rounded-xl px-4 py-2 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium text-sm">
                    <AlertTriangle className="w-4 h-4" /> Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={updateField('priority')}
                    className="w-full bg-gray-100 rounded-xl px-4 py-2 text-sm"
                    required
                  >
                    <option value="" disabled>Select priority</option>
                    <option value="LO">Low</option>
                    <option value="ME">Medium</option>
                    <option value="HI">High</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium text-sm">
                    <User2 className="w-4 h-4" /> Assignee
                  </label>
                  <select
                    value={formData.assigned_to}
                    onChange={updateField('assigned_to')}
                    className="w-full bg-gray-100 rounded-xl px-4 py-2 text-sm"
                    required
                  >
                    <option value="" disabled>Select assignee</option>
                    {availableUsers.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium text-sm">
                    <Hash className="w-4 h-4" /> Sprint Serial
                  </label>
                  <input
                    value={formData.sprint_serial}
                    onChange={updateField('sprint_serial')}
                    placeholder="Sprint number"
                    className="w-full bg-gray-100 rounded-xl px-4 py-2 text-sm"
                  />
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
                placeholder="Detailed description of the task"
                required
              />
            </div>

            {/* Definition of Done */}
            <div className="px-6 py-4">
              <label className="font-medium text-sm">Definition Of Done</label>
              <textarea
                rows={3}
                value={formData.definition_of_done}
                onChange={updateField('definition_of_done')}
                className="w-full bg-gray-100 rounded-xl px-4 py-2 text-sm resize-none"
                placeholder="Criteria for task completion"
              />
            </div>

            {/* Files Section - Optional */}
            <div className="px-6 py-4">
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

            {/* Footer Buttons */}
            <div className="flex justify-end px-6 py-4 gap-4 border-t">
              <button
                onClick={() => handleSubmit(true)}
                disabled={loading}
                className="bg-red-100 text-red-600 px-6 py-2 rounded-xl font-medium hover:bg-red-200 transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Add To Backlog'}
              </button>
              <button
                onClick={() => handleSubmit(false)}
                disabled={loading}
                className="bg-red-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-red-700 transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Create Task'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTaskModal;
import React, { useContext, useState } from 'react';
import { ArrowRight, User2, ClipboardList, AlertTriangle, Star, Hash, X } from 'lucide-react';
import { FaCheckCircle } from 'react-icons/fa';
import { OverallContext } from '../context/Overall';
import { checklistLabels } from '../utils/demo_data';
import useReviewApi from '../hooks/useReview';

const CreateReview = () => {
  const { setreviewTask, user, reviewTask } = useContext(OverallContext);
  const { createReview, loading, error } = useReviewApi();
  
  const [formData, setFormData] = useState({
    type: '',
    ticket_reference: '',
    module_name: '',
    pr_link: '',
    status: 'pending',
    reviewer_comments: '',
    // Performance review scores
    score_ownership: '',
    score_quality: '',
    score_communication: '',
    score_learning: '',
    score_team_fit: '',
    // Performance review text fields
    proud_of: '',
    main_contributions: '',
    learnings: '',
    blockers: '',
    self_improvement: '',
    next_goals: '',
    support_needed: '',
    open_notes: '',
    // Common fields
    check_list: Object.fromEntries(checklistLabels.map(label => [label, false])),
    action_items: []
  });

  const [currentActionItem, setCurrentActionItem] = useState({
    task: '',
    priority: 'medium'
  });

  const close = () => setreviewTask(false);

  const handleChecklistChange = (label) => {
    setFormData(prev => ({
      ...prev,
      check_list: {
        ...prev.check_list,
        [label]: !prev.check_list[label]
      }
    }));
  };

  const addActionItem = () => {
    if (!currentActionItem.task) return;
    
    setFormData(prev => ({
      ...prev,
      action_items: [...prev.action_items, currentActionItem]
    }));
    
    setCurrentActionItem({
      task: '',
      priority: 'medium'
    });
  };

  const removeActionItem = (index) => {
    setFormData(prev => ({
      ...prev,
      action_items: prev.action_items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.type) {
      alert('Please select a review type');
      return;
    }

    if (formData.type === 'TI' && !formData.ticket_reference) {
      alert('Ticket reference is required for ticket reviews');
      return;
    }

    if (formData.type === 'PR') {
      const requiredScores = [
        'score_ownership',
        'score_quality',
        'score_communication',
        'score_learning',
        'score_team_fit'
      ];
      
      const missingScores = requiredScores.filter(score => !formData[score]);
      if (missingScores.length > 0) {
        alert(`Please provide all performance scores: ${missingScores.join(', ').replace(/score_/g, '')}`);
        return;
      }
    }

    try {
      const reviewData = {
        reviewee: user.id,
        type: formData.type,
        ...formData
      };
      console.log(reviewData)
      const response = await createReview(reviewData);
      
      
      
      if (response) {
        alert('Review created successfully!');
        close();
        // Reset form
        setFormData({
          type: '',
          ticket_reference: '',
          module_name: '',
          pr_link: '',
          status: 'pending',
          reviewer_comments: '',
          score_ownership: '',
          score_quality: '',
          score_communication: '',
          score_learning: '',
          score_team_fit: '',
          proud_of: '',
          main_contributions: '',
          learnings: '',
          blockers: '',
          self_improvement: '',
          next_goals: '',
          support_needed: '',
          open_notes: '',
          check_list: Object.fromEntries(checklistLabels.map(label => [label, false])),
          action_items: []
        });
      }
    } catch (err) {
      alert(err.message || 'Failed to create review');
    }
  };

  const updateFormField = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const updateScoreField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <>
      {reviewTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-start sm:items-center justify-center p-4 overflow-auto z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pt-4">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-4 border-b">
              <div className="flex items-center gap-2">
                <User2 className="w-5 h-5" />
                <h2 className="text-xl font-semibold">Create Review</h2>
              </div>
              <X className="h-6 w-6 cursor-pointer" onClick={close} />
            </div>

            {/* Body */}
            <div className="flex flex-col md:flex-row px-8 py-6 gap-8">
              <div className="w-full md:w-1/2">
                <h3 className="flex items-center gap-2 font-semibold mb-3">
                  <ClipboardList className="w-5 h-5" /> Checklist
                </h3>
                <ul className="divide-y divide-gray-200">
                  {checklistLabels.map((label, i) => (
                    <li key={i} className="flex items-center gap-2 py-2">
                      <input
                        type="checkbox"
                        checked={formData.check_list[label]}
                        onChange={() => handleChecklistChange(label)}
                        className="h-5 w-5 rounded-full appearance-none border-2 border-gray-300 checked:bg-black checked:border-black focus:outline-none focus:ring-offset-0 focus:ring-0 transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                        style={{
                          backgroundImage: formData.check_list[label] ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E\")" : "none"
                        }}
                      />
                      <span className="text-sm">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden md:block w-px bg-gray-200" />

              <div className="w-full md:w-1/2 space-y-4 text-sm">
                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium">
                    <AlertTriangle className="w-4 h-4" /> Review Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={updateFormField('type')}
                    className="w-full bg-gray-100 rounded-xl px-4 py-2"
                  >
                    <option value="" disabled>Select type</option>
                    <option value="TI">Ticket Review</option>
                    <option value="PR">Performance Review</option>
                  </select>
                </div>

                {formData.type === 'TI' && (
                  <>
                    <div>
                      <label className="flex items-center gap-2 mb-1 font-medium">
                        <Hash className="w-4 h-4" /> Ticket Reference
                      </label>
                      <input
                        type="text"
                        value={formData.ticket_reference}
                        onChange={updateFormField('ticket_reference')}
                        placeholder="Enter ticket ID"
                        className="w-full bg-gray-100 rounded-xl px-4 py-2"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 mb-1 font-medium">
                        <ClipboardList className="w-4 h-4" /> Module Name
                      </label>
                      <input
                        type="text"
                        value={formData.module_name}
                        onChange={updateFormField('module_name')}
                        placeholder="Enter module name"
                        className="w-full bg-gray-100 rounded-xl px-4 py-2"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 mb-1 font-medium">
                        <ClipboardList className="w-4 h-4" /> PR Link
                      </label>
                      <input
                        type="text"
                        value={formData.pr_link}
                        onChange={updateFormField('pr_link')}
                        placeholder="Enter PR link"
                        className="w-full bg-gray-100 rounded-xl px-4 py-2"
                      />
                    </div>
                  </>
                )}

                {formData.type === 'PR' && (
                  <>
                    <div className="space-y-3">
                      <h4 className="flex items-center gap-2 font-medium">
                        <Star className="w-4 h-4" /> Performance Scores (1-5)
                      </h4>
                      {[
                        { field: 'score_ownership', label: 'Ownership' },
                        { field: 'score_quality', label: 'Quality' },
                        { field: 'score_communication', label: 'Communication' },
                        { field: 'score_learning', label: 'Learning' },
                        { field: 'score_team_fit', label: 'Team Fit' }
                      ].map(({ field, label }) => (
                        <div key={field} className="flex items-center justify-between">
                          <span>{label}:</span>
                          <select
                            value={formData[field] || ''}
                            onChange={(e) => updateScoreField(field, e.target.value)}
                            className="bg-gray-100 rounded-xl px-3 py-1"
                          >
                            <option value="" disabled>Select</option>
                            {[1, 2, 3, 4, 5].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 mb-1 font-medium">
                        <ClipboardList className="w-4 h-4" /> Proud Of
                      </label>
                      <textarea
                        value={formData.proud_of}
                        onChange={updateFormField('proud_of')}
                        rows={2}
                        className="w-full bg-gray-100 rounded-xl p-2 text-sm"
                        placeholder="What are you proud of?"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 mb-1 font-medium">
                        <ClipboardList className="w-4 h-4" /> Main Contributions
                      </label>
                      <textarea
                        value={formData.main_contributions}
                        onChange={updateFormField('main_contributions')}
                        rows={2}
                        className="w-full bg-gray-100 rounded-xl p-2 text-sm"
                        placeholder="What were your main contributions?"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium">
                    <AlertTriangle className="w-4 h-4" /> Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={updateFormField('status')}
                    className="w-full bg-gray-100 rounded-xl px-4 py-2"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="needs_changes">Needs Changes</option>
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
                value={formData.reviewer_comments}
                onChange={updateFormField('reviewer_comments')}
                rows={4}
                className="w-full bg-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your comments here..."
              />
            </div>

            {/* Action Items */}
            <div className="px-8 py-6 border-t">
              <label className="flex items-center gap-2 font-medium mb-2">
                <ClipboardList className="w-4 h-4" /> Action Items
              </label>
              
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={currentActionItem.task}
                  onChange={(e) => setCurrentActionItem({...currentActionItem, task: e.target.value})}
                  placeholder="Enter action item"
                  className="flex-1 bg-gray-100 rounded-xl px-4 py-2"
                />
                <select
                  value={currentActionItem.priority}
                  onChange={(e) => setCurrentActionItem({...currentActionItem, priority: e.target.value})}
                  className="bg-gray-100 rounded-xl px-4 py-2"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button 
                  onClick={addActionItem}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
                >
                  Add
                </button>
              </div>

              {formData.action_items.length > 0 && (
                <ul className="space-y-2">
                  {formData.action_items.map((item, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <div>
                        <span className="font-medium">{item.task}</span>
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          item.priority === 'high' ? 'bg-red-100 text-red-800' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <button 
                        onClick={() => removeActionItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end px-8 py-6 border-t">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`px-6 py-2 rounded-xl font-medium ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateReview;
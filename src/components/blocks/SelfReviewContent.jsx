import React from 'react';

const SelfReviewContent = ({ data }) => {
  const {
    proud_of,
    main_contributions,
    learnings,
    blockers,
    self_improvement,
    next_goals,
    support_needed,
    open_notes,
    score_ownership,
    score_quality,
    score_communication,
    score_learning,
    score_team_fit
  } = data;

  return (
    <div className="flex flex-col px-8 py-6 space-y-6">
      <div className="space-y-3 text-sm text-gray-800">
        <div><strong>Proud of:</strong> {proud_of}</div>
        <div><strong>Main Contributions:</strong> {main_contributions}</div>
        <div><strong>Learnings:</strong> {learnings}</div>
        <div><strong>Blockers:</strong> {blockers}</div>
        <div><strong>Self Improvement:</strong> {self_improvement}</div>
        <div><strong>Next Goals:</strong> {next_goals}</div>
        <div><strong>Support Needed:</strong> {support_needed}</div>
        <div><strong>Open Notes:</strong> {open_notes}</div>
      </div>

      <hr />

      <h4 className="text-base font-bold text-center">Scores</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800 mt-3">
        <div className="flex justify-between"><span className="font-semibold">Ownership</span> <span>{score_ownership}</span></div>
        <div className="flex justify-between"><span className="font-semibold">Quality</span> <span>{score_quality}</span></div>
        <div className="flex justify-between"><span className="font-semibold">Communication</span> <span>{score_communication}</span></div>
        <div className="flex justify-between"><span className="font-semibold">Learning</span> <span>{score_learning}</span></div>
        <div className="flex justify-between"><span className="font-semibold">Team Fit</span> <span>{score_team_fit}</span></div>
      </div>
    </div>
  );
};

export default SelfReviewContent;

import React from 'react';

export default function Progress({ topics }) {
  let easyTotal = 0, easyDone = 0;
  let mediumTotal = 0, mediumDone = 0;
  let hardTotal = 0, hardDone = 0;

  topics.forEach(topic => {
    if (topic.subtopics) {
      topic.subtopics.forEach(sub => {
        if (sub.level === 'EASY') {
          easyTotal++;
          if (sub.done) easyDone++;
        } else if (sub.level === 'MEDIUM') {
          mediumTotal++;
          if (sub.done) mediumDone++;
        } else if (sub.level === 'HARD') {
          hardTotal++;
          if (sub.done) hardDone++;
        }
      });
    }
  });

  const getPercent = (done, total) => total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="container progress-dashboard">
      <h2>Progress Report</h2>
      <div className="progress-stats">
        
        <div className="progress-card">
          <h3>Easy <span>{getPercent(easyDone, easyTotal)}%</span></h3>
          <div className="progress-bar-container">
            <div className="progress-bar-fill easy" style={{ width: `${getPercent(easyDone, easyTotal)}%` }}></div>
          </div>
          <div className="progress-label">{easyDone} of {easyTotal} completed</div>
        </div>

        <div className="progress-card">
          <h3>Medium <span>{getPercent(mediumDone, mediumTotal)}%</span></h3>
          <div className="progress-bar-container">
            <div className="progress-bar-fill medium" style={{ width: `${getPercent(mediumDone, mediumTotal)}%` }}></div>
          </div>
          <div className="progress-label">{mediumDone} of {mediumTotal} completed</div>
        </div>

        <div className="progress-card">
          <h3>Hard <span>{getPercent(hardDone, hardTotal)}%</span></h3>
          <div className="progress-bar-container">
            <div className="progress-bar-fill hard" style={{ width: `${getPercent(hardDone, hardTotal)}%` }}></div>
          </div>
          <div className="progress-label">{hardDone} of {hardTotal} completed</div>
        </div>

      </div>
    </div>
  );
}

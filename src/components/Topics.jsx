import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Topics({ topics, toggleSubtopic }) {
  const [expandedTopic, setExpandedTopic] = useState('algorithms');

  return (
    <div className="container">
      <div className="topics-header">
        <h2>Topics</h2>
        <p>Explore these exciting topics!</p>
      </div>
      
      <div className="topics-list">
        {topics.map(topic => {
          const isExpanded = expandedTopic === topic.id;
          const totalSubtopics = topic.subtopics ? topic.subtopics.length : 0;
          const completedSubtopics = topic.subtopics ? topic.subtopics.filter(s => s.done).length : 0;
          const isDone = totalSubtopics > 0 && totalSubtopics === completedSubtopics;
          
          return (
            <div key={topic.id} className="topic-item">
              <div 
                className="topic-header" 
                onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
              >
                <div className="topic-title">
                  {topic.title}
                  <span className={`badge ${isDone ? 'done' : ''}`}>
                    {isDone ? 'Done' : 'Pending'}
                  </span>
                </div>
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {isExpanded && (
                <div className="topic-content">
                  <div className="topic-content-inner">
                    <h3>Sub Topics</h3>
                    {topic.subtopics && topic.subtopics.length > 0 ? (
                      <table>
                        <thead>
                          <tr>
                            <th className="text-left">Name</th>
                            <th>LeetCode Link</th>
                            <th>YouTube Link</th>
                            <th>Article Link</th>
                            <th>Level</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topic.subtopics.map(sub => (
                            <tr key={sub.id}>
                              <td className="text-left">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                  <input 
                                    type="checkbox" 
                                    checked={sub.done} 
                                    onChange={() => toggleSubtopic(topic.id, sub.id)}
                                  />
                                  {sub.name}
                                </label>
                              </td>
                              <td><a href={sub.leetcodeUrl || "#"} target="_blank" rel="noopener noreferrer" className="action-link">{sub.leetcode}</a></td>
                              <td><a href={sub.youtubeUrl || "#"} target="_blank" rel="noopener noreferrer" className="action-link">{sub.youtube}</a></td>
                              <td><a href={sub.articleUrl || "#"} target="_blank" rel="noopener noreferrer" className="action-link">{sub.article}</a></td>
                              <td>{sub.level}</td>
                              <td>{sub.done ? 'Done' : 'Pending'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p style={{ marginTop: '1rem', color: '#666' }}>No subtopics available yet.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

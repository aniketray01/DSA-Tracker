import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Topics from './components/Topics';
import Progress from './components/Progress';
import Profile from './components/Profile';
import { initialTopics } from './data';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './index.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function App() {
  const [topics, setTopics] = useState(initialTopics);
  const [userEmail, setUserEmail] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        try {
          const response = await fetch(`${API_BASE_URL}/progress/${user.email}`);
          if (response.ok) {
            const data = await response.json();
            setTopics(data.topics);
          } else {
            await fetch(`${API_BASE_URL}/progress`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: user.email, topics: initialTopics })
            });
            setTopics(initialTopics);
          }
        } catch (error) {
          console.error("Error fetching progress from MongoDB:", error);
        }
      } else {
        setUserEmail(null);
        setTopics(initialTopics);
      }
      setIsInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userEmail && !isInitializing) {
      fetch(`${API_BASE_URL}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, topics })
      })
      .catch(err => {
        console.error("Error saving progress to MongoDB:", err);
      });
    }
  }, [topics, userEmail, isInitializing]);

  const toggleSubtopic = (topicId, subtopicId) => {
    setTopics(prevTopics => prevTopics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          subtopics: topic.subtopics.map(sub => 
            sub.id === subtopicId ? { ...sub, done: !sub.done } : sub
          )
        };
      }
      return topic;
    }));
  };

  if (isInitializing) {
    return <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.2rem', color: '#666' }}>Loading your progress...</div>;
  }

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/login" element={userEmail ? <Navigate to="/topics" replace /> : <Login />} />
            
            {/* Protected Routes */}
            <Route 
              path="/topics" 
              element={userEmail ? <Topics topics={topics} toggleSubtopic={toggleSubtopic} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/progress" 
              element={userEmail ? <Progress topics={topics} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/profile" 
              element={userEmail ? <Profile topics={topics} /> : <Navigate to="/login" replace />} 
            />
            
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [sidebarExtended, setSidebarExtended] = useState(false);
  const [prevPrompts, setPrevPrompts] = useState([
    "What is the capital of France?",
    "Explain quantum computing",
    "How to make a cake?",
    "What is the meaning of life?"
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!user && !storedUser) {
      navigate('/login');
    }
    const storedPrompts = JSON.parse(localStorage.getItem('prevPrompts') || '[]');
    if (storedPrompts.length > 0) {
      setPrevPrompts(storedPrompts);
    }
  }, [user, navigate]);

  const handleNewChat = () => {
    console.log('New chat');
  };

  const handleLoadPrompt = (prompt) => {
    console.log('Load prompt:', prompt);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">
      <Sidebar 
        onExtend={setSidebarExtended} 
        prevPrompts={prevPrompts}
        onNewChat={handleNewChat}
        onLoadPrompt={handleLoadPrompt}
      />
      <Main sidebarExtended={sidebarExtended} />
    </div>
  );
};

export default Dashboard;
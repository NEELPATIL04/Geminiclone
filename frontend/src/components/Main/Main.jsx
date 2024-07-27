import React, { useContext, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = ({ sidebarExtended }) => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, user, onLogout } = useContext(Context);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleCardClick = (prompt) => {
    setInput(prompt);
    onSent(prompt);
  };

  const handleLogout = async () => {
    await onLogout();
    window.location.href = '/login';
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const cardData = [
    {
      prompt: "Explain quantum computing in simple terms",
      image: assets.quantum_computing
    },
    {
      prompt: "Got any creative ideas for a 10 year old's birthday?",
      image: assets.birthday_idea
    },
    {
      prompt: "How do I make an HTTP request in Javascript?",
      image: assets.http_request
    },
    {
      prompt: "Can you tell me a joke?",
      image: assets.joke
    }
  ];

  return (
    <div className={`main ${sidebarExtended ? 'sidebar-extended' : ''}`}>
      <div className="main-content">
        <div className="nav">
          <p>Gemini</p>
          <div className="user-icon" onClick={toggleDropdown}>
            <img src={assets.user_icon} alt="User Icon" />
          </div>
        </div>
        <div className="main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can I help you today?</p>
              </div>
              <div className="cards">
                {cardData.map((card, index) => (
                  <div key={index} className="card" onClick={() => handleCardClick(card.prompt)}>
                    <img src={card.image} alt={`Card ${index + 1}`} className="card-image" />
                    <p>{card.prompt}</p>
                    <img src={assets.arrow_right} alt="Arrow right" className="arrow-icon" />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon} alt="User Icon" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="Gemini Icon" />
                {loading ? (
                  <div className="loader">
                    <hr /><hr /><hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="main-bottom">
        <div className="search-box">
          <input 
            onChange={(e) => setInput(e.target.value)} 
            value={input} 
            type="text" 
            placeholder="Enter a prompt here" 
          />
          <div>
            <img src={assets.gallery_icon} alt="Gallery Icon" />
            <img src={assets.mic_icon} alt="Mic Icon" />
            {input && <img onClick={() => onSent()} src={assets.send_icon} alt="Send Icon" />}
          </div>
        </div>
        <p className="bottom-info">
          Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
        </p>
      </div>
      <div className={`backdrop ${dropdownVisible ? 'active' : ''}`} onClick={toggleDropdown}></div>
      <div className={`user-options ${dropdownVisible ? 'active' : ''}`}>
        <p>{user.name}</p>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    </div>
  );
};

export default Main;
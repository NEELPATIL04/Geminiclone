import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';

const Sidebar = ({ onExtend, prevPrompts, onNewChat, onLoadPrompt }) => {
    const [extended, setExtended] = useState(false);

    const toggleExtended = () => {
        setExtended(!extended);
        onExtend(!extended);
    };

    return (
        <div className={`sidebar ${extended ? 'extended' : ''}`}>
            <div className='top'>
                <img onClick={toggleExtended} className='menu' src={assets.menu_icon} alt='Menu' />
                <div onClick={onNewChat} className='new-chat'>
                    <img src={assets.plus_icon} alt='New Chat' />
                    {extended && <p>New chat</p>}
                </div>
                {extended && prevPrompts && prevPrompts.length > 0 && (
                    <div className='recent'>
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div key={index} onClick={() => onLoadPrompt(item)} className="recent-entry">
                                <img src={assets.message_icon} alt='Message' />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='bottom'>
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt='Help' />
                    {extended && <p>Help</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt='Activity' />
                    {extended && <p>Activity</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt='Settings' />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
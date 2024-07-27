// File: src/context/Context.js

import { createContext, useState, useEffect } from "react";
import axios from '../axiosConfig';
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let result;

    if (prompt !== undefined) {
      result = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      result = await runChat(input);
    }

    let newResult = result.split("**").map((part, index) => {
      return index % 2 === 0 ? part : `<b>${part}</b>`;
    }).join("");

    newResult = newResult.split("*").join("<br>").replace("##", "");

    newResult.split(" ").forEach((word, index) => {
      delayPara(index, word + " ");
    });

    setLoading(false);
    setInput("");
  };

  const onLogin = async ({ email, password }) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      console.log("Login successful:", data);
      return data;
    } catch (error) {
      console.error("Error logging in:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  const onSignup = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post('/api/auth/register', { name, email, password });
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      console.log("Signup successful:", data);
      return data;
    } catch (error) {
      console.error("Error signing up:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  const onLogout = async () => {
    setUser(null);
    localStorage.removeItem('user');
    // You can also clear any tokens or session data here if needed
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    onLogin,
    onSignup,
    onLogout,
    user,
    setUser,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
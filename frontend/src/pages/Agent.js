// src/pages/Agent.js

import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import api from '../utils/api';
// If using react-avatar, uncomment the next line
// import Avatar from 'react-avatar';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AgentWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const HeaderTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  margin: 0;
  color: #bf9000;
`;

const ChatWindow = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #e5ddd5;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  /* Webkit scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  align-items: flex-end;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: #bbb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 10px;
  flex-shrink: 0;
`;

const MessageBubble = styled.div`
  max-width: 60%;
  padding: 10px 15px;
  border-radius: 20px;
  position: relative;
  background-color: ${(props) => (props.isUser ? '#dcf8c6' : '#ffffff')};
  color: #303030;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease;

  ${(props) =>
    props.isUser
      ? `
    align-self: flex-end;
    border-bottom-right-radius: 0;
  `
      : `
    align-self: flex-start;
    border-bottom-left-radius: 0;
  `}
`;

const Timestamp = styled.span`
  display: block;
  font-size: 10px;
  color: #999;
  margin-top: 5px;
  text-align: ${(props) => (props.isUser ? 'right' : 'left')};
`;

const InputForm = styled.form`
  display: flex;
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  font-size: 16px;
`;

const SendButton = styled.button`
  background-color: #25d366;
  color: white;
  border: none;
  padding: 0 20px;
  margin-left: 10px;
  border-radius: 50%;
  cursor: pointer;
  height: 40px;
  width: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1da851;
  }

  &:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
  }
`;

function Agent() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Typing indicator
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (input.trim() === '') return;

    const newMessage = {
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true); // Show typing indicator

    try {
      const response = await api.post('/api/agent', { message: input });
      const botMessage = {
        sender: 'bot',
        text: response.data.reply,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error communicating with Agent:', error);
      const errorMessage = {
        sender: 'bot',
        text:
          error.response?.data?.message ||
          'Sorry, an error occurred while processing your request.',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false); // Hide typing indicator
    }
  };

  return (
    <AgentWrapper>
      <Header>
        <HeaderTitle>AI Assistant</HeaderTitle>
      </Header>
      <ChatWindow>
        {messages.map((msg, index) => (
          <MessageContainer
            key={index}
            style={{
              flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
            }}
          >
            <Avatar>{msg.sender === 'user' ? 'U' : 'A'}</Avatar>
            <MessageBubble isUser={msg.sender === 'user'}>
              {msg.text}
              <Timestamp isUser={msg.sender === 'user'}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Timestamp>
            </MessageBubble>
          </MessageContainer>
        ))}
        {isTyping && (
          <MessageContainer>
            <Avatar>A</Avatar>
            <MessageBubble isUser={false}>
              <em>Agent is typing...</em>
            </MessageBubble>
          </MessageContainer>
        )}
        <div ref={chatEndRef} />
      </ChatWindow>
      <InputForm onSubmit={handleSend}>
        <TextInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          aria-label="Message input"
        />
        <SendButton type="submit" disabled={isLoading} aria-label="Send message">
          &#9658;
        </SendButton>
      </InputForm>
    </AgentWrapper>
  );
}

export default Agent;
// src/pages/Agent.js

import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../utils/api';

const AgentWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
`;

const AgentWindow = styled.div`
  background-color: #ffffff;
  padding: 20px;
  height: 500px;
  overflow-y: auto;
  border: 1px solid #cccccc;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Message = styled.div`
  margin-bottom: 10px;
`;

const UserMessage = styled.p`
  text-align: right;
  color: #0000ff;
`;

const BotMessage = styled.p`
  text-align: left;
  color: #008000;
`;

const InputForm = styled.form`
  display: flex;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
`;

const SendButton = styled.button`
  background-color: #bf9000;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #a67c00;
  }
`;

function Agent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();

    if (input.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.post('/api/agent', { message: input });
      setMessages([...newMessages, { sender: 'bot', text: response.data.reply }]);
    } catch (error) {
      console.error('Error communicating with Agent:', error);
      let errorMessage = 'Sorry, an error occurred.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      setMessages([...newMessages, { sender: 'bot', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AgentWrapper>
      <h2 style={{ fontFamily: 'Playfair Display, serif' }}>Agent Assistant</h2>
      <AgentWindow>
        {messages.map((msg, index) => (
          <Message key={index}>
            {msg.sender === 'user' ? (
              <UserMessage>{msg.text}</UserMessage>
            ) : (
              <BotMessage>{msg.text}</BotMessage>
            )}
          </Message>
        ))}
        {isLoading && <BotMessage>Typing...</BotMessage>}
      </AgentWindow>
      <InputForm onSubmit={handleSend}>
        <TextInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <SendButton type="submit" disabled={isLoading}>
          Send
        </SendButton>
      </InputForm>
    </AgentWrapper>
  );
}

export default Agent;

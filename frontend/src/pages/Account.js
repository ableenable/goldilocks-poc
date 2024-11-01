// src/pages/Account.js

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AccountWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
`;

const Section = styled.div`
  background-color: #ffffff;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border-radius: 8px;
`;

const Label = styled.h3`
  font-family: 'Playfair Display', serif;
  margin-bottom: 10px;
`;

const Value = styled.p`
  font-size: 18px;
`;

const Button = styled.button`
  background-color: #bf9000;
  color: #ffffff;
  border: none;
  padding: 12px 20px;
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 20px;

  &:hover {
    background-color: #a67c00;
  }
`;

function Account() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await api.get('/api/account/api-key');
        setApiKey(response.data.apiKey);
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    };

    fetchApiKey();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AccountWrapper>
      <h2 style={{ fontFamily: 'Playfair Display, serif' }}>Account Information</h2>
      <Section>
        <Label>Email Address</Label>
        <Value>{user.email}</Value>
      </Section>
      <Section>
        <Label>API Key</Label>
        <Value>{apiKey}</Value>
      </Section>
      <Button onClick={handleLogout}>Log Out</Button>
    </AccountWrapper>
  );
}

export default Account;

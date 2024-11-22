// src/pages/Account.js

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AccountWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  margin-bottom: 30px;
  color: #bf9000;
`;

const InfoSection = styled.div`
  background-color: #ffffff;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border-radius: 12px;
`;

const InfoTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  margin-bottom: 15px;
  color: #bf9000;
`;

const InfoValue = styled.p`
  font-size: 16px;
  word-break: break-all;
  margin: 0 0 10px 0;
`;

const Button = styled.button`
  background-color: #bf9000;
  color: #ffffff;
  border: none;
  padding: 12px 20px;
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #a67c00;
  }

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

const ApiKeysTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  color: #bf9000;
`;

const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
`;

const ActionButton = styled.button`
  background-color: #bf9000;
  color: #ffffff;
  border: none;
  padding: 6px 12px;
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a67c00;
  }

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

function Account() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const fetchApiKeys = async () => {
    try {
      const response = await api.get('/api/account/api-keys');
      setApiKeys(response.data.apiKeys);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      setError('Failed to load API keys.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleGenerateApiKey = async () => {
    setGenerating(true);
    setError('');
    try {
      const response = await api.post('/api/account/api-keys');
      setApiKeys([...apiKeys, response.data.apiKey]);
    } catch (error) {
      console.error('Error generating API key:', error);
      setError('Failed to generate API key.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <AccountWrapper>
      <Title>Account Information</Title>
      <InfoSection>
        <InfoTitle>Email Address</InfoTitle>
        <InfoValue>{user.email}</InfoValue>
      </InfoSection>
      <InfoSection>
        <InfoTitle>API Keys</InfoTitle>
        {loading ? (
          <InfoValue>Loading...</InfoValue>
        ) : (
          <>
            {apiKeys.length > 0 ? (
              <ApiKeysTable>
                <thead>
                  <tr>
                    <Th>API Key</Th>
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((key, index) => (
                    <tr key={index}>
                      <Td>{key.substring(0, 10)}...{key.substring(key.length - 10)}</Td>
                      <Td>
                        <ActionButton disabled>View</ActionButton>
                        {/* Implement View functionality if needed */}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </ApiKeysTable>
            ) : (
              <InfoValue>No API keys found.</InfoValue>
            )}
            <Button onClick={handleGenerateApiKey} disabled={generating}>
              {generating ? 'Generating...' : 'Generate New API Key'}
            </Button>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          </>
        )}
      </InfoSection>
      <Button onClick={handleLogout}>Log Out</Button>
    </AccountWrapper>
  );
}

export default Account;
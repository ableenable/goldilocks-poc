// src/pages/Dashboard.js

import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const DashboardWrapper = styled.div`
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

const CopyButton = styled.button`
  background-color: #bf9000;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a67c00;
  }

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

const Balance = styled.p`
  font-size: 18px;
  color: #303030;
  margin: 0;
`;

const CopySuccess = styled.span`
  color: green;
  font-size: 14px;
  margin-left: 10px;
`;

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [balance, setBalance] = useState('0');
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');

  const fetchBalance = async () => {
    try {
      const response = await api.get('/api/transactions/balance');
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleCopy = () => {
    setCopySuccess('Copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <DashboardWrapper>
      <Title>Dashboard</Title>
      <InfoSection>
        <InfoTitle>Wallet Address</InfoTitle>
        <InfoValue>{user.walletAddress}</InfoValue>
        <CopyToClipboard text={user.walletAddress} onCopy={handleCopy}>
          <CopyButton>Copy Address</CopyButton>
        </CopyToClipboard>
        {copySuccess && <CopySuccess>{copySuccess}</CopySuccess>}
      </InfoSection>
      <InfoSection>
        <InfoTitle>Wallet Balance</InfoTitle>
        <Balance>{loading ? 'Loading...' : `${balance} USDC`}</Balance>
      </InfoSection>
    </DashboardWrapper>
  );
}

export default Dashboard; 
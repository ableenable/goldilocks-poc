// src/components/Layout.js

import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const LayoutWrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  flex: 1;
  margin-left: 250px; /* Width of the sidebar */
  padding: 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-left: 200px;
    padding: 20px;
  }

  @media (max-width: 480px) {
    margin-left: 0;
    padding: 10px;
  }
`;

function Layout({ children }) {
  return (
    <LayoutWrapper>
      <Sidebar />
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutWrapper>
  );
}

export default Layout;
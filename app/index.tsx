import React from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  background-color: #E5EBEA; /* Soft gray background */
`;

const Header = styled.header`
  text-align: center;
  padding: 20px;
  font-size: 24px;
  color: #333;
  background-color: #B098A4;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #E5EBEA; /* Muted mauve background for the section */
`;

const AppButton = styled.button`
  background-color: #2C2C2C; /* Dark gray button background */
  color: #E5EBEA; /* Soft gray text on buttons */
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  width: 80%;
  font-size: 16px;
  cursor: pointer;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background-color: #45503B; /* Dark moss green footer background */
  color: #ffffff;
`;

const Icon = styled.div`
  font-size: 24px;
`;

function App() {
  return (
    <AppContainer>
      <Header>Financial Tracker</Header>
      <ButtonContainer>
        <AppButton onClick={() => alert('Create Goal')}>CREATE GOAL</AppButton>
        <AppButton onClick={() => alert('Track Goals')}>TRACK GOALS</AppButton>
        <AppButton onClick={() => alert('Custom Plan')}>CUSTOM PLAN</AppButton>
      </ButtonContainer>
      <Footer>
        <Icon>╳</Icon>
        <Icon>╳</Icon>
        <Icon>╳</Icon>
        <Icon>╳</Icon>
      </Footer>
    </AppContainer>
  );
}

export default App;

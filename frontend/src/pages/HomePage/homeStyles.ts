import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  background-color: #C7B7A3;
`;

export const Card = styled.div`
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const ChatContainer = styled.div`
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  position: absolute;
  width: 80%;
  bottom: 0;
  margin-bottom: 15px;
`;

export const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export const Message = styled.div<{ $sender: 'user' | 'bot' }>`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  max-width: 60%;
  background-color: ${({ $sender }) => ($sender === 'user' ? '#d1e7dd' : '#e2e3e5')};
  align-self: ${({ $sender }) => ($sender === 'user' ? 'flex-end' : 'flex-start')};
`;
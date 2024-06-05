import React, { FC, useState } from 'react'
import { Card, ChatContainer, ChatMessages, Container, Input, Message } from './homeStyles'
import { getUserData, marketSearchService } from '../../services/index.service'

interface IMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const HomePage: FC = () => {
  const user = getUserData

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState('');


  // send message to the server


  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage: IMessage = {
        id: messages.length + 1,
        text: input,
        sender: 'user',
      };

      setMessages([...messages, newMessage]);

      // send message to the server
      try {
        const res = await marketSearchService(input);
        const botMessage: IMessage = {
          id: messages.length + 2,
          text: res.data,
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error fetching market search:', error);
      }

      setInput('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Container>
      <div className='container pt-3'>
        <span>Welcome {user?.name}</span>


        <Card className="chat-container">
          <ChatMessages className="chat-messages">
            {messages.map((message) => (
              <Message key={message.id} $sender={message.sender}>
                {message.text}
              </Message>
            ))}
          </ChatMessages>

          <ChatContainer className="chat-input-container">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="chat-input"
              placeholder="Type a message..."

            />
            <button onClick={sendMessage} className="send-button">Send</button>
          </ChatContainer>
        </Card>
      </div>
    </Container>
  )
}

export default HomePage

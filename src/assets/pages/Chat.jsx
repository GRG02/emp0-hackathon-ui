// Chat.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. เพิ่มข้อความของผู้ใช้
    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages); // แสดงข้อความก่อน

    setInput(''); // ล้าง input

    try {
      // 2. เรียก API OpenAI
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4', // หรือ 'gpt-3.5-turbo'
          messages: newMessages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      // 3. เพิ่มข้อความของ GPT ลงใน state
      const reply = response.data.choices[0].message;
      setMessages([...newMessages, reply]);
    } catch (error) {
      console.error('API error:', error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat with GPT</h2>
      <div style={{ border: '1px solid #ccc', padding: 10, height: 300, overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            <strong>{msg.role === 'user' ? 'คุณ' : 'GPT'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="พิมพ์ข้อความ..."
          style={{ width: '70%', marginRight: 10 }}
        />
        <button onClick={handleSend}>ส่ง</button>
      </div>
    </div>
  );
}

export default Chat;

import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://default725423d5dac742bd8d49ac42da8a30.c2.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/379fce085f7240d0a253716c18dd81b6/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-725423d5-dac7-42bd-8d49-ac42da8a30c2&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MA7IVaLTfprUN_cPAuu4YD8yCulXmMHtcaCQKjRNE3k',
        { prompt: input },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        }
      );

      const reply = {
        role: 'assistant',
        content:
          response.data?.reply ||
          response.data?.body ||
          JSON.stringify(response.data, null, 2) ||
          '❌ ไม่พบคำตอบจากระบบ',
      };

      setMessages([...newMessages, reply]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content:
            '❌ เกิดข้อผิดพลาด:\n' +
            JSON.stringify(error.response?.data || error.message, null, 2),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',  // กึ่งกลางแนวนอน
        alignItems: 'center',      // กึ่งกลางแนวตั้ง
        height: '100vh',           // เต็มความสูงหน้าจอ
        backgroundColor: '#fffaf3',
        padding: 20,
      }}
    >
      <div
        style={{
          padding: 30,
          width: '600px',
          height: '500px',
          backgroundColor: '#fff',
          border: '2px solid #ff9800',
          borderRadius: 12,
          boxShadow: '0 0 10px rgba(255, 165, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#ff7f00', marginBottom: 20 }}>
          🧠 ChatBot
        </h2>
        <div
          style={{
            border: '1px solid #ffcc80',
            backgroundColor: '#fff8e1',
            padding: 10,
            flex: 1,
            overflowY: 'auto',
            borderRadius: 8,
            marginBottom: 15,
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                marginBottom: 10,
                textAlign: msg.role === 'user' ? 'right' : 'left',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: msg.role === 'user' ? '#ffe0b2' : '#ffcc80',
                  color: '#333',
                  padding: '8px 12px',
                  borderRadius: 16,
                  maxWidth: '80%',
                  wordWrap: 'break-word',
                }}
              >
                <strong>{msg.role === 'user' ? 'คุณ' : 'Bot'}:</strong> {msg.content}
              </div>
            </div>
          ))}
          {loading && <div>⏳ กำลังตอบ...</div>}
        </div>
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="พิมพ์ข้อความ..."
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: '1px solid #ffb347',
              outline: 'none',
              fontSize: 14,
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            style={{
              marginLeft: 10,
              backgroundColor: '#ff9800',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 16px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            ส่ง
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
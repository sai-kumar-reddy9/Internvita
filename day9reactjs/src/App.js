// src/App.js
import React, { useState } from 'react';
import QRCode from 'qrcode.react';

function App() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Enter text to generate QR code"
        style={{ padding: '10px', fontSize: '16px', width: '300px' }}
      />
      <div style={{ marginTop: '20px' }}>
        <QRCode value={text} />
      </div>
    </div>
  );
}

export default App;

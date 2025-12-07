import { useState } from 'react';

export default function ServerStatus() {
    const [status, setStatus] = useState("Online");

    const crashServer = () => setStatus("CRASHED (500)");
    const restartServer = () => setStatus("Online");

    return (
        <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px', background: '#111', color: '#fff' }}>
            <h3>🚀 Server Status Panel</h3>
            <p>Current State: <span style={{ color: status === 'Online' ? '#4caf50' : '#f44336', fontWeight: 'bold' }}>{status}</span></p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={crashServer} style={{ background: '#d32f2f', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }}>
                    Simulate Crash
                </button>
                <button onClick={restartServer} style={{ background: '#388e3c', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }}>
                    Restart Process
                </button>
            </div>
        </div>
    );
}
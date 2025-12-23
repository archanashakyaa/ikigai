"use client";
import { useState, useEffect, useRef } from 'react';

export default function CompanionPage() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Hey there. I'm your MindFit companion. I'm here to listen without judgment. What's on your mind today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (textOverride?: string) => {
        const userText = textOverride || input;
        if (!userText.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: userText };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            // Prepare history for the API
            const history = messages.slice(1).map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userText, history }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'API_ERROR');
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: data.response }]);
        } catch (error) {
            console.error("Falling back to mock mode:", error);

            // Graceful Fallback for Demo Purposes (e.g. if API Key is 429/Quota Limited)
            setTimeout(() => {
                const fallbackResponses = [
                    "I hear you. That sounds really tough. (Offline Mode)",
                    "It's completely normal to feel that way. (Offline Mode)",
                    "I'm glad you shared that with me. How can I support you right now? (Offline Mode)",
                    "Have you taken a moment to just breathe today? (Offline Mode)",
                    "You're doing the best you can. (Offline Mode)"
                ];
                const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

                setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: randomResponse }]);
                setIsTyping(false);
            }, 1000);
            return; // Exit function so we don't disable typing twice
        } finally {
            if (isTyping) setIsTyping(false); // Ensure typing indicator off if we didn't hit fallback
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div style={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
            <header style={{
                marginBottom: '16px',
                paddingBottom: '16px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        AI Companion 🤖
                    </h1>
                    <p style={{ fontSize: '0.85rem', color: '#718096' }}>Always here to listen. Judgment-free.</p>
                </div>
                <div style={{
                    background: '#fff5f5',
                    color: '#c53030',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    border: '1px solid #fed7d7'
                }}>
                    ⚠️ AI Support • Not a replacement for therapy
                </div>
            </header>

            {/* Chat Area */}
            <div style={{
                flex: 1,
                background: 'white',
                borderRadius: '24px',
                padding: '24px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
            }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '70%',
                        display: 'flex',
                        gap: '12px'
                    }}>
                        {msg.sender === 'ai' && (
                            <div style={{
                                width: '32px',
                                height: '32px',
                                background: '#e6fffa',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                flexShrink: 0
                            }}>🤖</div>
                        )}

                        <div style={{
                            background: msg.sender === 'user' ? '#667eea' : '#f7fafc',
                            color: msg.sender === 'user' ? 'white' : '#2d3748',
                            padding: '12px 16px',
                            borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                            lineHeight: '1.5',
                            boxShadow: msg.sender === 'ai' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                        }}>
                            {msg.text}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div style={{ alignSelf: 'flex-start', marginLeft: '44px', color: '#718096', fontSize: '0.8rem', fontStyle: 'italic' }}>
                        MindFit is thinking...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ marginTop: '16px' }}>
                {messages.length < 3 && (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                        {['I feel anxious', 'I just need to vent', 'Can you help me relax?', 'I can\'t sleep'].map((suggestion, idx) => (
                            <button
                                key={idx}
                                onClick={() => { setInput(suggestion); handleSend(suggestion); }}
                                style={{
                                    background: 'white',
                                    border: '1px solid #cbd5e0',
                                    padding: '6px 12px',
                                    borderRadius: '16px',
                                    fontSize: '0.85rem',
                                    color: '#4a5568',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#667eea'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#cbd5e0'}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}

                <div style={{
                    background: 'white',
                    padding: '8px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{
                            flex: 1,
                            border: 'none',
                            padding: '12px',
                            fontSize: '1rem',
                            outline: 'none',
                            background: 'transparent'
                        }}
                    />
                    <button
                        onClick={() => handleSend()}
                        style={{
                            background: '#667eea',
                            color: 'white',
                            border: 'none',
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ➤
                    </button>
                </div>
            </div>
        </div>
    );
}

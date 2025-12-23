"use client";
import { useState, useEffect, useRef } from 'react';

// --- Anxiety Relief Modal Component ---
const AnxietyReliefModal = ({ onClose }: { onClose: () => void }) => {
    const [mode, setMode] = useState<'menu' | 'breathing' | 'grounding'>('menu');
    const [breathPhase, setBreathPhase] = useState('Inhale (4s)');

    // Breathing Animation Loop
    useEffect(() => {
        if (mode !== 'breathing') return;

        const sequence = [
            { text: 'Inhale', time: 4000 },
            { text: 'Hold', time: 4000 },
            { text: 'Exhale', time: 4000 },
            { text: 'Hold', time: 4000 }
        ];

        let currentIndex = 0;

        const runBreathCycle = () => {
            setBreathPhase(sequence[currentIndex].text);
            currentIndex = (currentIndex + 1) % sequence.length;
        };

        runBreathCycle(); // Start immediately
        const interval = setInterval(runBreathCycle, 4000);

        return () => clearInterval(interval);
    }, [mode]);

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.8)', zIndex: 1000,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: 'white', padding: '32px', borderRadius: '24px',
                maxWidth: '600px', width: '90%', textAlign: 'center', position: 'relative',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
            }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: '#edf2f7', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

                {mode === 'menu' && (
                    <div style={{ animation: 'fadeIn 0.3s ease' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>Calm Your Mind 🌿</h2>
                        <p style={{ color: '#718096', marginBottom: '24px' }}>Choose a quick exercise to reset.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div onClick={() => setMode('breathing')} style={{
                                padding: '24px', background: '#ebf8ff', borderRadius: '16px', cursor: 'pointer',
                                border: '2px solid transparent', transition: 'all 0.2s', textAlign: 'left'
                            }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#4299e1'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
                                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🌬️</div>
                                <h3 style={{ fontWeight: 'bold', color: '#2b6cb0' }}>Box Breathing</h3>
                                <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>Regulate your nervous system.</p>
                            </div>

                            <div onClick={() => setMode('grounding')} style={{
                                padding: '24px', background: '#f0fff4', borderRadius: '16px', cursor: 'pointer',
                                border: '2px solid transparent', transition: 'all 0.2s', textAlign: 'left'
                            }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#48bb78'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
                                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🦶</div>
                                <h3 style={{ fontWeight: 'bold', color: '#2f855a' }}>5-4-3-2-1 Grounding</h3>
                                <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>Connect to the present moment.</p>
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'breathing' && (
                    <div style={{ animation: 'fadeIn 0.5s ease', padding: '20px 0' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '32px', color: '#4299e1' }}>Box Breathing</h3>

                        <div style={{
                            width: '200px', height: '200px', margin: '0 auto 32px', borderRadius: '50%',
                            background: 'conic-gradient(#63b3ed, #4299e1)',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            transition: 'all 4s ease-in-out',
                            transform: breathPhase === 'Inhale' ? 'scale(1.2)' : (breathPhase === 'Exhale' ? 'scale(0.8)' : 'scale(1)'),
                            boxShadow: '0 0 40px rgba(66, 153, 225, 0.3)'
                        }}>
                            <div style={{ width: '180px', height: '180px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2b6cb0' }}>{breathPhase}</span>
                            </div>
                        </div>

                        <p style={{ color: '#718096', maxWidth: '400px', margin: '0 auto 24px' }}>
                            Inhale for 4s, Hold for 4s, Exhale for 4s, Hold for 4s.
                        </p>
                        <button onClick={() => setMode('menu')} style={{ background: 'transparent', color: '#718096', border: '1px solid #cbd5e0', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>← Back to Menu</button>
                    </div>
                )}

                {mode === 'grounding' && (
                    <div style={{ animation: 'fadeIn 0.5s ease', textAlign: 'left' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px', color: '#2f855a', textAlign: 'center' }}>Grounding Technique</h3>
                        <p style={{ textAlign: 'center', color: '#718096', marginBottom: '24px' }}>Look around you and name out loud:</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <label style={{ padding: '12px', background: '#f0fff4', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ width: '20px', height: '20px' }} />
                                <span>👀 5 things you see</span>
                            </label>
                            <label style={{ padding: '12px', background: '#f0fff4', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ width: '20px', height: '20px' }} />
                                <span>✋ 4 things you can touch</span>
                            </label>
                            <label style={{ padding: '12px', background: '#f0fff4', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ width: '20px', height: '20px' }} />
                                <span>👂 3 things you hear</span>
                            </label>
                            <label style={{ padding: '12px', background: '#f0fff4', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ width: '20px', height: '20px' }} />
                                <span>👃 2 things you smell</span>
                            </label>
                            <label style={{ padding: '12px', background: '#f0fff4', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ width: '20px', height: '20px' }} />
                                <span>🍬 1 thing you can taste</span>
                            </label>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '24px' }}>
                            <button onClick={() => setMode('menu')} style={{ background: 'transparent', color: '#718096', border: '1px solid #cbd5e0', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>← Back to Menu</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Simple Memory Game Component ---
const MemoryGame = ({ onClose }: { onClose: () => void }) => {
    const emojis = ['🌸', '🌊', '🏔️', '🌵', '🌺', '🌙', '⭐', '🍀'];
    const [cards, setCards] = useState<{ id: number; emoji: string; isFlipped: boolean; isMatched: boolean }[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matches, setMatches] = useState(0);

    // Initialize Game
    useEffect(() => {
        const gameEmojis = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({
                id: index,
                emoji,
                isFlipped: false,
                isMatched: false,
            }));
        setCards(gameEmojis);
    }, []);

    // Handle Card Click
    const handleCardClick = (id: number) => {
        if (flippedCards.length === 2) return;
        if (cards.find(c => c.id === id)?.isMatched) return;
        if (flippedCards.includes(id)) return;

        const newCards = cards.map(c => c.id === id ? { ...c, isFlipped: true } : c);
        setCards(newCards);
        setFlippedCards([...flippedCards, id]);

        if (flippedCards.length === 1) {
            const firstId = flippedCards[0];
            const secondId = id;
            if (newCards[firstId].emoji === newCards[secondId].emoji) {
                // Match!
                setMatches(prev => prev + 1);
                setFlippedCards([]);
                setCards(prev => prev.map(c => (c.id === firstId || c.id === secondId) ? { ...c, isMatched: true } : c));
            } else {
                // No Match
                setTimeout(() => {
                    setCards(prev => prev.map(c => (c.id === firstId || c.id === secondId) ? { ...c, isFlipped: false } : c));
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.8)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: 'white',
                padding: '32px',
                borderRadius: '24px',
                maxWidth: '500px',
                width: '90%',
                textAlign: 'center',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>Mindful Memory 🧠</h2>
                    <button
                        onClick={onClose}
                        style={{ background: '#edf2f7', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        ✕
                    </button>
                </div>

                {matches === 8 ? (
                    <div style={{ padding: '40px 0' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#48bb78', marginBottom: '8px' }}>Excellent Focus!</h3>
                        <p style={{ color: '#718096', marginBottom: '24px' }}>You cleared the board.</p>
                        <button
                            className="btn btn-primary"
                            onClick={onClose}
                        >
                            Return to Dashboard
                        </button>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '12px',
                        marginBottom: '24px'
                    }}>
                        {cards.map(card => (
                            <div
                                key={card.id}
                                onClick={() => handleCardClick(card.id)}
                                style={{
                                    aspectRatio: '1',
                                    background: card.isFlipped || card.isMatched ? '#ebf8ff' : '#667eea',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    transition: 'all 0.3s',
                                    transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                                }}
                            >
                                {(card.isFlipped || card.isMatched) ? card.emoji : ''}
                            </div>
                        ))}
                    </div>
                )}

                <p style={{ fontSize: '0.9rem', color: '#a0aec0' }}>Find all matching pairs to win.</p>
            </div>
        </div>
    );
};

// --- Vent to AI Chat Component ---
const VentToAIModal = ({ onClose }: { onClose: () => void }) => {
    const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>(
        [{ role: 'model', text: "Hey! I'm here. What's on your mind? No judgment, just listening. 🌊" }]
    );
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            // Prepare history for API
            // Note: In a real app, you might want to sanitize or limit history
            const history = messages.map(m => ({
                role: m.role === 'model' ? 'model' : 'user',
                parts: [{ text: m.text }]
            }));

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg, history })
            });

            const data = await res.json();

            if (data.response) {
                setMessages(prev => [...prev, { role: 'model', text: data.response }]);
            }
        } catch (error) {
            console.error("Chat error", error);
            setMessages(prev => [...prev, { role: 'model', text: "I'm having a bit of trouble hearing you right now (connection error). But I'm still here." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.8)', zIndex: 1000,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: 'white', padding: '24px', borderRadius: '24px',
                maxWidth: '500px', width: '90%', height: '80vh',
                display: 'flex', flexDirection: 'column', position: 'relative',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #edf2f7', paddingBottom: '16px' }}>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2d3748' }}>Vent to AI 🤖</h2>
                        <p style={{ fontSize: '0.8rem', color: '#718096' }}>Your lifeguard is listening.</p>
                    </div>
                    <button onClick={onClose} style={{ background: '#edf2f7', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px', paddingBottom: '16px' }}>
                    {messages.map((msg, idx) => (
                        <div key={idx} style={{
                            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            background: msg.role === 'user' ? '#667eea' : '#f7fafc',
                            color: msg.role === 'user' ? 'white' : '#2d3748',
                            padding: '12px 16px',
                            borderRadius: '16px',
                            borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                            borderBottomLeftRadius: msg.role === 'model' ? '4px' : '16px',
                            maxWidth: '80%',
                            lineHeight: '1.4'
                        }}>
                            {msg.text}
                        </div>
                    ))}
                    {isLoading && (
                        <div style={{ alignSelf: 'flex-start', background: '#f7fafc', padding: '12px 16px', borderRadius: '16px', color: '#718096', fontStyle: 'italic' }}>
                            Thinking...
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type what's on your mind..."
                        style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                    />
                    <button onClick={sendMessage} disabled={isLoading} style={{ background: '#667eea', color: 'white', border: 'none', padding: '0 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Doctor Finder Modal ---
const DoctorFinderModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.8)', zIndex: 1000,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: 'white', padding: '32px', borderRadius: '24px',
                maxWidth: '500px', width: '90%', textAlign: 'center', position: 'relative',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
            }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: '#edf2f7', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🩺</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px', color: '#2d3748' }}>Find Professional Help</h2>
                <p style={{ color: '#718096', marginBottom: '24px' }}>
                    Connect with a licensed professional nearby.
                </p>

                <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                    <a href="https://www.google.com/maps/search/psychiatrist+near+me" target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex', alignItems: 'center', padding: '16px', background: '#ebf8ff', borderRadius: '16px', textDecoration: 'none', color: '#2b6cb0', transition: 'transform 0.2s'
                    }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                        <span style={{ fontSize: '1.5rem', marginRight: '16px' }}>💊</span>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontWeight: 'bold' }}>Find a Psychiatrist</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Medical doctors who can prescribe medication.</div>
                        </div>
                    </a>

                    <a href="https://www.google.com/maps/search/therapist+near+me" target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex', alignItems: 'center', padding: '16px', background: '#f0fff4', borderRadius: '16px', textDecoration: 'none', color: '#2f855a', transition: 'transform 0.2s'
                    }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                        <span style={{ fontSize: '1.5rem', marginRight: '16px' }}>🗣️</span>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontWeight: 'bold' }}>Find a Therapist</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Psychologists for talk therapy and counseling.</div>
                        </div>
                    </a>
                </div>

                <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '16px' }}>
                    <p style={{ fontSize: '0.9rem', color: '#e53e3e', fontWeight: 'bold', marginBottom: '8px' }}>In a crisis?</p>
                    <a href="tel:988" style={{
                        display: 'inline-block', background: '#e53e3e', color: 'white', fontWeight: 'bold', padding: '10px 24px', borderRadius: '50px', textDecoration: 'none'
                    }}>
                        Call 988 (Lifeline)
                    </a>
                </div>
            </div>
        </div>
    );
};

export default function DashboardPage() {
    const [mood, setMood] = useState<string | null>(null);
    const [showGame, setShowGame] = useState(false);
    const [showVent, setShowVent] = useState(false);
    const [showDoctor, setShowDoctor] = useState(false);
    const [showAnxiety, setShowAnxiety] = useState(false);
    const [userName, setUserName] = useState('Friend');

    useEffect(() => {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            try {
                const profile = JSON.parse(storedProfile);
                if (profile.name) {
                    // Get just the first name for a friendlier greeting
                    setUserName(profile.name.split(' ')[0]);
                }
            } catch (e) {
                console.error("Failed to parse user profile", e);
            }
        }
    }, []);

    const moods = [
        { emoji: '😢', label: 'Tough', color: '#fc8181' },
        { emoji: '😟', label: 'Hard', color: '#f6ad55' },
        { emoji: '😐', label: 'Okay', color: '#63b3ed' },
        { emoji: '🙂', label: 'Good', color: '#48bb78' },
        { emoji: '😊', label: 'Great', color: '#9f7aea' },
    ];

    return (
        <div>
            {showGame && <MemoryGame onClose={() => setShowGame(false)} />}
            {showVent && <VentToAIModal onClose={() => setShowVent(false)} />}
            {showDoctor && <DoctorFinderModal onClose={() => setShowDoctor(false)} />}
            {showAnxiety && <AnxietyReliefModal onClose={() => setShowAnxiety(false)} />}

            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>
                    Good evening, {userName} 🌙
                </h1>
                <p style={{ color: '#718096' }}>Let&apos;s check in with yourself today.</p>
            </header>

            {/* Mood Check-In Card */}
            <section style={{
                background: 'white',
                padding: '32px',
                borderRadius: '24px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                marginBottom: '32px',
                textAlign: 'center'
            }}>
                {!mood ? (
                    <>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px' }}>How are you feeling right now?</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                            {moods.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setMood(item.label)}
                                    style={{
                                        background: 'transparent',
                                        border: '2px solid transparent',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        padding: '16px',
                                        borderRadius: '16px',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                        e.currentTarget.style.background = '#f7fafc';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    <div style={{ fontSize: '3rem', marginBottom: '8px' }}>{item.emoji}</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#4a5568' }}>{item.label}</div>
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div style={{ animation: 'fadeIn 0.5s ease' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
                            {moods.find(m => m.label === mood)?.emoji}
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
                            Thanks for checking in.
                        </h3>
                        <p style={{ color: '#718096', marginBottom: '24px' }}>
                            It sounds like you&apos;re feeling <b>{mood.toLowerCase()}</b>. Would you like to do something about it?
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <button className="btn btn-secondary">Just logging it</button>
                            <button className="btn btn-primary" onClick={() => setMood(null)}>I need support</button>
                        </div>
                    </div>
                )}
            </section>

            {/* Quick Actions Grid */}
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>Quick Support</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>

                {/* Card 1: Anxiety */}
                <div
                    onClick={() => setShowAnxiety(true)}
                    style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        padding: '24px',
                        borderRadius: '20px',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ fontSize: '2rem', marginBottom: '16px' }}>😰</div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px' }}>Anxiety Relief</h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>5-minute calming exercises</p>
                </div>

                {/* Card 2: AI Chat */}
                <div
                    onClick={() => setShowVent(true)}
                    style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '20px',
                        border: '1px solid #e2e8f0',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🤖</div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px' }}>Vent to AI</h3>
                    <p style={{ fontSize: '0.9rem', color: '#718096' }}>Judgment-free listening</p>
                </div>

                {/* Card 3: Game Mode */}
                <div
                    onClick={() => setShowGame(true)}
                    style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '20px',
                        border: '1px solid #e2e8f0',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🎮</div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px' }}>De-stress Game</h3>
                    <p style={{ fontSize: '0.9rem', color: '#718096' }}>Play a quick puzzle</p>
                </div>

                {/* Card 4: Find Doctor */}
                <div
                    onClick={() => setShowDoctor(true)}
                    style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '20px',
                        border: '1px solid #e2e8f0',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🩺</div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px' }}>Find Support</h3>
                    <p style={{ fontSize: '0.9rem', color: '#718096' }}>Connect with a doctor</p>
                </div>

            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}

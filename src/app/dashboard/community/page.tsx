"use client";
import { useState, useEffect, useRef } from 'react';

// --- Types ---
interface Room {
    id: number;
    name: string;
    emoji: string;
    active: number;
    tag: string;
}

interface Post {
    id: number;
    author: string; // Anonymous ID
    content: string;
    likes: number;
    comments: number;
    timestamp: string;
    tags: string[];
    isLiked?: boolean;
}

interface ChatMessage {
    id: number;
    sender: string;
    text: string;
    isMe: boolean;
}

// --- Components ---

const CommunityFeed = () => {
    const [posts, setPosts] = useState<Post[]>([
        { id: 1, author: 'Student_8492', content: 'Does anyone else feel like everyone is ahead of them? I am struggling to keep up with assignments this week.', likes: 24, comments: 5, timestamp: '2h ago', tags: ['#academic', '#vent'] },
        { id: 2, author: 'Student_3310', content: 'Just did the 5-minute breathing exercise in the app properly for the first time. Actually helped calm my anxiety before the presentation!', likes: 45, comments: 12, timestamp: '4h ago', tags: ['#win', '#mindfulness'] },
        { id: 3, author: 'Student_5521', content: 'Reminder: You are more than your grades. Take care of yourself today 💜', likes: 112, comments: 8, timestamp: '5h ago', tags: ['#motivation'] },
    ]);

    const handleLike = (id: number) => {
        setPosts(prev => prev.map(p =>
            p.id === id ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked } : p
        ));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Create Post Input */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '40px', height: '40px', background: '#cbd5e0', borderRadius: '50%', flexShrink: 0 }}></div>
                    <div style={{ flex: 1 }}>
                        <input
                            type="text"
                            placeholder="Share your thoughts anonymously..."
                            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f7fafc', marginBottom: '12px' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>Post</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts List */}
            {posts.map(post => (
                <div key={post.id} style={{ background: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '32px', height: '32px', background: `hsl(${post.id * 50}, 70%, 80%)`, borderRadius: '50%' }}></div>
                            <span style={{ fontWeight: '600', color: '#4a5568', fontSize: '0.9rem' }}>{post.author}</span>
                            <span style={{ color: '#a0aec0', fontSize: '0.8rem' }}>• {post.timestamp}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            {post.tags.map(tag => (
                                <span key={tag} style={{ background: '#edf2f7', color: '#718096', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '12px' }}>{tag}</span>
                            ))}
                        </div>
                    </div>
                    <p style={{ color: '#2d3748', lineHeight: '1.6', marginBottom: '16px' }}>{post.content}</p>

                    <div style={{ display: 'flex', gap: '24px', borderTop: '1px solid #f7fafc', paddingTop: '16px' }}>
                        <button
                            onClick={() => handleLike(post.id)}
                            style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', color: post.isLiked ? '#e53e3e' : '#718096', cursor: 'pointer', fontWeight: '500' }}
                        >
                            <span>{post.isLiked ? '❤️' : '🤍'}</span> {post.likes}
                        </button>
                        <button style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', color: '#718096', cursor: 'pointer', fontWeight: '500' }}>
                            <span>💬</span> {post.comments}
                        </button>
                        <button style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', color: '#718096', cursor: 'pointer', fontWeight: '500', marginLeft: 'auto' }}>
                            <span>📤</span> Share
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const LiveChatRoom = ({ room, onLeave }: { room: Room, onLeave: () => void }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, sender: 'Student_991', text: 'Hey everyone, feeling a bit overwhelmed today.', isMe: false },
        { id: 2, sender: 'Student_102', text: 'Same here. Finals week is brutal.', isMe: false },
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;
        setMessages(prev => [...prev, { id: Date.now(), sender: 'You', text: inputText, isMe: true }]);
        setInputText('');

        // Sim response
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'Student_' + Math.floor(Math.random() * 1000), text: 'You got this! one step at a time.', isMe: false }]);
        }, 2000);
    };

    return (
        <div style={{
            background: 'white',
            height: '600px',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
        }}>
            {/* Room Header */}
            <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                        onClick={onLeave}
                        style={{ background: '#edf2f7', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        ←
                    </button>
                    <div>
                        <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {room.emoji} {room.name}
                            <span style={{ fontSize: '0.7rem', background: '#48bb78', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>LIVE</span>
                        </h3>
                        <div style={{ fontSize: '0.8rem', color: '#718096' }}>{room.active} students online • Anonymous</div>
                    </div>
                </div>
                <button style={{ background: '#fff5f5', color: '#c53030', border: '1px solid #fed7d7', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    Report
                </button>
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1, padding: '24px', background: '#f7fafc', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{ alignSelf: msg.isMe ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                        {!msg.isMe && <div style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '4px', marginLeft: '12px' }}>{msg.sender}</div>}
                        <div style={{
                            padding: '12px 16px',
                            borderRadius: msg.isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                            background: msg.isMe ? '#667eea' : 'white',
                            color: msg.isMe ? 'white' : '#2d3748',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: '20px', borderTop: '1px solid #e2e8f0', background: 'white', display: 'flex', gap: '12px' }}>
                <input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    type="text"
                    placeholder="Type a message..."
                    style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f7fafc' }}
                />
                <button
                    onClick={handleSend}
                    className="btn btn-primary"
                    style={{ padding: '0 20px', borderRadius: '12px' }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default function CommunityPage() {
    const [view, setView] = useState<'rooms' | 'feed'>('rooms');

    const rooms = [
        { id: 1, name: 'Late Night Thoughts', emoji: '🌙', active: 124, tag: 'General' },
        { id: 2, name: 'Exam Stress', emoji: '📚', active: 85, tag: 'Academic' },
        { id: 3, name: 'Hostel Life', emoji: '🏠', active: 56, tag: 'Lifestyle' },
        { id: 4, name: 'Anxiety Support', emoji: '💜', active: 203, tag: 'Support' },
        { id: 5, name: 'Social Battery Low', emoji: '🔋', active: 42, tag: 'Introvert' },
        { id: 6, name: 'Relationship Advice', emoji: '💔', active: 98, tag: 'Relationships' },
    ];

    const [joinedRoomId, setJoinedRoomId] = useState<number | null>(null);
    const joinedRoom = rooms.find(r => r.id === joinedRoomId);

    return (
        <div>
            <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        Community Safe Space 🫂
                    </h1>
                    <p style={{ color: '#718096' }}>Anonymous peer support. You are not alone.</p>
                </div>
                {!joinedRoomId && (
                    <div style={{ background: '#edf2f7', padding: '4px', borderRadius: '12px', display: 'flex' }}>
                        <button
                            onClick={() => setView('rooms')}
                            style={{
                                padding: '8px 24px',
                                borderRadius: '8px',
                                background: view === 'rooms' ? 'white' : 'transparent',
                                boxShadow: view === 'rooms' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                                border: 'none',
                                fontWeight: '600',
                                color: view === 'rooms' ? '#2d3748' : '#718096',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            Live Rooms
                        </button>
                        <button
                            onClick={() => setView('feed')}
                            style={{
                                padding: '8px 24px',
                                borderRadius: '8px',
                                background: view === 'feed' ? 'white' : 'transparent',
                                boxShadow: view === 'feed' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                                border: 'none',
                                fontWeight: '600',
                                color: view === 'feed' ? '#2d3748' : '#718096',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            Discussion Feed
                        </button>
                    </div>
                )}
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px' }}>

                {/* Main Content Area */}
                <div>
                    {joinedRoomId && joinedRoom ? (
                        <LiveChatRoom room={joinedRoom} onLeave={() => setJoinedRoomId(null)} />
                    ) : (
                        view === 'rooms' ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                                {rooms.map((room) => (
                                    <div key={room.id}
                                        onClick={() => setJoinedRoomId(room.id)}
                                        style={{
                                            background: 'white',
                                            padding: '24px',
                                            borderRadius: '20px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                            border: '1px solid #e2e8f0',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s, border-color 0.2s'
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#667eea'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                            <div style={{ fontSize: '2rem' }}>{room.emoji}</div>
                                            <span style={{ background: '#ebf8ff', color: '#3182ce', fontSize: '0.75rem', fontWeight: '600', padding: '4px 8px', borderRadius: '6px', height: 'fit-content' }}>
                                                {room.tag}
                                            </span>
                                        </div>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px', color: '#2d3748' }}>{room.name}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#718096', fontSize: '0.9rem' }}>
                                            <span style={{ width: '8px', height: '8px', background: '#48bb78', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 0 2px #c6f6d5' }}></span>
                                            {room.active} online
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <CommunityFeed />
                        )
                    )}
                </div>

                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Live Activity Widget */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '8px', height: '8px', background: '#e53e3e', borderRadius: '50%' }}></span>
                            Live Activity
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                                <b>Student_442</b> joined <b>Exam Stress</b>
                                <div style={{ fontSize: '0.75rem', color: '#a0aec0' }}>2 mins ago</div>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                                <b>Student_991</b> posted in <b>General</b>
                                <div style={{ fontSize: '0.75rem', color: '#a0aec0' }}>5 mins ago</div>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                                <span style={{ color: '#48bb78', fontWeight: 'bold' }}>+12</span> new students online
                            </div>
                        </div>
                    </div>

                    {/* Trending Topics */}
                    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '24px', borderRadius: '24px', color: 'white' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '16px' }}>Trending 🔥</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {['#finals', '#anxiety', '#motivation', '#sleep', '#loneliness'].map(tag => (
                                <span key={tag} style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', backdropFilter: 'blur(4px)' }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

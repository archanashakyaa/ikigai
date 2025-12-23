"use client";
import { useState, useEffect, useRef } from 'react';

interface JournalEntry {
    id: number;
    text: string;
    mood: string | null;
    tags: string[];
    date: string;
    timestamp: number;
    audio?: string;
}

export default function JournalPage() {
    const [entry, setEntry] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    useEffect(() => {
        const storedEntries = localStorage.getItem('journalEntries');
        if (storedEntries) {
            setEntries(JSON.parse(storedEntries));
        }
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = () => {
                    const base64Audio = reader.result as string;
                    saveAudioEntry(base64Audio);
                };

                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert("Could not access microphone. Please ensure permissions are granted.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const saveAudioEntry = (audioUrl: string) => {
        // If there's text typed, use it. Otherwise, default title.
        const textContent = entry.trim() || 'Voice Note 🎤';

        const newEntry: JournalEntry = {
            id: Date.now(),
            text: textContent,
            mood: selectedMood || '🗣️',
            tags: ['#voice-note'],
            date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
            timestamp: Date.now(),
            audio: audioUrl
        };

        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);
        localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

        // Reset state
        setEntry('');
        setSelectedMood(null);
        alert('Voice note saved to history!');
        // Ideally switch to history view to show it, or just notify. User workflow implies "put in preview history".
        // Let's not force view change, but it will be there when they look.
    };

    const handleSave = () => {
        if (!entry.trim()) return;

        const newEntry: JournalEntry = {
            id: Date.now(),
            text: entry,
            mood: selectedMood,
            tags: ['#daily'],
            date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
            timestamp: Date.now()
        };

        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);
        localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

        alert('Journal entry saved successfully!');
        setEntry('');
        setSelectedMood(null);
    };

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <div>
            <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>
                        {showHistory ? 'Journal History 📖' : 'Smart Journal 📝'}
                    </h1>
                    <p style={{ color: '#718096' }}>
                        {showHistory ? 'Your past reflections and thoughts.' : 'Get it out of your head. No judgment here.'}
                    </p>
                </div>
                <button
                    className="btn btn-secondary"
                    style={{ height: '40px', fontSize: '0.9rem' }}
                    onClick={() => setShowHistory(!showHistory)}
                >
                    {showHistory ? 'Back to Editor' : 'View History'}
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>

                {/* Main Content Area (Editor or History) */}
                {showHistory ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {entries.length === 0 ? (
                            <div style={{
                                background: 'white',
                                padding: '48px',
                                borderRadius: '24px',
                                textAlign: 'center',
                                color: '#718096'
                            }}>
                                <p style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No entries yet.</p>
                                <p>Start writing in the editor to see your history here!</p>
                            </div>
                        ) : (
                            entries.map(item => (
                                <div key={item.id} style={{
                                    background: 'white',
                                    padding: '24px',
                                    borderRadius: '24px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: '0.9rem', color: '#718096', fontWeight: '500' }}>
                                            {new Date(item.timestamp).toLocaleString()}
                                        </div>
                                        {item.mood && <span style={{ fontSize: '1.5rem' }}>{item.mood}</span>}
                                    </div>
                                    <p style={{ fontSize: '1.1rem', color: '#2d3748', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                                        {item.text}
                                    </p>

                                    {item.audio && (
                                        <div style={{ marginTop: '8px', padding: '12px', background: '#f7fafc', borderRadius: '12px' }}>
                                            <audio controls src={item.audio} style={{ width: '100%' }} />
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {item.tags.map(tag => (
                                            <span key={tag} style={{ background: '#edf2f7', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', color: '#4a5568' }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '24px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        minHeight: '500px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {/* Toolbar */}
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                            {['😢', '😐', '🙂'].map((mood) => (
                                <span
                                    key={mood}
                                    onClick={() => setSelectedMood(mood)}
                                    style={{
                                        fontSize: '1.5rem',
                                        opacity: selectedMood === mood ? 1 : 0.4,
                                        cursor: 'pointer',
                                        transform: selectedMood === mood ? 'scale(1.2)' : 'scale(1)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {mood}
                                </span>
                            ))}

                            <div style={{ width: '1px', background: '#e2e8f0', margin: '0 12px' }}></div>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ background: '#edf2f7', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', color: '#4a5568', cursor: 'pointer' }}>#exam</span>
                                <span style={{ background: '#edf2f7', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', color: '#4a5568', cursor: 'pointer' }}>#sleep</span>
                                <span style={{ background: 'transparent', border: '1px dashed #cbd5e0', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', color: '#718096', cursor: 'pointer' }}>+ Add Tag</span>
                            </div>
                        </div>

                        <textarea
                            placeholder="What's weighing on you today? Or what went well? Start typing..."
                            value={entry}
                            onChange={(e) => setEntry(e.target.value)}
                            style={{
                                flex: 1,
                                border: 'none',
                                resize: 'none',
                                outline: 'none',
                                fontSize: '1.1rem',
                                lineHeight: '1.8',
                                fontFamily: 'inherit',
                                color: '#2d3748'
                            }}
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                            <button
                                onClick={toggleRecording}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: isRecording ? '#fed7d7' : 'transparent',
                                    color: isRecording ? '#c53030' : '#718096',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <span>{isRecording ? '⏹ Stop & Save' : '🎙️ Voice Note'}</span>
                            </button>

                            <button
                                className="btn btn-primary"
                                style={{ padding: '0 32px', opacity: entry.trim() ? 1 : 0.6, cursor: entry.trim() ? 'pointer' : 'not-allowed' }}
                                onClick={handleSave}
                                disabled={!entry.trim()}
                            >
                                Save Entry
                            </button>
                        </div>
                    </div>
                )}

                {/* Sidebar: AI Insights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #e6fffa 0%, #ebf8ff 100%)',
                        padding: '24px',
                        borderRadius: '24px',
                        border: '1px solid #b2f5ea'
                    }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#285e61', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            ✨ AI Insight
                        </h3>
                        <p style={{ fontSize: '0.95rem', color: '#319795', lineHeight: '1.6' }}>
                            You mention &quot;exams&quot; often when feeling anxious (4 times this week).
                            <br /><br />
                            <b>Suggestion:</b> Try the &quot;5-minute Study Break&quot; breathing exercise before you start revising.
                        </p>
                    </div>

                    <div style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '24px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '16px' }}>Recent Entries</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {entries.slice(0, 2).map(item => (
                                <div key={item.id} style={{ borderBottom: '1px solid #edf2f7', paddingBottom: '12px' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#718096', marginBottom: '4px' }}>
                                        {new Date(item.timestamp).toLocaleDateString()}
                                    </div>
                                    <div style={{ fontWeight: '500', color: '#2d3748' }}>
                                        {item.text.length > 30 ? item.text.substring(0, 30) + '...' : item.text}
                                    </div>
                                    <div style={{ fontSize: '1.2rem', marginTop: '4px' }}>
                                        {item.mood || '📝'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

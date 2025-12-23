"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: 'Alex Johnson',
        email: 'alex.j@university.edu',
        university: 'State University',
        year: 'Sophomore',
        bio: 'Just trying to stay mindful amidst the chaos of exams.',
        avatar: ''
    });

    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            setUser(prev => ({ ...prev, ...JSON.parse(storedProfile) }));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser(prev => ({ ...prev, avatar: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate network delay
        setTimeout(() => {
            localStorage.setItem('userProfile', JSON.stringify(user));
            setIsSaving(false);
            alert('Profile updated successfully!');
        }, 800);
    };

    const handleLogout = () => {
        // In a real app, clear auth tokens here
        router.push('/');
    };

    return (
        <div>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>
                    My Profile 👤
                </h1>
                <p style={{ color: '#718096' }}>Manage your account and preferences.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>

                {/* Profile Form */}
                <div style={{
                    background: 'white',
                    padding: '32px',
                    borderRadius: '24px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            background: user.avatar ? `url(${user.avatar}) center/cover no-repeat` : '#cbd5e0',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2.5rem',
                            overflow: 'hidden'
                        }}>
                            {!user.avatar && '🧑‍🎓'}
                        </div>
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <button
                                className="btn btn-secondary"
                                onClick={handleAvatarClick}
                                style={{ fontSize: '0.9rem', padding: '8px 16px', height: 'auto' }}
                            >
                                Change Avatar
                            </button>
                        </div>
                    </div>

                    <form style={{ display: 'grid', gap: '24px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#4a5568' }}>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#4a5568' }}>Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#4a5568' }}>University</label>
                                <input
                                    type="text"
                                    name="university"
                                    value={user.university}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#4a5568' }}>Year</label>
                                <input
                                    type="text"
                                    name="year"
                                    value={user.year}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#4a5568' }}>Bio</label>
                            <textarea
                                name="bio"
                                value={user.bio}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', resize: 'none', background: 'white', minHeight: '100px' }}
                            />
                        </div>

                        <div style={{ paddingTop: '24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                            <button type="button" className="btn btn-secondary">Discard</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSave}
                                disabled={isSaving}
                                style={{ opacity: isSaving ? 0.7 : 1, cursor: isSaving ? 'wait' : 'pointer' }}
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Sidebar Settings */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '16px', color: '#2d3748' }}>Account Actions</h3>

                        <button
                            onClick={handleLogout}
                            style={{
                                width: '100%',
                                padding: '12px',
                                textAlign: 'left',
                                background: '#fff5f5',
                                color: '#c53030',
                                border: '1px solid #fed7d7',
                                borderRadius: '12px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '12px'
                            }}
                        >
                            <span>🚪</span> Log Out
                        </button>

                        <button style={{
                            width: '100%',
                            padding: '12px',
                            textAlign: 'left',
                            background: 'transparent',
                            color: '#718096',
                            border: '1px solid transparent',
                            borderRadius: '12px',
                            fontSize: '0.9rem'
                        }}>
                            Reset Password
                        </button>
                        <button style={{
                            width: '100%',
                            padding: '12px',
                            textAlign: 'left',
                            background: 'transparent',
                            color: '#718096',
                            border: '1px solid transparent',
                            borderRadius: '12px',
                            fontSize: '0.9rem'
                        }}>
                            Privacy Settings
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

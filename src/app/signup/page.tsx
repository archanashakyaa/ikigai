"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call and save to local storage for demo persistence
        setTimeout(() => {
            const userProfile = {
                name: name,
                email: email,
                university: 'MindFit University', // Default for now
                year: 'Freshman',
                bio: 'I am ready to start my mental fitness journey!'
            };
            localStorage.setItem('userProfile', JSON.stringify(userProfile));

            setIsLoading(false);
            router.push('/dashboard');
        }, 1000);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
            padding: '24px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                background: 'white',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Link href="/" style={{
                        fontSize: '1.75rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textDecoration: 'none',
                        marginBottom: '16px',
                        display: 'inline-block'
                    }}>
                        MindFit
                    </Link>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c' }}>Create your account</h2>
                    <p style={{ color: '#718096', marginTop: '8px' }}>Start your mental fitness journey correctly.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#4a5568' }}>Full Name</label>
                        <input
                            type="text"
                            placeholder="Alex Johnson"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                background: '#f8fafc'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#4a5568' }}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                background: '#f8fafc'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#4a5568' }}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                background: '#f8fafc'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            color: 'white',
                            border: 'none',
                            padding: '14px',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: isLoading ? 'wait' : 'pointer',
                            transition: 'opacity 0.2s',
                            marginTop: '8px',
                            opacity: isLoading ? 0.8 : 1
                        }}
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.9rem', color: '#718096' }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{ color: '#667eea', fontWeight: '600', textDecoration: 'none' }}>
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}

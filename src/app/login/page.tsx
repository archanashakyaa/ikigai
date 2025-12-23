import Link from 'next/link';

export default function LoginPage() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f7fafc',
            padding: '24px'
        }}>
            <div style={{
                background: 'white',
                padding: '48px',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '450px'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Link href="/" style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textDecoration: 'none',
                        display: 'block',
                        marginBottom: '16px'
                    }}>
                        MindFit
                    </Link>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1a202c' }}>Welcome back</h1>
                    <p style={{ color: '#718096', marginTop: '8px' }}>Enter your details to access your account.</p>
                </div>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500', color: '#4a5568' }}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@university.edu"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4a5568' }}>Password</label>
                            <a href="#" style={{ fontSize: '0.875rem', color: '#667eea' }}>Forgot?</a>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                outline: 'none',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <Link href="/dashboard" style={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        border: 'none',
                        padding: '14px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        marginTop: '8px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'block'
                    }}>
                        Sign In
                    </Link>
                </form>

                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                        Don&apos;t have an account? <Link href="/signup" style={{ color: '#667eea', fontWeight: '600' }}>Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

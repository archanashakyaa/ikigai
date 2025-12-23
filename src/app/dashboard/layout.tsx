"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userName, setUserName] = useState('Student User');
    const [userPlan, setUserPlan] = useState('Free Plan'); // Placeholder, could be part of profile later

    useEffect(() => {
        // Load user name from local storage if available
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            try {
                const profile = JSON.parse(storedProfile);
                if (profile.name) setUserName(profile.name);
            } catch (e) {
                console.error("Failed to parse user profile", e);
            }
        }
    }, []);

    const navItems = [
        { name: 'Home', href: '/dashboard', icon: '🏠' },
        { name: 'Journal', href: '/dashboard/journal', icon: '📝' },
        { name: 'Companion', href: '/dashboard/companion', icon: '🤖' },
        { name: 'Community', href: '/dashboard/community', icon: '👥' },
        { name: 'Progress', href: '/dashboard/progress', icon: '📊' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f7fafc' }}>
            {/* Sidebar (Desktop) */}
            <aside style={{
                width: '260px',
                background: 'white',
                borderRight: '1px solid #e2e8f0',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 50,
            }} className="desktop-sidebar">
                <Link href="/dashboard" style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '48px',
                    display: 'block'
                }}>
                    MindFit
                </Link>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                color: isActive ? '#667eea' : '#718096',
                                background: isActive ? '#f0f4ff' : 'transparent',
                                fontWeight: isActive ? 600 : 500,
                                transition: 'all 0.2s',
                                textDecoration: 'none'
                            }}>
                                <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <Link href="/dashboard/profile" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f8fafc', borderRadius: '12px', textDecoration: 'none', color: 'inherit', cursor: 'pointer', transition: 'background 0.2s' }}>
                        <div style={{ width: '40px', height: '40px', background: '#cbd5e0', borderRadius: '50%' }}></div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>{userName}</div>
                            <div style={{ fontSize: '0.75rem', color: '#718096' }}>{userPlan}</div>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                paddingLeft: '260px', // Matches sidebar width
                width: '100%'
            }} className="main-content">
                <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <nav style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'white',
                borderTop: '1px solid #e2e8f0',
                display: 'none', // Hidden on desktop
                justifyContent: 'space-around',
                padding: '12px 0',
                zIndex: 100
            }} className="mobile-nav">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        textDecoration: 'none',
                        color: pathname === item.href ? '#667eea' : '#718096'
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 500 }}>{item.name}</span>
                    </Link>
                ))}
            </nav>

            {/* Responsive Styles Injection */}
            <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-sidebar {
            display: none !important;
          }
          .main-content {
            padding-left: 0 !important;
            padding-bottom: 80px; /* Space for bottom nav */
          }
          .mobile-nav {
            display: flex !important;
          }
        }
      `}</style>
        </div>
    );
}

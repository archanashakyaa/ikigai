import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.bgGradient} />
            <div className={`container ${styles.grid}`}>
                <div className={styles.content}>
                    <h1 className={styles.headline}>
                        Your Mind Deserves Better Than <span className="gradient-text">Scrolling at 2 AM</span>
                    </h1>
                    <p className={styles.subheadline}>
                        Science-backed mental fitness, designed for hostel life. Open during stress, boredom, or loneliness—stay because it helps, not preaches.
                    </p>
                    <div className={styles.ctas}>
                        <Link href="/signup" className="btn btn-primary">Start Free →</Link>
                        <Link href="#how-it-works" className="btn btn-secondary">How It Works ↓</Link>
                    </div>
                    <div className={styles.stats}>
                        <span>✨ 10,000+ Students</span>
                        <span>•</span>
                        <span>⭐ 4.8 Rating</span>
                        <span>•</span>
                        <span>🛡️ Privacy First</span>
                    </div>
                </div>

                <div className={styles.mockupWrapper}>
                    <div className={styles.phoneMockup}>
                        <div className={styles.notch} />
                        <div className={styles.screenContent}>
                            {/* Header inside phone */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>MindFit</span>
                                <div style={{ width: '24px', height: '24px', background: '#e2e8f0', borderRadius: '50%' }}></div>
                            </div>

                            {/* Mood Card */}
                            <div className={styles.screenCard}>
                                <div style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '4px' }}>Tue, 22 Dec</div>
                                <div style={{ fontWeight: '600', marginBottom: '8px' }}>How are you feeling?</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                                    <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>😢</span>
                                    <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>😐</span>
                                    <span style={{ fontSize: '1.5rem', cursor: 'pointer', transform: 'scale(1.2)' }}>🙂</span>
                                    <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>😊</span>
                                </div>
                            </div>

                            {/* Challenge Card */}
                            <div className={styles.screenCard} style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
                                <div style={{ fontSize: '0.75rem', opacity: 0.9, marginBottom: '4px' }}>Daily Challenge</div>
                                <div style={{ fontWeight: '600' }}>Take 5 deep breaths</div>
                                <div style={{ marginTop: '12px', fontSize: '0.875rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    Start Now →
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className={styles.screenCard}>
                                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Recent Activity</div>
                                <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', color: '#718096' }}>
                                    <span style={{ background: '#f7fafc', padding: '4px 8px', borderRadius: '4px' }}>📝 Journal</span>
                                    <span style={{ background: '#f7fafc', padding: '4px 8px', borderRadius: '4px' }}>🤖 AI Chat</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import Link from 'next/link';
import styles from './Pricing.module.css';

export default function Pricing() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px' }}>Student-Friendly Pricing</h2>
                    <p style={{ color: '#718096' }}>Invest in your mind for less than a coffee.</p>
                </div>

                <div className={styles.cardContainer}>
                    {/* Free Tier */}
                    <div className={styles.card}>
                        <div className={styles.header}>
                            <h3 className={styles.planName}>Basic</h3>
                            <div className={styles.price}>Free</div>
                            <div style={{ fontSize: '0.875rem', color: '#718096', marginTop: '4px' }}>Forever</div>
                        </div>
                        <ul className={styles.features}>
                            <li className={styles.feature}><span className={styles.check}>✓</span> Mood Tracking</li>
                            <li className={styles.feature}><span className={styles.check}>✓</span> Community Access</li>
                            <li className={styles.feature}><span className={styles.check}>✓</span> Crisis Resources</li>
                            <li className={styles.feature}><span className={styles.check}>✓</span> 5 AI Messages / Day</li>
                            <li className={styles.feature}><span className={styles.cross}>✗</span> Advanced Insights</li>
                            <li className={styles.feature}><span className={styles.cross}>✗</span> Voice Journaling</li>
                        </ul>
                        <Link href="/signup" className="btn btn-secondary" style={{ width: '100%' }}>Start Free</Link>
                    </div>

                    {/* Premium Tier */}
                    <div className={`${styles.card} ${styles.premiumCard}`}>
                        <div className={styles.popularBadge}>MOST POPULAR</div>
                        <div className={styles.header}>
                            <h3 className={styles.planName} style={{ color: 'var(--primary)' }}>Premium Student</h3>
                            <div className={styles.price}>$2</div>
                            <div className={styles.period}>/ month</div>
                            <div style={{ fontSize: '0.875rem', color: '#48bb78', marginTop: '4px' }}>Billed annually ($24)</div>
                        </div>
                        <ul className={styles.features}>
                            <li className={styles.feature}><span className={styles.check}>✓</span> <b>Everything in Basic</b></li>
                            <li className={styles.feature}><span className={styles.check}>✓</span> Unlimited AI Chat</li>
                            <li className={styles.feature}><span className={styles.check}>✓</span> Voice Journaling</li>
                            <li className={styles.feature}><span className={styles.check}>✓</span> Advanced Patterns & Insights</li>
                            <li className={styles.feature}><span className={styles.check}>✓</span> Offline Mode</li>
                            <li className={styles.feature}><span className={styles.check}>✓</span> Priority Support</li>
                        </ul>
                        <Link href="/signup" className="btn btn-primary" style={{ width: '100%' }}>Go Premium</Link>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '24px', color: '#718096', fontSize: '0.875rem' }}>
                    * $3/month for non-students. Cancel anytime.
                </div>
            </div>
        </section>
    );
}

import styles from './HowItWorks.module.css';

export default function HowItWorks() {
    const steps = [
        {
            emoji: "✅",
            title: "1. Check-in Daily",
            desc: "Track your mood in 30 seconds. Spot patterns in your emotional health before they become overwhelming."
        },
        {
            emoji: "🎯",
            title: "2. Get Instant Support",
            desc: "Received personalized, science-backed activities based on exactly how you're feeling right now."
        },
        {
            emoji: "📈",
            title: "3. Build Mental Fitness",
            desc: "Grow your resilience streak. Turn self-care into a daily habit that actually sticks."
        }
    ];

    return (
        <section id="how-it-works" className={styles.section}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px' }}>How It Works</h2>
                    <p style={{ color: '#718096', maxWidth: '600px', margin: '0 auto' }}>
                        No complex sign-ups or lengthy onboarding. Just three simple steps to better mental health.
                    </p>
                </div>

                <div className={styles.timeline}>
                    {steps.map((step, idx) => (
                        <div key={idx} className={styles.step}>
                            <div className={styles.iconCircle}>{step.emoji}</div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDesc}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

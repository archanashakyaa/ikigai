import styles from './CoreFeatures.module.css';

export default function CoreFeatures() {
    const features = [
        {
            icon: "📊",
            title: "Smart Mood Tracking",
            desc: "See patterns you didn't know existed with our color-coded mood calendar.",
            tag: "Insight"
        },
        {
            icon: "🎯",
            title: "Instant Relief",
            desc: "5-minute evidence-based exercises to calm anxiety or boost focus.",
            tag: "Actionable"
        },
        {
            icon: "🤖",
            title: "AI Mental Companion",
            desc: "Chat anytime. Judgment-free support that listens and understands.",
            tag: "Support"
        },
        {
            icon: "📝",
            title: "Smart Journaling",
            desc: "Voice or text journaling with AI that helps you process emotions.",
            tag: "Reflection"
        },
        {
            icon: "🎮",
            title: "Gamified Progress",
            desc: "Turn self-care into an adventure with streaks, badges, and XP.",
            tag: "Fun"
        },
        {
            icon: "🎲",
            title: "Bored Mode",
            desc: "Replace doom-scrolling with mindful, engaging mini-activities.",
            tag: "Engagement"
        },
        {
            icon: "👥",
            title: "Anonymous Community",
            desc: "Connect with peers who understand what you're going through.",
            tag: "Connection"
        },
        {
            icon: "🆘",
            title: "Crisis Support",
            desc: "Immediate help when you need it most. One-tap access to helplines.",
            tag: "Safety"
        }
    ];

    return (
        <section className={styles.section}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px' }}>Everything You Need</h2>
                    <p style={{ color: '#718096' }}>A complete toolkit for your mental well-being.</p>
                </div>

                <div className={styles.grid}>
                    {features.map((feature, idx) => (
                        <div key={idx} className={styles.card}>
                            <span className={styles.tag}>{feature.tag}</span>
                            <div className={styles.icon}>{feature.icon}</div>
                            <h3 className={styles.title}>{feature.title}</h3>
                            <p className={styles.desc}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

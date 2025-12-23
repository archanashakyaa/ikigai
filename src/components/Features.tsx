import styles from './Features.module.css';

export default function Features() {
    const cards = [
        {
            icon: "😰",
            title: "Late night anxiety?",
            desc: "We get it. The silence can be loud. Find proven techniques to calm your racing mind instantly.",
            link: "Get relief now"
        },
        {
            icon: "🏠",
            title: "Homesickness hitting?",
            desc: "Missing home is heavy. Connect with others who understand and find comfort in shared experiences.",
            link: "Find connections"
        },
        {
            icon: "📚",
            title: "Exam stress spiraling?",
            desc: "Don't let pressure crush you. Learn micro-habits to stay focused and calm during crunch time.",
            link: "Boost focus"
        }
    ];

    return (
        <section className={styles.section}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px' }}>You're Not Alone in This</h2>
                    <p style={{ color: '#718096', fontSize: '1.1rem' }}>We've built tools for the specific challenges of student life.</p>
                </div>
                <div className={styles.grid}>
                    {cards.map((card, idx) => (
                        <div key={idx} className={styles.card}>
                            <span className={styles.icon}>{card.icon}</span>
                            <h3 className={styles.title}>{card.title}</h3>
                            <p className={styles.desc}>{card.desc}</p>
                            <span className={styles.link}>{card.link} →</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

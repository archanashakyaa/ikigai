import Link from 'next/link';
import styles from './CallToAction.module.css';

export default function CallToAction() {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.title}>Ready to feel better?</h2>
                <p className={styles.subtitle}>
                    Join 10,000+ students who&apos;ve made mental fitness a daily habit.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <Link href="/signup" className={styles.btn}>
                        Start Free Today →
                    </Link>

                    <div className={styles.trust}>
                        <span>✓ No credit card required</span>
                        <span>•</span>
                        <span>✓ Anonymous option</span>
                        <span>•</span>
                        <span>✓ 2-minute setup</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

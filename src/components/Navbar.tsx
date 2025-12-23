import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.content}`}>
                <Link href="/" className={styles.logo}>
                    MindFit
                </Link>
                <div className={styles.navLinks}>
                    <Link href="/" className={styles.link}>Home</Link>
                    <Link href="/journal" className={styles.link}>Journal</Link>
                    <Link href="/community" className={styles.link}>Community</Link>
                    <Link href="/progress" className={styles.link}>Progress</Link>
                </div>
                <div className={styles.actions}>
                    <Link href="/login" className="btn btn-secondary" style={{ height: '40px', padding: '0 24px' }}>Log In</Link>
                    <Link href="/signup" className="btn btn-primary" style={{ height: '40px', padding: '0 24px' }}>Get Started</Link>
                </div>
            </div>
        </nav>
    );
}

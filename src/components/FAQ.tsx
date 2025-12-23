"use client";
import { useState } from 'react';
import styles from './FAQ.module.css';

export default function FAQ() {
    // Explicitly typing the state as number | null
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: "Is this therapy or counseling?",
            a: "No, MindFit is a mental fitness tool, not a replacement for professional therapy. Think of it as a gym for your mind."
        },
        {
            q: "How is my data protected?",
            a: "We use end-to-end encryption. You can use the app anonymously without an email. We never sell your data."
        },
        {
            q: "What if I'm in crisis?",
            a: "If you are in crisis, please use our Crisis Support button or contact local emergency services immediately. Our AI detects crisis language and will direct you to human help."
        },
        {
            q: "How does the AI work?",
            a: "Our AI uses evidence-based techniques like CBT and mindfulness to provide supportive conversations. It is not a human therapist."
        },
        {
            q: "Can I use this alongside therapy?",
            a: "Absolutely! Many therapists recommend digital tools for daily support between sessions. You can export your mood data to share with them."
        }
    ];

    const toggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.title}>Frequently Asked Questions</h2>

                <div>
                    {faqs.map((faq, idx) => (
                        <div key={idx} className={`${styles.item} ${openIndex === idx ? styles.open : ''}`}>
                            <button
                                className={styles.question}
                                onClick={() => toggle(idx)}
                                aria-expanded={openIndex === idx}
                            >
                                {faq.q}
                                <span className={styles.icon}>+</span>
                            </button>
                            {openIndex === idx && (
                                <div className={styles.answer}>
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

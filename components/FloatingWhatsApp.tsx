'use client';
import { MessageCircle } from 'lucide-react';
import styles from './FloatingWhatsApp.module.css';

export default function FloatingWhatsApp() {
    const message = encodeURIComponent("Hello Chartologic, I would like to inquire about the next trading cohort.");
    const whatsappUrl = `https://wa.me/918130245100?text=${message}`;

    return (
        <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.floatButton}
            aria-label="Contact us on WhatsApp"
        >
            <MessageCircle size={24} fill="#fff" />
            <span className={styles.tooltip}>Chat with Us</span>
        </a>
    );
}


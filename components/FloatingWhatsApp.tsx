'use client';
import { MessageCircle } from 'lucide-react';
import styles from './FloatingWhatsApp.module.css';
import { trackFunnelEvent } from '@/lib/analytics';

export default function FloatingWhatsApp() {
    const message = encodeURIComponent("Hello Chartologic, I would like to inquire about the next Live Workshop.");
    const whatsappUrl = `https://wa.me/917595881240?text=${message}`;

    return (
        <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.floatButton}
            aria-label="Contact us on WhatsApp"
            onClick={() => trackFunnelEvent('whatsapp_click')}
        >
            <MessageCircle size={24} fill="#fff" />
            <span className={styles.tooltip}>Chat with Us</span>
        </a>
    );
}


import React from 'react';
import { Clock3, LifeBuoy, Mail } from 'lucide-react';
import styles from './HelpHighlights.module.css';

const highlights = [
    {
        icon: LifeBuoy,
        title: 'Equipo especializado',
        description: 'Profesionales que conocen la plataforma en profundidad para darte respuestas concretas.'
    },
    {
        icon: Mail,
        title: 'Seguimiento por email',
        description: 'Recibe una copia de la conversación directo en tu bandeja para continuar cuando quieras.'
    },
    {
        icon: Clock3,
        title: 'Respuesta en menos de 24h',
        description: 'Te contactamos lo antes posible para que puedas seguir trabajando sin interrupciones.'
    }
];

const HelpHighlights = () => {
    return (
        <div className={styles.highlights}>
            {highlights.map(({ icon: Icon, title, description }) => (
                <article key={title} className={styles.item}>
                    <div className={styles.iconWrapper}>
                        <Icon size={22} />
                    </div>
                    <div className={styles.copy}>
                        <h3 className={styles.itemTitle}>{title}</h3>
                        <p className={styles.itemDescription}>{description}</p>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default HelpHighlights;



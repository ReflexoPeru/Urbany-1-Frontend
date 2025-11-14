import IntegrationCard from '../IntegrationCard';
import styles from './IntegrationList.module.css';

const IntegrationList = ({ integrations, onIntegrationClick }) => {
  const groupedIntegrations = integrations.reduce((acc, integration) => {
    if (!acc[integration.category]) {
      acc[integration.category] = [];
    }
    acc[integration.category].push(integration);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      {Object.entries(groupedIntegrations).map(([category, items]) => (
        <div key={category} className={styles.section}>
          <h3 className={styles.sectionTitle}>{category}</h3>
          <div className={styles.cards}>
            {items.map((integration) => (
              <IntegrationCard
                key={integration.id}
                icon={integration.icon}
                title={integration.title}
                description={integration.description}
                onClick={() => onIntegrationClick(integration)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntegrationList;

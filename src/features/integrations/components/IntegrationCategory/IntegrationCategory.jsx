import styles from './IntegrationCategory.module.css';

const IntegrationCategory = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>CATEGORÍAS</h3>
      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.id} className={styles.item}>
            <button
              className={`${styles.button} ${activeCategory === category.id ? styles.active : ''
                }`}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IntegrationCategory;

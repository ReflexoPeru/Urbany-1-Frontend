import { useState } from 'react';
import { MagnifyingGlass, Bell, CaretDown } from '@phosphor-icons/react';
import styles from './Header.module.css';

const Header = ({ title = 'Dashboard' }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>
      <div className={styles['search-container']}>
        <MagnifyingGlass size={20} className={styles['search-icon']} />
        <input
          type="text"
          placeholder="Buscar..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles['search-input']}
        />
      </div>

      <div className={styles['right-section']}>
        <button className={styles['premium-btn']}>Se premium</button>
        <div className={styles['notification-container']}>
          <Bell size={22} weight="regular" className={styles['notification-icon']} />
          <span className={styles['notification-dot']}></span>
        </div>
        <div className={styles['user-profile']}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0-wtBeKb7tsRR-E7q5Tzg07gJ1RPUBpwfa8ps1GmjVd0Znpk8Bvg5m0cdv4QlqfiwFJk&usqp=CAU"
            alt="Usuario"
            className={styles['user-avatar']}
          />
          <div className={styles['user-info']}>
            <span className={styles['user-name']}>Angeles L.</span>
            <span className={styles['user-role']}>Administrador</span>
          </div>
          <CaretDown size={16} className={styles['dropdown-icon']} />
        </div>
      </div>
    </header>
  );
};

export default Header;


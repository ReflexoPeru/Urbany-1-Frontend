import { SearchBar, PageTitle, PremiumButton, Notifications, UserProfile } from './components';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <PageTitle />
      <SearchBar />
      <div className={styles['right-section']}>
        <PremiumButton />
        <Notifications />
        <UserProfile />
      </div>
    </header>
  );
};

export default Header;


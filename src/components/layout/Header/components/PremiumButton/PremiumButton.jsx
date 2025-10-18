import { useNavigate } from 'react-router-dom';
import styles from './PremiumButton.module.css';

export const PremiumButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      className={styles['premium-btn']}
      onClick={() => navigate('/subscription/plans')}
    >
      Se premium
    </button>
  );
};
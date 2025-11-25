import { Link } from 'react-router-dom';
import styles from '../styles/tab.desktop.module.scss';

interface TabProps {
  isActive: boolean;
}

const Tab = ({ isActive }: TabProps) => {
  return (
    <div
      className={`${styles.tab_container} ${isActive ? styles.active : styles.inactive}`}
      aria-hidden={!isActive}
    >
      <ul className={styles.tab_list}>
        <li className={styles.tab_item}>
            <Link to={'/my-tab'}> Моя вкладка </Link>
        </li>
        <li className={styles.tab_item}>
            <Link to={'/latest'}> Последнее </Link>
        </li>
        <li className={styles.tab_item}>
            <Link to={'/ongoing'}> Онгоинги </Link>
        </li>
        <li className={styles.tab_item}>
            <Link to={'/announcements'}> Анонсы </Link>
        </li>
        <li className={styles.tab_item}>
            <Link to={'/completed'}> Завершенные </Link>
        </li>
        <li className={styles.tab_item}>
            <Link to={'/movies'}> Фильмы </Link>
        </li>
      </ul>
    </div>
  );
};

export default Tab;
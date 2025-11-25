import { Link } from 'react-router-dom'
import styles from '../styles/side-bar.desktop.module.scss'

const SideBar = () => {
  return (
    <div className={styles.side_bar}>
      <div className={styles.side_bar_container}>
      <Link to={'/'} className={styles.side_bar_logo_wrapper}>
        <img src="/svg/logo.svg" alt="Logo" className={styles.side_bar_logo} width={42} height={42}  />
      </Link>

      <ul className={styles.side_bar_list}> 
      <li className={styles.side_bar_content}>
        <Link to={'/'} className={styles.side_bar_link}>
          <img  src="/svg/home.svg" alt="Home Icon" className={styles.side_bar_icon} width={28} height={28}  />
          <span className={styles.side_bar_text}>Главная</span>
        </Link>
      </li>
      <li className={styles.side_bar_content}>
        <Link to={'/discover'} className={styles.side_bar_link}>
          <img src="/svg/discover.svg" alt="Discover Icon" className={styles.side_bar_icon} width={28} height={28}  />
          <span className={styles.side_bar_text}>Обзор</span>
        </Link>
      </li>
      <li className={styles.side_bar_content}>
        <Link to={'/marks'} className={styles.side_bar_link}>
          <img src="/svg/mark.svg" alt="mark Icon" className={styles.side_bar_icon} width={28} height={28}  />
          <span className={styles.side_bar_text}>Закладки</span>
        </Link>
      </li>
      <li className={styles.side_bar_content}>
        <Link to={'/profile'} className={styles.side_bar_link}>
          <img src="/svg/profile.svg" alt="Profile Icon" className={styles.side_bar_icon} width={28} height={28}  />
          <span className={styles.side_bar_text}>Профиль</span>
        </Link>
      </li>
      </ul>
      <div className={styles.side_bar_footer}>
        <Link to={'/about'} className={styles.side_bar_link_footer}>
        <p className={styles.side_bar_about}>About</p>
        <span className={styles.side_bar_year}>2025</span>
      </Link>
      </div>
    </div>
    </div>
  )
}

export default SideBar
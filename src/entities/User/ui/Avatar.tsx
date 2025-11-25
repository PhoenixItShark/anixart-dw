import { Link } from 'react-router-dom'
import styles from '../styles/avatar.desktop.module.scss'
  
const Avatar = () => {
  return (
    <Link to="/profile">
      <img className={styles.user_avatar} src="/img/ava.jpg" alt="User Avatar" width={42} height={42} />
    </Link>
  )
}

export default Avatar
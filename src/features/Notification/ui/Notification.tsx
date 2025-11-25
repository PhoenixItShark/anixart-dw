import styles from '../styles/notification.desktop.module.scss'

const Notification = () => {
  return (
    <img className={styles.notification_icon} src="/svg/notification.svg" alt="Notification" width={32} height={32} />
  )
}

export default Notification
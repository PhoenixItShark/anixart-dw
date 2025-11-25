import SearchInput from '@/features/SearchInput/ui/SearchInput'
import styles from '../styles/side-top-bar.desktop.module.scss'

import { useState } from 'react';
import Tab from '../../../../features/Tab/ui/Tab';
import Notification from '@/features/Notification/ui/Notification';
import Avatar from '@/entities/User/ui/Avatar';


const SideTopBar = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={styles.side_top_bar}>
      <div className={styles.first_layer_container}>
        <SearchInput />
        <img onClick={() => setIsActive(!isActive)} src="/svg/tab.svg" alt="Tab Icon" className={`${styles.tab_icon} ${isActive ? styles.active : styles.inactive}`} width={24} height={24}  />
        <Tab isActive={isActive} />
      </div>
      <div className={styles.second_layer_container}>
        <Notification />
        <Avatar />
      </div>
    </div>
  )
}

export default SideTopBar
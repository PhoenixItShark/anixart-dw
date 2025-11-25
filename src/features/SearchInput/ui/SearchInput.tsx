import styles from '../styles/search-input.desktop.module.scss'

const SearchInput = () => {
  return (
    <div className={styles.search_input_container}>
        <div className={styles.search_input_wrapper}>
        <img src="/svg/search.svg" alt="Search Icon" className={styles.search_icon} width={20} height={20}  />
        </div>
        <input type="text" placeholder="Search..." className={styles.search_input} />
    </div>
  )
}

export default SearchInput
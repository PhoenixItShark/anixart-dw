import Cards from '@/entities/AnimeList/ui/Cards'
import styles from '../styles/home.desktop.module.scss'

const Home = () => {
  return (
    <section className={styles.home_container}>
      <Cards />
    </section>
  )
}

export default Home
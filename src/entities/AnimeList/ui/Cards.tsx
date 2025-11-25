// import { useState } from "react";
import styles from "../styles/card.desktop.module.scss";

import { useAnimeInfiniteList } from "../model/useAnimeList.query";
import { formatDate } from "@/shared/lib";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Cards = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useAnimeInfiniteList();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
    rootMargin: "200px",
  });

  useEffect(() => {
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <h3 className={styles.loading}>Загрузка...</h3>;

  return (
    <>
      <ul className={styles.card_list}>
        {data?.pages.map((page, pageIndex) =>
          page.content.map((anime, index) => {
            return (
              <Link className={styles.card_link} to={`/release/${anime.id}`} key={`${anime.id}-${pageIndex}-${index}`} >
              <li
                key={`${anime.id}-${pageIndex}-${index}`}
                className={styles.card}
              >
                <div className={styles.card_wrapper}>
                  <img src={anime.image} alt={anime.title_ru} className={styles.card_image} />

                  <h3 className={styles.card_title}>{anime.title_ru}</h3>

                  <div className={styles.card_info_wrapper}>
                    <span className={styles.card_episodes}>
                      {anime.episodes_released
                        ? `${anime.episodes_released} из ${anime.episodes_total || '?'} эп`
                        : formatDate(anime.aired_on_date)}
                    </span>

                    {anime.episodes_released ? <i className={styles.element} /> : null}

                    <span className={styles.card_review}>
                      {anime.episodes_released ? anime.grade.toFixed(1) : ''}
                    </span>
                  </div>
                </div>
              </li>
              </Link>
            );
          })
        )}
      </ul>
      <div ref={ref} style={{ height: 20, marginTop: 40 }}>
      {isFetchingNextPage && <h3 className={styles.loading}>Загрузка ещё...</h3>}
    </div>
    </>
  );
};

export default Cards;

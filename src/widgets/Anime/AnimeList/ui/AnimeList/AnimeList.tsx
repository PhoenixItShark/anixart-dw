// import { useState } from "react";

import { useInView } from "react-intersection-observer";
import { Suspense, useEffect, useRef } from "react";
import AnimeCard from "../AnimeCard/AnimeCard";
import { useAnimeInfiniteList } from "@entities/anime/model/useAnimeList.query";
import { AnimeFilter, AnimeItem } from "@entities/anime/types";
import AnimeCardSkeleton from "../AnimeCard/AnimeCardSkeleton";

const AnimeList = ({ filters }: { filters: AnimeFilter }) => {
  const refa = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useAnimeInfiniteList(filters);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
    rootMargin: "200px",
  });

useEffect(() => {
    console.log(refa);
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <ul className='w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4'>
        {[...Array(20)].map((_, i) => (
          <AnimeCardSkeleton key={`skeleton-${i}`} />
        ))}
      </ul>
    );
  }
  if (isLoading) return <h3 >Загрузка...</h3>;

  const animeList: AnimeItem[] =
    data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <>
      <ul ref={refa} className='w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4'>
        {animeList.map((anime) => (
          <Suspense fallback={<AnimeCardSkeleton />} key={anime.id}>
            <AnimeCard key={anime.id} anime={anime} />
          </Suspense>
        ))}

        {isFetchingNextPage &&
        (<>
        {[...Array(20)].map((_, i) => (
          <AnimeCardSkeleton key={`loading-${i}`} />
        ))}
        </>
        )
        }
      <div ref={ref} className='h-10 mt-10'>
      </div>
      </ul>
    </>
  );
};

export default AnimeList;

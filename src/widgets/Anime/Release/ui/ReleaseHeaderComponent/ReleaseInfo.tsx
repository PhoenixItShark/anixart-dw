import { AnimeItem } from "@entities/anime/types";
import { formatDate } from "@shared/lib/utils";
import { BookOpen, Building2, CalendarDays, Flame, Shell } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import ForwardButton from "../ReleaseSideComponent/ForwardButton";

const ReleaseInfo = ({ anime }: { anime: AnimeItem }) => {
  return (
    <div className=' relative flex gap-2  flex-col'>
      <div className='flex gap-2 items-center'>
        <ReactCountryFlag
          countryCode='JP'
          svg
          style={{
            width: "24px", // или '2rem', '40px' и т.д.
            height: "24px",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        />
        <span className='text-secondary font-medium'>
          {anime?.country},{" "}
          <span className='font-normal'>{formatDate(anime.aired_on_date)}</span>
        </span>
      </div>
      {anime?.episodes_released && (
        <div className='text-text-secondary font-medium flex gap-2'>
          <Flame className='text-text-secondary' />
          {anime?.episodes_released} эп. <span>по ~{anime?.duration} мин.</span>
        </div>
      )}
      <div className='text-text-secondary font-medium flex gap-2'>
        <CalendarDays />
        <span>{anime?.category.name}, </span>
        <span className=' lowercase'>{anime?.status.name} </span>
      </div>
      <div className='text-text-secondary font-medium flex gap-2'>
        <BookOpen />
        <span className='font-normal'>Первоисточник </span>
        <span className=' underline'>{anime?.source}</span>
      </div>
      <div className='text-text-secondary font-normal flex gap-2'>
        <Building2 className="shrink-0"/>
        <span className="font-medium">{anime?.studio ? `Студия: ${anime?.studio}, ` : ""}{anime?.author ? `Автор: ${anime?.author}, ` : ""}режиссер: {anime?.director}</span>
      </div>
      <div className='text-text-secondary font-normal flex gap-2'>
        <Shell />
        Жанры: 
        <span className=" underline">
            {anime?.genres}
        </span>
      </div>
      <span className=" text-text-secondary font-normal leading-5">
        {anime.description}
      </span>

      <ForwardButton />
    </div>
  );
};

export default ReleaseInfo;

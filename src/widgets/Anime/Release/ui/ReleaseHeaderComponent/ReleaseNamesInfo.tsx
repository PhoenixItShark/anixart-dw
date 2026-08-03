import { PORTAL_IDS } from "@shared/lib/const";
import { useState } from "react";
import { AnimeItem } from "@entities/anime/types";
import { Portal } from "@shared/lib/context";
import { Info } from "lucide-react";

const ReleaseNamesInfo = ({ anime }: { anime: AnimeItem }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);



  return (
    <>
    <Info className="text-text-secondary" onClick={() => setIsOpen(!isOpen)} />
      {isOpen ? (
        <Portal containerId={PORTAL_IDS.release_info}>
          <section
            className=''
            onClick={() => setIsOpen(false)}
          >
            <div
              className=''
              onClick={(e) => e.stopPropagation()}
            >
              <div className=''>
                <span className=''>
                  Название:
                </span>
                <p
                  className=''
                >
                  {anime.title_ru}
                </p>
              </div>
              <div className=''>
                <span className=''>
                  Оригинальное название:
                </span>
                <p
                  className=''
                >
                  {anime.title_original}
                </p>
              </div>
            </div>
          </section>
        </Portal>
      ) : null}
    </>
  );
};

export default ReleaseNamesInfo;
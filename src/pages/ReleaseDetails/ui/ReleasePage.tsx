import { ReleaseHeaderComponent, ReleaseSideComponent } from "@widgets/Anime/Release";
import { Navigate, useParams } from "react-router-dom";
// import ReleaseFeaturesBar from "@widgets/Release/ui/ReleaseFeaturesBar/ReleaseFeaturesBar";
import { useGetRelease } from "@entities/anime/model";
import ReleaseInfo from "@widgets/Anime/Release/ui/ReleaseHeaderComponent/ReleaseInfo";
// import { Block, BlocksProvider } from "@widgets/Release/lib/context";

const ReleasePage = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetRelease(id ?? "");

  if (!id) {
    return <Navigate to='/' replace />;
  }

  if (isLoading) return <div>Загрузка...</div>;
  if (error || !data) return <div>Ошибка загрузки</div>;

  const anime = data.release;
  return (
    <section className='border-text-secondary h-full'>
      <div className='flex gap-12  h-[calc(100vh-200px)]'>
        <ReleaseSideComponent anime={anime} />
        <div className='flex justify-between w-full'>
          <div className=' w-fit max-w-[50%]'>
            <ReleaseHeaderComponent anime={anime} />
          </div>
          <div className=' shadow-sm shadow-black/30 rounded-md p-2 w-fit max-w-[50%]'>
            <ReleaseInfo anime={anime}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReleasePage;

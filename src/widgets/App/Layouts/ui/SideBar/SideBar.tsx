import { lazy, Suspense } from "react";

const SideBarNav =  lazy(() => import('./SideBarNav'));

const SideBar = () => {
  return (
    <div className='group flex flex-col h-screen w-18 p-2 bg-background-primary hover:w-24 transition-[width]'>
      <Suspense fallback={<div className="bg-text-primary rounded-md animate-pulse w-full h-full"></div>}>
        <SideBarNav/>
      </Suspense>
    </div>
  );
};

export default SideBar;

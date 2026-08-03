// src/app/layouts/RootLayout/ui/RootLayout.tsx

import { lazy, Suspense, useEffect, useRef } from "react";
import { useSharedStore } from "@shared/storage";
import { MainSkeleton, SideBar, SideTopBar } from "@widgets/App/Layouts";

const Outlet = lazy(() => import('react-router-dom').then(module => ({ default: module.Outlet })));

const RootLayout = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { setContentRef, restoreScroll } = useSharedStore();

  useEffect(() => {
    console.log(contentRef.current)
    if (contentRef.current) {
      setContentRef(contentRef.current);
    }
  }, [setContentRef]);

  useEffect(() => {
    const handleBack = () => {

      restoreScroll();
    };
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [restoreScroll]);

  return (
    <div className='h-screen flex flex-col overflow-hidden bg-background-primary'>
      <header className='shrink-0 h-16'>
        <SideTopBar />
      </header>
      <div className='flex flex-1 overflow-hidden'>
        <aside className='shrink-0 overflow-hidden bg-sidebar-bg border-r border-text-primary/20'>
          <SideBar />
        </aside>
        <main ref={contentRef} className='flex-1 overflow-y-hidden bg-color-primary rounded-lg'>
          <Suspense fallback={<MainSkeleton />}>
            <div
              
              className='h-full flex-1 overflow-y-auto bg-color-primary p-4'
            >
              {/* <MainSkeleton /> */}
              <Outlet />
            </div>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default RootLayout;

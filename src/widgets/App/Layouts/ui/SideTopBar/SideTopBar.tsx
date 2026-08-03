// @features/SideTopBar/lazyComponents.ts
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";

export const SearchInput = lazy(() => import("./SearchInput"));
export const Tab = lazy(() => import("./Tab"));
export const Notification = lazy(() => import("./Notification"));
export const Avatar = lazy(() => import("@shared/ui/index").then(module => ({ default: module.Avatar })));
export const Shell = lazy(() => import("lucide-react").then(module => ({ default: module.Shell })));

const SideTopBar = () => {
  return (
    <div className="flex items-center justify-between w-full h-16 bg-background-primary p-4">
      <Suspense fallback={<div className="w-full h-full animate-pulse bg-text-primary rounded-lg"></div>}>
      <div className="flex items-center gap-6 w-full">
        <Link to="/" className="flex items-center shrink-0 group">
          <Shell className="w-10 h-10 text-red hover:text-text-secondary transition duration-150 ease-in-out" />
        </Link>
        <div className="w-[40%] max-w-full">
          <SearchInput />
        </div>
        <div className='mx-auto'>
        <Tab />
        </div>
      </div>
      <div className="flex items-center gap-6 shrink-0 ml-6">
        <Notification />
        <Avatar />
      </div>
      </Suspense>
    </div>
  );
};

export default SideTopBar;
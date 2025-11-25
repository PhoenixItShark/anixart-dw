// import { SideTopBar } from "@/widgets"
import SideBar from "@/app/layouts/RootLayout/ui/SideBar";
import SideTopBar from "@/app/layouts/RootLayout/ui/SideTopBar";
import { Outlet } from "react-router-dom";

import styles from "../styles/root-layout.desktop.module.scss";

const RootLayout = () => {
  return (
    <>
      <div className={styles.layout_container}>
        <SideBar />
        <div className={styles.topBar_container}>
          <SideTopBar />
          <main className={styles.content_container}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default RootLayout;

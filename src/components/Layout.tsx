import { FC } from "react";
import Navbar from "./Navbar";
import { LayoutProps } from "../utils/types/component";
import Footer from "./Footer";

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full dark:bg-gray-900 min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

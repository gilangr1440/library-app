import { RxCaretSort } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  window.addEventListener("click", (e: any) => {
    if (!e.target.className.split(" ").includes("search-field")) {
      setOpenSearch(false);
    }
    if (!e.target.className.split(" ").includes("menu-field")) {
      setOpenMenu(false);
    }
  });

  return (
    <header className="w-full h-20 px-10 bg-white/70 fixed top-0 shadow-sm z-10">
      <nav className="flex justify-between items-center h-full">
        <h1 className="text-xl font-semibold tracking-wider">
          <Link to={"/"}>BookQuest</Link>
        </h1>
        <div className="flex gap-8">
          <div className="relative flex flex-col">
            <div
              ref={searchRef}
              onClick={() => setOpenSearch(!openSearch)}
              className="search-field w-72 px-4 py-2 rounded-md flex justify-between items-center border border-gray-300 hover:cursor-pointer bg-white hover:bg-gray-100 transition duration-200"
            >
              <p className="search-field font-semibold text-sm">Search books...</p>
              <RxCaretSort className="text-2xl text-gray-400" />
            </div>
            <div className={`search-field absolute ${openSearch ? "flex" : "hidden"} flex-col border top-12 border-gray-300 rounded-md bg-white`}>
              <div className="search-field w-72 px-4 py-2 flex gap-1 items-center border-b border-b-gray-300 transition duration-200">
                <BiSearch className="search-field text-xl text-gray-400" />
                <input type="text" className="search-field search-input outline-none text-sm w-full" placeholder="Search Books..." />
              </div>
              <div className="search-field h-20 flex justify-center items-center">
                <span className="search-field text-sm text-gray-400">No book found.</span>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col">
            <div onClick={() => setOpenMenu(!openMenu)} className="menu-field w-10 h-10 relative rounded-full bg-gray-100 font-bold hover:cursor-pointer">
              <span className="menu-field absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">BQ</span>
            </div>
            <div className={`menu-field w-40 absolute ${openMenu ? "flex" : "hidden"} flex-col border top-12 right-0 border-gray-300 rounded-md bg-white`}>
              <ul className="menu-field text-center">
                <li className="menu-field hover:bg-gray-300 cursor-pointer py-2">
                  <Link to={"/login"}>Login</Link>
                </li>
                <li className="menu-field hover:bg-gray-300 cursor-pointer py-2">
                  <Link to={"/register"}>Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

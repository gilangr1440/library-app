import { RxCaretSort } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { MdDarkMode, MdLightMode, MdComputer } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/contexts/auth";
import { ToastContainer, toast } from "react-toastify";
import { searchBook } from "../utils/apis/books/api";
import { Books } from "../utils/apis/books/types";

export const Navbar = () => {
  const navigate = useNavigate();
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openMode, setOpenMode] = useState(false);
  const { user, token, changeToken } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "system");
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const [keywordSearch, setKeywordSearch] = useState<string>("");
  const [searchDatas, setSearchDatas] = useState<Books[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  function onWindowMatch() {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }
  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  useEffect(() => {
    if (keywordSearch.length !== 0) {
      handleSearch(keywordSearch);
    }
    if (keywordSearch.length == 0) {
      setKeywordSearch("");
      setSearchDatas([]);
    }
  }, [keywordSearch]);

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });

  window.addEventListener("click", (e: any) => {
    const target = new String(e.target.className);
    if (!target.split(" ").includes("search-field")) {
      setOpenSearch(false);
      setKeywordSearch("");
      setSearchDatas([]);
      if (searchRef.current !== null) {
        searchRef.current.value = "";
      }
    }
    if (!target.split(" ").includes("menu-field")) {
      setOpenMenu(false);
    }
    if (!target.split(" ").includes("mode-field")) {
      setOpenMode(false);
    }
  });

  const handleLogout = () => {
    changeToken();
    toast.success(`Logout successfully`, {
      position: "bottom-right",
    });
  };

  const handleSearch = async (keyword: string) => {
    try {
      const result = await searchBook(keyword);
      setSearchDatas(result.payload.datas);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSearchPage = (keyword: string) => {
    navigate(`/search/${keyword}`);
  };

  return (
    <header className="w-full h-20 px-10 bg-white/70 dark:bg-black/70 fixed top-0 shadow-sm z-10">
      <ToastContainer autoClose={2000} />
      <nav className="flex justify-between items-center h-full">
        <h1 className="text-xl dark:text-white font-semibold tracking-wider">
          <Link to={"/"}>BookQuest</Link>
        </h1>
        <div className="flex gap-8">
          <div className="relative flex flex-col">
            <div
              onClick={() => setOpenSearch(!openSearch)}
              className="search-field w-72 px-4 py-2 rounded-md flex justify-between items-center border border-gray-300 hover:cursor-pointer bg-white dark:bg-gray-900 hover:bg-gray-100 transition duration-200"
            >
              <p className="search-field dark:text-white font-semibold text-sm">Search books...</p>
              <RxCaretSort className="text-2xl text-gray-400" />
            </div>
            <div className={`search-field absolute ${openSearch ? "flex" : "hidden"} flex-col border top-12 border-gray-300 rounded-md bg-white`}>
              <div className="search-field w-72 px-4 py-2 flex gap-1 items-center border-b border-b-gray-300 transition duration-200">
                <BiSearch className="search-field text-xl text-gray-400" />
                <input
                  type="text"
                  ref={searchRef}
                  onKeyUp={(e: any) => {
                    setKeywordSearch(e.target.value);
                    if (e.key === "Enter") {
                      handleSearchPage(e.target.value);
                      setOpenSearch(false);
                    }
                  }}
                  className="search-field search-input outline-none text-sm w-full"
                  placeholder="Search Books..."
                />
              </div>
              {searchDatas.length !== 0 ? (
                <div className="search-field flex justify-center overflow-visible">
                  <ul className="w-full">
                    {searchDatas.map((data: Books, index: number) => (
                      <Link to={`/detail/${data.id}`}>
                        <li key={index} className="my-2 p-1 border border-gray-200 hover:bg-gray-200 cursor-pointer">
                          {data.title}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="search-field h-20 flex justify-center items-center">
                  <span className="search-field text-sm text-gray-400">No book found.</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col relative">
            <div onClick={() => setOpenMode(!openMode)} className="mode-field w-10 h-10 relative rounded-full bg-gray-100 hover:bg-gray-400 dark:bg-gray-900 dark:hover:bg-gray-600 font-bold hover:cursor-pointer">
              {/* <span className="mode-field absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">BQ</span> */}
              {theme == "light" ? (
                <MdLightMode className="mode-field absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              ) : theme == "dark" ? (
                <MdDarkMode className="mode-field dark:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              ) : (
                <MdComputer className="mode-field absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
            </div>
            <div className={`mode-field w-10 absolute ${openMode ? "flex" : "hidden"} flex-col border top-12 border-gray-300 rounded-md bg-white`}>
              <ul className="mode-field">
                <li onClick={() => setTheme("light")} className="mode-field w-full flex justify-center hover:text-gray-400 cursor-pointer py-2">
                  <MdLightMode className="mode-field" />
                </li>
                <li onClick={() => setTheme("dark")} className="mode-field w-full flex justify-center hover:text-gray-400 cursor-pointer py-2">
                  <MdDarkMode className="mode-field" />
                </li>
                <li onClick={() => setTheme("system")} className="mode-field w-full flex justify-center hover:text-gray-400 cursor-pointer py-2">
                  <MdComputer className="mode-field" />
                </li>
              </ul>
            </div>
          </div>
          <div className="relative flex flex-col">
            {token ? (
              <>
                <div onClick={() => setOpenMenu(!openMenu)} className="menu-field w-10 h-10 relative rounded-full bg-gray-100 font-bold hover:cursor-pointer">
                  <img onClick={() => setOpenMenu(!openMenu)} src={user.profile_picture} className="menu-field object-cover w-full h-full rounded-full" />
                </div>
                <div className={`menu-field w-40 absolute ${openMenu ? "flex" : "hidden"} flex-col border top-12 right-0 border-gray-300 rounded-md bg-white`}>
                  <ul className="menu-field text-start">
                    <li className="menu-field font-semibold border-b border-b-gray-300 p-2">Hi! {user.full_name}</li>
                    <Link to={"/profile"}>
                      <li className="menu-field hover:bg-gray-300 cursor-pointer p-2">Profile</li>
                    </Link>
                    <Link to={"/dashboard"}>
                      <li className="menu-field hover:bg-gray-300 cursor-pointer p-2">Dashboard</li>
                    </Link>
                    <li className="hover:bg-red-500 border-t border-t-gray-300 cursor-pointer p-2 rounded-b-md" onClick={() => handleLogout()}>
                      Logout
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div onClick={() => setOpenMenu(!openMenu)} className="menu-field w-10 h-10 relative rounded-full bg-gray-100 dark:bg-gray-900 font-bold hover:cursor-pointer">
                  <span className="menu-field dark:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">BQ</span>
                </div>
                <div className={`menu-field w-40 absolute ${openMenu ? "flex" : "hidden"} flex-col border top-12 right-0 border-gray-300 rounded-md bg-white`}>
                  <ul className="menu-field text-center">
                    <Link to={"/login"}>
                      <li className="menu-field hover:bg-gray-300 cursor-pointer py-2">Login</li>
                    </Link>
                    <Link to={"/register"}>
                      <li className="menu-field hover:bg-gray-300 cursor-pointer py-2">Register</li>
                    </Link>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

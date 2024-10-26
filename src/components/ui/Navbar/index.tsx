"use client";
import { resetQuery } from "@/app/redux/features/searchSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import MobileSearchComponent from "@/components/ui/MobileSearchComponent";
import SearchComponent from "@/components/ui/SearchComponent";
import { Heart, Moon, Sun } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = (): JSX.Element => {

    const dispatch = useDispatch<AppDispatch>();
    const watchListCount = useSelector((state: RootState) => state?.watchList?.items?.length || 0);


    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark";
        setTheme(storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
        setIsClient(true);
    }, []);

    const toggleTheme = (): void => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        document.documentElement.classList.toggle("light", newTheme === "light");
    };

    return (
        <header>
            <nav>
                <ul className="flex justify-between items-center gap-4 my-5">
                    <li>
                        <Link href={"/"} onClick={() => { dispatch(resetQuery()) }}>
                            <h1 className="dark:text-white uppercase font-extrabold text-2xl md:text-3xl tracking-widest">
                                TMovies
                            </h1>
                        </Link>
                    </li>
                    {/* For Large Devices */}
                    <li className="max-w-[600px] w-full hidden md:block relative dark:text-black">
                        <SearchComponent />
                    </li>

                    <li className=" flex items-center gap-2">
                        <div>
                            {/* Dark/Light mode toggle button */}
                            <button
                                onClick={toggleTheme}
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800"
                            >
                                {theme === "light" ? (
                                    <Moon size={20} className="text-gray-800 dark:text-white" />
                                ) : (
                                    <Sun size={20} className="text-gray-800 dark:text-white" />
                                )}
                            </button>
                        </div>

                        {/* For mobile Devices */}
                        <MobileSearchComponent />

                        <Link href={"/watchlist"}>
                            <div className="relative">
                                <Heart size={28} />
                                {isClient && (
                                    <span className="absolute -top-3 -right-2 font-semibold">{watchListCount}</span>
                                )}
                            </div>
                        </Link>

                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
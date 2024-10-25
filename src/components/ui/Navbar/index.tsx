"use client";
import MobileSearchComponent from "@/components/ui/MobileSearchComponent";
import SearchComponent from "@/components/ui/SearchComponent";
import { Heart, Moon, Sun } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = (): JSX.Element => {
    const [theme, setTheme] = useState<"light" | "dark">("dark");
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark";
        setTheme(storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
    }, []);

    const toggleTheme = (): void => {
        if (theme === "light") {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            setTheme("light");
            localStorage.setItem("theme", "light");
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <header>
            <nav>
                <ul className="flex justify-between items-center gap-4 my-5">
                    <li>
                        <Link href={"/"}>
                            <h1 className="dark:text-white uppercase font-extrabold text-2xl md:text-3xl tracking-widest">
                                TMovies
                            </h1>
                        </Link>
                    </li>
                    {/* For Large Devices */}
                    <li className="max-w-[600px] w-full">
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
                                <span className="absolute -top-3 -right-4 font-semibold">100</span>
                            </div>
                        </Link>

                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
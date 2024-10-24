"use client";
import MobileSearchComponent from "@/components/ui/MobileSearchComponent";
import SearchComponent from "@/components/ui/SearchComponent";
import { Heart } from "@phosphor-icons/react";
import Link from "next/link";

const Navbar = (): JSX.Element => {
    return (
        <header>
            <nav>
                <ul className="flex justify-between items-center gap-4 my-5">
                    <li>
                        <Link href={"/"}>
                            <h1 className="uppercase font-extrabold text-2xl md:text-3xl tracking-widest">
                                TMovies
                            </h1>
                        </Link>
                    </li>
                    {/* For Large Devices */}
                    <li className="max-w-[600px] w-full">
                        <SearchComponent />
                    </li>
                    {/* For mobile Devices */}
                    <li className="md:block flex items-center gap-1">
                        <MobileSearchComponent />
                        <Link href={"/watchlist"}>
                            <div className="relative">
                                <Heart size={32} />
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
"use client";
import { MagnifyingGlass } from "@phosphor-icons/react";
const SearchComponent = (): JSX.Element => {
    const handleSearch = (e: React.FormEvent<HTMLElement>): void => {
        e.preventDefault();
    }
    return (
        <form action="" onSubmit={handleSearch}>
            <div className="hidden md:block relative">
                <input placeholder="Search by title..." className="w-full rounded-full border border-zinc-400 outline-none h-10 px-5" />
                <button type="submit" className="absolute right-1 px-2 border border-zinc-400 border-r-0 border-t-0 border-b-0 h-full outline-none">
                    <MagnifyingGlass size={20} />
                </button>
            </div>
        </form>
    )
};

export default SearchComponent;
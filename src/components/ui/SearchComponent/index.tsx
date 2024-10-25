"use client";
import { search } from "@/app/redux/features/searchSlice";
import { AppDispatch } from "@/app/store/store";
import { ISearchFormElements } from "@/types";
import { SearchSchema } from "@/zodSchemas/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

interface IProps {
    onSearchComplete?: (state: boolean) => void;
}

const SearchComponent = ({ onSearchComplete }: IProps): JSX.Element => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ISearchFormElements>({ resolver: zodResolver(SearchSchema) });
    const dispatch = useDispatch<AppDispatch>();
    const handleSearch = (data: ISearchFormElements): void => {
        dispatch(search(data?.searchInput));
        reset();
        if (onSearchComplete) {
            onSearchComplete(true);
        }
    }

    return (
        <form action="" onSubmit={handleSubmit(handleSearch)}>
            <div className="relative">
                <input {...register("searchInput")} placeholder="Search by title..." className={`w-full rounded-full border border-zinc-400 outline-none h-10 px-5 ${errors?.searchInput ? "border border-red-500" : ""}`} />
                {errors && errors?.searchInput && <p className="absolute md:right-12 md:top-3 text-red-500 text-xs">{errors?.searchInput?.message}</p>}
                <button type="submit" className="absolute right-1 px-2 border border-zinc-400 border-r-0 border-t-0 border-b-0 h-full outline-none">
                    <MagnifyingGlass size={20} className="" />
                </button>
            </div>
        </form>
    )
};

export default SearchComponent;
"use client";

import { removeFromWatchList } from "@/app/redux/features/watchSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import EmptyListSkeleton from "@/components/ui/EmptyListSkeleton";
import SingleMovie from "@/components/ui/SingleMovie";
import { TMDB_API_BASE_URL } from "@/constants";
import { IPopularMovies } from "@/types";
import { Heart } from "@phosphor-icons/react";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const WatchList = (): JSX.Element | null => {

    const [isMounted, setIsMounted] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const movieIds = useSelector((state: RootState) => state?.watchList?.items) || [];

    const fetchMovieDetails = async (id: number) => {
        const { data } = await axios.get<IPopularMovies>(`${TMDB_API_BASE_URL}/movie/${id}`, {
            params: { api_key: process.env.NEXT_PUBLIC_API_KEY },
        });
        return data;
    };

    const watchListQueries = useQueries({
        queries: movieIds?.map(id => ({
            queryKey: ["watchListmovie", id],
            queryFn: () => fetchMovieDetails(id),
            enabled: !!id,
            refetchOnWindowFocus: false
        }))
    });

    const movies = watchListQueries.map(query => query.data!).filter(data => data) as IPopularMovies[];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="mt-10 md:mt-20 mb-10">
            <h1 className="font-bold text-2xl">Watchlist</h1>
            <div className="bg-emerald-500 w-[44px] h-1 rounded-full mt-1"></div>
            {isMounted && watchListQueries.some(query => query.isFetching) ? (
                <EmptyListSkeleton />
            ) : (
                <>
                    {movies.length > 0 ? (
                        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
                            {movies.map(movie => (
                                <div className="relative" key={movie?.id}>
                                    <Link href={`/movies/${movie?.id}`}>
                                        <SingleMovie movie={movie} />
                                    </Link>
                                    <button onClick={() => dispatch(removeFromWatchList({ id: movie?.id }))} className="absolute left-1/2 top-[45%] transform -translate-x-1/2 -translate-y-1/2 flex max-w-[250px] w-full gap-1 items-center justify-center border border-zinc-400 dark:border-white text-white bg-black/50 rounded-md px-2 py-2">
                                        <Heart size={24} />
                                        Remove From Watchlist
                                    </button>
                                </div>
                            ))}
                        </section>
                    ) : (
                        <>
                            {isMounted && (
                                <div className="mt-4 text-left">
                                    <p>Watchlist is empty!</p>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default WatchList
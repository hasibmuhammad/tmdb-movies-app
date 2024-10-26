"use client";

import { RootState } from "@/app/store/store";
import EmptyListSkeleton from "@/components/ui/EmptyListSkeleton";
import SingleMovie from "@/components/ui/SingleMovie";
import { TMDB_API_BASE_URL } from "@/constants";
import { IPopularMovies } from "@/types";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const WatchList = (): JSX.Element | null => {

    const [isMounted, setIsMounted] = useState(false);

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
            {isMounted &&
                watchListQueries?.some(query => query.isLoading) ?
                <EmptyListSkeleton />
                :
                <section className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
                    {
                        movies?.map(movie => {
                            return (
                                <>
                                    <Link key={movie?.id} href={`/movies/${movie?.id}`}>
                                        <SingleMovie movie={movie} />
                                    </Link>
                                </>
                            )
                        })
                    }
                </section>
            }
        </div>
    )
}

export default WatchList
"use client";

import { RootState } from "@/app/store/store";
import EmptyListSkeleton from "@/components/ui/EmptyListSkeleton";
import SingleMovie from "@/components/ui/SingleMovie";
import { TMDB_API_BASE_URL } from "@/constants";
import { IPopularMoviesFullResponse } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";

const apiURL = `${TMDB_API_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
const searchApiUrl = `${TMDB_API_BASE_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

const MovieList = (): JSX.Element => {

    const query = useSelector((state: RootState) => { return state?.search?.query })

    // restore to the top to prevent infinite calls of the api
    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const {
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isFetching: movieFetching,
    } = useInfiniteQuery({
        queryKey: ["popularMovies", query],
        queryFn: async ({ pageParam = 1 }) => {
            try {
                if (query) {
                    const res = await axios.get<IPopularMoviesFullResponse>(`${searchApiUrl}&page=${pageParam}&query=${query}`);
                    return res.data;
                }
                const res = await axios.get<IPopularMoviesFullResponse>(`${apiURL}&page=${pageParam}`);
                return res.data;

            } catch (error) {
                console.error("Error fetching popular movies", error);
                return null;
            }
        },
        getNextPageParam: (lastPage) => {
            if (lastPage && typeof lastPage.page === "number" && typeof lastPage.total_pages === "number") {
                const nextPage = lastPage.page + 1;
                return nextPage <= lastPage.total_pages ? nextPage : undefined;
            }
            return undefined;
        },
        refetchOnWindowFocus: false,
        initialPageParam: 1,
    });

    // For Infinite scroll when it reaches to the ref
    const triggerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const currentTriggerRef = triggerRef.current;

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !isFetchingNextPage && hasNextPage) {
                fetchNextPage();
            }
        });

        if (currentTriggerRef) {
            observer.observe(currentTriggerRef);
        }

        return (): void => {
            if (currentTriggerRef) {
                observer.unobserve(currentTriggerRef);
            }
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const hasMovies = data?.pages?.some(page => { return page?.results && page?.results?.length > 0 }) ?? false;

    return (
        <div className="mt-10 md:mt-20">
            <h1 className="font-bold text-2xl">{query ? `Search Result: ${query}` : "Popular Movies"}</h1>
            <div className="bg-emerald-500 w-[44px] h-1 rounded-full mt-1"></div>

            {/* Movies Section */}
            {movieFetching && !data ? (
                <EmptyListSkeleton />
            ) :
                <>
                    {hasMovies ? (
                        <>
                            <section className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
                                {data?.pages.flatMap((page) => {
                                    return page?.results?.map((movie) => {
                                        return (
                                            <Link key={movie?.id} href={`/movies/${movie?.id}`}>
                                                <SingleMovie movie={movie} />
                                            </Link>
                                        )
                                    })
                                }
                                )}
                            </section>
                        </>
                    ) : <p className="mt-10">Not Found!</p>}
                </>
            }

            {/* Trigger div for intersection observer */}
            <div ref={triggerRef} className="h-1"></div>
            {isFetchingNextPage && <EmptyListSkeleton />}
        </div>
    );
};

export default MovieList;

"use client";

import EmptyListSkeleton from "@/components/ui/EmptyListSkeleton";
import { TMDB_API_BASE_URL, TMDB_IMAGE_BASE_URL } from "@/constants";
import { IPopularMovies } from "@/types";
import { Star } from "@phosphor-icons/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { useEffect, useRef } from "react";

const MovieList = (): JSX.Element => {
    const {
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isFetching: movieFetching,
    } = useInfiniteQuery({
        queryKey: ["popularMovies"],
        queryFn: async ({ pageParam = 1 }) => {
            try {
                const res: AxiosResponse<{
                    results: IPopularMovies[];
                    page: number;
                    total_pages: number;
                    total_results: number;
                }> = await axios.get(
                    `${TMDB_API_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${pageParam}`
                );
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

    const triggerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const currentTriggerRef = triggerRef.current;

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            // Only fetch next page if it's intersecting and not currently fetching
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

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);

    return (
        <div className="mt-10 md:mt-20">
            <h1 className="font-bold text-2xl">Popular Movies</h1>
            <div className="bg-emerald-500 w-[44px] h-1 rounded-full mt-1"></div>

            {/* Movies Section */}
            {movieFetching && !data ? (
                <EmptyListSkeleton />
            ) : (
                <section className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
                    {data?.pages.flatMap((page) => {
                        return page?.results?.map((movie) => {
                            return (
                                <div className="rounded-md shadow-lg max-w-[300px] w-full dark:bg-bgDark dark:shadow-none" key={movie.id}>
                                    <Image
                                        src={`${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`} // default image
                                        alt={movie.title}
                                        width={500}
                                        height={750}
                                        sizes="(max-width: 600px) 185px, (max-width: 1024px) 342px, 500px"
                                        loading="lazy"
                                        className="rounded-md rounded-b-none"
                                    />
                                    <div className="p-4">
                                        <div className="flex items-center">
                                            <Star weight="fill" fill="#FD7506" />
                                            <p>
                                                {movie.vote_average.toFixed(1)} ( Votes: {movie.vote_count} )
                                            </p>
                                        </div>
                                        <h1>{movie.title}</h1>
                                    </div>
                                </div>
                            )
                        })
                    }
                    )}
                </section>
            )}

            {/* Trigger div for intersection observer */}
            <div ref={triggerRef} className="h-1"></div>
            {isFetchingNextPage && <EmptyListSkeleton />}
        </div>
    );
};

export default MovieList;

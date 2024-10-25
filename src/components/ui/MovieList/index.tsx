"use client";

import EmptyListSkeleton from "@/components/ui/EmptyListSkeleton";
import { TMDB_API_BASE_URL, TMDB_IMAGE_BASE_URL } from "@/constants";
import { IPopularMovies } from "@/types";
import { Star } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { useState } from "react";

const MovieList = (): JSX.Element => {
    const [page, setPage] = useState(1);
    const { data: movies, isFetching: movieFetching } = useQuery({
        queryKey: ["popularMovies", page],
        queryFn: async () => {
            try {
                const res: AxiosResponse<{ results: IPopularMovies[] }> = await axios.get(`${TMDB_API_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`);
                return res?.data?.results;
            } catch (error) {
                console.error("Error fetching popular movies", error);
            }
        },
        refetchOnWindowFocus: false,
        enabled: !!page
    });

    // const allGenres = genres?.genres;

    // const genreMap = Object.fromEntries(allGenres.map(genre => {
    //     return [genre.id, genre.name]
    // }));

    return (
        <div className="mt-10 md:mt-20">
            <h1 className="font-bold text-2xl">Popular Movies</h1>
            <div className="bg-emerald-500 w-[44px] h-1 rounded-full mt-1"></div>

            {/* movies */}
            {
                movieFetching ?
                    <EmptyListSkeleton />
                    :
                    <section className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
                        {
                            movies?.map((movie) => {
                                return (
                                    <div className="rounded-md shadow-lg max-w-[300px] w-full dark:bg-bgDark dark:shadow-none" key={movie?.id}>
                                        <Image
                                            src={`${TMDB_IMAGE_BASE_URL}/w500${movie?.poster_path}`}  // default image
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
                                                <p>{movie?.vote_average.toFixed(1)} ( Vote: {movie?.vote_count} )</p>
                                            </div>
                                            <h1>{movie?.title}</h1>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </section>
            }
        </div>
    )
}

export default MovieList
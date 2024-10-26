"use client";

import { addToWatchList, removeFromWatchList } from "@/app/redux/features/watchSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import Loader from "@/components/ui/Loader";
import MovieRecommendations from "@/components/ui/MovieRecommendations";
import { TMDB_API_BASE_URL, TMDB_IMAGE_BASE_URL } from "@/constants";
import { ICastAndCrew, IPopularMoviesFullResponse } from "@/types";
import { MovieDetailsSchema } from "@/zodSchemas";
import { CaretRight, Heart, Star } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from 'zod';

type MovieDetails = z.infer<typeof MovieDetailsSchema>;

interface IMovieDetailProps {
    movie: MovieDetails,
    recommendations: IPopularMoviesFullResponse | null
}

const MovieDetail = ({ movie, recommendations }: IMovieDetailProps): JSX.Element => {

    const pathName = usePathname();

    const watchlistItems = useSelector((state: RootState) => {
        return state.watchList.items;
    });
    const dispatch = useDispatch<AppDispatch>();
    const castApIUrl = `${TMDB_API_BASE_URL}/movie/${movie?.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);

    const { data, isFetching: castFetching } = useQuery({
        queryKey: ["getCastInfo", movie?.id],
        queryFn: async () => {
            const res = await axios.get<ICastAndCrew>(castApIUrl);
            return res.data;
        },
        refetchOnWindowFocus: false,
        enabled: !!movie?.id
    });

    const casts = data?.cast || [];

    const handleAddToWatchList = () => {
        dispatch(addToWatchList({ id: movie?.id }));
    }
    const handleRemoveFromWatchList = () => {
        dispatch(removeFromWatchList({ id: movie?.id }));
    }

    const hasInTheWatchList = watchlistItems?.includes(movie?.id);

    return (
        <>
            {
                castFetching ?
                    <Loader />
                    :
                    <>
                        <div className="mt-10 md:mt-20 flex items-center font-semibold dark:font-bold gap-2  dark:text-white">
                            <Link href="/"><span>Movies</span> </Link>
                            <CaretRight weight="bold" />
                            <Link href={`/movies/${movie?.id}`}><span className={`${pathName.includes("/movies/") ? "text-emerald-500" : ""}`}>Details</span></Link>
                        </div>
                        <div className="mt-5">
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="shrink-0">
                                    <Image
                                        src={`${TMDB_IMAGE_BASE_URL}/w500${movie?.poster_path}`}
                                        alt={movie?.title}
                                        width={500}
                                        height={500}
                                        sizes="(max-width: 600px) 185px, (max-width: 1024px) 342px, 500px"
                                        loading="lazy"
                                        className="rounded-md"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <h1 className="text-2xl md:text-4xl font-bold">{movie?.title}</h1>
                                        <div className="flex items-center">
                                            <Star weight="fill" fill="#FD7506" />
                                            <p>
                                                {movie?.vote_average.toFixed(1)}
                                            </p>
                                        </div>
                                    </div>
                                    <p>
                                        <span className="font-bold">Description:</span> {movie?.overview}
                                    </p>
                                    <div>
                                        <form action={hasInTheWatchList ? handleRemoveFromWatchList : handleAddToWatchList}>
                                            <button type="submit" className="px-3 py-2 border border-zinc-400 dark:border-emerald-400 dark:text-emerald-400 flex items-center gap-1 rounded-md text-sm">
                                                {
                                                    hasInTheWatchList ?
                                                        <>
                                                            <Heart size={24} weight="fill" />
                                                            Remove from watchlist
                                                        </>
                                                        :
                                                        <>
                                                            <Heart size={24} />
                                                            Add to watchlist
                                                        </>
                                                }
                                            </button>
                                        </form>
                                    </div>
                                    <div className=" space-y-2">
                                        <h2 className="font-bold">Genres:</h2>
                                        <div className="flex items-center gap-1">
                                            {
                                                movie?.genres?.map(genre => {
                                                    return (
                                                        <div className="border border-zinc-400 rounded-full px-3 py-1 text-xs" key={genre?.id}>
                                                            {genre?.name}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="font-bold">Release Date:</h2>
                                        <div className="flex items-center gap-1">
                                            <div className="border border-zinc-400 rounded-full px-3 py-1 text-xs">
                                                {movie?.release_date}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="font-bold">Duration:</h2>
                                        <p>{movie?.runtime} minutes</p>
                                    </div>
                                    <div>
                                        <h2 className="font-bold">Cast:</h2>
                                        <div className="max-w-[300px] w-full flex flex-wrap mt-1">
                                            {
                                                casts?.slice(0, 5).map(cast => {
                                                    const avatarUrl = "/avatar.png";
                                                    const profilePath = cast?.profile_path ? `${TMDB_IMAGE_BASE_URL}/w45${cast.profile_path}` : avatarUrl;

                                                    return (
                                                        <div key={cast?.cast_id} className="max-w-[100px] w-full">
                                                            <div>
                                                                <div className="overflow-hidden ">
                                                                    <Image
                                                                        src={profilePath}
                                                                        alt={movie?.title}
                                                                        width={40}
                                                                        height={40}
                                                                        loading="lazy"
                                                                        className="w-[40px] h-[40px] object-cover rounded-full"
                                                                    />
                                                                </div>
                                                                <p className="text-xs">{cast?.original_name}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recommendations */}
                            <div className="mt-10">
                                <MovieRecommendations recommendations={recommendations} />
                            </div>
                        </div>
                    </>
            }
        </>
    );
}

export default MovieDetail;
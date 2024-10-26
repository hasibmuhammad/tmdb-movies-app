"use client";
import { TMDB_IMAGE_BASE_URL } from "@/constants";
import { IPopularMovies } from "@/types";
import { Star } from "@phosphor-icons/react";
import Image from "next/image";

interface IProps {
    movie: IPopularMovies
}

const SingleMovie = ({ movie }: IProps): JSX.Element => {
    return (
        <div className="rounded-md shadow-lg max-w-[300px] w-full max-h-[530px] dark:bg-bgDark dark:shadow-none" >
            <Image
                src={`${TMDB_IMAGE_BASE_URL}/w500${movie?.poster_path}`}
                alt={movie?.title}
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
                        {movie?.vote_average.toFixed(1)} ( Votes: {movie?.vote_count} )
                    </p>
                </div>
                <h1 className="max-w-full w-full truncate">{movie?.title}</h1>
            </div>
        </div>
    )
}

export default SingleMovie
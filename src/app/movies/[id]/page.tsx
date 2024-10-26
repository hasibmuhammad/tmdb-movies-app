import MovieDetail from "@/components/ui/MovieDetail";
import MovieRecommendations from "@/components/ui/MovieRecommendations";
import { TMDB_API_BASE_URL } from "@/constants";
import { IPopularMoviesFullResponse } from "@/types";
import { MovieDetailsSchema } from "@/zodSchemas";
import { z } from "zod";

type MovieDetails = z.infer<typeof MovieDetailsSchema>;

interface IMovieDetailPageProps {
    params: { id: string };
}

// Fetch movie details with ISR
const fetchMovieDetails = async (id: string): Promise<MovieDetails | null> => {
    const apiUrl = `${TMDB_API_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

    const response = await fetch(apiUrl, {
        next: { revalidate: 60 }, // ISR every 60 seconds
    });

    if (!response.ok) {
        console.error("Failed to fetch movie details.");
        return null;
    }

    const data = await response.json();

    // Validate the data using Zod schema
    const parsedData = MovieDetailsSchema.safeParse(data);
    if (!parsedData.success) {
        console.error("API response validation failed:", parsedData.error.format());
        return null;
    }

    return parsedData.data;
};
const fetchMovieRecommendations = async (id: string): Promise<IPopularMoviesFullResponse | null> => {
    const apiUrl = `${TMDB_API_BASE_URL}/movie/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

    const response = await fetch(apiUrl, {
        next: { revalidate: 60 }, // ISR every 60 seconds
    });

    if (!response.ok) {
        console.error("Failed to fetch movie details.");
        return null;
    }

    const data = await response.json();

    return data;
};

const MovieDetailPage = async ({ params }: IMovieDetailPageProps): Promise<JSX.Element> => {
    const movie = await fetchMovieDetails(params.id);
    const movieRecommendations = await fetchMovieRecommendations(params.id);

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <>
            <MovieDetail movie={movie} recommendations={movieRecommendations} />
        </>
    )

};

export default MovieDetailPage;

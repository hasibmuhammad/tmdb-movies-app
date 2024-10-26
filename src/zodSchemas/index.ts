import { z } from 'zod';

export const SearchSchema = z.object({
    searchInput: z.string().min(1, { message: "Please write something!" })
});

export const MovieDetailsSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    belongs_to_collection: z
        .object({
            id: z.number(),
            name: z.string(),
            poster_path: z.string().nullable(),
            backdrop_path: z.string().nullable(),
        })
        .nullable(),
    budget: z.number(),
    genres: z.array(z.object({ id: z.number(), name: z.string() })),
    homepage: z.string().nullable(),
    id: z.number(),
    imdb_id: z.string().nullable(),
    origin_country: z.array(z.string()),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    production_companies: z.array(
        z.object({
            id: z.number(),
            logo_path: z.string().nullable(),
            name: z.string(),
            origin_country: z.string(),
        })
    ),
    production_countries: z.array(
        z.object({
            iso_3166_1: z.string(),
            name: z.string(),
        })
    ),
    release_date: z.string(),
    revenue: z.number(),
    runtime: z.number().nullable(),
    spoken_languages: z.array(
        z.object({
            english_name: z.string(),
            iso_639_1: z.string(),
            name: z.string(),
        })
    ),
    status: z.string(),
    tagline: z.string().nullable(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
});
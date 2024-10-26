export interface IPopularMovies {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface IPopularMoviesFullResponse {
    results: IPopularMovies[];
    page: number;
    total_pages: number;
    total_results: number;
}

export interface ISearchFormElements {
    searchInput: string;
}

export interface ICastAndCrew {
    id: number
    cast: ICast[]
    crew: ICrew[]
}
export interface ICast {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}
export interface ICrew {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
    credit_id: string
    department: string
    job: string
}

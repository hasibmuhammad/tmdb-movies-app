import SingleMovie from "@/components/ui/SingleMovie";
import { IPopularMoviesFullResponse } from "@/types";
import Link from "next/link";

interface IProps {
    recommendations: IPopularMoviesFullResponse | null
}
const MovieRecommendations = ({ recommendations }: IProps): JSX.Element => {
    return (
        <div className="mb-10">
            <h1 className="font-bold text-2xl">Recommendations</h1>
            <div className="bg-emerald-500 w-[44px] h-1 rounded-full mt-1"></div>

            <section className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
                {
                    recommendations?.results?.map(movie => {
                        return (
                            <Link key={movie?.id} href={`/movies/${movie?.id}`}>
                                <SingleMovie movie={movie} />
                            </Link>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default MovieRecommendations;
import Link from 'next/link';

const NotFound = (): JSX.Element => {
    return (
        <div className="flex flex-col items-center justify-center h-[85vh] text-center">
            <h1 className="text-6xl font-bold text-emerald-500">404</h1>
            <p className="mt-4 text-xl">Oops! Page Not Found.</p>
            <p className="mt-2 text-gray-600">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <Link href="/" className="mt-6 px-4 py-2 rounded border border-zinc-400 dark:border-white text-black dark:text-white transition">
                Go back home
            </Link>
        </div>
    );
};

export default NotFound;

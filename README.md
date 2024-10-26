## Movie App with TMDB API & Next.js

### Live URL:

[https://tmdb-movies-web.vercel.app](https://tmdb-movies-web.vercel.app/)

### Used Technologies:

- Next.js(v14.2.16)
- TypeScript
- Redux Toolkit
- Tanstack Query
- ISR, SSR, CSR
- TMDB API
- ESlint - For Quality Code Validation

### Features:

- Responsive Layout
- Movie Listing
- Infinite Scroll of movies
- Search Bar(By title)
- Movie Detail Page
- Related Recommendations of a certain movie
- ISR - Get fresh data in each 60 seconds after build
- WatchList Page - to showcase added to watchlist movies
- Add To Watchlist
- Remove From Watchlist
- Show total added watchlist count on the navigation
- Dark/Light Mode - With Persistance
- Validated API Response using Zod for Movie Detail API
- Optimistic UI - Showed Skeleton and Loader with spinning while loading data
- Scroll To Topbar

### Fully Utilized

I tried to utilize the power of `Redux`, `Tanstack Query`, `Tailwind CSS` and `TypeScript` within a short time.

### Future Work

- Add Unit Test(I prefer `Jest`)
- Monitor the dashboard of `Codacy` after integrating to it to check the code quality.
- Can eliminate the searchbar from places where it doesn't need.

For `add to watchlist` i could take the advantage of `Server Actions`. But I got shortage of time to deep dive this `Server Actions` part. I wish to make this application more robust in future considering more user-friendly UI, Performance, efficient API handling etc.

### Steps i would take to use `Server Actions` for the Add To Watchlist features:

- Utilize `action` attribute of form
- In the Action Listener i would create a function named `addToWatchlist` and i would use `use server;`
- Then i would make a post request to add an id to the `items[]`
- I would store the ids in the database in a collection named `watchlists`
- Then I would make a request to get all the wathlist ids and using those ids i would make a `TMDB API` call to get all the movies according to the ids.
- Then i would showed the movies card in the watchlist page.

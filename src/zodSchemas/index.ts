import { z } from 'zod';

export const SearchSchema = z.object({
    searchInput: z.string().min(1, { message: "Please write something!" })
});
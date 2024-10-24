
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const TanstackProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
};

export default TanstackProvider;
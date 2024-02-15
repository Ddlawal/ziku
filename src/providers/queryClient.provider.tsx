import { useToast } from '@chakra-ui/react';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode, useState } from 'react';

const LocalQueryClientProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const toast = useToast();
    const mutationCache = new MutationCache({
        onError: (error: any, _variables, _context, mutation) => {
            // If this mutation has an onError defined, skip this
            if (mutation.options.onError) return;

            const errorMessage = error?.response?.data?.message || error?.response?.message;

            toast({
                title: 'Error',
                description: errorMessage || 'Something went wrong, please try again',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        },
    });

    const [queryClient] = useState(
        () =>
            new QueryClient({
                mutationCache,
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default LocalQueryClientProvider;

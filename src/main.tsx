import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Context from './providers/context.provider';
import './index.css';
import { theme } from './styles/theme';
import LocalQueryClientProvider from './providers/queryClient.provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <LocalQueryClientProvider>
                    <Context>
                        <App />
                    </Context>
                </LocalQueryClientProvider>
            </BrowserRouter>
        </ChakraProvider>
    </StrictMode>
);

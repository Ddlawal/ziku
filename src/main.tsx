import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Context from './context';
import './index.css';
import { theme } from './styles/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Context>
                    <App />
                </Context>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
);

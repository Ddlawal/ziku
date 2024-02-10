import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
    base: '0em', // 0pxpx
    xs: '40rem', // 460px
    sm: '40rem', // 640px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
    '2xl': '85.375em', // 1366px
    '3xl': '90em', // 1440px
    '4xl': '96em', // 1536px
    '5xl': '108rem', // 1728px
    '6xl': '120em', // 1920px
};

const colors = {};

export const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
                lineHeight: 1.5,
                fontWeight: 400,

                colorScheme: 'light dark',
                color: 'lavender',
                backgroundColor: 'black',

                fontSynthesis: 'none',
                textRendering: 'optimizeLegibility',
            },

            root: {
                width: '100vw',
            },
        }),
    },
    breakpoints,
    colors,
});

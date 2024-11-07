module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                main: "'Roboto', 'Barlow', sans-serif",
                secondary: '"Merriweather", serif',
            },
            backgroundColor: {
                primary: {
                    lighter: '#A5E1B7',  // Light version of #5CAF90
                    light: '#79D89E',     // Lighter green for backgrounds
                    main: '#5CAF90',      // Main green from the website
                    dark: '#4D9F7A',      // Darker green for hover or active states
                    darker: '#3D815C',    // Very dark green for borders or text
                    contrastText: '#fff', // White text for contrast
                },
                secondary: {
                    lighter: '#A0B2B9',  // Light version of #4B5966
                    light: '#7C8C94',     // Lighter shade
                    main: '#4B5966',      // Main color from the website
                    dark: '#3C474E',      // Darker shade for hover or active
                    darker: '#2C353C',    // Very dark for borders or text
                    contrastText: '#fff', // White text for contrast
                },
            },
            colors: {
                primary: {
                    lighter: '#A5E1B7',
                    light: '#79D89E',
                    main: '#5CAF90',
                    dark: '#4D9F7A',
                    darker: '#3D815C',
                    contrastText: '#fff',
                },
                secondary: {
                    lighter: '#A0B2B9',
                    light: '#7C8C94',
                    main: '#4B5966', // The secondary color from the website
                    dark: '#3C474E',
                    darker: '#2C353C',
                    contrastText: '#fff',
                },
            },
        },
    },
    plugins: [],
};

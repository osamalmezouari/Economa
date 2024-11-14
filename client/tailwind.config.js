module.exports = {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			main: ['Roboto', 'Barlow', 'sans-serif'],
  			secondary: ['Poppins', 'sans-serif']
  		},
  		backgroundColor: {
  			primary: {
  				lighter: '#A5E1B7',
  				light: '#79D89E',
  				main: '#5CAF90',
  				dark: '#4D9F7A',
  				darker: '#3D815C',
  				contrastText: '#fff'
  			},
  			secondary: {
  				lighter: '#A0B2B9',
  				light: '#7C8C94',
  				main: '#4B5966',
  				dark: '#3C474E',
  				darker: '#2C353C',
  				contrastText: '#fff'
  			}
  		},
  		colors: {
  			primary: {
  				lighter: '#A5E1B7',
  				light: '#79D89E',
  				main: '#5CAF90',
  				dark: '#4D9F7A',
  				darker: '#3D815C',
  				contrastText: '#fff',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				lighter: '#A0B2B9',
  				light: '#7C8C94',
  				main: '#4B5966',
  				dark: '#3C474E',
  				darker: '#2C353C',
  				contrastText: '#fff',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

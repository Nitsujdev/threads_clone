import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	fontSize: {
  		xs: [
  			'0.5rem',
  			{
  				lineHeight: '1rem',
  				letterSpacing: '-0.03em'
  			}
  		],
  		sm: [
  			'0.8rem',
  			{
  				lineHeight: '1.25rem',
  				letterSpacing: '-0.03em'
  			}
  		],
  		base: [
  			'1rem',
  			{
  				lineHeight: '1.5rem',
  				letterSpacing: '-0.03em'
  			}
  		],
  		lg: [
  			'1.5rem',
  			{
  				lineHeight: '1.75rem',
  				letterSpacing: '-0.03em'
  			}
  		],
  		xl: [
  			'2rem',
  			{
  				lineHeight: '2.5rem',
  				letterSpacing: '-0.03em'
  			}
  		],
  		'2xl': [
  			'3rem',
  			{
  				lineHeight: '3.5rem',
  				letterSpacing: '-0.03em'
  			}
  		],
  		'3xl': [
  			'3.5rem',
  			{
  				lineHeight: '4rem',
  				letterSpacing: '-0.03em'
  			}
  		],
  		'4xl': [
  			'4rem',
  			{
  				lineHeight: '4.5rem',
  				letterSpacing: '-0.03em'
  			}
  		],
  		'5xl': [
  			'4.5rem',
  			{
  				lineHeight: '5.5rem',
  				letterSpacing: '-0.03em'
  			}
  		]
  	},
  	screens: {
  		mobile: '360px',
  		tablet: '640px',
  		laptop: '1024px',
  		desktop: '1280px'
  	},
  	extend: {
  		boxShadow: {
  			'count-badge': '0px 0px 6px 2px rgba(219, 188, 159, 0.30)',
  			'groups-sidebar': '-30px 0px 60px 0px rgba(28, 28, 31, 0.50)'
  		},
  		colors: {
  			brand: {
  				green: {
  					DEFAULT: '#21CC9E',
  					light_100: '#4DD6B2',
  					light_200: '#8DEBD2',
  					dark_100: '#0C7A5D',
  					dark_200: '#023D2E'
  				},
  				yellow: {
  					DEFAULT: '#E5E53C',
  					light: '#EBEB8D',
  					dark: '#7A7A0C'
  				},
  				purple: {
  					DEFAULT: '#743CE5',
  					light: '#AC8DEB',
  					dark: '#310C7A'
  				}
  			},
  			error: {
  				DEFAULT: '#E53C6F',
  				light: '#EB8DAC',
  				dark: '#7A0C2F'
  			},
  			success: {
  				DEFAULT: '#3CE544',
  				light: '#8DEB92',
  				dark: '#0C7A0F'
  			},
  			warning: {
  				DEFAULT: '#E5993C',
  				light: '#EBC68D',
  				dark: '#7A4A0C'
  			},
  			info: {
  				DEFAULT: '#3C9CE5',
  				light: '#8DC3EB',
  				dark: '#0C4A7A'
  			},
  			light: {
  				'50': '#FFFFFF',
  				'100': '#FCFFFE',
  				'200': '#F0F5F3'
  			},
  			dark: {
  				'50': '#000000',
  				'100': '#000A07',
  				'200': '#01241A'
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
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
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
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

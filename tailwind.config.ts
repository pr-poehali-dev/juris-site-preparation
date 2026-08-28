import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./1778611927607786439.html"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				cormorant: ['Oswald', 'Golos Text', 'sans-serif'],
				display: ['Oswald', 'Golos Text', 'sans-serif'],
				golos: ['Golos Text', 'sans-serif'],
			},
			fontSize: {
				'hero': ['clamp(3.5rem, 10vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
				'metric': ['clamp(3rem, 7vw, 6rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				gold: {
					DEFAULT: '#C9A96E',
					light: '#E8D5A3',
					dark: '#A07840',
				},
				ink: {
					DEFAULT: '#0F1A14',
					800: '#1A2820',
					700: '#243430',
					600: '#2E4038',
					500: '#3D5248',
				},
				cream: {
					DEFAULT: '#F5F0E8',
					100: '#FAF7F2',
					200: '#F0EAE0',
				},
				bordo: {
					DEFAULT: '#A81D34',
					light: '#C93049',
					dark: '#7C1226',
				},
				sky: {
					DEFAULT: '#9BD4F0',
					light: '#C7E8F8',
					dark: '#5FB3DC',
				},
				lime: {
					DEFAULT: '#9BD4F0',
					light: '#C7E8F8',
					dark: '#5FB3DC',
				},
				paper: {
					DEFAULT: '#FBFAFA',
					50: '#FFFFFF',
					100: '#F4F1F2',
					200: '#EAE4E6',
					300: '#D6CCCF',
				},
				graphite: {
					DEFAULT: '#1C0810',
					900: '#240C14',
					800: '#3A121F',
					700: '#5A2032',
					500: '#8A5F6B',
					400: '#A98A93',
					300: '#C9B4BA',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(30px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'line-grow': {
					from: { width: '0' },
					to: { width: '100%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-up': 'fade-up 0.8s ease-out forwards',
				'fade-up-delay': 'fade-up 0.8s ease-out 0.2s forwards',
				'fade-up-delay2': 'fade-up 0.8s ease-out 0.4s forwards',
				'fade-up-delay3': 'fade-up 0.8s ease-out 0.6s forwards',
				'fade-in': 'fade-in 1s ease-out forwards',
				'line-grow': 'line-grow 1s ease-out 0.5s forwards',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
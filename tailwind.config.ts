import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			screens: {
				board: '901px',
				'board-wide': '1181px',
				'phone-only': { max: '480px' },
				touch: { raw: '(hover: none)' }
			},
			backgroundImage: {
				'cork-texture': "url('/textures/cork.svg')",
				'paper-texture': "url('/textures/paper.svg')",
				'board-pin': 'radial-gradient(circle at 35% 35%, #ff7a7a, #b3121f 55%, #6d0a12)',
				'board-ruled':
					'linear-gradient(#fbfbf8 59px, transparent 0), repeating-linear-gradient(transparent 0 23px, #c9dbe8 23px 24px)'
			},
			boxShadow: {
				'board-recess':
					'inset 0 0 40px rgb(0 0 0 / .35), inset 0 0 0 1px rgb(0 0 0 / .4), 0 20px 50px -20px rgb(0 0 0 / .8)',
				'board-sheet': '0 1px 2px rgb(0 0 0 / .25), 0 10px 18px -8px rgb(0 0 0 / .5)',
				'board-raised': '0 1px 2px rgb(0 0 0 / .25), 0 22px 30px -10px rgb(0 0 0 / .6)',
				'board-pin': '1px 3px 3px rgb(0 0 0 / .45)',
				'board-tab': '0 -2px 8px rgb(0 0 0 / .16)',
				'board-label-depth': '0 6px 10px -4px rgb(0 0 0 / .6)',
				'board-label-active': '0 10px 16px -6px rgb(0 0 0 / .7)'
			},
			colors: {
				board: {
					wall: '#262c2b',
					cork: '#a67c4f',
					frame: '#4b3423',
					paper: '#eceee9',
					card: '#fbfbf8',
					manila: '#e7dfca',
					ink: '#17191b',
					faint: '#4f555a',
					rule: '#b9beb8',
					red: '#b3121f',
					string: '#c4161c',
					label: '#141516',
					chalk: '#f2f2f2',
					note: '#24170b'
				},
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
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
				xl: 'calc(var(--radius) + 4px)',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				stencil: ['Big Shoulders Stencil Display', 'sans-serif'],
				typewriter: ['Courier Prime', 'Courier New', 'monospace'],
				sans: [...fontFamily.sans]
			},
			keyframes: {
				'board-string': { from: { strokeDashoffset: '1' }, to: { strokeDashoffset: '0' } },
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--bits-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--bits-accordion-content-height)' },
					to: { height: '0' }
				},
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' }
				}
			},
			animation: {
				'board-string': 'board-string 900ms cubic-bezier(.65, 0, .35, 1) both',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'caret-blink': 'caret-blink 1.25s ease-out infinite'
			}
		}
	},
	plugins: [tailwindcssAnimate]
};

export default config;

# Kathmandu Bakery

Premium artisan bakery website for Kathmandu Bakery — the best and most beloved bakery in Bharatpur, Chitwan, Nepal.

**Tagline:** "Let Us Fill Your Soul with Sweetness"
**Established:** 2077 BS (2020 AD), Bharatpur, Nepal

## Tech Stack

- React 18 + TypeScript
- Vite (esbuild minification)
- Tailwind CSS v3
- Framer Motion (animations)
- React Router v7 (client-side routing)
- Lucide React (icons)

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npm run typecheck
```

## Deployment (Netlify)

The project includes `netlify.toml` and `public/_redirects` for Netlify deployment with SPA routing.

1. Push to your Git repository
2. Connect the repo to Netlify
3. Build settings are auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`

## Pages

| Route   | Page          | Description                                    |
|---------|---------------|------------------------------------------------|
| `/`     | Home          | Hero, ticker, stats, featured items, testimonials, classes teaser, locations |
| `/menu` | Menu          | 3-tab menu (Bakery, Pastry & Cakes, Kitchen & Cafe) with 24 items |
| `/classes` | Classes    | Bakery & Barista class cards, enrollment form, FAQ accordion |
| `/gallery` | Gallery    | Masonry grid, lightbox, Instagram section, video teaser |
| `/order` | Order Online | Delivery/pickup toggle, cart, WhatsApp order integration |
| `/contact` | Contact   | Two location cards with maps, opening hours, email form |

## Features

- Full-screen hero with animated text entrance
- Infinite-scroll ticker bar
- Auto-rotating testimonials carousel
- Masonry gallery with keyboard-navigable lightbox (Arrow keys + ESC)
- Delivery/pickup order flow with WhatsApp integration (+977 9855033338)
- Custom cake banner with WhatsApp link
- Class enrollment form with FAQ accordion
- Two location cards with Google Maps embeds

## Premium Features

1. Animated loading screen
2. Today's special popup (3s delay, session-dismissed)
3. WhatsApp floating button (bottom-right)
4. Back to top button (appears after 300px scroll)
5. Discount badge animation (after 7 PM)
6. Scroll reveal animations (Framer Motion whileInView)
7. Product card hover effects (golden glow, scale)
8. Animated stats counter (count-up on scroll)
9. Sticky mobile order bar
10. Cookie consent banner (localStorage)

## SEO

- Semantic HTML with JSON-LD LocalBusiness schema
- OpenGraph and Twitter Card meta tags
- Preconnect to Google Fonts and image CDN
- Lazy-loaded images with `loading="lazy"`

## Accessibility

- Skip-to-content link
- ARIA labels on all interactive elements
- Focus-visible rings (gold) for keyboard navigation
- Semantic landmarks (`<nav>`, `<main>`, `<footer>`)
- Color contrast WCAG AA compliant

## Color Palette

| Name            | Hex       |
|-----------------|-----------|
| Warm Chocolate  | `#3B1F0E` |
| Caramel Brown   | `#7B4A1E` |
| Golden Cream    | `#F5D79E` |
| Soft Ivory      | `#FDF6EC` |
| Accent Gold     | `#C9882C` |
| Dark Text        | `#1A0A00` |

## Typography

- **Headlines:** Playfair Display (serif)
- **Body:** DM Sans (sans-serif)
- **Accent:** Dancing Script (cursive)

## Contact

- **Phone:** +977 9855033338
- **Email:** kathmandubakery321@gmail.com
- **Facebook:** @KathmanduBakeryCakes
- **Instagram:** @kathmandu.bakery.chitwan
- **Locations:** Chaubiskothi (Shanghai Plaza) and Saptagandaki Chowk, Bharatpur-10, Chitwan

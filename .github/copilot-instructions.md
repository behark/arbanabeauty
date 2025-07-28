# Copilot Instructions for Arbana Beauty

## Project Architecture
Next.js beauty business website with e-commerce, booking system, multilingual support, and admin dashboard. **No database** - uses static data in `data/products.ts`.

## Essential Patterns

### State Management Flow
```tsx
// app/layout.tsx - Nested context providers (order matters!)
<ThemeProvider>
  <LanguageProvider>
    <CartProvider>  // Auto-persists to localStorage
```

### Component Structure
- **Page components**: `app/*/page.tsx` wrapped in `<MainLayout>`
- **Sections**: `components/sections/` for homepage blocks
- **Admin**: All admin routes require `<AdminAuthCheck>` wrapper
- **Animations**: Use `<AnimatedElement animation="fadeUp">` for scroll animations

### Internationalization
```tsx
// Add to LanguageContext.tsx both objects:
const translations = {
  en: { 'new.key': 'English text' },
  sq: { 'new.key': 'Albanian text' }
};

// Use in components:
const { t } = useLanguage();
<h1>{t('new.key')}</h1>
```

### Data Patterns
- **Products**: Static array in `data/products.ts` with variants/categories
- **Types**: All interfaces in `types/` directory
- **Admin auth**: localStorage session (24h expiration)

## Development Workflows

### Commands
- `npm run dev` - Development server
- `npm run build` - Production build (outputs to `out/` for Netlify)
- ESLint disabled during builds for faster development

### Deployment
- **Netlify**: Static export with SPA redirects in `netlify.toml`
- **Environment**: Set Stripe keys in Netlify dashboard (never in code)
- **Fonts**: Google Fonts (Montserrat + Playfair Display) loaded in layout

### Critical Integrations
- **Stripe**: Payment intents via `/api/create-payment-intent` route
- **Analytics**: Google Analytics, Facebook Pixel, Microsoft Clarity in layout
- **WhatsApp**: Chat widget with hardcoded phone number
- **SEO**: Schema markup, OpenGraph, Twitter cards automatically included

## Quick Tasks

### Adding Products
```tsx
// Update data/products.ts
{
  id: "prod-id", title: "Product Name", slug: "product-name",
  images: [{ src: "/images/products/name.jpg", alt: "Alt text" }],
  variants: [{ id: "var1", name: "Variant", price: 45, sku: "SKU" }],
  categories: [{ id: "cat1", name: "Category", slug: "category" }]
}
```

### New Admin Pages
```tsx
export default function AdminPage() {
  return (
    <AdminAuthCheck>
      <AdminLayout>{/* content */}</AdminLayout>
    </AdminAuthCheck>
  );
}
```

### File Organization
- `app/*` - Next.js pages/API routes
- `components/sections/*` - Homepage sections  
- `components/admin/*` - Admin components
- `contexts/*` - React Context providers
- `data/*` - Static data (products, etc.)
- `utils/stripe.ts` - Stripe configuration

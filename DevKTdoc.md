# Developer Knowledge Transfer Document (DevKT)

This document contains critical coding decisions, architectural patterns, and implementation details to help developers understand the codebase and maintain consistency.

## 🏗️ Architecture Overview

### Tech Stack Rationale
- **Next.js 15 (App Router)**: Chosen for SSR/SSG capabilities, optimized performance, and modern development experience
- **TypeScript**: Provides type safety, better IDE support, and reduces runtime errors
- **Tailwind CSS**: Utility-first approach enables rapid UI development with consistent design system
- **Prisma + SQLite**: Simple, zero-config database perfect for portfolio sites with excellent TypeScript integration
- **Framer Motion**: Industry-standard animation library with declarative API

### Project Structure Philosophy
```
src/
├── app/                 # Next.js App Router - page routes and API endpoints
│   ├── admin/          # Development-only admin panel
│   ├── api/            # Server-side API routes
│   └── (public)/       # Public-facing pages
├── components/         # React components with clear separation of concerns
│   ├── ui/            # Atomic, reusable components (Button, Input, Card)
│   ├── sections/      # Page section components (Hero, About, Skills)
│   ├── modals/        # Modal components with consistent behavior
│   └── admin/         # Admin-specific components
├── lib/               # Utility functions and configurations
└── types/             # TypeScript type definitions
```

## 🎨 Design System Implementation

### Color Palette (`tailwind.config.ts:15-27`)
The dark theme with neon green accents is implemented using CSS custom properties and Tailwind extensions:

```typescript
colors: {
  background: {
    primary: '#0a0a0a',    // Near-black primary background
    secondary: '#1a1a1a',  // Slightly lighter secondary surfaces
  },
  accent: {
    neon: '#00ff41',       // Signature neon green for highlights
  },
  // ... other colors
}
```

**Decision**: Custom properties in `globals.css` allow runtime theme switching if needed in the future.

### Animation Strategy (`tailwind.config.ts:31-67`)
Three categories of animations defined:
1. **Typewriter Effect**: For hero section text animation
2. **Glow Effect**: Neon highlighting animations  
3. **Blink Effect**: Cursor animation for typewriter

**Decision**: Tailwind keyframes over CSS files for better maintainability and tree-shaking.

## 🗄️ Database Design Decisions

### Schema Design (`prisma/schema.prisma`)

#### JSON Storage Approach
Tech stacks and tags are stored as JSON strings rather than relational tables:

```prisma
model Project {
  techStack   String   // JSON string array
  // ...
}
```

**Reasoning**: 
- ✅ Simpler queries and mutations
- ✅ Flexible schema for varying tech stacks
- ✅ Fewer joins and complex relationships
- ❌ Less queryable (acceptable trade-off for portfolio use case)

#### Timestamp Strategy
All models include `createdAt` and `updatedAt` (where applicable):
```prisma
createdAt   DateTime @default(now())
updatedAt   DateTime @updatedAt
```

**Decision**: Automatic timestamp management for audit trails and content ordering.

## ⚙️ Configuration Management

### Constants Architecture (`src/lib/constants.ts`)

#### Hierarchical Configuration
```typescript
export const APP_CONFIG = {
  site: { /* site-wide settings */ },
  theme: { /* design system values */ },
  sections: { /* component-specific config */ },
  // ...
} as const
```

**Key Principles**:
1. **No Magic Strings**: All hardcoded values moved to constants
2. **Type Safety**: `as const` assertions for literal types
3. **Environment Awareness**: Conditional values based on `process.env`
4. **Hierarchical Organization**: Logical grouping for easy maintenance

#### Environment Variables Strategy
```typescript
// Development-only features
admin: {
  enabled: process.env.ADMIN_ENABLED === 'true',
},
// External service configuration
emailjs: {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  // ...
}
```

**Decision**: Explicit environment checks with fallbacks ensure graceful degradation.

## 🛠️ Utility Functions Philosophy

### Type-Safe Utilities (`src/lib/utils.ts`)

#### Class Name Merging
```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
**Purpose**: Combines multiple class name sources with Tailwind-aware conflict resolution.

#### JSON Parsing with Safety
```typescript
export function parseJsonString(jsonString: string): string[] {
  try {
    return JSON.parse(jsonString)
  } catch {
    return []
  }
}
```
**Decision**: Always return valid arrays instead of throwing errors for UI stability.

## 📊 Data Management Patterns

### Type Definitions (`src/types/index.ts`)

#### Interface Consistency
All data models follow consistent patterns:
```typescript
export interface Project {
  id: number              // Primary key
  // ... core fields
  featured: boolean       // Highlighting flag
  createdAt: Date        // Audit timestamp
  updatedAt: Date        // Modification timestamp
}
```

**Standards**:
- Arrays stored as `string[]` in TypeScript, JSON strings in database
- Optional fields marked with `?`
- Consistent naming: camelCase for TypeScript, snake_case in database (mapped via Prisma)

### Database Client (`src/lib/prisma.ts`)
Singleton pattern with development hot-reload protection:
```typescript
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**Decision**: Prevents multiple client instances during development hot reloads.

## 🎯 Component Design Principles

### Component Architecture (Planned)
Following atomic design methodology:

1. **Atoms** (`components/ui/`): Button, Input, Card, Badge
2. **Molecules** (`components/modals/`): Modal, Form groups
3. **Organisms** (`components/sections/`): Hero, Skills, Projects
4. **Pages** (`app/`): Route-level components

### Coding Standards Applied

#### SOLID Principles
- **Single Responsibility**: Each component has one clear purpose
- **Open/Closed**: Components extensible via props, closed for modification
- **Liskov Substitution**: Interface consistency across similar components
- **Interface Segregation**: Props interfaces focused and minimal
- **Dependency Inversion**: Components depend on abstractions (types) not implementations

#### KISS Implementation
- Favor simple, explicit code over clever abstractions
- Use standard patterns over custom solutions where possible
- Clear function names that describe exact behavior

#### DRY via Configuration
- Shared values in constants files
- Reusable utility functions
- Component composition over duplication

#### YAGNI Adherence  
- Only implement features defined in plan.md
- Avoid premature abstractions
- Build features when needed, not "just in case"

## 🚀 Development Workflow

### File Creation Protocol
1. **Read existing similar files** to understand patterns
2. **Follow established naming conventions**
3. **Import from constants** instead of hardcoding
4. **Add TypeScript types** for all props and returns
5. **Document complex logic** in DevKT updates

### Environment Setup Commands
```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Seed database with sample data
npm run db:seed

# Run development server
npm run dev
```

## 🔒 Security Considerations

### Admin Panel Security (`next.config.js:7-9`)
```javascript
env: {
  ADMIN_ENABLED: process.env.NODE_ENV === 'development' ? 'true' : 'false',
}
```
**Decision**: Admin features only available in development environment.

### Environment Variable Safety
- Database credentials in `.env` (git-ignored)
- Public API keys prefixed with `NEXT_PUBLIC_`
- Sensitive operations server-side only

## 📝 Maintenance Guidelines

### Adding New Features
1. Update relevant constants in `src/lib/constants.ts`
2. Add TypeScript interfaces in `src/types/index.ts`
3. Follow established component patterns
4. Update this DevKT document with decisions made
5. Log progress in `developmentlog.md`

### Code Review Checklist
- [ ] No magic strings or hardcoded values
- [ ] TypeScript types defined and used
- [ ] Follows established naming conventions
- [ ] Components have single responsibility
- [ ] Utility functions are pure and tested
- [ ] Security considerations addressed

---

## 🎨 Enhanced Glassmorphism System - 2025-08-24

### Interactive Glass Effects Architecture

#### Custom Hook Pattern (`src/hooks/useMouseGlow.ts`)
```typescript
export const useMouseGlow = () => {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const xPercent = (x / rect.width) * 100
      const yPercent = (y / rect.height) * 100
      
      ref.current.style.setProperty('--mouse-x', `${xPercent}%`)
      ref.current.style.setProperty('--mouse-y', `${yPercent}%`)
    }
    // Event cleanup and initialization...
  }, [])
  
  return ref
}
```

**Key Decisions**:
- **Percentage-based coordinates**: Enables responsive glow positioning across different element sizes
- **CSS Custom Properties**: Dynamic values passed to CSS for real-time gradient positioning
- **Event cleanup**: Proper memory management with listener removal
- **Center fallback**: Resets to 50% position when mouse leaves element

#### GlassCard Component System (`src/components/ui/GlassCard.tsx`)
```typescript
interface GlassCardProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', style, onClick }, forwardedRef) => {
    const glowRef = useMouseGlow()
    const ref = forwardedRef || glowRef

    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`glass-card ${className}`}
        style={style}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
)
```

**Architecture Benefits**:
- **Composition over Inheritance**: Wraps existing components without breaking changes
- **Forward Refs**: Enables ref passing for external control while maintaining internal functionality
- **TypeScript Safety**: Proper typing for all props and ref handling
- **Flexible Styling**: Accepts additional classes and inline styles for customization

### Advanced CSS Glassmorphism (`src/app/globals.css`)

#### Layered Glass Effect System
```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
    rgba(0, 255, 65, 0.1), transparent 40%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.glass-card:hover::before {
  opacity: 1;
}

.glass-card > * {
  position: relative;
  z-index: 2;
}
```

**Technical Decisions**:
- **Ultra-low opacity backgrounds** (0.03): Creates subtle glass effect without overwhelming content
- **Pseudo-element overlays**: Neon glow effect without additional DOM manipulation
- **Z-index management**: Ensures content remains above glass effects
- **Hardware acceleration**: Uses opacity and transform for smooth 60fps animations
- **Fallback values**: CSS custom properties with default center positioning

### Performance Optimization Strategy

#### Event Management
- **Throttled mouse tracking**: Minimal performance impact on mousemove events
- **Boundary checking**: Only updates when mouse is within element bounds
- **Memory cleanup**: Proper event listener removal prevents memory leaks
- **Conditional rendering**: Effects only active on hover to reduce constant calculations

#### CSS Performance
- **Compositor layers**: Uses backdrop-filter to leverage GPU acceleration
- **Transform optimizations**: Percentage-based calculations avoid layout thrashing
- **Transition timing**: 0.3s transitions balance smoothness with responsiveness
- **Browser compatibility**: Webkit prefixes ensure cross-browser support

### Integration Pattern

#### Component Replacement Strategy
```typescript
// Before: Direct glass-card class usage
<div className="glass-card rounded-2xl p-8">
  Content
</div>

// After: Enhanced GlassCard component
<GlassCard className="rounded-2xl p-8">
  Content
</GlassCard>
```

**Migration Benefits**:
- **Non-breaking changes**: Existing styling preserved
- **Enhanced interactivity**: Automatic mouse-tracking glow effects
- **Consistent behavior**: Unified glass effect system across all components
- **Maintainable code**: Centralized glass effect logic

## 📋 Decision Log

| Date | Decision | Rationale | Impact |
|------|----------|-----------|---------|
| 2025-08-23 | SQLite over PostgreSQL | Simplicity for portfolio site | Easier deployment, fewer dependencies |
| 2025-08-23 | JSON storage for arrays | Reduced complexity | Trade-off: less queryable but simpler |
| 2025-08-23 | Admin panel dev-only | Security and scope | Cleaner production bundle |
| 2025-08-23 | Constants centralization | Maintainability | Easier theming and configuration |
| 2025-08-24 | Mouse-tracking glassmorphism | Enhanced user interaction | Revolutionary glass effects with minimal performance impact |
| 2025-08-24 | CSS custom properties for dynamics | Runtime positioning control | Smooth, responsive glow effects across all element sizes |
| 2025-08-24 | GlassCard component system | Reusable interactive glass | Consistent glass effects with automatic mouse tracking |
| 2025-08-24 | Pseudo-element overlay technique | Non-DOM glow implementation | Better performance than additional HTML elements |
| 2025-08-24 | Refined mouse exit tracking | Natural cursor-following glow exit | Prevents jarring center-snap animation on mouse leave |
| 2025-08-24 | Comprehensive geometric pattern system | Visual hierarchy and depth | 5 distinct patterns across sections without overwhelming content |
| 2025-08-24 | CSS-only pattern implementation | Performance and maintainability | Zero JavaScript overhead for background patterns |
| 2025-08-24 | Reduced glass blur on hover | Enhanced pattern visibility | Better integration between patterns and glass effects |
| 2025-08-24 | ClientOnly component pattern | Hydration-safe rendering | Prevents server/client mismatch errors |
| 2025-08-24 | HydrationProvider error filtering | Browser extension compatibility | Clean console output in development |
| 2025-08-24 | Enhanced pattern opacity values | Visual pattern visibility | Patterns now clearly visible without overwhelming content |

## 🐛 Hydration Error Prevention System - 2025-08-24

### Client/Server Rendering Consistency

#### Problem Analysis
Next.js hydration errors occur when server-rendered HTML doesn't match client-rendered content. Common causes:
- **Dynamic Date Values**: `new Date().getFullYear()` differs between server/client execution
- **Browser Extensions**: Third-party DOM modifications (Grammarly, etc.) add attributes
- **Client-only APIs**: `window`, `document`, `localStorage` usage during SSR
- **Random Values**: `Math.random()` or similar non-deterministic functions

#### ClientOnly Component Pattern
```typescript
'use client'

interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
```

**Usage Pattern:**
```tsx
// Hydration-safe date rendering
<ClientOnly fallback={<span>© 2024 Portfolio</span>}>
  <span>© {new Date().getFullYear()} Portfolio</span>
</ClientOnly>

// Client-only features
<ClientOnly fallback={<div>Loading...</div>}>
  <WeatherWidget />
</ClientOnly>
```

**Benefits:**
- **Zero Hydration Errors**: Server renders fallback, client renders dynamic content
- **Progressive Enhancement**: Works without JavaScript, enhances with it
- **Layout Stability**: Consistent DOM structure prevents layout shifts
- **SEO Friendly**: Server-rendered content indexed by search engines

#### HydrationProvider Error Filtering
```typescript
'use client'

export default function HydrationProvider({ children }: HydrationProviderProps) {
  useEffect(() => {
    const originalError = console.error
    
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' && 
        (args[0].includes('Hydration') || 
         args[0].includes('data-new-gr-c-s-check-loaded') ||
         args[0].includes('data-gr-ext-installed'))
      ) {
        return // Suppress browser extension hydration warnings
      }
      originalError.apply(console, args)
    }

    return () => {
      console.error = originalError // Cleanup
    }
  }, [])

  return <>{children}</>
}
```

**Error Filtering Strategy:**
- **Browser Extension Attributes**: Filters Grammarly's DOM modifications
- **Hydration Warnings**: Suppresses false positives from third-party scripts
- **Development Experience**: Maintains useful errors while removing noise
- **Production Safety**: Only filters known safe errors, preserves real issues

### Advanced Pattern Visibility System

#### Opacity Calculation Strategy
The pattern system uses layered opacity to achieve subtle but visible effects:

```css
/* Formula: Final Opacity = Color Opacity × Overall Opacity */

/* Example: Grid Pattern */
.pattern-grid::before {
  background: linear-gradient(90deg, transparent 49%, 
    rgba(0, 255, 65, 0.12) 49%, /* Color opacity: 0.12 */
    rgba(0, 255, 65, 0.12) 51%, transparent 51%);
  opacity: 0.8; /* Overall opacity: 0.8 */
  /* Final effect: 0.12 × 0.8 = 0.096 (9.6% visibility) */
}
```

#### Pattern Opacity Matrix
| Pattern Type | Element | Color Alpha | Layer Opacity | Final Alpha | Visual Effect |
|-------------|---------|-------------|---------------|-------------|---------------|
| Global Base | Lines | 0.08 | 0.6 | 0.048 | Subtle foundation |
| Global Base | Dots | 0.05 | 0.6 | 0.030 | Minimal texture |
| Grid Lines | Lines | 0.12 | 0.8 | 0.096 | Clear structure |
| Dot Matrix | Large dots | 0.10 | 0.9 | 0.090 | Defined points |
| Dot Matrix | Small dots | 0.06 | 0.9 | 0.054 | Texture fill |
| Diagonal | Crossed lines | 0.08 | 0.7 | 0.056 | Dynamic flow |
| Hexagonal | Node rings | 0.08 | 0.6 | 0.048 | Tech aesthetic |

**Design Philosophy:**
- **Subtle Presence**: Patterns enhance without overwhelming content
- **Hierarchical Visibility**: Different patterns have distinct visual weights
- **Content First**: Text readability always maintained
- **Glass Integration**: Patterns show through glass effects beautifully

#### Performance Optimization Techniques

**CSS-Only Implementation:**
```css
/* All patterns use pure CSS gradients */
background: 
  linear-gradient(...),
  radial-gradient(...);
background-size: 60px 60px;

/* Benefits: */
/* - Zero JavaScript execution */
/* - Hardware accelerated rendering */
/* - Automatic responsive scaling */
/* - No memory overhead */
```

**Z-Index Management:**
```css
/* Layering hierarchy for performance */
body::before { z-index: -1; }     /* Global foundation */
.pattern-*::before { z-index: 0; } /* Section patterns */
.content { z-index: 10; }         /* Always above patterns */
.glass-effects { z-index: 1-2; }  /* Within glass boundaries */
```

**Browser Optimization:**
- **Compositor Layers**: Backdrop-filter creates isolated layers
- **Paint Optimization**: Patterns don't trigger repaints on content changes
- **Memory Efficiency**: Single pseudo-element per pattern, no DOM nodes
- **Scroll Performance**: Fixed positioning prevents pattern recalculation

## 🎨 Advanced Pattern System Architecture - 2025-08-24

### Geometric Pattern Strategy

#### Pattern Classification System
The portfolio implements a sophisticated pattern system with distinct visual personalities for different content types:

```css
/* Base pattern structure */
.pattern-[type]::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: [gradient combinations];
  background-size: [pattern-specific dimensions];
  pointer-events: none;
  z-index: 0;
  opacity: [content-appropriate level];
}
```

#### Pattern Types and Applications

**1. Grid Pattern (`pattern-grid`)**
- **Usage**: Hero and Blog sections
- **Psychology**: Conveys structure, organization, professionalism
- **Technical**: 60px grid with orthogonal lines
- **Opacity**: 0.5 for moderate presence

**2. Dot Matrix (`pattern-dots`)**  
- **Usage**: Projects section
- **Psychology**: Suggests data points, portfolio grid, organized content
- **Technical**: Multi-layer dots at 80px/40px intervals
- **Opacity**: 0.6 for subtle texture

**3. Diagonal Lines (`pattern-diagonal`)**
- **Usage**: About and Contact sections  
- **Psychology**: Dynamic movement, progress, forward direction
- **Technical**: 45°/-45° crossed lines at 50px spacing
- **Opacity**: 0.4 for background presence

**4. Hexagonal Nodes (`pattern-hex`)**
- **Usage**: Skills section
- **Psychology**: Technology networks, connectivity, modern tech
- **Technical**: Circular elements in hexagonal arrangement
- **Opacity**: 0.3 for minimal distraction from skill content

**5. Global Base Pattern (`body::before`)**
- **Usage**: Site-wide foundation
- **Psychology**: Consistent technical aesthetic
- **Technical**: Fine 40px grid with intersection dots
- **Opacity**: 0.3 overall for subtle presence

### Enhanced Mouse Tracking Architecture

#### Improved Exit Animation System
```typescript
const handleMouseLeave = (e: MouseEvent) => {
  if (!ref.current) return
  
  const rect = ref.current.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  // Boundary clamping prevents negative coordinates
  const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100))
  const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100))
  
  // Dynamic exit positioning
  ref.current.style.setProperty('--mouse-x', `${xPercent}%`)
  ref.current.style.setProperty('--mouse-y', `${yPercent}%`)
}
```

**Key Improvements**:
- **Natural Exit Flow**: Light follows actual mouse exit trajectory
- **Boundary Management**: Clamping prevents overflow positioning issues
- **Smooth Transitions**: 0.2s opacity, 0.1s background position changes
- **Reduced Spread**: 200px radius (down from 400px) for focused glow

#### Gradient Enhancement Strategy
```css
background: radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
  rgba(0, 255, 65, 0.15),           /* Center: high intensity */
  rgba(0, 255, 65, 0.05) 30%,      /* Mid: subtle glow */
  transparent 60%                    /* Edge: clean cutoff */
);
```

**Benefits**:
- **Multi-stop Gradient**: Smoother light falloff 
- **Focused Effect**: Smaller radius prevents overwhelming content
- **Enhanced Center**: Higher center opacity (0.15) for better visibility
- **Clean Edges**: 60% transparency cutoff for sharp boundaries

### Glass-Pattern Integration System

#### Enhanced Visibility Mechanism
```css
.glass-card {
  background: rgba(255, 255, 255, 0.04);  /* Increased from 0.03 */
  border: 1px solid rgba(255, 255, 255, 0.12);  /* Increased from 0.08 */
}

.glass-card:hover {
  backdrop-filter: blur(12px);  /* Reduced from 16px */
}
```

**Integration Benefits**:
- **Pattern Show-through**: Slightly higher background opacity reveals patterns
- **Clear Boundaries**: Enhanced border visibility defines glass edges
- **Interactive Revelation**: Reduced hover blur shows more pattern detail
- **Layered Depth**: Patterns visible both behind and through glass elements

### Performance Architecture

#### CSS-Only Pattern System
**Decision Rationale**: All patterns implemented purely in CSS without JavaScript

**Benefits**:
- **Zero Runtime Cost**: No JavaScript execution for pattern rendering
- **Hardware Acceleration**: Browser-optimized CSS gradient rendering
- **Memory Efficiency**: No DOM elements or event listeners for patterns
- **Scalability**: Patterns scale with container dimensions automatically

#### Z-Index Management Strategy
```
Global Background (body::before): z-index: -1
Section Patterns: z-index: 0  
Content Containers: z-index: 10
Glass Effect Overlays: z-index: 1
Glass Card Content: z-index: 2
```

**Layer Management**:
- **Background Foundation**: Global pattern behind all content
- **Section Patterns**: Positioned behind content but above global
- **Content Protection**: All content automatically above patterns
- **Glass Effects**: Properly layered within glass card boundaries

---

## 🔧 Recent UX & Performance Enhancements - 2025-08-24

### Typography & Font Management

#### Poppins Integration
```typescript
// src/app/layout.tsx
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})
```

**Implementation Strategy**:
- **Multiple Weights**: 300-700 range for comprehensive typography hierarchy
- **Maintained Custom Font**: Glitch Inside preserved for hero branding
- **Performance**: Google Fonts optimization with font-display: swap
- **Fallback Stack**: System fonts for progressive enhancement

#### Glitch Animation System
```css
@keyframes glitch {
  0% { transform: translate(0); opacity: 1; }
  5% { transform: translate(-5px, 3px); opacity: 0.5; }
  /* ... enhanced movement patterns ... */
  100% { transform: translate(0); opacity: 1; }
}

@keyframes glitch-color {
  0% { text-shadow: -2px 0 #00ff41, 2px 0 #ff0040; }
  /* ... three-color system with varying offsets ... */
  100% { text-shadow: none; }
}

.glitch-animation {
  animation: glitch 1.2s ease-in-out, glitch-color 1.2s ease-in-out;
  animation-delay: 0.8s;
  animation-iteration-count: 2;
}
```

**Technical Decisions**:
- **Enhanced Movement**: 3-7px translation range with dramatic opacity changes (0.2-0.9)
- **Three-Color System**: Neon green, red, blue for cyberpunk aesthetic
- **Coordination**: 0.8s delay aligns with Framer Motion scale animation
- **Duration Optimization**: 1.2s × 2 iterations for prominent visual impact

### User Experience Enhancements

#### Text Selection Prevention
```css
.no-select {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.clickable-text {
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
```

**Implementation Pattern**:
- **Cross-Browser Support**: All vendor prefixes for maximum compatibility
- **Component Integration**: Applied to all glassmorphism classes automatically
- **Utility Classes**: Flexible application for specific elements
- **Cursor Consistency**: Pointer cursor for all interactive elements

#### Modal Performance Optimization
```typescript
// Optimized animation configuration
initial={{ opacity: 0, scale: 0.98 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.98 }}
transition={{ duration: 0.15, ease: "easeOut" }}
```

**Performance Strategy**:
- **Reduced Transition Time**: 0.2s → 0.15s for snappier interactions
- **Simplified Animations**: Removed Y-axis movement, minimal scale change
- **Static Glass Effects**: Replaced interactive GlassCard with CSS-only classes
- **Backdrop Optimization**: 0.1s backdrop fade for instant modal appearance

### Architecture & Section Management

#### Section Flow Optimization
```typescript
// Updated navigation order in constants.ts
export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Skills', href: '#skills' },     // Moved to final position
  { label: 'Contact', href: '#contact' },
] as const
```

**Narrative Structure**:
- **Logical Progression**: Personal → Professional → Content → Technical → Contact
- **Skills as Finale**: Technology showcase before contact section
- **Experience Timeline**: Added to About section for comprehensive professional history
- **Navigation Synchronization**: Constants updated to match actual page order

#### Experience Timeline Implementation
```typescript
// Timeline component structure
<div className="relative max-w-4xl mx-auto">
  <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 
                  bg-gradient-to-b from-transparent via-[var(--accent-neon)] to-transparent opacity-30"></div>
  
  {/* Alternating timeline items */}
  <div className="w-5/12 pr-8 text-right">      {/* Left side */}
  <div className="w-5/12 pl-8">                 {/* Right side */}
    
  {/* Interactive timeline nodes */}
  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full 
                  border-2 border-[var(--accent-neon)] bg-[var(--background-primary)] z-10">
    <div className="absolute inset-1 rounded-full bg-[var(--accent-neon)] opacity-75"></div>
  </div>
</div>
```

**Design Patterns**:
- **Gradient Timeline**: Visual connection with theme colors
- **Alternating Layout**: Left/right cards for visual balance
- **Interactive Nodes**: Glowing timeline markers with depth
- **Glassmorphism Cards**: Consistent with overall design system

### Skills Marquee Animation System

#### Continuous Scroll Architecture
```typescript
const SkillMarquee = ({ skills, direction = 'left' }) => {
  return (
    <motion.div
      className="flex space-x-8 whitespace-nowrap"
      animate={{
        x: direction === 'left' ? [0, -2000] : [-2000, 0],
      }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 40,
          ease: "linear",
        },
      }}
    >
      {[...skills, ...skills, ...skills].map((skill, index) => (
        <motion.div className="flex items-center space-x-3 px-6 py-4 rounded-2xl 
                               backdrop-blur-sm border border-white/10 bg-white/5 
                               hover:bg-white/10 transition-all duration-300 
                               hover:scale-105 hover:border-[var(--accent-neon)]/30 
                               no-select cursor-pointer">
```

**Performance Considerations**:
- **Triple Array Rendering**: Ensures seamless infinite loop
- **Linear Easing**: Constant speed for smooth marquee effect
- **GPU Acceleration**: Transform-based animation for 60fps performance
- **Hover Optimization**: Scale and glow effects without layout impact

### CSS Utility System

#### Enhanced Glass Classes
```css
.glass-card {
  /* Existing glassmorphism properties */
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
```

**Utility Strategy**:
- **Automatic Integration**: All glass classes include UX enhancements
- **Consistent Behavior**: Pointer cursor and text selection prevention
- **Cross-Browser Compatibility**: Full vendor prefix coverage
- **Performance Optimization**: Static CSS over JavaScript event handling

*This document should be updated whenever significant architectural decisions are made or patterns are established.*
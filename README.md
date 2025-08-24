# Personal Portfolio

A modern, dark-themed personal portfolio website built with Next.js 15, featuring smooth animations, project showcases, and an admin panel for content management.

## 🚀 Features

- **Dark Theme**: Sleek dark design with neon green accents
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion powered interactions
- **Project Showcase**: Dynamic project cards with detailed modals
- **Skills Display**: Categorized skills with proficiency indicators
- **Blog Integration**: External blog post integration
- **Contact Form**: Email integration with form validation
- **Admin Panel**: Development-only content management (CRUD operations)
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Email**: EmailJS
- **Icons**: Lucide React

## 🎨 Design System

### Color Palette
- Primary Background: `#0a0a0a`
- Secondary Background: `#1a1a1a`
- Accent Color: `#00ff41` (Neon Green)
- Text Primary: `#ffffff`
- Text Secondary: `#b3b3b3`
- Borders: `#333333`

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── admin/          # Admin panel (dev only)
│   ├── api/            # API routes
│   └── page.tsx        # Main portfolio page
├── components/         # React components
│   ├── ui/            # Base UI components
│   ├── sections/      # Page sections
│   ├── modals/        # Modal components
│   └── admin/         # Admin components
├── lib/               # Utilities and config
└── types/             # TypeScript definitions
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   EMAILJS_SERVICE_ID="your_service_id"
   EMAILJS_TEMPLATE_ID="your_template_id" 
   EMAILJS_PUBLIC_KEY="your_public_key"
   ADMIN_ENABLED="true"
   ```

4. **Setup database**
   ```bash
   npm run db:push
   npm run db:generate
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data

## 🗄️ Database Schema

### Projects
- Portfolio projects with descriptions, tech stacks, and links
- Featured flag for highlighting important projects

### Skills  
- Categorized skills (Frontend, Backend, Tools)
- Proficiency levels (1-10 scale)
- Icon support for visual representation

### Blogs
- External blog post links and metadata
- Tags and categorization support
- Featured posts highlighting

## 🔧 Configuration

All configuration is centralized in `src/lib/constants.ts`:

- **Theme Settings**: Colors, animations, breakpoints
- **Content Settings**: Items per page, categories
- **API Endpoints**: Service URLs and paths
- **Feature Flags**: Admin panel, sections

## 👨‍💼 Admin Panel

Access the admin panel at `/admin` (development only):

- **Projects Management**: Add, edit, delete projects
- **Skills Management**: Manage skill categories and levels
- **Blog Management**: Manage external blog links
- **Environment Protected**: Only available when `ADMIN_ENABLED=true`

## 🎯 Development Principles

This project follows:
- **SOLID** principles for maintainable code
- **KISS** - Keep It Simple, Stupid
- **DRY** - Don't Repeat Yourself  
- **YAGNI** - You Aren't Gonna Need It

All magic strings are moved to constants, and the configuration is highly modular.

## 📋 Documentation

- **Development Log**: [`developmentlog.md`](./developmentlog.md) - Track development progress
- **Developer KT**: [`DevKTdoc.md`](./DevKTdoc.md) - Technical decisions and patterns
- **Project Plan**: [`plan.md`](./plan.md) - Complete development roadmap

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Configure environment variables in Netlify dashboard
5. Deploy!

### Vercel
1. Import project to Vercel
2. Configure environment variables
3. Deploy automatically on git push

## 🤝 Contributing

1. Follow the established code patterns
2. Update documentation for significant changes
3. Follow TypeScript best practices
4. Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ and lots of ☕**
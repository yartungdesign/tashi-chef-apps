# Tashi Phuri - Sushi Chef Portfolio

A luxurious, high-end single-page portfolio website for Tashi Phuri, Master Sushi Chef based in Paris, France. Featuring an elegant Japanese aesthetic with premium animations and a complete reservation system.

## 🎨 Features

- **Modern React 18 + TypeScript** with Vite
- **Tailwind CSS 3.4+** with custom luxury theme
- **Framer Motion 11+** for cinematic animations
- **Responsive Design** (mobile → ultra-wide desktop)
- **Dark Mode** support (automatic + manual toggle)
- **Custom Cursor** with elegant hover effects
- **Express Backend** with Nodemailer for contact form
- **SEO Optimized** with semantic HTML and OpenGraph tags

## 📋 Sections

1. **Hero** - Full-screen intro with animated background and loading sequence
2. **About** - Chef's story with timeline and two-column layout
3. **Omakase Experience** - Interactive course showcase with hover reveals
4. **Gallery** - Masonry-style gallery with lightbox modal
5. **Media & Recognition** - Awards and press mentions
6. **Contact/Reservations** - Exclusive reservation form with email integration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Email service account (Gmail, SMTP, or Resend) for contact form

### Installation

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Create a `.env` file in the `server` directory (use `server/.env.example` as a template):

```bash
cd server
cp .env.example .env
```

Edit `.env` with your email configuration. Choose one option:

**Option 1: Gmail (Development)**

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
CONTACT_EMAIL=contact@yourdomain.com
```

**Option 2: SMTP (Production)**

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
EMAIL_FROM=noreply@yourdomain.com
CONTACT_EMAIL=contact@yourdomain.com
```

**Option 3: Resend (Recommended)**

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=noreply@yourdomain.com
CONTACT_EMAIL=contact@yourdomain.com
```

3. **Start development servers:**

```bash
# Run both frontend and backend concurrently
npm run dev:full

# Or run separately:
# Terminal 1: Frontend (port 3000)
npm run dev

# Terminal 2: Backend (port 5000)
npm run server
```

4. **Build for production:**

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 Design System

### Colors

- **Background**: `#0f0c07 (Deep black)`
- **Accent Red**: `#a1122a (Blood red)`
- **Gold**: `#d4a017 (Luxury gold)`
- **Text Primary**: `#f5f0e8 (Warm cream)`
- **Text Secondary**: `#c7b8a5 (Muted beige)`
- **Wasabi**: `#7ba63a (Wasabi green)`

### Fonts

- **Headings**: Playfair Display + Noto Serif JP
- **Body**: Inter
- **Japanese**: Noto Serif JP

## 📁 Project Structure

```
tashi-chef-portfolio/
├── src/
│   ├── components/       # Reusable components
│   │   ├── CustomCursor.tsx
│   │   ├── DarkModeToggle.tsx
│   │   └── Navigation.tsx
│   ├── sections/         # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── OmakaseExperience.tsx
│   │   ├── Gallery.tsx
│   │   ├── MediaRecognition.tsx
│   │   └── Contact.tsx
│   ├── styles/
│   │   └── index.css
│   ├── App.tsx
│   └── main.tsx
├── server/
│   ├── routes/
│   │   └── contact.js
│   ├── index.js
│   └── .env.example
├── public/
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

## 🔧 Configuration

### Email Setup

The contact form requires email configuration. The server supports:

1. **Gmail** - Use an [App Password](https://support.google.com/accounts/answer/185833)
2. **SMTP** - Any SMTP server
3. **Resend** - Recommended for production ([Get API Key](https://resend.com))

### Customization

- **Colors**: Edit `tailwind.config.ts`
- **Content**: Update section components in `src/sections/`
- **Animations**: Modify Framer Motion props in components
- **Images**: Replace placeholder emojis with actual images in the Gallery and Hero sections

## 📱 Performance

- **Lighthouse Target**: 95+ on desktop & mobile
- **Image Optimization**: Use next-gen formats (WebP, AVIF)
- **Lazy Loading**: Implemented for gallery images
- **Code Splitting**: Vite handles automatic code splitting

## 🌐 Deployment

### Frontend (Vercel/Netlify)

1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure proxy for `/api` routes to your backend

### Backend (Railway/Render/Heroku)

1. Set environment variables
2. Deploy the `server` directory
3. Update frontend API proxy URL

### Full Stack (Single Server)

1. Serve `dist` folder as static files from Express
2. Configure routes appropriately

## 📝 License

This project is created for portfolio purposes. Customize as needed for your use case.

## 🙏 Acknowledgments

- Design inspired by high-end Japanese ryotei and omakase experiences
- Typography: Google Fonts (Playfair Display, Inter, Noto Serif JP)
- Animations: Framer Motion
- Icons: Emoji (replace with custom icons/images as needed)

---

**一期一会** — One encounter, one opportunity

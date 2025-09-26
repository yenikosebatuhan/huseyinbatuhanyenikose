# Hüseyin Batuhan YENİKÖSE - Portfolio

A sleek, professional bilingual portfolio website showcasing my work in software testing, UAV systems, AI projects, and web development.

## 🚀 Features

- **Bilingual Support**: English and Turkish language switching
- **Modern Design**: Clean, responsive design with dark/light theme support
- **Project Showcase**: Detailed project pages with MDX content
- **Interactive Timeline**: Professional experience and education timeline
- **Contact Integration**: Direct contact forms and social media links
- **GitHub Pages Ready**: Optimized for static hosting

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Content**: MDX for project pages
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
├── content/
│   └── projects/          # MDX project files
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── data/            # Timeline and project data
│   ├── dictionaries/    # i18n translation files
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript type definitions
├── public/
│   ├── images/          # Project images
│   └── resume.pdf       # Resume file
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/huseyinbatuhanyenikose/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. **Fork this repository** to your GitHub account

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

3. **Create GitHub Actions workflow**:
   - Create `.github/workflows/deploy.yml`
   - Add the following configuration:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/setup-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './out'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

4. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

5. **Your site will be live** at `https://yourusername.github.io/portfolio/`

### Manual Deployment

1. Build the static site:
```bash
npm run build
```

2. Deploy the `out` folder to GitHub Pages using your preferred method.

## 🎨 Customization

### Adding Your Content

1. **Personal Information**: Update data in `src/data/timeline.ts`
2. **Projects**: Add new MDX files in `content/projects/`
3. **Images**: Replace placeholder images in `public/images/`
4. **Resume**: Replace `public/resume.pdf` with your actual resume

### Styling

- Modify `src/app/globals.css` for global styles
- Update component styles using Tailwind classes
- Customize theme in component files

### Adding New Languages

1. Create new dictionary file in `src/dictionaries/`
2. Update `src/lib/i18n.ts` with new locale
3. Add language switch option in `LanguageSwitch` component

## 📱 Adding Your Images

Replace the placeholder images with your actual project images:

```
public/images/
├── kuav-combat-uav.jpg
├── qa-tegsoft.jpg
├── aurora-ai.jpg
├── mobile-game.jpg
├── edom.jpg
├── konus-kazan.jpg
└── tubitak-oxygen.jpg
```

**Recommended specifications:**
- Format: JPG or PNG
- Dimensions: 800x600px minimum
- File size: < 500KB for optimal loading

## 📄 Resume Setup

1. Create your resume as a PDF file
2. Name it `resume.pdf`
3. Place it in the `public/` directory
4. Update the resume page if needed

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Static Export (for GitHub Pages)
npm run build        # Creates optimized build in /out
```

## 🌟 Features Showcase

### Home Page
- Hero section with professional introduction
- Key achievement statistics
- Featured projects showcase
- Recent experience preview
- Call-to-action sections

### About Page
- Detailed biography
- Professional experience timeline
- Education background
- Technical skills overview
- Achievement highlights

### Projects Page
- Grid layout with filtering
- Search functionality
- Domain-based categorization
- Individual project pages

### Contact Page
- Contact form
- Social media links
- Professional information
- Availability status

## 📊 Performance Optimization

- **Static Generation**: All pages pre-rendered for optimal performance
- **Image Optimization**: Automatic image optimization with Next.js
- **Code Splitting**: Automatic code splitting for faster loading
- **CDN Ready**: Optimized for global content delivery

## 🔒 Security

- **Content Security Policy**: Implemented for XSS protection
- **Input Validation**: Server and client-side validation
- **Dependency Security**: Regular security updates
- **HTTPS Ready**: Secure by default

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for improvements.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Hüseyin Batuhan YENİKÖSE**
- Email: contact@example.com
- LinkedIn: [linkedin.com/in/huseyinbatuhanyenikose](https://linkedin.com/in/huseyinbatuhanyenikose)
- GitHub: [github.com/huseyinbatuhanyenikose](https://github.com/huseyinbatuhanyenikose)

---

*Built with ❤️ using Next.js, TypeScript, and Tailwind CSS*
# Paprly - Free Invoice Generator & Document Management Platform

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📁 Project Structure

```
paperly-frontend/
├── 📁 fonts/                          # Custom font files
│   ├── 📁 League_Spartan/             # League Spartan font family
│   ├── 📁 Libertinus_Sans/            # Libertinus Sans font family
│   ├── 📁 Manrope/                    # Manrope font family
│   └── 📁 Roboto/                     # Roboto font family
│
├── 📁 public/                         # Static assets
│   ├── 📄 ads.txt                     # Ad verification file
│   ├── 📄 robots.txt                  # SEO robots file
│   ├── 📄 sitemap.xml                 # SEO sitemap
│   ├── 📄 pdf.worker.min.mjs          # PDF.js worker
│   └── 📁 images/                     # Image assets (logos, icons, etc.)
│
├── 📁 src/
│   ├── 📁 app/                        # Next.js 13+ App Router
│   │   ├── 📁 about/                  # About page
│   │   ├── 📁 blank-editor/           # Blank document editor
│   │   ├── 📁 contact/                # Contact page
│   │   ├── 📁 contract-editor/        # Contract editor
│   │   ├── 📁 contracts/              # Contracts page
│   │   ├── 📁 cookies/                # Cookies policy
│   │   ├── 📁 e-sign/                 # E-signature page
│   │   ├── 📁 e-sign-editor/          # E-signature editor
│   │   ├── 📁 editor/                 # Main editor
│   │   ├── 📁 enterprise-home/        # Enterprise home page
│   │   ├── 📁 enterprise-profile/     # Enterprise profile page
│   │   ├── 📁 enterprise-workspace-smarthire/ # Enterprise workspace
│   │   ├── 📁 feedback/               # Feedback page
│   │   ├── 📁 help/                   # Help page
│   │   ├── 📁 home/                   # Home page
│   │   ├── 📁 privacy-policy/         # Privacy policy
│   │   ├── 📁 sign-in/                # Sign in page
│   │   ├── 📁 signup/                 # Sign up page
│   │   ├── 📁 template/               # Template page
│   │   ├── 📁 testimonials/           # Testimonials page
│   │   ├── 📄 globals.css             # Global styles
│   │   ├── 📄 layout.js               # Root layout
│   │   ├── 📄 metadata-config.js      # SEO metadata configuration
│   │   ├── 📄 not-found.js            # 404 page
│   │   ├── 📄 page.js                 # Root page
│   │   └── 📄 sitemap.js              # Dynamic sitemap generation
│   │
│   ├── 📁 components/                 # React components
│   │   ├── 📁 Auth/                   # Authentication components
│   │   │   └── 📄 ProtectedRoute.js   # Route protection component
│   │   │
│   │   ├── 📁 ContractsEditor/        # Contract editing components
│   │   │   └── 📄 ContractEditor.js   # Main contract editor
│   │   │
│   │   ├── 📁 ContractsPage/          # Contracts page components
│   │   │   └── 📄 Templates.js        # Contract templates
│   │   │
│   │   ├── 📁 Editor/                 # Document editor components
│   │   │   ├── 📁 BlankEditor/        # Blank editor components
│   │   │   │   ├── 📄 BlankEditor.js  # Main blank editor
│   │   │   │   ├── 📄 ElementsSidebar.js # Editor sidebar
│   │   │   │   ├── 📄 InvoiceEditor.js # Invoice editor
│   │   │   │   ├── 📄 InvoicePreview.js # Invoice preview
│   │   │   │   └── 📄 Sidebar.js      # Editor sidebar
│   │   │   ├── 📄 EditorLayout.js     # Editor layout wrapper
│   │   │   └── 📄 inline-editable-invoice.js # Inline editing
│   │   │
│   │   ├── 📁 enterprise-components/  # Enterprise-specific components
│   │   │   ├── 📄 enterprise-dynamic-layout.js # Dynamic layout system
│   │   │   ├── 📄 enterprise-editprofile.js # Profile editing
│   │   │   ├── 📄 enterprise-footer.js # Enterprise footer
│   │   │   ├── 📄 enterprise-navbar.js # Enterprise navbar
│   │   │   ├── 📄 enterprise-workspace.js # Workspace component
│   │   │   └── 📄 sidebar.js          # Enterprise sidebar
│   │   │
│   │   ├── 📁 ESignEditor/            # E-signature editor components
│   │   │   ├── 📄 DrawingSignature.js # Signature drawing
│   │   │   ├── 📄 ESignEditor.js      # Main e-sign editor
│   │   │   ├── 📄 SignatureModal.js   # Signature modal
│   │   │   └── 📄 UploadModal.js      # File upload modal
│   │   │
│   │   ├── 📁 FeedbackPage/           # Feedback components
│   │   │   └── 📄 FeedbackForm.js     # Feedback form
│   │   │
│   │   ├── 📁 LandingPage/            # Landing page components
│   │   │   ├── 📄 ContractFeatures.js # Contract features
│   │   │   ├── 📄 EnterpriseSuite.js  # Enterprise features
│   │   │   ├── 📄 Feature.js          # Feature component
│   │   │   ├── 📄 Footer.js           # Main footer
│   │   │   ├── 📄 Hero.js             # Hero section
│   │   │   ├── 📄 Navbar.js           # Main navbar
│   │   │   ├── 📄 phasetwomoadal.js   # Phase two modal
│   │   │   ├── 📄 Recipt.js           # Receipt component
│   │   │   ├── 📄 Started.js          # Getting started
│   │   │   └── 📄 Steps.js            # Step-by-step guide
│   │   │
│   │   ├── 📁 ReciptPage/             # Receipt page components
│   │   │   └── 📄 Templates.js        # Receipt templates
│   │   │
│   │   ├── 📁 SEO/                    # SEO components
│   │   │   ├── 📄 PageSEO.js          # Page SEO component
│   │   │   └── 📄 StructuredData.js   # Structured data
│   │   │
│   │   ├── 📁 TestimonialsPage/       # Testimonials components
│   │   │   └── 📄 TestimonialsDisplay.js # Testimonials display
│   │   │
│   │   └── 📁 ui/                     # Reusable UI components
│   │       ├── 📄 button.jsx          # Button component
│   │       ├── 📄 card.jsx            # Card component
│   │       ├── 📄 checkbox.jsx        # Checkbox component
│   │       ├── 📄 input.jsx           # Input component
│   │       ├── 📄 label.jsx           # Label component
│   │       ├── 📄 radio-group.jsx     # Radio group component
│   │       └── 📄 select.jsx          # Select component
│   │
│   ├── 📁 hooks/                      # Custom React hooks
│   │   └── 📄 useAuth.js              # Authentication hook
│   │
│   ├── 📁 lib/                        # Utility libraries
│   │   └── 📄 utils.js                # Utility functions
│   │
│   ├── 📁 pages/                      # Legacy pages (if any)
│   │   ├── 📄 _app.js                 # App wrapper
│   │   └── 📄 _document.js            # Document wrapper
│   │
│   └── 📁 utils/                      # Utility functions
│       └── 📄 auth.js                 # Authentication utilities
│
├── 📄 components.json                 # Component configuration
├── 📄 eslint.config.mjs              # ESLint configuration
├── 📄 jsconfig.json                  # JavaScript configuration
├── 📄 next-sitemap.config.js         # Sitemap configuration
├── 📄 next.config.mjs                # Next.js configuration
├── 📄 package.json                   # Dependencies and scripts
├── 📄 postcss.config.mjs             # PostCSS configuration
├── 📄 tailwind.config.js             # Tailwind CSS configuration
└── 📄 README.md                      # This file
```

## 🏗️ Architecture Overview

### **Frontend Framework**
- **Next.js 13+** with App Router for server-side rendering and routing
- **React 18** for component-based UI development
- **Tailwind CSS** for styling and responsive design

### **Key Features**
- **Dynamic Layout System**: Enterprise components with dynamic navigation
- **Document Editors**: Invoice, contract, and blank document editors
- **E-Signature System**: Digital signature capabilities
- **Authentication**: Protected routes and user management
- **SEO Optimized**: Meta tags, sitemaps, and structured data

### **Component Organization**
- **Enterprise Components**: Business-focused features and layouts
- **Editor Components**: Document creation and editing tools
- **Landing Page Components**: Marketing and user acquisition
- **UI Components**: Reusable design system components

## 🛠️ Development

### **Prerequisites**
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### **Installation**
```bash
npm install
```

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📝 License

This project is licensed under the MIT License.

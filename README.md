# Chartology Solutions - Trading Masterclass Landing Page

A modern, high-performance landing page for a trading mentorship program built with **Next.js 16**. The platform is designed to showcase course offerings, trainer expertise, student testimonials, and a comprehensive learning roadmap with smooth scroll animations.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** CSS Modules with modern vanilla CSS
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & Custom Scroll Reveal Hooks
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript

## ✨ Key Features

- **Hero Section:** High-impact introduction with dynamic stats and call-to-actions.
- **Scroll Animations:** Elements fade and slide into view seamlessly as the user scrolls down the page.
- **Trainer Profile:** Detailed breakdown of the mentor's experience, stats, and achievements.
- **Course Roadmap & Curriculum:** Visual timeline of the learning journey.
- **Testimonials & Marquee:** Animated reviews showcasing student success stories.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.

## 🛠️ Getting Started

First, ensure you have Node.js installed. Then, follow these steps to run the application locally:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open the application:**
   Open [http://localhost:3000](http://localhost:3000) (or the port specified in the terminal, such as 3001) in your browser to see the result.

## 📁 Project Structure

- `/app` - Next.js App Router layout, global styles, and main page.
- `/components` - Reusable UI components (Hero, AboutTrainer, Pricing, FAQ, etc.) with corresponding `.module.css` files.
- `/hooks` - Custom React hooks (e.g., `useScrollReveal` for scroll animations).
- `/public` - Static assets, images, and fonts.

## 📜 Available Scripts

- `npm run dev` - Starts the development server using Turbopack.
- `npm run build` - Builds the application for production.
- `npm run start` - Starts the production server.
- `npm run lint` - Runs ESLint to catch formatting or linting errors.

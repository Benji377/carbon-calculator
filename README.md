[![test]](https://github.com/tfobz/carbon-calculator/actions/workflows/build.yml)
[![deploy]](https://github.com/tfobz/carbon-calculator/actions/workflows/deploy.yml)

[test]: https://img.shields.io/github/actions/workflow/status/tfobz/carbon-calculator/build.yml?label=Test&logo=githubactions&style=for-the-badge&labelColor=555555
[deploy]: https://img.shields.io/github/actions/workflow/status/tfobz/carbon-calculator/deploy.yml?label=Deploy&logo=githubactions&style=for-the-badge&labelColor=555555

# ♻️ Carbon Calculator

A modern, responsive web application that helps organizations track and calculate their carbon dioxide (CO₂) emissions. Built with [Preact](https://preactjs.com/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/).

## 📋 About

Carbon Calculator is an open-source Progressive Web App (PWA) designed to make carbon footprint tracking accessible and intuitive. Organizations can:

- **Track multiple organizations** with different countries and emission factors
- **Add modular consumption data** for various categories (food, energy, transport, equipment, etc.)
- **Calculate CO₂ emissions** based on country-specific emission factors
- **Compare emissions** between organizations with visual charts and analytics
- **Export and import data** for backup and sharing
- **Work offline** thanks to PWA technology
- **Use multiple languages** (English, German, Italian, Spanish, Swedish)


## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 20.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/carbon-calculator.git
cd carbon-calculator
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```


## 📦 Project Structure

```
carbon-calculator/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page views (Dashboard, Settings, etc.)
│   ├── data/
│   │   ├── factors/        # Country-specific emission factors (JSON)
│   │   ├── moduleCatalog.ts # Module definitions
│   │   └── factors.ts      # Factor loading
│   ├── locales/            # Translation files (i18n)
│   ├── app.tsx             # Root component
│   ├── store.ts            # State management (Preact Signals)
│   ├── types.ts            # TypeScript type definitions
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🛠️ Tech Stack

- **Framework**: [Preact](https://preactjs.com/) - Fast 3kB React alternative
- **State Management**: [@preact/signals](https://preactjs.com/guide/v10/signals/) - Fine-grained reactivity
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **Build Tool**: [Vite](https://vitejs.dev/) - Lightning fast build tool
- **PWA**: [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) - PWA support
- **Charts**: [Recharts](https://recharts.org/) - React charting library
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

## 🌍 Supported Countries & Languages

### Countries (Emission Factors)
- 🇦🇹 Austria
- 🇮🇹 Italy
- 🇪🇸 Spain
- 🇸🇪 Sweden

### Languages
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇮🇹 Italiano
- 🇪🇸 Español
- 🇸🇪 Svenska

## 📱 PWA Features

The app can be installed on any device as a Progressive Web App:

- **Installable** on desktop, iOS, and Android
- **Offline Support** - Works without internet connection
- **App-like Experience** - Full-screen, native feel
- **Fast Performance** - Pre-cached assets, instant load times

## 📊 Emission Factors

Emission factors are customizable per country and stored in JSON format. Currently supported:

- Pizza/Food consumption
- Coffee and beverages
- Paper usage
- Technology (computers, laptops, servers, printers)
- Mobility/Transportation
- Electricity by source
- Water usage
- Heating
- And more...

## 🤝 Contributing

This project was developed as part of the Erasmus+ program. We welcome contributions!

## 📄 License

[MIT](/LICENSE)

## 🙋 Support

For issues, questions, or suggestions, please open an issue on GitHub.

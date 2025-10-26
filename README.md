# Prognos

> **Transforming Process Safety Management from reactive compliance into predictive risk intelligence**

Prognos is a next-generation compliance technology platform designed for high-hazard industries. By centralizing disparate safety data across facilities, equipment, and processes, Prognos provides a unified view of risk that enables safety professionals to prevent incidents before they occur.

---

## 🎯 Overview

In high-hazard industries like chemical processing, oil & gas, and manufacturing, critical safety data is fragmented across spreadsheets, legacy systems, and physical binders. This creates blind spots that lead to preventable incidents, regulatory violations, and operational downtime.

Prognos solves this by providing:

- **Single Source of Truth**: Consolidate Process Hazard Analyses (PHAs), Management of Change (MOCs), incident reports, and recommendations in one platform
- **Predictive Analytics**: Identify emerging risks through trend analysis and cross-facility benchmarking
- **AI-Powered Compliance**: Automated regulatory review using the Aura AI engine
- **Audit Readiness**: One-click compliance reports with complete audit trails
- **Workflow Automation**: Digital MOC approvals and recommendation tracking with accountability

---

## ✨ Key Features

### 📊 Unified Risk Dashboard
Real-time visibility into facility risk profiles with drill-down capability from corporate overview to specific equipment and recommendations. Identify your top 3 critical risks within 15 seconds of login.

### 🎯 Recommendation Management
Track safety recommendations from creation through closure with full lifecycle management, automated reminders, evidence attachment, and approval workflows. Eliminate the "recommendation graveyard."

### 🔬 PHA Repository
Centralized database of Process Hazard Analysis studies with equipment linkage, scenario documentation, safeguard tracking, and automated recommendation generation.

### 🔄 Management of Change (MOC)
Digital approval workflows that automatically flag affected PHAs, route through configurable approval chains, and ensure changes don't introduce hidden risks.

### 📈 Analytics & Trends
Identify patterns in incidents, completion rates, safeguard failures, and emerging systemic risks. Weekly automated digests keep executives informed.

### 🤖 Aura AI Compliance Engine
Upload operational documents (procedures, MOCs, incident reports) and have AI instantly compare them against OSHA PSM, EPA RMP, or custom standards. Aura identifies violations, cites specific regulatory clauses, and generates step-by-step remediation plans—reducing review time from hours to minutes.

---

## 🏗️ Architecture

### Frontend (This Repository)

Built with modern web technologies for performance and developer experience:

- **React 19** with TypeScript for type-safe component development
- **Vite** for lightning-fast development and optimized production builds
- **Tailwind CSS v4** for utility-first styling with custom theme variables
- **shadcn/ui** component library (v4) for consistent, accessible UI patterns
- **Framer Motion** for purposeful, physics-based animations
- **Recharts** for data visualization and analytics dashboards
- **Spark Runtime SDK** for persistence, LLM integration, and user management

### Backend Integration

> **Note**: This is a **frontend-only** repository. The backend is maintained separately.

The backend provides REST APIs for:

- **Data Persistence**: Facilities, PHAs, MOCs, recommendations, incidents, users, organizations
- **Authentication & Authorization**: Role-based access control (RBAC) with facility-level permissions
- **File Management**: Document upload/download for evidence, procedures, and standards
- **Analytics Engine**: Risk scoring algorithms, trend analysis, and benchmarking
- **Compliance Standards Database**: SQLite-backed repository of OSHA, EPA, and custom standards
- **LLM Integration**: OpenAI API proxy for Aura AI compliance analysis with RAG (Retrieval-Augmented Generation)
- **Audit Trail**: Immutable logs of all actions for compliance evidence

See `BACKEND_INTEGRATION_TODOS.md` and `BACKEND_API_REQUIREMENTS.md` for detailed API specifications.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern browser with JavaScript enabled
- Backend API server running (see backend repository)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd spark-template

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Environment Configuration

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://api.prognos.example.com
VITE_ENVIRONMENT=development
```

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🎨 Design System

### Color Palette

Prognos uses a triadic color scheme optimized for risk visualization and professional authority:

- **Primary**: Deep Navy Blue `oklch(0.25 0.05 250)` - Trust, stability, technical precision
- **Secondary**: Slate Gray `oklch(0.45 0.02 250)` - Muted backgrounds and secondary actions
- **Accent**: Bright Cyan `oklch(0.75 0.15 200)` - Active states and key metric highlights
- **Risk Levels**:
  - Critical: `oklch(0.55 0.22 25)` Red
  - High: `oklch(0.70 0.18 50)` Orange
  - Moderate: `oklch(0.75 0.12 90)` Yellow
  - Low: `oklch(0.65 0.12 150)` Green

### Typography

- **UI Text**: Inter (400, 500, 600, 700) for readability at small sizes
- **Data/Metrics**: JetBrains Mono (400, 500) with tabular numbers for aligned data columns

### Component Library

shadcn/ui components are located in `src/components/ui/`. Custom components follow the same patterns for consistency.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/               # shadcn components (Accordion, Button, Card, Dialog, etc.)
│   ├── badges.tsx        # Risk level and status badges
│   ├── metric-card.tsx   # Dashboard metric display
│   ├── navigation.tsx    # Main app navigation
│   └── views/            # Feature-specific view components
│       ├── dashboard-view.tsx
│       ├── aura-view.tsx
│       ├── recommendations-view.tsx
│       ├── pha-view.tsx
│       ├── moc-view.tsx
│       └── analytics-view.tsx
├── hooks/
│   └── use-mobile.ts     # Responsive breakpoint detection
├── lib/
│   ├── types.ts          # TypeScript interfaces and types
│   ├── api.ts            # Backend API integration (TODO)
│   ├── helpers.ts        # Utility functions
│   └── seed-data.ts      # Sample data for development
├── App.tsx               # Root application component
├── index.css             # Global styles and theme variables
└── main.tsx              # Application entry point (do not modify)
```

---

## 🔌 Backend Integration Status

### ⚠️ Current State: Sample Data Mode

This frontend is currently running with **hardcoded sample data** defined in `src/lib/seed-data.ts`. All data is stored locally in browser storage via the Spark `useKV` hook.

### 🚧 TODO: API Integration

To connect to the production backend:

1. Implement API client functions in `src/lib/api.ts`
2. Replace `useKV` calls with API fetch calls where appropriate
3. Add proper error handling and loading states
4. Implement authentication token management
5. Handle file uploads for Aura document analysis

See `BACKEND_INTEGRATION_TODOS.md` for a complete checklist of integration tasks.

---

## 🤖 Aura AI Compliance Engine

### How It Works

1. **Upload**: User uploads a document (procedure, MOC form, incident report)
2. **Select Standards**: Choose regulatory frameworks (OSHA PSM, EPA RMP) or custom company standards
3. **AI Analysis**: Aura uses RAG (Retrieval-Augmented Generation) to compare the document against selected standards
4. **Findings Report**: AI identifies violations with specific citations to regulatory clauses
5. **Recommendations**: For each finding, AI generates actionable recommendations and step-by-step remediation plans
6. **Human Review**: User reviews, edits, accepts, or dismisses each finding
7. **Task Creation**: Accepted findings automatically create tracked recommendations

### Backend Requirements for Aura

- **Standards Database** (SQLite): Pre-loaded OSHA/EPA regulations + user-uploaded custom standards
- **Document Parser**: Extract text from PDF/DOCX uploads
- **Vector Embeddings**: Vectorize documents and standards for similarity search
- **OpenAI API Integration**: GPT-4 prompts for violation detection and recommendation generation
- **File Storage**: S3 or equivalent for uploaded documents and generated reports

See `BACKEND_API_REQUIREMENTS.md` for detailed API specifications.

---

## 👥 User Personas

### Priya - Process Safety Engineer
**Primary user** who conducts PHAs, tracks recommendations, investigates incidents, and uses Aura for compliance reviews.

**Needs**: Fast data entry, clear visibility into overdue items, AI assistance for tedious compliance reviews, ability to prove criticality to management.

### Mark - Operations Manager
**End-user** who approves MOCs, needs daily risk visibility, and assigns resources to recommendations.

**Needs**: High-level dashboards, quick MOC reviews with PHA impact visibility, confidence that procedures are compliant.

### Diana - VP of EHS & Compliance
**Executive buyer** who reports to the board, manages audits, and justifies safety budgets.

**Needs**: Corporate-wide risk rollups, one-click audit reports, trend analysis to identify systemic issues, assurance of regulatory compliance.

---

## 📊 Success Metrics

| Metric | Target |
|--------|--------|
| Time to identify top 3 facility risks | <15 seconds |
| Recommendation lifecycle visibility | 100% auditable state changes |
| Aura compliance review time reduction | 80% faster than manual |
| Aura finding usefulness rating | >90% "useful" |
| New compliance gaps discovered by AI | 30% more than manual review |
| Critical recommendations actioned | 75% moved to "In Progress" within 60 days |
| Audit preparation time reduction | 50% reduction |

---

## 🔒 Security & Compliance

- **Data Encryption**: All data encrypted in transit (TLS 1.3) and at rest (AES-256)
- **Role-Based Access Control**: Facility-level permissions with view-only auditor roles
- **Audit Trail**: Immutable logs of all actions with timestamps and user attribution
- **SOC 2 Compliance**: Architecture designed for SOC 2 Type II certification
- **Data Residency**: Multi-tenant cloud with geographic data isolation options
- **API Security**: JWT authentication, rate limiting, input validation

See `SECURITY.md` for detailed security practices.

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Code Style

- **TypeScript**: Strict mode enabled with comprehensive type coverage
- **Components**: Functional components with hooks (no class components)
- **State Management**: React state + Spark `useKV` for persistence
- **Styling**: Tailwind utility classes with custom theme variables
- **Comments**: Only add comments when explicitly requested or for complex business logic

### Adding Features

1. Review the PRD (`PRD.md`) for design direction and user stories
2. Check existing shadcn components in `src/components/ui/` before creating custom ones
3. Define TypeScript interfaces in `src/lib/types.ts`
4. Create view components in `src/components/views/`
5. Update navigation in `src/components/navigation.tsx` if adding new views
6. Use `useKV` for any data that should persist between sessions

---

## 📚 Documentation

- **[PRD.md](./PRD.md)**: Complete product requirements with design system specifications
- **[BACKEND_API_REQUIREMENTS.md](./BACKEND_API_REQUIREMENTS.md)**: API contract specifications for backend team
- **[BACKEND_INTEGRATION_TODOS.md](./BACKEND_INTEGRATION_TODOS.md)**: Integration checklist and implementation guide
- **[SECURITY.md](./SECURITY.md)**: Security practices and compliance considerations

---

## 🤝 Contributing

### Reporting Issues

When reporting bugs or requesting features, please include:

- Clear description of the issue or feature
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Screenshots if applicable
- Browser and OS version

### Code Contributions

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

---

## 🙏 Acknowledgments

- **shadcn/ui**: For the exceptional component library
- **Tailwind CSS**: For the utility-first CSS framework
- **Spark Runtime**: For persistence, LLM integration, and deployment infrastructure
- **OpenAI**: For GPT-4 API powering the Aura AI engine
- **Process Safety Community**: For domain expertise and feedback

---

## 📞 Support

For questions, feature requests, or support:

- **Documentation**: Check the `docs/` directory and `PRD.md`
- **Issues**: Open a GitHub issue with details
- **Email**: [Your support email]
- **Slack**: [Your Slack workspace link]

---

**Built with ❤️ for process safety professionals**

*Prognos: From prognosis - foreknowledge that prevents incidents before they occur.*

# Planning Guide

Prognos transforms Process Safety Management from reactive compliance into predictive risk intelligence by centralizing disparate safety data and surfacing actionable insights for high-hazard industrial facilities.

**Experience Qualities**:
1. **Authoritative**: The interface must inspire confidence through precision, clarity, and data integrity - users are making critical safety decisions that protect lives
2. **Efficient**: Streamlined workflows and instant access to critical information - safety engineers and managers are time-constrained and need answers immediately
3. **Intelligent**: The platform should feel proactive rather than passive, surfacing insights and risks before users need to search for them

**Complexity Level**: Complex Application (advanced functionality, accounts)
This is an enterprise SaaS platform with multiple user roles, real-time risk scoring, workflow automation, compliance reporting, and interconnected data relationships across facilities, equipment, hazards, and safeguards.

## Essential Features

### Feature 1: Unified Risk Dashboard
- **Functionality**: Display real-time aggregated risk metrics across facilities with drill-down capability to specific units, hazards, and recommendations
- **Purpose**: Provides executives and safety managers instant visibility into their highest-priority threats, enabling data-driven resource allocation
- **Trigger**: User logs in or navigates to dashboard
- **Progression**: Landing page → Risk score overview cards → Facility comparison table → Click facility → Unit-level detail → Linked recommendations
- **Success criteria**: Users can identify their top 3 facility risks and associated action items within 15 seconds of login

### Feature 2: Recommendation Lifecycle Management
- **Functionality**: Track safety recommendations from identification through closure with assignment, due dates, status updates, and evidence attachment
- **Purpose**: Eliminates the "recommendation graveyard" where critical fixes are documented but never completed
- **Trigger**: User creates recommendation from PHA finding or incident, or reviews assigned items
- **Progression**: Create recommendation → Assign owner + due date → Track status changes → Upload closure evidence → Approve completion → Archive
- **Success criteria**: 100% of recommendation state changes are timestamped and auditable; users can filter by facility/status/owner

### Feature 3: Process Hazard Analysis (PHA) Repository
- **Functionality**: Centralized database of PHA studies with equipment linkage, scenario documentation, and safeguard tracking
- **Purpose**: Creates the "golden record" for each process unit, ensuring all risk information is accessible and current
- **Trigger**: User initiates new PHA or searches existing studies
- **Progression**: Browse PHAs by facility/unit → View study details → Review scenarios + safeguards → Create recommendations → Link to equipment
- **Success criteria**: Users can view all PHAs for a specific equipment tag; new PHAs generate trackable recommendations automatically

### Feature 4: Management of Change (MOC) Workflow
- **Functionality**: Digital approval workflow for facility changes with automated PHA impact review and configurable routing
- **Purpose**: Prevents "silent" changes that invalidate existing safety analyses and introduce hidden risks
- **Trigger**: Engineer initiates change request
- **Progression**: Submit MOC form → System flags affected PHAs → Route to approvers → Review impact → Approve/reject with comments → Close and document
- **Success criteria**: All MOCs require acknowledgment of PHA impacts before approval; approval chain is configurable per facility

### Feature 5: Analytics & Trend Intelligence
- **Functionality**: Identify patterns in incidents, recommendation completion rates, safeguard failures, and emerging risks
- **Purpose**: Shifts from reactive incident response to proactive risk prediction and systemic issue identification
- **Trigger**: Automated weekly digest or on-demand analytics view
- **Progression**: View analytics dashboard → Review trending risks → Compare facilities → Identify systemic patterns → Generate action plan
- **Success criteria**: System can flag equipment classes with above-average incident rates; executives receive weekly risk trend email

### Feature 6: Aura AI Compliance Engine
- **Functionality**: AI-powered document analysis that compares operational evidence (procedures, MOCs, incident reports) against regulatory and custom compliance standards, automatically identifying violations and generating remediation plans
- **Purpose**: Eliminates the time-consuming manual review process, increases finding consistency, and surfaces compliance gaps that human reviewers might miss
- **Trigger**: User uploads document and selects standards to check against
- **Progression**: Upload document → Select standards (OSHA PSM, EPA RMP, custom) → AI analyzes → Review findings with violation details → Expand to see AI recommendations and action plans → Edit if needed → Accept to create task or dismiss → Export report
- **Success criteria**: Users can complete a full compliance review in <5 minutes vs. hours manually; AI identifies 30%+ more gaps than manual review; >90% of accepted findings result in actionable recommendations

## Edge Case Handling

- **Empty States**: New facilities with no data display onboarding guides and sample data import templates rather than blank screens
- **Overdue Items**: Recommendations past due date are escalated with visual warnings and automated notifications to assignees and managers
- **Concurrent Edits**: If two users edit the same recommendation, last-save-wins with notification to the overwritten user
- **Role Permissions**: View-only auditor roles prevent data modification but allow full report generation and export
- **Offline Capability**: While primarily web-based, critical dashboards cache recent data for brief offline viewing
- **Data Import Errors**: Excel/CSV imports validate data quality and provide line-by-line error reports for corrections

## Design Direction

The design should feel authoritative, precise, and data-rich like Bloomberg Terminal or enterprise risk platforms (Palantir, Splunk) - prioritizing information density and rapid insight access over minimalism. This is a professional power tool, not a consumer product. The interface should feel serious and mission-critical, with restrained use of color to ensure red warnings truly command attention. A rich interface better serves the core purpose of synthesizing complex multi-dimensional risk data.

## Color Selection

Triadic color scheme to clearly distinguish between risk severity levels (critical, high, moderate, low) while maintaining professional gravitas.

- **Primary Color**: Deep Navy Blue `oklch(0.25 0.05 250)` - Conveys trust, stability, and technical precision; used for primary actions and navigation
- **Secondary Colors**: 
  - Slate Gray `oklch(0.45 0.02 250)` for secondary UI elements and muted backgrounds
  - Cool Steel `oklch(0.65 0.03 250)` for tertiary actions and borders
- **Accent Color**: Bright Cyan `oklch(0.75 0.15 200)` for active states, focus indicators, and highlighting key metrics that require attention
- **Risk Severity Colors**:
  - Critical: `oklch(0.55 0.22 25)` Intense Red
  - High: `oklch(0.70 0.18 50)` Warning Orange
  - Moderate: `oklch(0.75 0.12 90)` Caution Yellow
  - Low: `oklch(0.65 0.12 150)` Safe Green

**Foreground/Background Pairings**:
- Background (Light Gray `oklch(0.97 0.005 250)`): Dark Navy text `oklch(0.20 0.03 250)` - Ratio 11.2:1 ✓
- Card (White `oklch(1 0 0)`): Dark Navy text `oklch(0.20 0.03 250)` - Ratio 12.5:1 ✓
- Primary (Deep Navy `oklch(0.25 0.05 250)`): White text `oklch(1 0 0)` - Ratio 12.1:1 ✓
- Secondary (Slate `oklch(0.45 0.02 250)`): White text `oklch(1 0 0)` - Ratio 5.8:1 ✓
- Accent (Cyan `oklch(0.75 0.15 200)`): Dark Navy text `oklch(0.20 0.03 250)` - Ratio 6.9:1 ✓
- Muted (Light Slate `oklch(0.92 0.01 250)`): Medium Navy text `oklch(0.35 0.04 250)` - Ratio 7.2:1 ✓

## Font Selection

Typography should convey precision, authority, and technical competence - similar to financial terminals or aerospace interfaces. Inter (for UI) and JetBrains Mono (for data/numbers) provide the clarity needed for dense information displays.

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter SemiBold / 32px / -0.02em letter spacing / Used for main dashboard titles
  - H2 (Section Header): Inter SemiBold / 24px / -0.01em letter spacing / Used for facility names, major sections
  - H3 (Subsection): Inter Medium / 18px / -0.005em letter spacing / Used for equipment tags, PHA study names
  - H4 (Card Title): Inter Medium / 16px / normal letter spacing / Used for widget headers, list items
  - Body (Content): Inter Regular / 14px / normal letter spacing / 1.5 line height / Standard text
  - Caption (Metadata): Inter Regular / 12px / normal letter spacing / Used for timestamps, secondary info
  - Data (Metrics): JetBrains Mono Medium / 28px / tabular-nums / Used for risk scores, KPIs
  - Table (Data Rows): JetBrains Mono Regular / 13px / tabular-nums / Used for tabular data

## Animations

Animations should be purposeful and restrained - this is a serious professional tool where frivolous motion would undermine credibility. Focus on micro-interactions that provide feedback and guide attention to critical changes.

- **Purposeful Meaning**: Subtle fade-ins for newly loaded data (200ms) communicate freshness of information; red pulse on critical alerts draws immediate attention to safety issues
- **Hierarchy of Movement**: Risk score changes animate (400ms ease-out) to catch user's eye; status badge updates transition smoothly (250ms); background data loads occur without animation to avoid distraction

## Component Selection

- **Components**: 
  - **Dashboard Layout**: Cards for KPI metrics, Table for facility comparison, Tabs for switching between views (Overview/Analytics/Compliance)
  - **Recommendation Management**: Table with sortable columns, Dialog for creating/editing recommendations, Badge for status indicators, Select for filtering
  - **PHA Repository**: Accordion for expandable study sections, Card for study summaries, Separator for visual grouping, ScrollArea for long hazard lists
  - **MOC Workflow**: Multi-step form with Progress indicator, Alert for PHA impact warnings, Checkbox for approval acknowledgments, Textarea for comments
  - **Analytics**: Custom charts (using recharts library), Tooltip for detailed metrics on hover, Alert for trend warnings
  - **Aura AI Engine**: Upload component for documents, Checkbox list for standard selection, Card-based findings display with expandable details, Alert for disclaimers, Textarea for editing AI recommendations
  - **Navigation**: Sidebar for primary navigation with collapsible sections
  
- **Customizations**: 
  - Custom risk score gauge component (circular progress with color-coded severity)
  - Custom timeline component for recommendation lifecycle visualization
  - Status badge variants for workflow states (Open/In-Progress/Complete/Overdue)
  - Custom compliance finding card with color-coded border based on status (pending/accepted/dismissed)
  
- **States**: 
  - Buttons: Default navy, Hover with subtle lift shadow, Active with pressed state, Disabled with reduced opacity
  - Inputs: Border changes from gray to cyan on focus, Error state shows red border with inline validation message
  - Table rows: Hover background change, Selected row with accent border, Expandable rows with smooth height transition
  - File upload: Drag-over state with highlighted border, Upload progress indication
  
- **Icon Selection**: 
  - Warning/ShieldWarning for risk indicators
  - CheckCircle for completed items
  - Clock for pending/overdue states
  - TrendingUp/TrendingDown for analytics
  - FileText for documents/PHAs
  - GitBranch for MOC workflows
  - Funnel for filtering
  - Download for exports
  - Sparkle for AI-powered features (Aura)
  - Upload for document upload
  - Plus for adding new items
  
- **Spacing**: 
  - Container padding: `p-6` (24px) for main content areas
  - Card padding: `p-4` (16px) for internal card content
  - Stack spacing: `gap-4` (16px) between major sections, `gap-2` (8px) between related items
  - Grid gaps: `gap-6` (24px) for dashboard card grids
  
- **Mobile**: 
  - Desktop-first design with mobile adaptations
  - Sidebar collapses to hamburger menu below 768px
  - Dashboard cards stack vertically on mobile
  - Tables switch to card-based list view on mobile with most critical columns only
  - Multi-column forms become single column on mobile
  - Bottom navigation bar for primary actions on mobile to reduce thumb travel
  - Aura compliance findings stack vertically with full-width cards on mobile

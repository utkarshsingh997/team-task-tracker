# TaskFlow — Technical Specification

## Dependencies

### Production
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.0 | UI framework |
| react-dom | ^18.3.0 | React DOM renderer |
| react-router-dom | ^6.26.0 | Client-side routing (HashRouter for GitHub Pages) |
| recharts | ^2.12.0 | Doughnut charts for dashboard |
| lucide-react | ^0.400.0 | Icon library |
| @radix-ui/react-tabs | ^1.1.0 | Accessible tabs primitive (shadcn dependency) |
| @radix-ui/react-dialog | ^1.1.0 | Accessible dialog/modal primitive |
| @radix-ui/react-dropdown-menu | ^2.1.0 | Dropdown menus |
| @radix-ui/react-avatar | ^1.1.0 | Avatar component |
| @radix-ui/react-progress | ^1.1.0 | Progress bar primitive |
| class-variance-authority | ^0.7.0 | Component variant management |
| clsx | ^2.1.0 | Conditional classnames |
| tailwind-merge | ^2.5.0 | Tailwind class deduplication |

### Development
| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^7.2.0 | Build tool |
| @vitejs/plugin-react | ^4.3.0 | React plugin for Vite |
| typescript | ^5.5.0 | Type safety |
| tailwindcss | ^3.4.0 | Utility CSS framework |
| postcss | ^8.4.0 | CSS processing |
| autoprefixer | ^10.4.0 | CSS vendor prefixes |
| @types/react | ^18.3.0 | React type definitions |
| @types/react-dom | ^18.3.0 | React DOM type definitions |

## Component Inventory

### shadcn/ui Components (Built-in)

| Component | Source | Usage | Customization |
|-----------|--------|-------|---------------|
| Button | shadcn/ui | All buttons | Gradient variant added |
| Input | shadcn/ui | All text inputs | Dark theme styling |
| Card | shadcn/ui | All card surfaces | Dark theme, custom border radius |
| Dialog | shadcn/ui | Modals (new project/task) | Dark backdrop, custom animation |
| Tabs | shadcn/ui | Login/Signup toggle, Settings tabs | Pill-style variant |
| DropdownMenu | shadcn/ui | User menu, project filter | Dark theme |
| Avatar | shadcn/ui | User avatars | Gradient background variant |
| Badge | shadcn/ui | Status/priority badges | Custom color variants |
| Label | shadcn/ui | Form labels | — |
| Textarea | shadcn/ui | Description fields | Dark theme |
| Select | shadcn/ui | Project dropdown, priority/status | Dark theme |
| RadioGroup | shadcn/ui | Account type selection | Dark theme |
| Separator | shadcn/ui | Section dividers | — |
| Toast/Sonner | shadcn/ui | Notifications | Top-right positioning |

### Custom Components

| Component | Purpose | Props |
|-----------|---------|-------|
| Sidebar | App navigation sidebar | — |
| TopHeader | Sticky header with search | — |
| AppLayout | Shell layout (sidebar + header + content) | children |
| StatCard | Dashboard KPI card | title, value, icon, iconColor, label |
| EmptyState | Empty list placeholder | icon, title, actionLabel, onAction |
| ProjectCard | Project list item | project, onView, onEdit, onDelete |
| TaskCard | Task list item | task, onToggle, onEdit, onDelete |
| CreateProjectModal | Project creation form | open, onClose, onCreate |
| CreateTaskModal | Task creation form | open, onClose, onCreate |
| StatusBadge | Task status indicator | status |
| PriorityBadge | Task priority indicator | priority |

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Page fade-in | CSS | opacity transition on mount, 300ms ease-out | Low |
| Stat card stagger | CSS | animation-delay increment (50ms per card) | Low |
| Modal enter/exit | CSS | backdrop fade + content scale(0.95→1), 200ms | Low |
| Tab content switch | CSS | opacity crossfade, 150ms | Low |
| Nav item hover | CSS | background-color transition, 150ms | Low |
| Button hover/press | CSS | brightness + scale transform, 150ms | Low |
| Card hover | CSS | filter brightness(1.05), 150ms | Low |
| Toast slide-in | CSS | translateX(100%→0) + fade, 300ms ease-out | Low |
| Chart data load | recharts | built-in animation on mount | Low |
| Progress bar fill | CSS | width transition with 500ms ease-out | Low |

No complex animations requiring GSAP or other animation libraries. All animations are simple CSS transitions.

## State & Logic

### Data Flow
Local state with React hooks. No external state management library needed due to moderate complexity and localStorage persistence.

### State Plan

| State | Scope | Type | Persistence |
|-------|-------|------|-------------|
| auth (user + isAuthenticated) | Global | Context | localStorage |
| projects | Global | Context | localStorage |
| tasks | Global | Context | localStorage |
| activities | Global | Context | localStorage |
| activePage | Global | URL | URL path |
| modals (createProject, createTask) | Local | useState | — |
| searchQuery | Page-level | useState | — |
| filterStatus | Page-level | useState | — |
| selectedProjectFilter | Page-level | useState | — |
| settingsTab | Page-level | useState | — |
| loginTab | Page-level | useState | — |

### Hooks

| Hook | Purpose |
|------|---------|
| useAuth | Authentication state, login, logout, signup |
| useProjects | CRUD operations for projects |
| useTasks | CRUD operations for tasks |
| useActivities | Activity log tracking |
| useLocalStorage | localStorage sync with state |

### Key Logic

**localStorage Schema:**
```
taskflow_auth: { user: { id, name, email, role }, isAuthenticated }
taskflow_projects: [{ id, name, description, status, createdAt, taskCount, completedCount }]
taskflow_tasks: [{ id, title, description, projectId, priority, status, dueDate, assignee, createdAt }]
taskflow_activities: [{ id, action, description, timestamp }]
```

**Auth Flow:**
- Signup: validate inputs, create user object, store in localStorage, set isAuthenticated
- Login: validate credentials against stored users, set isAuthenticated
- Logout: clear auth state, redirect to login
- Protected routes: redirect to /login if not authenticated

**Data Relationships:**
- Tasks belong to projects (via projectId)
- Activities are generated on CRUD operations
- Dashboard stats computed from projects + tasks (derived state)

**Routing:**
- Use HashRouter for GitHub Pages compatibility
- Routes: /login, /dashboard, /projects, /tasks, /settings
- Redirect / to /dashboard (if authenticated) or /login (if not)
- Protected routes wrapper component

## Other Key Decisions

**GitHub Pages Configuration:**
- Add `"homepage": "."` to package.json
- Use HashRouter instead of BrowserRouter (no server-side routing needed)
- Build output goes to `dist/` which can be deployed to `gh-pages` branch

**No Backend:**
- All data stored in localStorage
- No API calls needed
- Demo data seeded on first load if no data exists

**Font Loading:**
- Manrope loaded via Google Fonts CDN in index.html
- Weights: 400, 500, 600, 700

**Responsive:**
- Sidebar collapses to hamburger menu below 1024px
- Stat cards go 2×2 on tablet, 1 column on mobile
- Chart cards stack vertically on tablet/mobile

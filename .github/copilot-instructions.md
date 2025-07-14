# AI Agent Instructions for Tax Pro Services Website

## Project Overview
This is a professional tax preparation website built with React/Vite and Convex backend. The application handles tax service management, document processing, and tax calculations.

## Architecture
- **Frontend**: React/Vite app with TypeScript
- **Backend**: Convex (serverless backend)
- **Authentication**: Convex Auth with Anonymous auth
- **State Management**: Convex real-time state sync
- **UI**: Tailwind CSS with gold/black theme

## Key Patterns and Conventions

### Data Model
- Schema defined in `convex/schema.ts`:
  - `users`: Stores user profiles with role-based access (admin/user)
  - `services`: Tax preparation services catalog
  - `documents`: User-uploaded tax documents with status tracking
  - `adminLogs`: Audit trail for admin actions
  - `taxCalculations`: Results from tax calculation tools

### Authentication & Authorization
- Protected routes wrapped with `<Authenticated>` component
- Admin routes check `user.role === "admin"`
- Example in `App.tsx`:
  ```tsx
  <Route path="/admin" element={
    <Authenticated>
      <AdminDashboard />
    </Authenticated>
  } />
  ```

### Component Structure
- Pages in `src/pages/`
- Shared components in `src/components/`
- Navigation handles authenticated/unauthenticated states automatically
- Use gold/black theme classes consistently (`text-gold`, `bg-black-light`, etc.)

### Development Workflow
1. Start development server:
   ```bash
   npm run dev
   ```
2. Backend changes in `convex/` auto-deploy to development environment
3. Use `api.*.mutation()` for writes, `api.*.query()` for reads

### Common Patterns
- Mutations follow try/catch pattern with error logging
- Use `useQuery` for real-time data subscriptions
- Components should handle loading/error states
- Use Tailwind's container classes for consistent layout

## Integration Points
- Convex backend: `convex/_generated/api.ts` for type-safe API
- Authentication: `SignInForm` and `SignOutButton` components
- File uploads: Document management through Convex storage
- Tax calculations: Implemented in `convex/taxTools.ts`

## Testing & Debugging
- Check Convex dashboard for backend logs
- Use browser console for mutation/query debugging
- Monitor adminLogs table for system activity

## Additional Notes
- Keep UI consistent with gold/black theme
- Always handle authentication states
- Use proper error boundaries and loading states
- Follow existing patterns for new features

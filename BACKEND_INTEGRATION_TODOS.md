# Backend Integration TODOs for Prognos Frontend

This document outlines all the places in the frontend codebase where backend API integration is needed. The frontend currently uses mock data and local storage (via `useKV`) to simulate a working application.

**Related Documents:**
- See `BACKEND_API_REQUIREMENTS.md` for complete API specification
- All API methods are stubbed in `src/lib/api.ts`

---

## High-Level Integration Tasks

### 1. Authentication & Authorization
**Status:** ❌ Not Implemented

**Files to Modify:**
- Create `src/contexts/AuthContext.tsx` - Auth provider with login/logout
- Create `src/components/LoginPage.tsx` - Login form UI
- Modify `src/App.tsx` - Add auth check and conditional rendering
- Modify `src/lib/api.ts` - Implement `getAuthHeader()` with JWT token

**Backend APIs Needed:**
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - Session termination
- `GET /api/auth/me` - Get current user info

**Tasks:**
```typescript
// TODO: Implement AuthContext
// - Store JWT token in secure cookie or localStorage
// - Provide login(), logout(), user state
// - Handle token refresh
// - Redirect unauthenticated users to login page

// TODO: Modify api.ts getAuthHeader()
// - Retrieve JWT from storage
// - Add to Authorization header: `Bearer ${token}`
```

---

### 2. Facilities Module
**Status:** ❌ Not Implemented (using seed data)

**Files to Modify:**
- `src/App.tsx` - Replace `useKV` with API calls
- `src/components/views/dashboard-view.tsx` - Fetch from API instead of props

**Backend APIs Needed:**
- `GET /api/facilities` - List all facilities
- `GET /api/facilities/:id` - Get facility details
- `POST /api/facilities` - Create facility
- `PATCH /api/facilities/:id` - Update facility
- `DELETE /api/facilities/:id` - Delete facility

**Tasks:**
```typescript
// TODO: src/App.tsx - Replace seed data with API calls
// 1. Remove: import { sampleFacilities } from '@/lib/seed-data'
// 2. Replace useKV with useState for facilities
// 3. Add useEffect to call api.getFacilities() on mount
// 4. Handle loading states and errors
// 5. Update setFacilities to use API responses

// TODO: Create src/hooks/useFacilities.ts
// - Custom hook for facilities data fetching
// - Handle loading, error, and success states
// - Provide refetch functionality
// - Example:
//   const { facilities, loading, error, refetch } = useFacilities()

// TODO: dashboard-view.tsx
// - Accept loading and error props
// - Show loading skeleton while fetching
// - Show error message if fetch fails
```

**Example Implementation:**
```typescript
// src/hooks/useFacilities.ts
export function useFacilities() {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchFacilities = async () => {
    try {
      setLoading(true)
      const data = await api.getFacilities()
      setFacilities(data.facilities)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFacilities()
  }, [])

  return { facilities, loading, error, refetch: fetchFacilities }
}
```

---

### 3. Recommendations Module
**Status:** ❌ Not Implemented (using seed data)

**Files to Modify:**
- `src/App.tsx` - Replace seed data
- `src/components/views/recommendations-view.tsx` - Add CRUD operations

**Backend APIs Needed:**
- `GET /api/recommendations` - List recommendations with filters
- `GET /api/recommendations/:id` - Get recommendation details
- `POST /api/recommendations` - Create recommendation
- `PATCH /api/recommendations/:id` - Update recommendation
- `POST /api/recommendations/:id/complete` - Mark as complete
- `DELETE /api/recommendations/:id` - Delete recommendation

**Tasks:**
```typescript
// TODO: Create src/hooks/useRecommendations.ts
// - Fetch recommendations with filters (status, risk, facility)
// - Support pagination
// - Handle create/update/delete operations

// TODO: recommendations-view.tsx
// 1. Replace handleCreateRecommendation stub with dialog
// 2. Add RecommendationDialog component for create/edit
// 3. Call api.createRecommendation() on form submit
// 4. Call api.updateRecommendation() for status changes
// 5. Add delete functionality with confirmation
// 6. Implement filter dropdowns to call API with params
// 7. Show loading states during operations

// TODO: Create src/components/RecommendationDialog.tsx
// - Form for creating/editing recommendations
// - Fields: title, description, facility, assignee, dueDate, riskLevel
// - Validation
// - Submit to API
```

---

### 4. PHA (Process Hazard Analysis) Module
**Status:** ❌ Not Implemented (using seed data)

**Files to Modify:**
- `src/App.tsx` - Replace seed data
- `src/components/views/pha-view.tsx` - Add CRUD operations

**Backend APIs Needed:**
- `GET /api/phas` - List PHAs
- `GET /api/phas/:id` - Get PHA details
- `POST /api/phas` - Create PHA
- `PATCH /api/phas/:id` - Update PHA
- `DELETE /api/phas/:id` - Delete PHA

**Tasks:**
```typescript
// TODO: Create src/hooks/usePHAs.ts
// - Similar pattern to useFacilities

// TODO: pha-view.tsx
// 1. Add create PHA dialog
// 2. Add edit/delete functionality
// 3. Show detailed view when clicking row
// 4. Add filters (facility, study type)
```

---

### 5. MOC (Management of Change) Module
**Status:** ❌ Not Implemented (using seed data)

**Files to Modify:**
- `src/App.tsx` - Replace seed data
- `src/components/views/moc-view.tsx` - Add CRUD + approval operations

**Backend APIs Needed:**
- `GET /api/mocs` - List MOCs
- `GET /api/mocs/:id` - Get MOC details
- `POST /api/mocs` - Create MOC
- `PATCH /api/mocs/:id` - Update MOC
- `POST /api/mocs/:id/approve` - Approve MOC
- `POST /api/mocs/:id/reject` - Reject MOC
- `DELETE /api/mocs/:id` - Delete MOC

**Tasks:**
```typescript
// TODO: Create src/hooks/useMOCs.ts

// TODO: moc-view.tsx
// 1. Add create MOC dialog
// 2. Add approval/rejection workflow
// 3. Show approval history
// 4. Display impacted PHAs
// 5. Add comments on approve/reject
```

---

### 6. Analytics Module
**Status:** ❌ Not Implemented (using seed data)

**Files to Modify:**
- `src/App.tsx` - Replace seed data
- `src/components/views/analytics-view.tsx` - Fetch from API

**Backend APIs Needed:**
- `GET /api/analytics/incident-trends` - Incident trend data
- `GET /api/analytics/risk-trends` - Risk trend data
- `GET /api/analytics/dashboard-metrics` - Dashboard aggregates

**Tasks:**
```typescript
// TODO: Create src/hooks/useAnalytics.ts
// - Fetch incident trends
// - Fetch risk trends
// - Support date range and facility filters

// TODO: analytics-view.tsx
// 1. Add date range picker for filtering
// 2. Add facility filter
// 3. Show loading state while fetching
// 4. Handle empty data states

// TODO: dashboard-view.tsx
// - Call api.getDashboardMetrics() instead of calculating locally
// - Use metrics from backend
```

---

### 7. Aura AI Compliance Engine
**Status:** ⚠️ Partially Implemented (uses spark.llm but needs backend integration)

**Files to Modify:**
- `src/components/views/aura-view.tsx` - Major refactoring needed

**Backend APIs Needed:**
- `GET /api/compliance/standards` - List standards
- `GET /api/compliance/standards/:id` - Get standard details
- `POST /api/compliance/standards` - Upload custom standard
- `DELETE /api/compliance/standards/:id` - Delete custom standard
- `POST /api/compliance/analyze` - Upload document for analysis
- `GET /api/compliance/analyses/:id` - Get analysis results
- `GET /api/compliance/analyses` - List all analyses
- `PATCH /api/compliance/analyses/:analysisId/findings/:findingId` - Update finding
- `POST /api/compliance/analyses/:analysisId/findings/:findingId/create-recommendation` - Convert to recommendation
- `DELETE /api/compliance/analyses/:id` - Delete analysis

**Tasks:**
```typescript
// TODO: aura-view.tsx - Major refactoring
// 1. Remove client-side LLM calls (spark.llm)
// 2. Replace with backend API calls
// 3. Handle asynchronous analysis workflow:
//    a. Upload document → get analysisId
//    b. Poll GET /api/compliance/analyses/:id for status
//    c. Show progress indicator
//    d. Display results when status === 'complete'
// 4. Load standards from API instead of hardcoded defaults
// 5. Implement handleUploadStandard() to actually upload
// 6. Update handleAcceptFinding() to call API
// 7. Update handleDismissFinding() to call API
// 8. Update handleSaveEdit() to call PATCH endpoint
// 9. Add "Create Recommendation" flow that calls backend
// 10. Add export report functionality

// TODO: Create src/hooks/useComplianceStandards.ts
// - Fetch standards list
// - Upload new custom standard
// - Delete custom standards

// TODO: Create src/hooks/useComplianceAnalysis.ts
// - Upload and analyze document
// - Poll for analysis completion
// - Update findings (edit/accept/dismiss)
// - Convert finding to recommendation

// TODO: Add polling utility
// Example:
async function pollAnalysis(analysisId: string) {
  const maxAttempts = 60 // 2 minutes with 2s intervals
  for (let i = 0; i < maxAttempts; i++) {
    const analysis = await api.getComplianceAnalysis(analysisId)
    if (analysis.status === 'complete' || analysis.status === 'error') {
      return analysis
    }
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  throw new Error('Analysis timeout')
}
```

**Critical Change:**
The current implementation uses `spark.llm` to run AI analysis in the browser. This needs to be moved to the backend because:
1. OpenAI API keys should never be in frontend code
2. Large document processing should happen on the server
3. RAG (Retrieval-Augmented Generation) requires database access
4. Analysis should be asynchronous and resumable

---

### 8. File Upload/Storage
**Status:** ❌ Not Implemented

**Files to Create:**
- `src/hooks/useFileUpload.ts` - File upload hook
- `src/components/FileUploader.tsx` - Reusable file upload component

**Backend APIs Needed:**
- `POST /api/files/upload` - Upload file
- `DELETE /api/files/:id` - Delete file

**Tasks:**
```typescript
// TODO: Create useFileUpload hook
// - Handle file selection
// - Upload progress tracking
// - Error handling
// - Return uploaded file URL

// TODO: Use in:
// - Recommendation closure evidence
// - MOC attachments
// - PHA documentation
// - Aura document upload (already partially implemented)

// Example:
export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const upload = async (file: File, type: string) => {
    setUploading(true)
    try {
      // Use XMLHttpRequest for progress tracking
      const result = await api.uploadFile(file, type)
      return result
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  return { upload, uploading, progress }
}
```

---

### 9. Real-time Updates (Optional - Phase 2)
**Status:** ❌ Not Implemented

**Files to Create:**
- `src/hooks/useWebSocket.ts` - WebSocket connection hook
- `src/contexts/WebSocketContext.tsx` - Global WebSocket provider

**Backend APIs Needed:**
- WebSocket endpoint: `ws://api/ws?token=<jwt>`

**Tasks:**
```typescript
// TODO: Implement WebSocket for real-time updates
// 1. Connect on login, disconnect on logout
// 2. Listen for events:
//    - recommendation.updated
//    - moc.approved
//    - moc.rejected
//    - analysis.complete
// 3. Update local state when events received
// 4. Show toast notifications for relevant events

// Example:
const ws = useWebSocket()
ws.on('recommendation.updated', (data) => {
  // Update recommendations list
  setRecommendations(current => 
    current.map(r => r.id === data.id ? { ...r, ...data } : r)
  )
  toast.info('Recommendation updated')
})
```

---

### 10. Error Handling & Loading States
**Status:** ⚠️ Partial (needs standardization)

**Files to Create:**
- `src/components/ErrorBoundary.tsx` - Catch React errors
- `src/components/LoadingSpinner.tsx` - Consistent loading UI
- `src/components/ErrorMessage.tsx` - Consistent error UI
- `src/lib/error-handler.ts` - Centralized error handling

**Tasks:**
```typescript
// TODO: Standardize error handling across all API calls
// 1. Create error handler utility
// 2. Parse backend error responses
// 3. Show user-friendly error messages
// 4. Log errors to monitoring service (Sentry, etc.)

// TODO: Add loading states to all data fetching
// - Use Skeleton components while loading
// - Disable actions during loading
// - Show progress for long operations

// Example error handler:
export function handleApiError(error: unknown) {
  if (error instanceof Response) {
    // Parse error response
    const data = await error.json()
    toast.error(data.error.message)
  } else if (error instanceof Error) {
    toast.error(error.message)
  } else {
    toast.error('An unexpected error occurred')
  }
}
```

---

### 11. Environment Configuration
**Status:** ❌ Not Implemented

**Files to Create:**
- `.env.development` - Dev environment variables
- `.env.production` - Prod environment variables
- `src/config/index.ts` - Config management

**Tasks:**
```typescript
// TODO: Create environment files
// .env.development:
// VITE_API_BASE_URL=http://localhost:3000/api
// VITE_WS_URL=ws://localhost:3000/ws

// .env.production:
// VITE_API_BASE_URL=https://api.prognos.com/api
// VITE_WS_URL=wss://api.prognos.com/ws

// TODO: Update src/lib/api.ts
// - Use import.meta.env.VITE_API_BASE_URL
// - Add environment validation

// TODO: Add .env to .gitignore (if not already)
```

---

### 12. Data Caching & State Management (Optional - Phase 2)
**Status:** ❌ Not Implemented

**Recommendation:** Consider using React Query or SWR for data fetching

**Tasks:**
```typescript
// TODO: Evaluate React Query or SWR
// Benefits:
// - Automatic caching
// - Background refetching
// - Optimistic updates
// - Retry logic
// - Loading/error states

// Example with React Query:
const { data, isLoading, error } = useQuery(
  ['facilities'],
  () => api.getFacilities()
)
```

---

## Implementation Priority

### Phase 1 - Core Functionality (Must Have)
1. ✅ Authentication & Authorization
2. ✅ Facilities API integration
3. ✅ Recommendations API integration
4. ✅ Dashboard metrics API
5. ✅ Error handling & loading states
6. ✅ Environment configuration

### Phase 2 - Full Feature Set
7. ✅ PHA API integration
8. ✅ MOC API integration
9. ✅ Analytics API integration
10. ✅ File upload functionality

### Phase 3 - Advanced Features
11. ✅ Aura AI backend integration (remove client-side LLM)
12. ✅ Real-time WebSocket updates
13. ✅ Data caching with React Query

---

## Testing Requirements

For each integration:

### Unit Tests
```typescript
// TODO: Add tests for each API method
// - Mock fetch responses
// - Test error handling
// - Test data transformation

// Example:
describe('api.getFacilities', () => {
  it('should fetch facilities', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ facilities: [...] })
    })
    
    const result = await api.getFacilities()
    expect(result.facilities).toHaveLength(4)
  })
  
  it('should handle errors', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: 'Internal Server Error'
    })
    
    await expect(api.getFacilities()).rejects.toThrow()
  })
})
```

### Integration Tests
```typescript
// TODO: Add integration tests
// - Test full user flows
// - Test with mock backend server (MSW)
// - Test error scenarios
```

---

## Migration Path from Current Implementation

### Current State
- All data stored in browser via `useKV` (IndexedDB)
- Seed data loaded on first visit
- No persistence across browsers/devices
- No multi-user collaboration
- AI analysis runs in browser (security risk)

### Migration Steps

1. **Dual-Mode Operation (Recommended)**
   ```typescript
   // TODO: Support both local and API modes
   const USE_API = import.meta.env.VITE_USE_API === 'true'
   
   const facilities = USE_API 
     ? useFacilitiesFromAPI()
     : useFacilitiesFromKV()
   ```

2. **Gradual Migration**
   - Start with read-only API integration
   - Test with production-like data
   - Enable write operations
   - Remove local storage code

3. **Data Migration (if needed)**
   ```typescript
   // TODO: Create migration utility
   // - Export data from useKV
   // - POST to backend APIs
   // - Verify migration
   // - Clear local storage
   ```

---

## Code Examples

### Example Hook with API Integration

```typescript
// src/hooks/useFacilities.ts
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import type { Facility } from '@/lib/types'
import { toast } from 'sonner'

export function useFacilities() {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchFacilities = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.getFacilities()
      setFacilities(data.facilities)
    } catch (err) {
      const error = err as Error
      setError(error)
      toast.error('Failed to load facilities', {
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  const createFacility = async (data: { name: string; location: string }) => {
    try {
      const newFacility = await api.createFacility(data)
      setFacilities(current => [...current, newFacility])
      toast.success('Facility created')
      return newFacility
    } catch (err) {
      toast.error('Failed to create facility')
      throw err
    }
  }

  const updateFacility = async (id: string, data: Partial<Facility>) => {
    try {
      const updated = await api.updateFacility(id, data)
      setFacilities(current =>
        current.map(f => f.id === id ? updated : f)
      )
      toast.success('Facility updated')
      return updated
    } catch (err) {
      toast.error('Failed to update facility')
      throw err
    }
  }

  const deleteFacility = async (id: string) => {
    try {
      await api.deleteFacility(id)
      setFacilities(current => current.filter(f => f.id !== id))
      toast.success('Facility deleted')
    } catch (err) {
      toast.error('Failed to delete facility')
      throw err
    }
  }

  useEffect(() => {
    fetchFacilities()
  }, [])

  return {
    facilities,
    loading,
    error,
    refetch: fetchFacilities,
    createFacility,
    updateFacility,
    deleteFacility
  }
}
```

### Example Component Update

```typescript
// src/App.tsx - BEFORE
const [facilities, setFacilities] = useKV<Facility[]>('facilities', [])

useEffect(() => {
  if (!facilities || facilities.length === 0) {
    setFacilities(sampleFacilities)
  }
}, [])

// src/App.tsx - AFTER
const { facilities, loading, error } = useFacilities()

if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error} />
```

---

## Notes

1. **API Base URL**: Currently set to `http://localhost:3000/api` in `api.ts`. This should be configurable via environment variables.

2. **Authentication**: The `getAuthHeader()` method in `api.ts` is currently empty. It needs to return the JWT token.

3. **Error Handling**: API methods currently throw generic errors. Consider creating custom error types for better error handling.

4. **TypeScript**: All API response types are already defined in `src/lib/types.ts`. Ensure backend responses match these types.

5. **CORS**: The backend must enable CORS for the frontend domain, especially for file uploads.

6. **File Size Limits**: Consider implementing client-side file size validation before upload to provide better UX.

7. **Optimistic Updates**: For better UX, consider implementing optimistic updates (update UI immediately, rollback if API fails).

8. **Pagination**: The current UI doesn't implement pagination. Consider adding it when integrating list endpoints.

---

## Questions for Backend Team

1. Will you use JWT tokens? If so, what's the token expiration time?
2. Do you need refresh token flow implemented?
3. Will you implement rate limiting? If so, how should the frontend handle 429 responses?
4. For Aura AI analysis, what's the expected processing time? Should we implement polling or webhooks?
5. Will you provide WebSocket support for real-time updates?
6. What's the maximum file upload size?
7. Will you provide health check endpoint for frontend to verify API availability?
8. Do you need any specific headers (e.g., X-Request-ID for tracing)?

---

## Completion Checklist

- [ ] Authentication implemented
- [ ] All API methods in `api.ts` implemented (remove `throw new Error`)
- [ ] All `useKV` calls replaced with API calls
- [ ] Loading states added to all views
- [ ] Error handling standardized
- [ ] Environment variables configured
- [ ] File upload functionality implemented
- [ ] Aura AI migrated to backend
- [ ] Unit tests for API client
- [ ] Integration tests for key flows
- [ ] Documentation updated
- [ ] Error tracking configured (Sentry/LogRocket)
- [ ] Performance monitoring added

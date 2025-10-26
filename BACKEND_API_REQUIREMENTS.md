# Backend API Requirements for Prognos Frontend

**Version:** 1.0  
**Last Updated:** December 2024  
**Frontend Repository:** This repository (frontend-only)  
**Backend Repository:** Separate backend repository

---

## Overview

This document outlines the complete REST API specification required by the Prognos frontend application. The frontend is a standalone React/TypeScript application that will communicate with a separate backend service via HTTP REST APIs.

**Key Technologies:**
- Authentication: JWT-based authentication
- Data Format: JSON
- Protocol: HTTPS (REST)
- CORS: Must be enabled for the frontend domain

---

## Authentication

All API endpoints (except `/auth/*`) require a valid JWT token in the `Authorization` header:

```
Authorization: Bearer <jwt-token>
```

### Authentication Endpoints

#### `POST /api/auth/login`
**Purpose:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "process_safety_engineer",
    "organizationId": "org-456"
  }
}
```

#### `POST /api/auth/logout`
**Purpose:** Invalidate current JWT token

**Response:**
```json
{
  "success": true
}
```

#### `GET /api/auth/me`
**Purpose:** Get current authenticated user details

**Response:**
```json
{
  "id": "user-123",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "process_safety_engineer",
  "organizationId": "org-456"
}
```

---

## Facilities API

### `GET /api/facilities`
**Purpose:** Get all facilities for the authenticated user's organization

**Query Parameters:**
- `riskLevel` (optional): Filter by risk level (critical|high|moderate|low)
- `search` (optional): Search by name or location

**Response:**
```json
{
  "facilities": [
    {
      "id": "fac-001",
      "name": "Houston Refinery Unit 3",
      "location": "Houston, TX",
      "riskScore": 72,
      "riskLevel": "high",
      "openRecommendations": 28,
      "overdueRecommendations": 5,
      "lastPHADate": "2024-03-15",
      "activeMOCs": 3,
      "organizationId": "org-456"
    }
  ],
  "total": 1
}
```

### `GET /api/facilities/:id`
**Purpose:** Get detailed information for a specific facility

**Response:**
```json
{
  "id": "fac-001",
  "name": "Houston Refinery Unit 3",
  "location": "Houston, TX",
  "riskScore": 72,
  "riskLevel": "high",
  "openRecommendations": 28,
  "overdueRecommendations": 5,
  "lastPHADate": "2024-03-15",
  "activeMOCs": 3,
  "organizationId": "org-456",
  "createdAt": "2023-01-15T10:00:00Z",
  "updatedAt": "2024-12-20T15:30:00Z"
}
```

### `POST /api/facilities`
**Purpose:** Create a new facility

**Request Body:**
```json
{
  "name": "New Facility Name",
  "location": "City, State"
}
```

**Response:**
```json
{
  "id": "fac-new",
  "name": "New Facility Name",
  "location": "City, State",
  "riskScore": 0,
  "riskLevel": "low",
  "openRecommendations": 0,
  "overdueRecommendations": 0,
  "lastPHADate": null,
  "activeMOCs": 0,
  "organizationId": "org-456"
}
```

### `PATCH /api/facilities/:id`
**Purpose:** Update facility details

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Name",
  "location": "Updated Location"
}
```

### `DELETE /api/facilities/:id`
**Purpose:** Delete a facility

**Response:**
```json
{
  "success": true
}
```

---

## Recommendations API

### `GET /api/recommendations`
**Purpose:** Get all recommendations

**Query Parameters:**
- `facilityId` (optional): Filter by facility
- `status` (optional): Filter by status (open|in-progress|complete|deferred|overdue)
- `riskLevel` (optional): Filter by risk level (critical|high|moderate|low)
- `assignee` (optional): Filter by assignee
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Items per page (default: 50)

**Response:**
```json
{
  "recommendations": [
    {
      "id": "rec-001",
      "facilityId": "fac-001",
      "facilityName": "Houston Refinery Unit 3",
      "title": "Install redundant pressure relief valve on reactor vessel",
      "description": "Current single PRV creates single point of failure for overpressure protection",
      "source": "PHA-2024-03",
      "riskLevel": "critical",
      "status": "open",
      "assignee": "Mark Thompson",
      "assigneeId": "user-789",
      "dueDate": "2025-01-15",
      "createdDate": "2024-03-20",
      "completedDate": null,
      "equipmentTag": "R-301",
      "createdBy": "user-123"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 50
}
```

### `GET /api/recommendations/:id`
**Purpose:** Get detailed information for a specific recommendation

**Response:**
```json
{
  "id": "rec-001",
  "facilityId": "fac-001",
  "facilityName": "Houston Refinery Unit 3",
  "title": "Install redundant pressure relief valve on reactor vessel",
  "description": "Current single PRV creates single point of failure for overpressure protection",
  "source": "PHA-2024-03",
  "riskLevel": "critical",
  "status": "open",
  "assignee": "Mark Thompson",
  "assigneeId": "user-789",
  "dueDate": "2025-01-15",
  "createdDate": "2024-03-20",
  "completedDate": null,
  "equipmentTag": "R-301",
  "createdBy": "user-123",
  "closureEvidence": []
}
```

### `POST /api/recommendations`
**Purpose:** Create a new recommendation

**Request Body:**
```json
{
  "facilityId": "fac-001",
  "title": "Recommendation title",
  "description": "Detailed description",
  "source": "PHA-2024-03",
  "riskLevel": "high",
  "assigneeId": "user-789",
  "dueDate": "2025-06-15",
  "equipmentTag": "P-205"
}
```

**Response:** Same as GET /api/recommendations/:id

### `PATCH /api/recommendations/:id`
**Purpose:** Update recommendation details

**Request Body:** (all fields optional)
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "in-progress",
  "assigneeId": "user-890",
  "dueDate": "2025-07-15"
}
```

### `POST /api/recommendations/:id/complete`
**Purpose:** Mark a recommendation as complete

**Request Body:**
```json
{
  "closureEvidence": "Description of how this was resolved",
  "attachmentUrls": ["https://s3.../evidence.pdf"]
}
```

**Response:**
```json
{
  "id": "rec-001",
  "status": "complete",
  "completedDate": "2024-12-20T10:00:00Z"
}
```

### `DELETE /api/recommendations/:id`
**Purpose:** Delete a recommendation

---

## PHA (Process Hazard Analysis) API

### `GET /api/phas`
**Purpose:** Get all PHAs

**Query Parameters:**
- `facilityId` (optional): Filter by facility
- `studyType` (optional): Filter by study type (HAZOP|LOPA|What-If|FMEA)
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "phas": [
    {
      "id": "pha-001",
      "facilityId": "fac-001",
      "facilityName": "Houston Refinery Unit 3",
      "studyName": "Crude Distillation Unit HAZOP",
      "equipmentUnit": "CDU-3",
      "studyType": "HAZOP",
      "completedDate": "2024-03-15",
      "nextReviewDate": "2029-03-15",
      "scenarioCount": 127,
      "recommendationCount": 18,
      "teamLead": "Dr. Priya Sharma",
      "teamLeadId": "user-555"
    }
  ],
  "total": 10,
  "page": 1,
  "limit": 50
}
```

### `GET /api/phas/:id`
**Purpose:** Get detailed PHA information

**Response:**
```json
{
  "id": "pha-001",
  "facilityId": "fac-001",
  "facilityName": "Houston Refinery Unit 3",
  "studyName": "Crude Distillation Unit HAZOP",
  "equipmentUnit": "CDU-3",
  "studyType": "HAZOP",
  "completedDate": "2024-03-15",
  "nextReviewDate": "2029-03-15",
  "scenarioCount": 127,
  "recommendationCount": 18,
  "teamLead": "Dr. Priya Sharma",
  "teamLeadId": "user-555",
  "scenarios": [],
  "attachments": []
}
```

### `POST /api/phas`
**Purpose:** Create a new PHA

**Request Body:**
```json
{
  "facilityId": "fac-001",
  "studyName": "New HAZOP Study",
  "equipmentUnit": "UNIT-5",
  "studyType": "HAZOP",
  "teamLeadId": "user-555"
}
```

### `PATCH /api/phas/:id`
**Purpose:** Update PHA details

### `DELETE /api/phas/:id`
**Purpose:** Delete a PHA

---

## MOC (Management of Change) API

### `GET /api/mocs`
**Purpose:** Get all MOCs

**Query Parameters:**
- `facilityId` (optional): Filter by facility
- `status` (optional): Filter by status (draft|pending-review|approved|rejected|implemented)
- `initiatorId` (optional): Filter by initiator
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "mocs": [
    {
      "id": "moc-001",
      "facilityId": "fac-001",
      "facilityName": "Houston Refinery Unit 3",
      "title": "Replace heat exchanger HX-204 with higher capacity unit",
      "description": "Upgrade to accommodate increased throughput from upstream modifications",
      "initiator": "Tom Wilson",
      "initiatorId": "user-321",
      "status": "pending-review",
      "submittedDate": "2024-12-10",
      "impactedPHAs": 2,
      "approvers": ["Safety Manager", "Operations Manager", "Engineering Lead"],
      "approverIds": ["user-111", "user-222", "user-333"],
      "currentApprover": "Safety Manager",
      "currentApproverId": "user-111"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 50
}
```

### `GET /api/mocs/:id`
**Purpose:** Get detailed MOC information

**Response:** Same structure as individual MOC in list, with additional fields:
```json
{
  "id": "moc-001",
  "...": "...",
  "impactedPHAsList": [
    {
      "id": "pha-001",
      "studyName": "Crude Distillation Unit HAZOP"
    }
  ],
  "approvalHistory": [
    {
      "approverId": "user-111",
      "approverName": "Safety Manager",
      "action": "approved",
      "timestamp": "2024-12-12T10:00:00Z",
      "comments": "Approved with conditions"
    }
  ],
  "attachments": []
}
```

### `POST /api/mocs`
**Purpose:** Create a new MOC

**Request Body:**
```json
{
  "facilityId": "fac-001",
  "title": "MOC Title",
  "description": "Detailed description of the change",
  "approverIds": ["user-111", "user-222"]
}
```

### `PATCH /api/mocs/:id`
**Purpose:** Update MOC details

### `POST /api/mocs/:id/approve`
**Purpose:** Approve an MOC (by current approver)

**Request Body:**
```json
{
  "comments": "Approved with conditions"
}
```

### `POST /api/mocs/:id/reject`
**Purpose:** Reject an MOC

**Request Body:**
```json
{
  "comments": "Rejected due to insufficient safety analysis"
}
```

### `DELETE /api/mocs/:id`
**Purpose:** Delete an MOC

---

## Analytics API

### `GET /api/analytics/incident-trends`
**Purpose:** Get incident trend data for charts

**Query Parameters:**
- `facilityId` (optional): Filter by facility
- `startDate` (optional): Start date (YYYY-MM-DD)
- `endDate` (optional): End date (YYYY-MM-DD)

**Response:**
```json
{
  "trends": [
    {
      "month": "Jan",
      "incidents": 2,
      "nearmisses": 8
    },
    {
      "month": "Feb",
      "incidents": 1,
      "nearmisses": 12
    }
  ]
}
```

### `GET /api/analytics/risk-trends`
**Purpose:** Get risk trend data over time

**Query Parameters:**
- `facilityId` (optional): Filter by facility
- `period` (optional): Group by period (monthly|quarterly|yearly)

**Response:**
```json
{
  "trends": [
    {
      "date": "Q1 2024",
      "critical": 8,
      "high": 15,
      "moderate": 28,
      "low": 42
    },
    {
      "date": "Q2 2024",
      "critical": 6,
      "high": 18,
      "moderate": 25,
      "low": 38
    }
  ]
}
```

### `GET /api/analytics/dashboard-metrics`
**Purpose:** Get aggregated metrics for dashboard

**Query Parameters:**
- `facilityId` (optional): Filter by specific facility

**Response:**
```json
{
  "totalOpenRecommendations": 93,
  "totalOverdueRecommendations": 19,
  "totalActiveMOCs": 6,
  "criticalFacilitiesCount": 1,
  "averageRiskScore": 58.5,
  "recommendationsByRisk": {
    "critical": 12,
    "high": 31,
    "moderate": 35,
    "low": 15
  },
  "mocsByStatus": {
    "draft": 2,
    "pending-review": 3,
    "approved": 1
  }
}
```

---

## Aura AI Compliance Engine API

### `GET /api/compliance/standards`
**Purpose:** Get all compliance standards (regulatory + custom)

**Response:**
```json
{
  "standards": [
    {
      "id": "osha-psm",
      "name": "OSHA PSM 1910.119",
      "type": "regulatory",
      "description": "OSHA Process Safety Management standard for highly hazardous chemicals",
      "clauseCount": 14,
      "uploadedDate": null,
      "uploadedBy": null,
      "organizationId": null
    },
    {
      "id": "std-custom-001",
      "name": "Corporate MOC Policy",
      "type": "custom",
      "description": "Internal management of change procedures",
      "clauseCount": 8,
      "uploadedDate": "2024-10-15T10:00:00Z",
      "uploadedBy": "user-123",
      "organizationId": "org-456"
    }
  ]
}
```

### `GET /api/compliance/standards/:id`
**Purpose:** Get detailed standard information including clauses

**Response:**
```json
{
  "id": "osha-psm",
  "name": "OSHA PSM 1910.119",
  "type": "regulatory",
  "description": "OSHA Process Safety Management standard for highly hazardous chemicals",
  "clauseCount": 14,
  "clauses": [
    {
      "id": "clause-001",
      "clauseNumber": "1910.119(f)(1)(i)(D)",
      "title": "Operating Procedures - Consequences of Deviation",
      "content": "The operating procedures shall include the consequences of deviation...",
      "category": "Operating Procedures"
    }
  ]
}
```

### `POST /api/compliance/standards`
**Purpose:** Upload a custom compliance standard

**Request:** Multipart form-data
- `file`: PDF, DOCX, or TXT file
- `name`: Standard name
- `description`: Standard description

**Response:**
```json
{
  "id": "std-custom-002",
  "name": "Custom Standard Name",
  "type": "custom",
  "description": "Description",
  "clauseCount": 0,
  "status": "processing",
  "uploadedDate": "2024-12-20T10:00:00Z",
  "uploadedBy": "user-123",
  "organizationId": "org-456"
}
```

**Note:** The backend should parse the document using LLM and extract clauses asynchronously. Frontend can poll or use webhooks for status updates.

### `DELETE /api/compliance/standards/:id`
**Purpose:** Delete a custom standard (only custom standards can be deleted)

---

### `POST /api/compliance/analyze`
**Purpose:** Upload a document and initiate AI compliance analysis

**Request:** Multipart form-data
- `file`: Document to analyze (PDF, DOCX, TXT)
- `standardIds`: JSON array of standard IDs to check against

**Response:**
```json
{
  "analysisId": "analysis-12345",
  "status": "processing",
  "documentName": "operating-procedure-v2.pdf",
  "documentType": "application/pdf",
  "selectedStandards": ["osha-psm", "epa-rmp"],
  "uploadedDate": "2024-12-20T10:00:00Z"
}
```

**Note:** This initiates an asynchronous analysis. Frontend should poll for results or use webhooks.

### `GET /api/compliance/analyses/:id`
**Purpose:** Get compliance analysis results

**Response:**
```json
{
  "id": "analysis-12345",
  "documentName": "operating-procedure-v2.pdf",
  "documentType": "application/pdf",
  "uploadedDate": "2024-12-20T10:00:00Z",
  "analyzedDate": "2024-12-20T10:05:00Z",
  "selectedStandards": ["osha-psm", "epa-rmp"],
  "status": "complete",
  "findings": [
    {
      "id": "finding-001",
      "violation": "The operating procedure fails to describe the consequences of deviation",
      "standardSource": "OSHA 1910.119(f)(1)(i)(D)",
      "standardClause": "1910.119(f)(1)(i)(D)",
      "evidenceSnippet": "Section 3.2 describes normal operations but does not include deviation consequences",
      "recommendation": "Update Section 3.2 to include a specific subsection on consequences of deviation",
      "actionPlan": [
        "Schedule a review with the lead operator and process engineer",
        "Brainstorm potential deviations (e.g., high pressure, low flow)",
        "Document the safety/health consequences for each deviation",
        "Add the new section to the procedure and route for MOC approval",
        "Train all affected operators on the updated procedure"
      ],
      "status": "pending",
      "dismissReason": null,
      "editedRecommendation": null,
      "editedActionPlan": null
    }
  ]
}
```

### `GET /api/compliance/analyses`
**Purpose:** Get all compliance analyses for the organization

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `status` (optional): Filter by status (processing|complete|error)

**Response:**
```json
{
  "analyses": [
    {
      "id": "analysis-12345",
      "documentName": "operating-procedure-v2.pdf",
      "uploadedDate": "2024-12-20T10:00:00Z",
      "analyzedDate": "2024-12-20T10:05:00Z",
      "status": "complete",
      "findingsCount": 5,
      "acceptedCount": 2,
      "dismissedCount": 1,
      "pendingCount": 2
    }
  ],
  "total": 15,
  "page": 1,
  "limit": 50
}
```

### `PATCH /api/compliance/analyses/:analysisId/findings/:findingId`
**Purpose:** Update a finding (edit, accept, dismiss)

**Request Body:**
```json
{
  "status": "accepted",
  "editedRecommendation": "Updated recommendation text",
  "editedActionPlan": ["Step 1", "Step 2", "Step 3"],
  "dismissReason": "False positive - this is already addressed in Section 5"
}
```

### `POST /api/compliance/analyses/:analysisId/findings/:findingId/create-recommendation`
**Purpose:** Convert an accepted finding into a formal recommendation

**Request Body:**
```json
{
  "facilityId": "fac-001",
  "assigneeId": "user-789",
  "dueDate": "2025-06-15"
}
```

**Response:**
```json
{
  "recommendationId": "rec-new-001",
  "title": "Update operating procedure - consequences of deviation",
  "status": "open"
}
```

### `DELETE /api/compliance/analyses/:id`
**Purpose:** Delete a compliance analysis

---

## File Upload/Storage API

### `POST /api/files/upload`
**Purpose:** Upload files (evidence, attachments, etc.)

**Request:** Multipart form-data
- `file`: File to upload
- `type`: File type category (evidence|attachment|document)
- `relatedId` (optional): Related entity ID (recommendation, MOC, etc.)

**Response:**
```json
{
  "fileId": "file-12345",
  "url": "https://storage.example.com/files/file-12345.pdf",
  "filename": "evidence.pdf",
  "size": 2048576,
  "uploadedDate": "2024-12-20T10:00:00Z"
}
```

### `DELETE /api/files/:id`
**Purpose:** Delete an uploaded file

---

## Users & Organization API

### `GET /api/users`
**Purpose:** Get all users in the organization (for assignee dropdowns, etc.)

**Response:**
```json
{
  "users": [
    {
      "id": "user-123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "process_safety_engineer"
    }
  ]
}
```

### `GET /api/organization`
**Purpose:** Get organization details

**Response:**
```json
{
  "id": "org-456",
  "name": "Acme Chemical Corp",
  "plan": "enterprise",
  "facilitiesCount": 12,
  "usersCount": 45
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "dueDate",
        "message": "Due date must be in the future"
      }
    ]
  }
}
```

**Common Error Codes:**
- `UNAUTHORIZED` (401): Invalid or missing authentication
- `FORBIDDEN` (403): User doesn't have permission
- `NOT_FOUND` (404): Resource not found
- `VALIDATION_ERROR` (400): Invalid request data
- `SERVER_ERROR` (500): Internal server error

---

## WebSocket Events (Optional)

For real-time updates, the backend may implement WebSocket connections:

### Connection
```
ws://api.example.com/ws?token=<jwt-token>
```

### Events

#### `recommendation.updated`
```json
{
  "event": "recommendation.updated",
  "data": {
    "id": "rec-001",
    "status": "in-progress"
  }
}
```

#### `moc.approved`
```json
{
  "event": "moc.approved",
  "data": {
    "id": "moc-001",
    "approvedBy": "user-111"
  }
}
```

#### `analysis.complete`
```json
{
  "event": "analysis.complete",
  "data": {
    "id": "analysis-12345",
    "findingsCount": 5
  }
}
```

---

## Rate Limiting

- Standard endpoints: 100 requests per minute per user
- File upload endpoints: 10 requests per minute per user
- AI analysis endpoints: 5 requests per minute per user

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

---

## Notes for Backend Implementation

1. **Multi-tenancy:** All data must be scoped by `organizationId` to ensure data isolation
2. **Audit Trail:** All create/update/delete operations should be logged with user ID and timestamp
3. **File Storage:** Consider using S3 or similar object storage for file uploads
4. **LLM Integration:** Aura AI features require OpenAI API integration with proper error handling
5. **Database:** Recommended to use PostgreSQL or similar relational database with proper indexing
6. **Caching:** Consider Redis for caching frequently accessed data (facilities, standards)
7. **Background Jobs:** AI analysis and standard parsing should be handled by background workers (e.g., Bull, Celery)
8. **Security:** Implement proper input validation, SQL injection prevention, and XSS protection
9. **CORS:** Configure CORS to allow requests from the frontend domain
10. **API Versioning:** Consider versioning the API (e.g., `/api/v1/`) for future compatibility

---

## Backend Technology Stack Recommendations

- **Framework:** Node.js (Express/Fastify) or Python (FastAPI/Django)
- **Database:** PostgreSQL with Prisma/TypeORM/SQLAlchemy
- **File Storage:** AWS S3 or equivalent
- **Cache:** Redis
- **Message Queue:** Bull/RabbitMQ/Celery for background jobs
- **LLM Integration:** OpenAI API client
- **Authentication:** JWT with refresh tokens
- **Testing:** Jest/Pytest with >80% coverage
- **Documentation:** OpenAPI/Swagger spec

---

## Next Steps for Backend Development

1. Set up the project structure and database schema
2. Implement authentication and authorization
3. Create CRUD endpoints for core entities (Facilities, Recommendations, PHAs, MOCs)
4. Implement analytics aggregation endpoints
5. Build file upload/storage system
6. Integrate OpenAI API for Aura AI features
7. Implement background job processing for AI analysis
8. Add comprehensive error handling and validation
9. Write API tests with high coverage
10. Deploy with proper monitoring and logging

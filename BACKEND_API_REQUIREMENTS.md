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

```json
  "success": true

#### `GET /ap

`
  "id": "user-123
 
  "

---
## Facilities API


- `risk

```json
  "facilities": [
      "id": "fac-001"
      "location": "Houston, TX",
      "riskLevel": "high",
 
   

  "

### `GET /api/fac

```json
  "id": "fac-001",

  "riskLevel": "high"
  "overdueRecommendations": 5,
  "activeMOCs": 3,

}

*
**Request Body:**
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

*
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
**Purpose:** 
**Que
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
## Aura AI Compliance En
### `GET /api/compli

```json
  "standards": 
      
     
      "clauseCount": 14,
      "uploadedBy": 
    },
      "id": "std-cust
      "type": "
     
   
 
}

**Purpose:** Get detailed standard informa
**Response:**

  "name": "OSHA PSM 1
  "description": "OSHA Process Safety Management stand

      "id": "
      "
 
  ]
```
### `POST /api/complian

- `file`: PDF, DOCX, or TXT
- `description`: Standard de
**Response:**
{
  "name": "Custom S
  "descriptio
  "s
  "uploadedBy": "us
}


**P
-
###

- `

```json

  "documentName": "operating-proced
  "selectedStandards": ["osha-psm", "epa-rmp"],



*
**Response:**
{
  "documentName": "oper
  "uploadedDate": "2024-12-20T10:0
  "selectedStandards": ["os
  "findings": [
      "id": "finding-001
      "standardSource": "OS
      "evidenceSnippet": 
      "actionPlan": [
      
     
      ],
      "dismissReason": null,
      "editedActionPlan
  ]
```
### `GET /api/compliance/analyses`

- `page` (optional): Page number
- `st
**R
{
   

      "analyzedDate": "2024-12-20T10:05
      "findingsCount": 5,

    }
  "tota
 
```
### `PATCH /api/compliance/ana

```json
  "status": "accepte
  "editedActio
}

**Purpose:** Convert an accepted finding into
**Request Body:**
{
  "assigneeId": "user-789",
}

`
  "

```
### `DELETE /api/compliance/analyses/:id`



**Purpose:** Upload fil
**Request:** Multipart form-data


```json
 
  "filename": "evidence.p
  "uploadedDate": "2024-12-20T10:
```
### `DELETE /api/files/:id`



**Purpose:** Get all users 
**Response:**
{
   

      "role": "process_safety_engineer"

```
### `GET /api/organization`

```

  "plan": "enterprise",
  "usersCount": 45

---
## Error Responses
All error responses follow this format:

  "error": {
    "me
 
        "message": "Due date must
    ]
}

- `UNAUTHORIZED` (401): Invalid or missing auth
- `NOT_FOUND` (404): Resource not found
-
---

For real-time updates, the backend may implement WebSocket connections:

ws://api.example.com/ws?token=<jwt-tok


```json
  "even
 
  }
```
#### `moc.approved`
{
  "data": {
    "approvedBy": "user-111"
}

```js
  "event": "analysis.compl
    "id": "analysis-12345",
  }
```
---
## Rate Limiting
- Standard endpoints:
- AI analysis endpoints: 5 requests per minute per user
Rate limit headers:
X-RateLimit-Limit: 100
X-RateLimit-Reset: 1640000000



2. **Audit Trail:** All crea
4. **LLM Integration:** Aura AI fea
6. **Caching:** Consider Redis
8. **
10.
-
## 

- **File Storage:** AWS S3 or equi
- **Message Queue:** Bull/RabbitMQ/Celery for background jobs

- **Documentation:** 
---
## Next Steps for Backend Developmen
1. Set up the project structure and database schema

5. Build file
7. Impl
9


























































































































































































































































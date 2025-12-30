# 🚢 Cruise Ship Hospitality CMS - Complete Flowcharts

**Project by:** Carmine D'Alise  
**Date:** December 2025  
**Version:** 1.0

---

## 📋 Table of Contents

1. [System Architecture](#system-architecture)
2. [User Flow Diagrams](#user-flow-diagrams)
3. [Data Flow Diagrams](#data-flow-diagrams)
4. [API Flow](#api-flow)
5. [AI Integration Flow](#ai-integration-flow)
6. [Booking System Flow](#booking-system-flow)
7. [Authentication & Session Flow](#authentication--session-flow)

---

## 🏗️ System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser] 
        B[Mobile Device]
        C[IPTV Kiosk]
    end
    
    subgraph "Frontend Layer - React 19"
        D[React App]
        E[Router]
        F[State Management]
        G[i18n IT/EN]
    end
    
    subgraph "API Layer - FastAPI"
        H[REST API Endpoints]
        I[Pydantic Validation]
        J[CORS Middleware]
    end
    
    subgraph "Business Logic"
        K[Restaurant Service]
        L[Booking Service]
        M[AI Service]
        N[QR Generator]
    end
    
    subgraph "Data Layer"
        O[(MongoDB)]
        P[Motor Async Driver]
    end
    
    subgraph "External Services"
        Q[OpenAI GPT-5.2]
        R[Email Service]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J
    J --> K
    J --> L
    J --> M
    J --> N
    K --> P
    L --> P
    M --> Q
    P --> O
    L --> R
    
    style D fill:#61dafb
    style H fill:#009688
    style O fill:#47A248
    style Q fill:#412991
```

### ASCII Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT DEVICES                          │
│  [Web Browser]    [Mobile]    [IPTV Kiosk]                │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS/REST
                       ↓
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND - React 19 + Tailwind                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Home     │  │Restaurant│  │Excursions│  │ Kiosk    │  │
│  │ Page     │  │ & Menus  │  │ Booking  │  │ Mode     │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │        ChatBot (AI Assistant)                        │  │
│  │        Navigation (Multi-language IT/EN)            │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │ Axios HTTP
                       ↓
┌─────────────────────────────────────────────────────────────┐
│              BACKEND - FastAPI + Python                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ REST API │  │ Pydantic │  │   CORS   │  │   Auth   │  │
│  │ /api/*   │  │Validation│  │Middleware│  │ (Future) │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│  ┌────────────────────────────────────────────────────┐    │
│  │            Business Logic Services                 │    │
│  │  • Restaurant Management  • Booking System         │    │
│  │  • AI Chat Integration   • QR Code Generator      │    │
│  │  • Menu Management       • Entertainment Catalog  │    │
│  └────────────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ↓              ↓              ↓
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  MongoDB    │ │  OpenAI     │ │   Email     │
│  NoSQL DB   │ │  GPT-5.2    │ │  Service    │
│  Collections│ │  AI API     │ │  (Future)   │
└─────────────┘ └─────────────┘ └─────────────┘
```

---

## 👤 User Flow Diagrams

### 1. Guest Browsing & Booking Excursion

```mermaid
flowchart TD
    A[Guest Opens App] --> B{Language?}
    B -->|Italian| C[Set IT]
    B -->|English| D[Set EN]
    C --> E[View Homepage]
    D --> E
    E --> F[Click Excursions]
    F --> G[Browse Available Tours]
    G --> H{Select Tour?}
    H -->|No| G
    H -->|Yes| I[View Tour Details]
    I --> J[Click Book Now]
    J --> K[Fill Booking Form]
    K --> L{Form Valid?}
    L -->|No| M[Show Errors]
    M --> K
    L -->|Yes| N[Submit to API]
    N --> O[Save to MongoDB]
    O --> P[Show Success Toast]
    P --> Q[Email Confirmation]
    Q --> R[Return to Excursions]
    
    style A fill:#4CAF50
    style P fill:#4CAF50
    style M fill:#f44336
```

### 2. Restaurant Menu Access via QR Code

```
┌─────────────┐
│ Guest Scans │
│  QR Code    │
└──────┬──────┘
       │
       ↓
┌──────────────────┐
│ Smartphone Opens │
│ Menu URL         │
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│ GET /menu/:id    │
│ from Backend     │
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│ Fetch Restaurant │
│ + Menu Data      │
│ from MongoDB     │
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│ Render Menu by   │
│ Categories:      │
│ • Antipasti      │
│ • Primi          │
│ • Secondi        │
│ • Desserts       │
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│ Guest Views Menu │
│ with Prices &    │
│ Allergen Info    │
└──────────────────┘
```

### 3. AI Chatbot Interaction Flow

```mermaid
sequenceDiagram
    participant G as Guest
    participant UI as Chat UI
    participant API as FastAPI
    participant AI as OpenAI GPT-5.2
    participant DB as MongoDB
    
    G->>UI: Click Chat FAB
    UI->>G: Open Chat Window
    UI->>G: Show Welcome Message
    G->>UI: Type: "Restaurant hours?"
    UI->>API: POST /api/chat
    API->>API: Create LlmChat Session
    API->>AI: Send Message + Context
    AI->>AI: Process with GPT-5.2
    AI->>API: Return Response
    API->>UI: JSON Response
    UI->>G: Display AI Answer
    G->>UI: Type: "Book excursion"
    UI->>API: POST /api/chat
    API->>AI: Send with History
    AI->>API: Response + Suggestions
    API->>UI: JSON Response
    UI->>G: Show Answer + Links
    
    Note over G,DB: Real-time AI assistance
    Note over API,AI: Context-aware responses
```

### 4. Kiosk Mode Flow

```
     ┌──────────────┐
     │ Kiosk Starts │
     │ Idle Screen  │
     └──────┬───────┘
            │
            ↓
     ┌──────────────┐
     │ Detect Touch │
     └──────┬───────┘
            │
            ↓
     ┌──────────────┐
     │ Show Menu    │
     │ Grid:        │
     │ ┌───┬───┬───┐│
     │ │ 🍽️│ 🏝️│ 🎭││
     │ ├───┼───┼───┤│
     │ │ 📡│ ℹ️│ 🏠││
     │ └───┴───┴───┘│
     └──────┬───────┘
            │
            ↓
     ┌──────────────┐
     │ User Selects │
     │ Category     │
     └──────┬───────┘
            │
     ┌──────┴───────┐
     │              │
     ↓              ↓
┌──────────┐  ┌──────────┐
│Navigate  │  │  Return  │
│to Section│  │ to Idle  │
│          │  │  (30sec) │
└──────────┘  └──────────┘
```

---

## 📊 Data Flow Diagrams

### Restaurant Management Data Flow

```mermaid
flowchart LR
    A[Admin Panel] -->|Create/Update| B[POST /api/restaurants]
    B --> C[Pydantic Validation]
    C -->|Valid| D[Business Logic]
    C -->|Invalid| E[Return 400 Error]
    D --> F[MongoDB Insert/Update]
    F --> G[Return Restaurant Object]
    
    H[Guest App] -->|View Menu| I[GET /api/restaurants/:id]
    I --> J[Query MongoDB]
    J --> K[Exclude _id Field]
    K --> L[Return JSON]
    L --> H
    
    M[QR Scanner] -->|Scan| N[GET /menu/:id]
    N --> J
    
    style D fill:#2196F3
    style F fill:#4CAF50
    style E fill:#f44336
```

### Booking System Data Flow

```
┌─────────────┐
│   Guest     │
│   Form      │
└──────┬──────┘
       │ {name, email, date, guests}
       ↓
┌──────────────────┐
│ POST /api/       │
│ bookings         │
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│ Pydantic Model   │
│ Validation       │
│ • email format   │
│ • date valid     │
│ • guests > 0     │
└──────┬───────────┘
       │
       ├─[Invalid]──→ Error 422
       │
       ↓ [Valid]
┌──────────────────┐
│ Generate UUID    │
│ Add Timestamp    │
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│ MongoDB Insert   │
│ bookings         │
│ collection       │
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│ Return Booking   │
│ Confirmation     │
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│ Email Service    │
│ (Future)         │
└──────────────────┘
```

---

## 🔌 API Flow

### Complete API Request Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant N as Nginx
    participant F as FastAPI
    participant M as Middleware
    participant V as Validation
    participant S as Service
    participant DB as MongoDB
    
    C->>N: HTTPS Request
    N->>F: Forward to :8001/api/*
    F->>M: CORS Check
    M->>M: Verify Origin
    alt CORS Failed
        M->>C: 403 Forbidden
    else CORS OK
        M->>V: Route to Endpoint
        V->>V: Pydantic Validation
        alt Validation Failed
            V->>C: 422 Unprocessable
        else Valid
            V->>S: Execute Business Logic
            S->>DB: Query/Insert Data
            DB->>S: Return Result
            S->>S: Exclude _id Fields
            S->>C: 200 OK + JSON
        end
    end
```

### API Endpoints Map

```
/api/
├── GET  /                     # Health Check
├── POST /init-data            # Initialize Sample Data
│
├── /restaurants
│   ├── GET  /                 # List All
│   ├── GET  /:id              # Get One
│   └── POST /                 # Create (Admin)
│
├── /excursions
│   ├── GET  /                 # List All
│   └── POST /                 # Create (Admin)
│
├── /bookings
│   ├── POST /                 # Create Booking
│   └── GET  /                 # List All (Admin)
│
├── /entertainment
│   ├── GET  /                 # List Events
│   └── POST /                 # Create (Admin)
│
├── /packages
│   ├── GET  /                 # List Internet Packages
│   └── POST /                 # Create (Admin)
│
├── /services
│   ├── GET  /                 # List Guest Services
│   └── POST /                 # Create (Admin)
│
├── POST /chat                 # AI Chatbot
│   Input: {message, session_id}
│   Output: {response, session_id}
│
└── GET /qrcode/:restaurant_id # Generate QR Code
    Output: {qr_code: base64, url: string}
```

---

## 🤖 AI Integration Flow

### GPT-5.2 Chat Integration

```mermaid
flowchart TD
    A[User Sends Message] --> B[Frontend Chat Component]
    B --> C[POST /api/chat]
    C --> D{Session Exists?}
    D -->|No| E[Create New Session]
    D -->|Yes| F[Load Session]
    E --> G[Initialize LlmChat]
    F --> G
    G --> H[Set System Prompt]
    H --> I["Prompt: Cruise concierge assistant"]
    I --> J[Add User Message]
    J --> K[Call GPT-5.2 API]
    K --> L[Emergent LLM Key]
    L --> M[OpenAI Endpoint]
    M --> N[GPT-5.2 Processing]
    N --> O[Context-Aware Response]
    O --> P[Return to Backend]
    P --> Q[Format Response]
    Q --> R[Save to Session]
    R --> S[Return JSON to Frontend]
    S --> T[Display in Chat UI]
    
    style K fill:#412991
    style O fill:#10a37f
```

### AI System Prompt

```python
system_message = """
You are a helpful cruise ship concierge assistant.

Help guests with information about:
- Restaurants (hours, menus, reservations)
- Excursions (availability, booking, details)
- Entertainment (show times, venues)
- Ship services (reception, spa, facilities)
- Internet packages (pricing, features)

Be:
- Friendly and professional
- Concise but informative
- Context-aware
- Multi-lingual (Italian/English)

Response format: Clear, helpful answers
"""
```

---

## 📱 Multi-Language Flow

### i18n Implementation

```
┌──────────────┐
│  User Opens  │
│     App      │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│Check LocalStorage│
│ for language │
└──────┬───────┘
       │
  ┌────┴────┐
  │         │
  ↓         ↓
[IT]      [EN]
  │         │
  ↓         ↓
┌─────────────────┐
│ Load Translation│
│ Files:          │
│ • translations/ │
│   ├─ it.json    │
│   └─ en.json    │
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│ Render UI with  │
│ t('key') helper │
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│ User Clicks     │
│ Language Toggle │
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│ Switch Language │
│ Save to Storage │
│ Re-render UI    │
└─────────────────┘
```

---

## 🔐 Authentication Flow (Future)

### Proposed Auth Architecture

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth API
    participant DB as MongoDB
    participant T as Token Service
    
    U->>F: Enter Credentials
    F->>A: POST /api/auth/login
    A->>DB: Query User
    alt User Not Found
        DB->>A: null
        A->>F: 401 Unauthorized
    else User Found
        DB->>A: User Data
        A->>A: Verify Password
        alt Password Wrong
            A->>F: 401 Unauthorized
        else Password OK
            A->>T: Generate JWT
            T->>A: Token + Refresh Token
            A->>F: 200 OK + Tokens
            F->>F: Store in LocalStorage
            F->>U: Redirect to Dashboard
        end
    end
```

---

## 📈 Performance Flow

### Optimization Strategy

```
Client Request
      │
      ↓
┌─────────────┐
│  CDN Cache  │ ← Static Assets (Images, CSS, JS)
└─────┬───────┘
      │ [Miss]
      ↓
┌─────────────┐
│   Nginx     │ ← Reverse Proxy
└─────┬───────┘
      │
      ↓
┌─────────────┐
│   FastAPI   │ ← Async Handlers
│   (Async)   │
└─────┬───────┘
      │
      ↓
┌─────────────┐
│   Motor     │ ← Async MongoDB Driver
│  (Async)    │
└─────┬───────┘
      │
      ↓
┌─────────────┐
│  MongoDB    │ ← Indexed Queries
│   Indexes:  │
│   • id      │
│   • type    │
└─────────────┘

Optimizations:
✓ Async/Await throughout
✓ MongoDB connection pooling
✓ React code splitting
✓ Lazy loading routes
✓ Image optimization
✓ Tailwind CSS purging
```

---

## 🎯 Complete User Journey Map

### Guest Experience Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    GUEST ARRIVAL                             │
│                                                              │
│  1. Opens App/Kiosk                                         │
│     ↓                                                        │
│  2. Selects Language (IT/EN)                                │
│     ↓                                                        │
│  3. Views Homepage                                          │
│     ├─→ Browse Restaurants → View Menus → Scan QR          │
│     ├─→ Browse Excursions → Book Tour                       │
│     ├─→ Check Entertainment → View Schedule                 │
│     ├─→ Guest Services → Get Information                    │
│     ├─→ Internet Packages → Purchase                        │
│     └─→ AI Chat → Ask Questions                             │
│                                                              │
│  4. Concurrent Activities:                                  │
│     • Chat with AI assistant for help                       │
│     • Switch languages anytime                              │
│     • Navigate between sections                             │
│                                                              │
│  5. Make Booking:                                           │
│     ↓                                                        │
│     Fill Form → Validate → Submit → Confirm                 │
│     ↓                                                        │
│     Email Confirmation (Future)                             │
│                                                              │
│  6. Return to Browse or Exit                                │
└──────────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema Flow

### MongoDB Collections Relationships

```mermaid
erDiagram
    RESTAURANTS ||--o{ MENU_ITEMS : contains
    EXCURSIONS ||--o{ BOOKINGS : has
    GUESTS ||--o{ BOOKINGS : makes
    ENTERTAINMENT ||--o{ VENUES : hosted_at
    
    RESTAURANTS {
        string id PK
        string name
        string type
        string description
        string hours
        string image_url
        array menu
    }
    
    MENU_ITEMS {
        string id PK
        string name
        string description
        float price
        string category
        array allergens
    }
    
    EXCURSIONS {
        string id PK
        string name
        string description
        string duration
        float price
        string image_url
        array available_dates
    }
    
    BOOKINGS {
        string id PK
        string excursion_id FK
        string guest_name
        string guest_email
        string date
        int num_guests
        datetime created_at
    }
    
    ENTERTAINMENT {
        string id PK
        string name
        string type
        string description
        string venue
        string time
        string image_url
    }
```

---

## 🔄 Deployment Flow

### Emergent Platform Deployment

```
┌─────────────────┐
│  Local /app/    │
│  Development    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Click "Deploy"  │
│ in Emergent UI  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Build Process  │
│  • Backend      │
│  • Frontend     │
│  • Dependencies │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Container      │
│  Creation       │
│  • Docker Image │
│  • Supervisor   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Start Services │
│  • MongoDB      │
│  • Backend:8001 │
│  • Frontend:3000│
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Nginx Proxy    │
│  • /api → 8001  │
│  • / → 3000     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  DNS Mapping    │
│  *.preview.     │
│  emergentagent  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   LIVE URL      │
│ cruise-cms.     │
│ preview.        │
│ emergentagent   │
│ .com            │
└─────────────────┘

Cost: 50 credits/month
Uptime: 24/7
SSL: Automatic
URL: Permanent
```

---

## 📋 Summary

This document provides complete flowcharts for:

✅ **System Architecture** - High-level and detailed views  
✅ **User Flows** - All major user journeys  
✅ **Data Flows** - How data moves through the system  
✅ **API Flows** - Request/response cycles  
✅ **AI Integration** - GPT-5.2 implementation  
✅ **Database Schema** - MongoDB relationships  
✅ **Deployment** - From code to production  

**Use Cases:**
- Technical presentations
- Client proposals
- Team onboarding
- Documentation
- Portfolio showcase

---

**Created by:** Carmine D'Alise  
**Project:** Cruise Ship Hospitality CMS  
**GitHub:** github.com/iacreatorcar/cruise-hospitality-cms  
**LinkedIn:** linkedin.com/in/carmine-d-alise-3b25024b

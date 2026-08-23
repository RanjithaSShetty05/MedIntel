# MedIntel — Clinical Triage & Decision Support Platform

MedIntel is a full-stack clinical decision-support platform with a React-based frontend connected to a Spring Boot REST API.

The frontend provides the user interface for authentication, clinical case management, patient details, AI-assisted insights, timelines, doctor notes, drug safety analysis, reports, audit logs, search, and dashboard analytics.

> **Important:** MedIntel is a clinical decision-support system. AI-generated information is intended to assist qualified healthcare professionals and does not replace professional medical diagnosis or clinical judgment.

---

## Frontend Architecture

```text
                    ┌─────────────────────────┐
                    │      React Frontend      │
                    │                         │
                    │ React + Vite            │
                    │ Axios                   │
                    │ Tailwind CSS             │
                    │ JWT Authentication       │
                    └────────────┬────────────┘
                                 │
                                 │ REST API
                                 │ Authorization: Bearer JWT
                                 ▼
                    ┌─────────────────────────┐
                    │    Spring Boot Backend  │
                    │       Port 8080         │
                    └────────────┬────────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
               PostgreSQL              Python AI Service
                                        Port 8001
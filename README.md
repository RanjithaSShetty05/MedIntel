# 🩺 MedIntel

<h1 align="center">MedIntel</h1>

<h2 align="center">AI-Powered Clinical Triage & Decision Support Platform</h2>

<p align="center">
<strong>Clinical Intelligence • Structured Patient Information • AI-Assisted Decision Support</strong>
</p>

<p align="center">
<a href="https://react.dev/"><img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black"></a>
<a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"></a>
<a href="https://axios-http.com/"><img src="https://img.shields.io/badge/Axios-REST%20Client-5A29E4?style=for-the-badge&logo=axios&logoColor=white"></a>
<a href="https://spring.io/projects/spring-boot"><img src="https://img.shields.io/badge/Spring%20Boot-Backend-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"></a>
<a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"></a>
<a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-AI%20Service-3776AB?style=for-the-badge&logo=python&logoColor=white"></a>
<a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-Containerization-2496ED?style=for-the-badge&logo=docker&logoColor=white"></a>
<a href="https://github.com/"><img src="https://img.shields.io/badge/Git-GitHub-F05032?style=for-the-badge&logo=git&logoColor=white"></a>
<a href="https://opensource.org/license/mit"><img src="https://img.shields.io/badge/License-MIT-black?style=for-the-badge"></a>
</p>

---

## 🌐 Project Overview

**MedIntel** is an AI-powered Clinical Triage & Decision Support Platform designed to transform fragmented clinical information into structured, accessible, and explainable clinical insights.

The platform provides healthcare professionals with a unified clinical workspace for interacting with:

- 👤 Patient information
- 🏥 Clinical cases
- 🩺 Symptoms
- 💊 Medications
- ⚠️ Risk factors
- 🕒 Clinical timelines
- 📝 Doctor notes
- 💊 Drug-safety information
- 📄 Clinical reports
- 🔎 Clinical search
- 🛡️ Audit and activity information
- 🧠 AI-assisted clinical analysis

This repository contains the **React frontend** of the MedIntel platform.

The frontend communicates with the MedIntel backend through REST APIs and presents clinical information through a structured and user-friendly interface.

> ⚠️ **Responsible AI Notice:** MedIntel is a clinical decision-support system. AI-generated information is intended to assist qualified healthcare professionals and does not replace professional medical diagnosis, treatment decisions, or clinical judgment.

---

# 🎯 Project Vision

Clinical information can be distributed across patient records, symptoms, medications, clinical notes, risk factors, timelines, and previous events.

MedIntel brings these information sources together into a unified clinical workspace.

```text
                    PATIENT INFORMATION
                            │
                            ▼
                      CLINICAL CASE
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
         Symptoms       Medications    Risk Factors
             │              │              │
             └──────────────┼──────────────┘
                            │
                            ▼
                    AI-ASSISTED ANALYSIS
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
          Summary        Prediction       Urgency
             │              │              │
             └──────────────┼──────────────┘
                            │
                            ▼
                  STRUCTURED INSIGHTS
                            │
                            ▼
                   PROFESSIONAL REVIEW
```

---

# ✨ Features

## 🔐 User Authentication

- Secure login interface
- Authentication workflow
- Protected clinical workspace
- Session-aware navigation
- User access management

---

## 📊 Clinical Dashboard

The dashboard provides a centralized overview of important clinical information.

### Capabilities

- Clinical activity overview
- Patient statistics
- Clinical case statistics
- Recent activity
- Clinical alerts
- Timeline information
- Data visualization
- Quick navigation
- Structured clinical summaries

---

## 🏥 Clinical Case Management

MedIntel provides a dedicated workspace for managing clinical cases.

### Capabilities

- Clinical case management
- Patient association
- Symptom information
- Medication information
- Risk factors
- Clinical observations
- AI-assisted analysis
- Clinical decision-support information

---

## 👤 Patient Information

The Patient module provides structured access to patient-related information.

### Includes

- Patient profiles
- Demographic information
- Clinical information
- Medical history
- Symptoms
- Medications
- Risk factors
- Previous events
- Clinical timeline
- Related clinical cases

---

## 🕒 Clinical Timeline

The Clinical Timeline provides a chronological representation of important patient events.

It helps healthcare professionals understand:

- Previous clinical events
- Patient activity
- Symptoms
- Notes
- Case history
- Timeline events
- Important changes over time

---

## 📝 Doctor Notes

A dedicated workspace for clinical notes and observations.

### Includes

- Clinical observations
- Medical notes
- Case-related information
- Patient observations
- Professional documentation

---

## 💊 Drug Safety

The Drug Safety module provides an interface for medication-related information.

### Includes

- Medication information
- Drug-safety information
- Medication-related alerts
- Clinical context
- Patient-related medication information

---

## 📄 Clinical Reports

The platform provides structured access to clinical reports.

### Includes

- Clinical reports
- Patient-related reports
- Structured report information
- Clinical summaries
- Organized clinical information

---

## 🔎 Clinical Search

Clinical Search helps users quickly locate relevant clinical information throughout the platform.

The feature is designed to improve accessibility to patient and clinical information within the workspace.

---

## 🛡️ Audit & Activity

MedIntel provides visibility into system and clinical activity to support a structured and traceable clinical workspace.

---

# 🧠 AI-Assisted Decision Support

MedIntel integrates AI-assisted analysis into the clinical workflow.

The objective is to transform unstructured clinical information into structured insights that can be reviewed by qualified healthcare professionals.

### AI-Assisted Capabilities

- Clinical summarization
- Symptom extraction
- Entity extraction
- Clinical information structuring
- Risk-related analysis
- Prediction support
- Urgency assessment
- Decision-support information

### AI Workflow

```text
Patient Information
        │
        ▼
Clinical Case
        │
        ▼
Symptoms + Medications + Risk Factors
        │
        ▼
AI Analysis
        │
   ┌────┼────┐
   ▼    ▼    ▼
Summary Prediction Urgency
   │    │    │
   └────┼────┘
        ▼
Structured Clinical Insights
        │
        ▼
Professional Review
```

> AI-generated results are intended as decision-support information and must be reviewed by qualified healthcare professionals.

---

# 🚀 Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React, JavaScript, HTML5, CSS3 |
| Build Tool | Vite |
| HTTP Client | Axios |
| Backend | Spring Boot |
| API | REST APIs |
| Database | PostgreSQL |
| AI Service | Python |
| Containerization | Docker, Docker Compose |
| Version Control | Git |
| Repository | GitHub |

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │      React UI       │
                         │      MedIntel       │
                         └──────────┬──────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌─────────────────────┐
                         │    Spring Boot      │
                         │    REST Backend     │
                         └─────────┬─────┬─────┘
                                   │     │
                     ┌─────────────┘     └─────────────┐
                     ▼                                 ▼
             ┌────────────────┐              ┌────────────────┐
             │   PostgreSQL   │              │  Python AI     │
             │    Database    │              │    Service     │
             └────────────────┘              └────────────────┘
```

---

# 🖥️ Frontend Architecture

```text
React Application
        │
        ▼
Reusable UI Components
        │
        ▼
Clinical Application Pages
        │
        ▼
API / Services Layer
        │
        ▼
Axios REST Client
        │
        ▼
MedIntel Spring Boot API
```

---

# 📁 Project Structure

```text
MedIntel/
│
├── public/
│   └── Static frontend assets
│
├── src/
│   ├── components/
│   │   └── Reusable UI components
│   │
│   ├── pages/
│   │   └── Application pages
│   │
│   ├── services/
│   │   └── API communication
│   │
│   ├── assets/
│   │   └── Images and frontend assets
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

# ⚙️ Getting Started

## 📋 Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git

Verify the installation:

```bash
node --version
npm --version
git --version
```

---

# 📥 Installation

Clone the repository:

```bash
git clone https://github.com/RanjithaSShetty05/MedIntel.git
```

Navigate into the project:

```bash
cd MedIntel
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Run the Application

Start the Vite development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

# 🏭 Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# 🔌 Backend Integration

The frontend communicates with the MedIntel backend through REST APIs.

### Backend Repository

https://github.com/ITSMEANVITH/MedIntel

### Application Flow

```text
React Frontend
      │
      │ Axios
      ▼
REST API
      │
      ▼
Spring Boot Backend
      │
      ├──────────────► PostgreSQL
      │
      └──────────────► Python AI Service
```

---

# 🔗 API Communication

The frontend uses **Axios** to communicate with backend REST endpoints.

```text
User Interaction
       │
       ▼
React Component
       │
       ▼
API Service
       │
       ▼
Axios Request
       │
       ▼
Spring Boot REST API
       │
       ▼
Backend Response
       │
       ▼
React UI Update
```

---

# 📸 Screenshots

## 🔐 Login

![MedIntel Login](https://raw.githubusercontent.com/ITSMEANVITH/MedIntel/main/screenshots/login.png)

---

## 📊 Dashboard

![MedIntel Dashboard](https://raw.githubusercontent.com/ITSMEANVITH/MedIntel/main/screenshots/dashboard.png)

---

## 🏥 Clinical Case

![Clinical Case](https://raw.githubusercontent.com/ITSMEANVITH/MedIntel/main/screenshots/clinicalcase.png)

---

## 👤 Patient Information

![Patient Information](https://raw.githubusercontent.com/ITSMEANVITH/MedIntel/main/screenshots/patients.png)

---

## 🕒 Clinical Timeline

![Clinical Timeline](https://raw.githubusercontent.com/ITSMEANVITH/MedIntel/main/screenshots/timeline.png)

---

## 📝 Doctor Notes

![Doctor Notes](https://raw.githubusercontent.com/ITSMEANVITH/MedIntel/main/screenshots/doctornote.png)

---

## 💊 Drug Safety

![Drug Safety](https://raw.githubusercontent.com/ITSMEANVITH/MedIntel/main/screenshots/drugsafety.png)

---

## 📄 Clinical Reports

![Clinical Reports](https://raw.githubusercontent.com/ITSMEANVITH/MedIntel/main/screenshots/report.png)

---

# 🔥 Highlights

- 🧠 AI-assisted clinical decision support
- 📊 Modern clinical dashboard
- 👤 Structured patient information
- 🏥 Clinical case management
- 🕒 Clinical timeline
- 📝 Doctor notes
- 💊 Drug-safety information
- 📄 Clinical reports
- 🔎 Clinical search
- 🛡️ Audit and activity information
- 🔐 Authentication workflow
- ⚡ React + Vite architecture
- 🔌 REST API integration
- 📱 Responsive user interface
- 🧩 Reusable frontend components
- 🎨 Professional healthcare-oriented UI
- 🚀 Production-oriented architecture

---

# 🎨 UI/UX Design

MedIntel focuses on creating a professional clinical workspace with emphasis on:

- Clear information hierarchy
- Minimal cognitive load
- Structured clinical data
- Consistent navigation
- Responsive layouts
- Accessible interfaces
- Professional healthcare-oriented visual design
- Fast access to important information

The interface is designed to make complex clinical information easier to understand and navigate.

---

# 🔒 Security & Responsible AI

MedIntel operates in a domain where information accuracy and responsible use are critical.

The project follows principles including:

- Authentication-based access
- Structured clinical information
- Controlled API communication
- Separation of frontend and backend responsibilities
- Human review of AI-generated information
- Professional oversight of clinical decisions

> ⚠️ **Important:** MedIntel is a clinical decision-support project. It is not intended to independently diagnose patients, prescribe treatment, or replace qualified healthcare professionals.

---

# 🧪 Development Workflow

```text
UI / UX Design
      │
      ▼
React Component Development
      │
      ▼
REST API Integration
      │
      ▼
Backend Integration
      │
      ▼
Testing
      │
      ▼
Production Build
```

---

# 📦 Repository Responsibilities

This repository represents the **frontend side** of the MedIntel platform.

## 🎨 Frontend — Ranjitha S Shetty

Responsibilities:

- React frontend development
- UI/UX design
- Responsive interface
- Frontend component development
- Clinical dashboard
- Clinical workspace
- Frontend API integration
- User experience design

## ⚙️ Backend & AI — Anvith C D

Responsibilities:

- Spring Boot backend
- REST API development
- PostgreSQL database integration
- Authentication
- Python AI service integration
- Backend architecture
- System integration

---

# 👥 Contributors

## 🎨 Ranjitha S Shetty

**Frontend Developer & UI/UX Designer**

### Contributions

- React frontend development
- UI/UX design
- Responsive user interface
- Frontend component development
- Clinical workspace design
- Dashboard development
- API integration
- User experience design

GitHub:

https://github.com/RanjithaSShetty05

---

## ⚙️ Anvith C D

**Backend Developer & AI Integration**

### Contributions

- Spring Boot backend
- REST API development
- PostgreSQL database integration
- Authentication system
- Python AI service integration
- Backend architecture
- System integration

GitHub:

https://github.com/ITSMEANVITH

---

# 🎓 Academic Information

### Institution

**K S Institute of Technology**

### Department

**Computer Science and Design (CSD)**

### Project

**MedIntel — AI-Powered Clinical Triage & Decision Support Platform**

---

# 🔗 Project Links

### 🎨 Frontend Repository

https://github.com/RanjithaSShetty05/MedIntel

### ⚙️ Backend Repository

https://github.com/ITSMEANVITH/MedIntel

---

# 🗺️ Future Enhancements

Potential future improvements include:

- 🤖 Advanced AI clinical recommendations
- 🔎 Improved semantic clinical search
- 📊 Advanced clinical analytics
- 🔔 Real-time clinical notifications
- 🧠 More advanced clinical prediction models
- 📱 Mobile application
- 🌐 Progressive Web App support
- 👥 Multi-role healthcare access
- 🔐 Advanced authorization
- 📈 Advanced patient analytics
- 🧬 Expanded clinical knowledge integration

---

# 📈 Project Status

**🚀 Active Development**

MedIntel is being developed as a full-stack clinical intelligence platform consisting of a React frontend, Spring Boot backend, PostgreSQL database, and Python-based AI services.

---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

# 📜 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for the complete license text.

---

# ❤️ Developed By

<p align="center">

### 🎨 Ranjitha S Shetty

**Frontend Developer & UI/UX Designer**

<br>

### ⚙️ Anvith C D

**Backend Developer & AI Integration**

<br>

**K S Institute of Technology**  
**Computer Science and Design**

</p>

---

<p align="center">

## 🩺 MedIntel

### Transforming Clinical Information into Structured Intelligence

**React • Spring Boot • PostgreSQL • Python AI • REST APIs**

</p>

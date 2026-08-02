# MediMind AI — Clinical Precision Intelligence & Healthcare Ecosystem (v4.2)

[![Live Web Application](https://img.shields.io/badge/Live%20App-medi--mind--ai--kw8y.vercel.app-0066FF?style=for-the-badge&logo=vercel)](https://medi-mind-ai-kw8y.vercel.app/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-klu2300030639%2FMediMind--AI-181717?style=for-the-badge&logo=github)](https://github.com/klu2300030639/MediMind-AI)
[![Version](https://img.shields.io/badge/Version-v4.2%20Production-10B981?style=for-the-badge)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-React%2018%20%2B%20Vite-3178C6?style=for-the-badge&logo=typescript)](#)

---

## 🌟 Executive Summary

**MediMind AI** is a state-of-the-art clinical intelligence platform designed to bridge patient symptom reporting, vital telemetry, document OCR analysis, over-the-counter (OTC) medication guidance, and location-based medical specialist discovery into a unified, secure digital health ecosystem.

### 🌐 Live Production Deployment
- **Official Live Web Link**: [https://medi-mind-ai-kw8y.vercel.app/](https://medi-mind-ai-kw8y.vercel.app/)
- **GitHub Repository**: [https://github.com/klu2300030639/MediMind-AI](https://github.com/klu2300030639/MediMind-AI)

---

## 🔥 Key Features & Capabilities (v4.2)

### 🔒 1. Strict Authentication Privacy Gate
- **Zero Pre-Login View**: Unauthenticated visitors are restricted to the Landing Portal and Auth Modal to protect patient privacy.
- **Persistent Client Sessions**: Secure local session storage (`medimind_active_patient_session`) ensuring data privacy per patient.

### 🔑 2. Inline Password Reset & Comprehensive Profile
- **Inline Email OTP Reset**: Reset password via 6-digit OTP directly inside the Sign In form.
- **PIN & ZIP Code Auto-Fill**: Automatically fetches City, State, and Country from 6-digit Indian PIN codes (`api.postalpincode.in`) or US ZIP codes.
- **Country Dial Code Selector**: Supports international phone numbers (`+91`, `+1`, `+44`, etc.).
- **Emergency Contact Editing**: Editable emergency contact name & phone in profile settings.
- **Self-Pay / N/A Insurance Support**: Handles "Not Applicable / Self-Pay" insurance records seamlessly.

### 🤖 3. AI Health Assistant & OTC Medication Engine
- **Symptom Medicine Guidance**: Recommends safe OTC medications (e.g. Paracetamol 500mg, Ibuprofen 200mg for headaches, Cetirizine for colds, Antacids for acidity).
- **Non-Pharmacological Care Advice**: Gives actionable rest and recovery instructions (e.g. 500ml water hydration, dim-light quiet rest, cold compresses).
- **Clinical Safety Guardrails**: Built-in dosage limits and emergency physician escalation warnings.

### 📍 4. Location-Based All-Doctor Finder
- **GPS & Registered City Discovery**: Detects live GPS coordinates or uses patient profile city to discover nearby doctors.
- **All Specialties & General Practice**: Finds General Physicians, Cardiologists, Neurologists, Pediatricians, Dermatologists, Dentists, Orthopedics, and ENTs.
- **Proximity Distance Badges**: Displays distance in kilometers (e.g., `0.6 km away`, `1.2 km away`, `2.4 km away`).
- **Specialty Filter Bar**: Filter by medical category instantly.

### 🩺 5. 3D Symptom Checker & Pain Severity Triage
- Interactive body part selection with a 1-10 pain severity slider and real-time clinical triage risk classification.

### 📄 6. Lab Report OCR Document Analyzer
- Drag-and-drop PDF lab report analyzer extracting key clinical metrics (Hemoglobin, HbA1c, Total Cholesterol) with automated abnormality flagging.

### 📊 7. Vital Telemetry & Wearable Sync
- Real-time physiological telemetry tracking Heart Rate Variability (HRV), Systolic/Diastolic BP, SpO2 Oxygen saturation, and Sleep duration.

### ⏰ 8. Medicine Reminders & Digital Pill Tracker
- Interactive medication schedule with time-of-day slots (Morning, Afternoon, Evening, Bedtime) and pill refill alerts.

### 🚨 9. 5-Second Emergency Panic SOS
- Emergency SOS trigger broadcasting live GPS location to registered emergency contact and dispatch services.

### ℹ️ 10. Platform Mission & About Us Section
- Comprehensive overview of MediMind AI's clinical vision, HIPAA/GDPR privacy architecture, and ethical AI guidelines.

---

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript & Vite
- **UI & Icons**: Lucide React, Tailwind CSS & Custom CSS Token System
- **Location APIs**: Browser Geolocation API, Postal Pin Code Open API, Zippopotam US API
- **Deployment**: Vercel Automated Webhook CI/CD Pipeline
- **Version Control**: Git & GitHub (`klu2300030639/MediMind-AI`)

---

## 🚀 Local Development Setup

To run MediMind AI locally on your system:

```bash
# 1. Clone the repository
git clone https://github.com/klu2300030639/MediMind-AI.git

# 2. Navigate to project directory
cd MediMind-AI

# 3. Install dependencies
npm install

# 4. Start Vite development server
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173) in your browser.

To build for production:

```bash
npm run build
```

---

## 📜 License & Medical Disclaimer

MediMind AI is built for clinical intelligence, symptom analysis, and patient empowerment. It does not replace professional medical diagnosis or treatment. Always consult a certified healthcare professional for medical emergencies.

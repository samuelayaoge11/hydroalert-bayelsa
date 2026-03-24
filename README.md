# HydroAlert Bayelsa: Intelligent Hydrological Monitoring & Early Warning System

## 🌊 Overview

HydroAlert Bayelsa is a real-time IoT-integrated web application designed to monitor water levels across the eight Local Government Areas (LGAs) of Bayelsa State. Built with a focus on disaster risk reduction, the system provides civil authorities and residents with live telemetry, flood risk visualizations, and a database of gazetted environmental regulations.

### 📍 Regional Focus

The system tracks sensor nodes deployed in high-risk communities including:

- **Yenagoa:** Epie Creek, Amarata, Igbogene
- **Brass:** Akassa, Okpoama, Twon-Brass
- **Southern Ijaw:** Oporoma, Amassoma, Otuan
- **Sagbama, Ekeremor, Ogbia, Nembe, and Kolokuma/Opokuma.**

---

## 🚀 Key Features

- **Real-Time Telemetry:** Live data streaming of water levels using Firebase Firestore listeners, with 5-second polling intervals.
- **Interactive Flood Map:** Geographic visualization using Leaflet.js, featuring color-coded status markers (Normal, Warning, Critical).
- **Legal Compliance Database:** A searchable repository of official government regulations from **NESREA**, **NIHSA**, and **BSPPDB**.
- **Early Warning Alerts:** Automated logging of critical water level breaches to trigger evacuation protocols.
- **Responsive Dashboard:** Built with Tailwind CSS for seamless access across mobile and desktop devices.

---

## 🛠️ Technical Stack

- **Frontend:** React 18, TypeScript, Vite
- **State Management:** React Hooks (useEffect, useState)
- **Backend & Database:** Firebase (Firestore, Authentication)
- **Mapping:** React-Leaflet (OpenStreetMap API)
- **Data Visualization:** Recharts (Area/Line trends)
- **Icons:** Lucide-React

---

## ⚖️ Regulatory Framework

This system incorporates official legal mandates to ensure administrative compliance:

1.  **S.I. No. 26 of 2009:** National Environmental (Wetlands, River Banks and Lake Shores Protection) Regulations.
2.  **Bayelsa State Physical Planning Act:** Section 42 (High-Risk Flood Zone Mandates).
3.  **NIHSA Annual Flood Outlook (AFO):** Hydrological Peak Window Directives.

---

## ⚙️ Installation & Setup

1. Clone the repository from the source link.
2. Install dependencies:
   ```bash
   npm install
   ```

Configure the environment:

Create a .env file in the root directory.

Add your Firebase API keys and project configuration.

Start the development server:

Bash
npm run dev

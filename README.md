# 🐾 Pet Shop Mobile Application

A professional, high-performance mobile application built with **React Native (Expo)** and **TypeScript**. This app allows users to list pets for sale, fetch random pet images from an API, and manage a shopping cart with persistent data.

---

## 🚀 Features

- **Pet Listing:** A clean, card-based UI showing pet details (Name, Breed, Age, Price).
- **Add Pet Form:** 
  - Real-time validation using **Zod** and **React Hook Form**.
  - Image upload from **Camera** or **Gallery**.
  - **Random Image Fetching:** One-click to get a pet photo from the Dog CEO API.
- **Shopping Cart:**
  - Add/Remove items.
  - Automatic total price calculation.
  - Interactive Tab Badge (shows number of items in cart).
- **Persistent State:** All data (pets and cart) is saved locally using **Zustand + AsyncStorage**. Even if you close the app, your data remains!

---

## 🛠 Libraries & Tech Stack

| Library | Purpose |
| :--- | :--- |
| **React Native (Expo)** | Cross-platform framework for iOS & Android. |
| **TypeScript** | Ensures type safety and reduces bugs. |
| **Zustand** | Global state management (Lightweight & Fast). |
| **Async Storage** | To keep data saved on the device permanently. |
| **React Hook Form** | Efficient form handling. |
| **Zod** | Schema-based validation for pet details. |
| **Axios** | Handling API requests (POST to ReqRes, GET from Dog CEO). |
| **Lucide React Native** | Clean and modern icons. |
| **React Native Toast** | Professional success/error notifications. |

---

## 🏗 Architecture Overview

The app follows a **Modular Clean Architecture**:

1.  **`/src/components`**: Reusable UI elements (Buttons, Inputs, Cards).
2.  **`/src/screens`**: Main pages of the app (Home, Add Pet, Cart).
3.  **`/src/store`**: Centralized logic using Zustand. Includes **Middleware** to sync state with local phone storage.
4.  **`/src/navigation`**: Type-safe navigation configuration.
5.  **`/src/constants`**: Centralized theme (Colors, Spacing).
6.  **`/src/types`**: TypeScript interfaces for data consistency.

---

## 🌐 API Usage Reasoning

- **Dog CEO API (GET):** Used to provide a "Random Image" feature. This enhances UX by allowing users to quickly see how a listing looks without needing their own photo.
- **ReqRes API (POST):** Used to simulate a real-world server submission. It validates that our form data is correctly structured before we update our local store.

---

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-link>
   cd PetShop

2. **Install Dependencies:**

    npm install

3.  **Install AsyncStorage (if not already installed):**

    npx expo install @react-native-async-storage/async-storage

4. **Start The App:**
    npx expo start

    Run on Device:
    Download the Expo Go app on your phone and scan the QR code in your terminal.
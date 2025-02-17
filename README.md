# Financely - Personal Finance Tracker


**Financely** is a powerful and intuitive **Personal Finance Tracker** built with **React**, **Firebase**, and **ANT Design**. It enables users to track their income, expenses, and real-time balance updates seamlessly. With advanced features like multi-platform authentication, interactive data visualizations, and efficient transaction management, Financely empowers users to gain clear insights into their financial health.

---

## Features

- **Real-time Balance Updates**: Track income and expenses in real-time using Firebase Firestore.
- **Multi-platform Authentication**: Secure login with Google and email/password authentication.
- **Interactive Data Visualizations**:
  - **Line Charts**: Visualize financial trends over time.
  - **Pie Charts**: Analyze categorized spending for better budgeting.
- **Transaction History Table**:
  - **Sorting**: Sort transactions by date or amount.
  - **Filtering**: Filter transactions by income or expense.
  - **CSV Import/Export**: Easily import or export transaction data for efficient management.
- **CRUD Operations**: Add, update, delete, and view financial transactions effortlessly.
- **Responsive UI**: Built with ANT Design for a clean and responsive user experience.
- **Validation**: Ensures data integrity with client-side and server-side validation.
- **Error Handling**: Robust error handling for a smooth user experience.

---

## Technologies Used

- **Frontend**: React, ANT Design
- **Backend**: Firebase (Firestore, Authentication)
- **State Management**: React Hooks (useState, useEffect)
- **Real-time Sync**: React Firebase Hooks
- **Data Visualization**: Charting libraries (e.g., Chart.js or Recharts)
- **Error Handling**: Try-catch blocks, Firebase error handling

### Prerequisites

- Node.js and npm installed on your machine.
- A Firebase project with Firestore and Authentication enabled.

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AVIVASHISHTA29/personal-finance-tracker.git
   cd personal-finance-tracker
   ```

2. **Install Dependencies**
``` 
npm install
```
3. Set Up Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

### Screenshots
Signup 
![Screenshot 2025-02-17 233904](https://github.com/user-attachments/assets/15e66f24-fcc4-4345-8f8a-d2c748d8ec9f)
Sign in 
![Screenshot 2025-02-17 234713](https://github.com/user-attachments/assets/f06aba97-dc53-4a2b-99a4-126b86ff7577)
Dashboard
![Screenshot 2025-02-17 233837](https://github.com/user-attachments/assets/6dead453-8cce-4127-87fd-e9eb9692d1c2)
![Screenshot 2025-02-17 233848](https://github.com/user-attachments/assets/22c359bd-51b9-4ada-8e33-374de870068d)



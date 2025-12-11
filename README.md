# 🚀 React User Authentication App

A simple React application that provides **user registration**, **login**, **account management**, and **profile editing**, with all user data stored in **LocalStorage**.  
The project follows a clean **component-based architecture** and includes basic **form validation** and **error handling**.

---

## ✨ Features

- 🔐 User Registration
- 🔑 User Login
- 👤 My Account Page
- ✏️ Edit User Profile
- 💾 LocalStorage for storing user information
- ⚛️ Component-based architecture
- ⚠️ Error handling & input validations
- 🔄 Persistent login using LocalStorage
- 🎨 Clean and minimal UI

---

## 🛠️ Tech Stack

- **React**
- **Typescript**
- **LocalStorage API**
- **Tailwind** (choose based on your project)

---

## ⚙️ Installation

```bash
git clone https://github.com/arafatmansuri/Account-Management.git
cd Account-Management
npm install
npm start
```

---

## 🧩 How It Works

### 🔹 Registration

- User enters basic information.

- Form validation checks empty fields and format.

- User data is stored in LocalStorage as:

- UserData = [{ "username": "", "password": "" }]

### 🔹 Login

- User enters username & password.

- Credentials checked against LocalStorage.

- If successful, the logged-in user is stored as:

- CurrentUser = { "username": "", "email": "" }

### 🔹 My Account

- Displays user information

- Allows user to logout

- Provides navigation to Edit Profile

### 🔹 Edit Profile

- User updates information

- Changes are saved back to LocalStorage

### 🔹 Error Handling

- Empty fields

- Incorrect login credentials

- Account already exists

- success/error messages

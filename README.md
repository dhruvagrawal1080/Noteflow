![Noteflow App Screenshot](./frontend/src/assets/noteflow.png)


# Noteflow

Noteflow is a comprehensive note-taking application designed to help users capture, organize, and share their thoughts seamlessly. It features a robust backend built with Node.js and Express, and a dynamic frontend developed using React and Vite.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure authentication using JWT (JSON Web Tokens) allows users to sign up, log in, and log out. Passwords are securely hashed, and session management is implemented for security.

- **Create & Manage Notes**: Users can create rich-text notes, edit their content, and delete them when no longer needed.

- **Share Notes via Email & Public Links**: Notes can be shared with other users via email, and a public shareable link can be generated for quick access. Easily share notes on social media platforms like Twitter, Facebook, and LinkedIn for wider accessibility.

- **Set Permissions (View/Edit Access)**: When sharing a note, users can grant read-only or edit permissions to control who can modify the content.

- **Collaborate in Real-Time**: Share notes with team members and work together with ease.

- **Real-time Notifications**: Users receive instant notifications when a note is shared with them.

- **Organize with Tags & Favorites**: Sort notes efficiently with labels and pin important ones for quick access.

- **Move Notes to Trash**: Deleted notes are moved to the trash, where they remain for 30 days before being permanently removed.

- **Todo List Management**: Users can create and manage their daily tasks with a built-in To-Do list. Tasks can be marked as completed, edited, or deleted. All tasks are saved and persisted for easy tracking.

- **Reminders & Notifications**: Users can set reminders for their notes and tasks. Reminders notify users before the scheduled time. Expired reminders are automatically deleted after completion using a scheduled background job.

- **Profile Section**: Users can update their profile picture, name, and bio. Email and password settings can be managed from the profile page. Secure password change with email verification is available.  

- **Responsive UI**: The application features a modern, clean, and fully responsive design built with Tailwind CSS, ensuring a seamless experience on all devices.
- **Access Anytime, Anywhere**: Use Noteflow across devices for a seamless experience.

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB
- Cloudinary account for image storage

### Backend Setup

Clone the repository:
```
git clone https://github.com/dhruvagrawal1080/Noteflow.git
```

### Backend Setup

1. Navigate to the Backend Directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend folder and add:
    ```plaintext
    # Database
    MONGO_URI = your_mongodb_connection_string
    BACKEND_PORT = 3000

    # JWT Configuration
    JWT_SECRET = your_jwt_secret
    JWT_EXPIRES_IN = your_jwt_token_expiration_time

    # Frontend URL
    FRONTEND_URL = 'http://localhost:5173'

    # Cloudinary Configuration
    CLOUD_NAME = your_cloudinary_name
    API_KEY = your_cloudinary_api_key
    API_SECRET = your_cloudinary_secret
    FOLDER_NAME = your_folder_name

    # OAuth2 Configuration
    MAIL_USER = your_email@gmail.com
    CLIENT_ID = your_google_oauth_client_id
    CLIENT_SECRET = your_google_oauth_client_secret
    REFRESH_TOKEN = your_google_oauth_refresh_token

    # Google Login
    GOOGLE_CLIENT_ID = your_google_login_client_id
    ```

4. Start the server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the frontend folder and add:
    ```plaintext
    VITE_BACKEND_URL=http://localhost:3000
    VITE_GOOGLE_CLIENT_ID=your_google_client_id
    ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- Access the application at `http://localhost:5173` after starting both the backend and frontend servers.
- Use the application to create, manage, and share notes.
- Explore the dashboard for additional features like reminders, to-do lists, and profile management.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

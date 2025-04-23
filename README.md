# Productivity App

A modern web application that combines a To-Do List with a Pomodoro Timer to help you stay focused and organized.

## Features

- **To-Do List**
  - Add and delete tasks
  - Clean and intuitive interface
  - Real-time updates

- **Pomodoro Timer**
  - Customizable work and break times
  - Work time up to 500 minutes
  - Break time up to 60 minutes
  - Automatic switching between work and break periods

- **Responsive Design**
  - Works on desktop, tablet, and mobile devices
  - Adapts to different screen sizes
  - Touch-friendly interface

- **Modern UI**
  - Clean, minimalist design
  - Calm green color scheme
  - Smooth animations and transitions

## Important Note

**When using the deployed application:**
- The backend servers on Render may go to sleep after periods of inactivity.
- If the task list appears empty or you encounter connection errors, please wait approximately 1 minute for the backend servers to boot up.
- This is normal behavior for free-tier hosting services and doesn't indicate an issue with the application.

## Tech Stack

- **Frontend**
  - React.js
  - React Router for navigation
  - CSS with responsive design
  - Modern ES6+ JavaScript

- **Backend**
  - Node.js
  - Express.js
  - MongoDB

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd to-do-app
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend/to-do-app
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   ```

   Create a `.env` file in the frontend/to-do-app directory:
   ```
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm start

   # In a new terminal, start frontend development server
   cd frontend/to-do-app
   npm run dev
   ```

5. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`)

## Project Structure

```
to-do-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   └── to-do-app/
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   ├── App.jsx
│       │   ├── index.js
│       │   └── index.css
│       └── package.json
└── README.md
```

## Usage

1. **To-Do List**
   - Type a task in the input field
   - Click "Add" or press Enter to add the task
   - Click the delete button to remove a task

2. **Pomodoro Timer**
   - Set your desired work and break times
   - Click "Start" to begin the timer
   - Use "Pause" to temporarily stop
   - Click "Reset" to start over

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Inspired by the Pomodoro Technique
- Built with React and Node.js
- Uses MongoDB for data storage 

## Troubleshooting

### Connection Errors
- If you see `ERR_CONNECTION_REFUSED` errors, ensure that:
  1. The backend server is running
  2. Your `.env` file in the frontend has the correct `VITE_API_URL` value
  3. If using the deployed version, wait about a minute for the server to wake up

### CORS Errors
- If you see "Access to fetch at ... has been blocked by CORS policy" errors:
  1. Make sure your frontend and backend URLs are correctly configured
  2. For local development, ensure backend CORS settings allow requests from your frontend origin
  3. For deployed applications, verify environment variables are correctly set in your hosting service

### Editing Tasks Not Working
- If editing tasks fails while other functions work:
  1. Check browser console for specific error messages
  2. Verify that the PUT request URL is correctly formatted
  3. Ensure both components use the same API base URL pattern 
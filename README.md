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

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend development server
   cd ../frontend/to-do-app
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

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
# TerraSight - Waste Detection System

## Setup Instructions

### Install Dependencies

Before running the application, you need to install `react-router-dom`:

```bash
cd frontend
npm install react-router-dom
```

Then install all other dependencies:

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   └── DetectionStudio.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AboutProjects.jsx
│   │   ├── Photos.jsx
│   │   ├── Datasets.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   └── main.jsx
```

## Features

- Multi-page navigation with React Router
- Responsive design with earth tone color scheme
- Real-time waste detection (Image, Video, Live Camera)
- About Projects page with team and tech stack information
- Coming Soon pages for Photos, Datasets, and Contact

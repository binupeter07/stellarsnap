# StellarSnap – Explore the Universe with NASA APIs

![StellarSnap Screenshot](https://res.cloudinary.com/dk3pg4zly/image/upload/v1750565814/stellersnap_wvoajo.png)

**StellarSnap** is a sleek, interactive web application that brings NASA's open data to life. Immerse yourself in a dynamic, animated space environment as you explore the cosmos. Whether you're curious about today's astronomy picture, exploring Mars Rover missions, or just want to enjoy the view of a starry sky, StellarSnap makes space exploration accessible and fun.

---

## ✨ Features

- 🌌 **Immersive Animated Background:** A dynamic, animated starry sky with shooting stars provides a beautiful and engaging backdrop for your space exploration.
- 🔭 **Astronomy Picture of the Day (APOD):** Discover a new image of the cosmos daily with rich descriptions.
- 🚜 **Mars Rover Explorer:** Browse photos from NASA's rovers – Curiosity, Perseverance, Spirit, and Opportunity – with filters for Martian day (sol), Earth date, and camera.
- 🧠 **Optimized Backend Gateway:** Smart caching and rate-limiting to efficiently serve data.
- 💡 **Responsive UI:** Built with Tailwind CSS and optimized for all screen sizes.

---

## 🚀 Tech Stack

### Frontend

- [React](https://reactjs.org/) – UI development
- [Vite](https://vitejs.dev/) – Fast dev server and bundler
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS styling

### Backend

- [Node.js](https://nodejs.org/) – JavaScript runtime
- [Express](https://expressjs.com/) – Web framework for Node.js
- [Axios](https://axios-http.com/) – HTTP client

### External APIs

- [NASA Open APIs](https://api.nasa.gov/) – Public API for astronomical data

---

## 🛠️ Getting Started

### 1. Get a NASA API Key

Sign up at [https://api.nasa.gov/](https://api.nasa.gov/) and obtain a free API key.

---

### 2. Clone the Repository

```bash
git clone https://github.com/binupeter07/stellarsnap.git
cd stellarsnap
```

---

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and add:

```
NASA_API_KEY=YOUR_PERSONAL_NASA_API_KEY
```

Start the backend server:

```bash
npm run dev
# Runs on http://localhost:5000
```

---

### 4. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder and add:

```
VITE_API_BASE_URL=http://localhost:5000/api/nasa
```

Start the frontend dev server:

```bash
npm run dev
# Runs on http://localhost:5173
```

---

### 5. View in Browser

Open:
**[http://localhost:5173](http://localhost:5173)**

---

## ⚙️ Environment Variables

| File            | Variable            | Description          |
| --------------- | ------------------- | -------------------- |
| `backend/.env`  | `NASA_API_KEY`      | Your NASA API key    |
| `frontend/.env` | `VITE_API_BASE_URL` | Backend endpoint URL |

---

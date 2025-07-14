# 🌍 EcoScan - Clothing Carbon Footprint Scanner

EcoScan is a full-stack web application that empowers users to understand the environmental impact of their clothing. By uploading or snapping a photo of a clothing item, users receive an estimated carbon score, earn eco-reward points, and unlock sustainability-focused offers. The project demonstrates a modern, scalable solution for green initiatives, using real-time image recognition and a gamified reward system.

---

## 🔧 Tech Stack

- **Frontend:** React (Vite, Tailwind CSS, TensorFlow.js MobileNet for local image recognition)
- **Backend:** Node.js, Express
- **Image Recognition:** TensorFlow.js (runs in-browser, no image leaves the device)
- **API Communication:** Environment-based URLs via Vite `.env` variables

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/reewild-ecoscan.git
cd reewild-ecoscan
```

### 2. Environment Variables

#### Frontend (`client/.env`):

Create a `.env` file in the `client` directory:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

> For production, set this to your deployed backend URL.

#### Backend (`server/.env`):

If you need environment variables for the backend, create a `server/.env` file (optional for this project).

---

### 3. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

---

### 4. Run the Application

#### Backend

```bash
cd server
npm start
```

#### Frontend

Open a new terminal:

```bash
cd client
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173) (default Vite port).

---

### 5. Testing

#### Frontend

```bash
cd client
npm test
```

#### Backend

```bash
cd server
npm test
```

---

## 🌱 Carbon Score Assumptions

The backend uses a simple in-memory mapping to assign carbon scores to clothing items:

| 👕 Item | 🌍 Estimated Carbon Score (kg CO₂) |
| ------- | ---------------------------------- |
| T-shirt | 5                                  |
| Jeans   | 10                                 |
| Jacket  | 15                                 |
| Shoes   | 8                                  |

---

## 🖼️ How It Works

1. **User uploads or snaps a photo** of a clothing item.
2. **TensorFlow.js MobileNet** runs in the browser to classify the item (no image leaves the device).
3. The detected item(s) are sent to the backend via the API URL defined in `.env`.
4. The backend calculates a total carbon score and eco-reward points.
5. The frontend displays the results and fetches available offers based on the user’s points.

---

## 🌟 Product & Technical Enhancements

- **Scalability:**  
  Move from in-memory data to a persistent database (e.g., MongoDB, PostgreSQL) for user sessions, scores, and offers. Add caching for frequent queries.
- **Enhanced Eco-Score Model:**  
  Integrate external APIs or datasets to refine carbon scoring based on material, brand, or garment condition.
- **User Experience:**  
  Add user accounts, history tracking, and sustainability tips. Visualize carbon savings over time.
- **API Integrations:**  
  Connect with real-time carbon data sources or sustainability certification APIs for up-to-date scoring.

---

## 📲 Deployment

- **Frontend:** Deploy on Vercel.
- **Backend:** Deploy on Render.
- **Live Demo:**  
  [https://reewild-ecoscan.vercel.app/](https://reewild-ecoscan.vercel.app/)

---

## 🔒 Security & Privacy

- **Image Privacy:** All image recognition is performed locally in the browser. No user images are uploaded to the server.
- **API URLs:** All API endpoints are managed via environment variables for flexibility and security.

---

## 📁 Project Structure

```
reewild-ecoscan/
  client/      # React frontend (Vite, TensorFlow.js, Tailwind)
  server/      # Node.js/Express backend (API, scoring, offers)
```

---

## 🙏 Thank you for building a greener future with EcoScan! 🌍💚

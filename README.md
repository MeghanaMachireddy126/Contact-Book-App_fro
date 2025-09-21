📒 Contact Book App

A full-stack contact book app to add, view, and delete contacts with pagination and responsive design for desktop & mobile.

🚀 Features

✨ Add new contacts with validation

📃 View contacts in a paginated table

🗑️ Delete contacts

📱 Fully responsive UI

🔄 Fetch contacts dynamically from backend

🛠️ Tech Stack
Frontend	Backend	Database
React.js	Node.js + Express	SQLite / MongoDB
Axios for API calls	CORS & JSON parsing	Persistent storage
CSS Flex/Grid	REST APIs	Pagination support
📁 Project Structure
contact-book-app/
│
├── frontend/        # React frontend
│   ├── src/
│   │   ├── index.js
│   │   ├── index.css
│   │   └── components/
│   └── package.json
│
├── backend/         # Node.js + Express backend
│   ├── index.js
│   ├── db.js
│   ├── contacts.db
│   └── package.json
│
└── README.md

⚡ Getting Started
1️⃣ Clone Repository
git clone https://github.com/MeghanaMachireddy126/Contact_Book_App.git
cd Contact_Book_App

2️⃣ Backend Setup
cd backend
npm install
node index.js       # or npx nodemon index.js for auto-reload


Backend runs at: http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm start

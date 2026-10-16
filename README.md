# 📚 Book Review App

A full-stack web application built with the MERN stack that allows users to explore books, search for books, filter them by category, and save their favorite books.

🔗 **Live Demo:** [Book Review App](https://book-review-app-phi-lilac.vercel.app/)

## ✨ Features

- 📖 Browse books from the database
- 🔍 Search books by title, author, or category
- 🏷️ Filter books by category
- ❤️ Add and remove favorite books
- 🌙 Dark mode and light mode
- 📱 Responsive interface for mobile devices
- 🔗 REST API integration between frontend and backend
- ☁️ Deployed frontend and backend

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| JavaScript | Application logic |
| HTML5 & CSS3 | Structure and styling |
| Node.js | Backend runtime |
| Express.js | Backend API |
| MongoDB Atlas | Database |
| Git & GitHub | Version control |
| Vercel | Frontend deployment |
| Render | Backend deployment |

## 📂 Project Structure

```text
book-review-app/
├── Backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── .gitignore
└── README.md
```

*Note: The folder names above are representative. Update them if your actual folders are different.*

## ⚙️ Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/Sakshigirase1894/book-review-app.git
cd book-review-app
```

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `Backend` folder and add the environment variables required by your backend.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Use your own MongoDB Atlas connection string. Never upload real credentials or `.env` files to GitHub.

### 4. Start the backend

```bash
npm start
```

### 5. Start the frontend

Open a second terminal from the project root:

```bash
cd Frontend
npm install
npm start
```

The React application normally opens at:

http://localhost:3000

Make sure the frontend API URL and backend environment variables are configured for your local setup.

## 🌐 Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

## 🎯 Learning Outcomes

- Building a React.js frontend
- Developing backend APIs with Node.js and Express.js
- Connecting an application to MongoDB Atlas
- Fetching and displaying API data
- Managing application state and favorites
- Deploying a full-stack application

## 👩‍💻 Author

**Sakshi Girase**

GitHub: [Sakshigirase1894](https://github.com/Sakshigirase1894)

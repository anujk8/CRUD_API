# 🚀 Fastify CRUD API with TypeScript, MySQL & Render Deployment

![Fastify](https://img.shields.io/badge/Fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Render](https://img.shields.io/badge/Deployed%20on-Render-%236C3CF0?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

A high-performance **Fastify REST API** built with **TypeScript**, **Sequelize ORM**, and **MySQL**, deployed on **Render** using a **Free SQL Database**.

Implements full **CRUD** for two resources:
- 👤 **Users**
- 🏠 **Addresses** (linked to Users)

---

## 🧩 Tech Stack

- ⚡ [Fastify](https://www.fastify.io/) — high-performance Node.js web framework  
- 🟦 [TypeScript](https://www.typescriptlang.org/) — type-safe development  
- 🧮 [Sequelize](https://sequelize.org/) — ORM for MySQL  
- 🐬 [MySQL](https://www.mysql.com/) — relational database  
- 🌐 [Render](https://render.com/) — deployment platform (Free tier)

---

## 🧩 Features

✅ Built with **Fastify** for ultra-high performance  
✅ **TypeScript** support for type safety and scalability  
✅ **MySQL** integration using connection pooling  
✅ Clean and modular folder structure  
✅ Complete **CRUD** (Create, Read, Update, Delete) operations  
✅ Ready for **Render** deployment  
✅ Environment variable support via `.env`  
✅ Includes **error handling**, **validation**, and **logging**

---

## 🗂️ Project Structure

📦 project
├── 📁 src
│ ├── 📁 config # Database & environment configuration
│ ├── 📁 controllers # Request handling logic
│ ├── 📁 routes # API routes
│ ├── 📁 models # Database models / queries
│ ├── 📁 utils # Helper utilities
│ └── index.ts # Fastify server entry point
├── .env # Environment variables
├── tsconfig.json # TypeScript configuration
├── package.json # Project dependencies
└── README.md # Documentation


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/anujk8/CRUD_API.git
cd project

### 2️⃣ Install dependencies
npm install

3️⃣ Set up environment variables

```bash
PORT=8080
NODE_ENV=development

DB_HOST=your-db-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASS=your-db-password
DB_NAME=your-db-name

4️⃣ Start the server in development mode

npm run dev

The API will start running on ➡️ http://localhost:4000


## ⚙️ Environment Configuration

Environment variables control database connections and server setup.

Example variables include:
- `PORT` — server port  
- `NODE_ENV` — environment mode  
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME` — MySQL credentials  

These values are stored in a `.env` file locally and configured in **Render** under *Environment Variables*.

---

## 🧠 Local Development Setup

1. **Clone the repository** from GitHub.  
2. **Install dependencies** using npm or yarn.  
3. **Create a `.env` file** using `.env.example` as a template.  
4. **Connect to your local MySQL instance** or a Render Free SQL database.  
5. **Run the database sync or migration** to initialize tables.  
6. **Start the development server** using the dev command.  
7. Access the API via `http://localhost:4000/api`.

---

## 🧱 Database Design

The system consists of two related entities:

### Users
- Each user record includes personal details such as name and email.
- A user can have multiple addresses.

### Addresses
- Each address contains details such as street and city.
- Every address record is linked to a specific user through a foreign key.

**Relationship:**  
`User (1) → (Many) Address`

---

## 🌐 API Endpoints Overview

### Users
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/users` | Retrieve all users |
| GET | `/api/users/:id` | Retrieve a user by ID (with addresses) |
| POST | `/api/users` | Create a new user |
| PUT | `/api/users/:id` | Update an existing user |
| DELETE | `/api/users/:id` | Delete a user |

### Addresses
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/addresses` | Retrieve all addresses |
| GET | `/api/addresses/:id` | Retrieve an address by ID |
| POST | `/api/addresses` | Create a new address linked to a user |
| PUT | `/api/addresses/:id` | Update an existing address |
| DELETE | `/api/addresses/:id` | Delete an address |

---

## 🧾 Example Data Flow

1. Create a **User** record through `/api/users`.  
2. Add one or more **Addresses** linked to that user via `/api/addresses`.  
3. Retrieve a user along with all their addresses using `/api/users/:id`.

---

## 🚀 Deployment on Render

### Step 1: Push Your Code
Push the project to a GitHub repository.

### Step 2: Create a Render Web Service
- Go to [Render Dashboard](https://render.com)  
- Create a **New Web Service** and connect your GitHub repo  
- Select **Node environment**

### Step 3: Configure Build and Start Commands
- **Build Command:** `npm install && npm run build`  
- **Start Command:** `npm start`

### Step 4: Add Environment Variables
In the Render dashboard, add variables such as:

| Key | Example Value |
|-----|----------------|
| `PORT` | `10000` |
| `NODE_ENV` | `production` |
| `DB_HOST` | your-db-host.render.com |
| `DB_PORT` | `3306` |
| `DB_USER` | render_user |
| `DB_PASS` | render_password |
| `DB_NAME` | render_db |

### Step 5: Deploy
Render automatically builds and deploys your Fastify + Sequelize app.  
After deployment, note your service URL — e.g.  
`https://fastify-crud-api.onrender.com/api`

---

## 🧮 Database Setup on Render (Free MySQL)

1. Go to **Render → Databases → Create Database**.  
2. Choose **MySQL** and select the **Free Tier**.  
3. Copy the internal connection URL and credentials.  
4. Paste them into your `.env` file or Render environment variables.  
5. Sync Sequelize models or run migrations.  

---

## 📜 Project Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Run development server with hot reload |
| `npm run build` | Compile TypeScript into JavaScript |
| `npm start` | Start compiled production server |
| `npm run db:sync` | Sync database models to MySQL |
| `npm run lint` | Lint project code |

---

## 🧩 Key Features

- Modular TypeScript-based backend  
- Fastify for high-speed request handling  
- Sequelize ORM with MySQL support  
- Two relational resources (Users ↔ Addresses)  
- Ready-to-deploy on Render  
- Clean and maintainable folder structure  

---

## 🧑‍💻 Author

 Anuj Kumar 
📧 anuj.kumar@stashfin.com  


---

## 🪪 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and share!

---

### 🌟 Support

If you like this project, please ⭐ it on GitHub and share it with others.





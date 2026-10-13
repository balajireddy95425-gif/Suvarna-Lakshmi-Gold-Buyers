# Suvarna Lakshmi Gold Buyers

Full-stack business website built with React + Vite and Spring Boot. The backend uses Spring Data MongoDB and MongoDB Atlas.

## Project folders

- `Ecommerce-Frontend/` — React/Vite frontend
- `Ecommerce-Backend/` — Spring Boot REST API

## Requirements

- Java 21 or newer compatible with the project's Java 21 target
- Maven 3.9+ (or use the Maven Wrapper if configured)
- Node.js 20+ and npm
- MongoDB Atlas cluster and database user

## Configure MongoDB Atlas

Set `MONGODB_URI` in your terminal or deployment platform. Keep the actual URI/password out of source control. The URI should select the database, for example `suvarnaLakshmi`. Replace all sample values with your actual Atlas values. The file `Ecommerce-Backend/.env.example` is documentation only; Spring Boot does not automatically load `.env` files by default.

Also set: `ADMIN_USERNAME`, `ADMIN_PASSWORD` (at least 10 characters), and `CORS_ALLOWED_ORIGINS`.

### Windows PowerShell example

```powershell
$env:MONGODB_URI="mongodb+srv://DB_USER:URL_ENCODED_PASSWORD@YOUR_CLUSTER.mongodb.net/suvarnaLakshmi?retryWrites=true&w=majority"
$env:ADMIN_USERNAME="admin"
$env:ADMIN_PASSWORD="REPLACE_WITH_A_LONG_RANDOM_PASSWORD"
$env:CORS_ALLOWED_ORIGINS="http://localhost:5173"
cd Ecommerce-Backend
.\mvnw.cmd spring-boot:run
```

Do not share or commit the real connection string. If the database password contains special characters, URL-encode it. In MongoDB Atlas, allow your current IP under **Network Access** and create/verify a database user under **Database Access**.

## Run the frontend

```powershell
cd Ecommerce-Frontend
npm install
npm run dev
```

Open `http://localhost:5173`. During local development, Vite proxies `/api` requests to `http://localhost:8080`. For deployment, set `VITE_API_BASE_URL` to the deployed backend API base URL.

## Database notes

- The backend now stores Admin, Appointment, Blog, Branch, Enquiry, GoldCalculation, and GoldRate documents in MongoDB collections.
- Mongo IDs are strings/ObjectIds; endpoint URLs accept string IDs.
- Spring Data auditing fills created/updated timestamps.
- `DataIntilizer` creates an admin (from the environment variables) and a default branch when their collections are empty. Gold rates and blog content need to be entered via the admin interface or imported.
- Existing H2 data is **not** automatically copied into MongoDB Atlas. Export/import records separately before switching if you need to preserve old data.

## Build checks

Backend: `cd Ecommerce-Backend` then `.\mvnw.cmd -DskipTests package` on Windows.
Frontend: `cd Ecommerce-Frontend` then `npm ci` and `npm run build`.

Review `.gitignore` before committing. Do not commit `.env`, MongoDB passwords, `node_modules/`, `Ecommerce-Backend/target/`, or local database files.

# MongoDB Atlas deployment checklist

## Backend environment variables
Set these in the backend hosting platform (or in PowerShell for local testing):
- `MONGODB_URI` — Atlas connection URI including the `suvarnaLakshmi` database name; keep credentials private
- `ADMIN_USERNAME` — initial admin username
- `ADMIN_PASSWORD` — strong random password, at least 10 characters
- `CORS_ALLOWED_ORIGINS` — exact deployed frontend origin, without a trailing slash unless required
- `PORT` — supplied by many hosting platforms; the app defaults to 8080 locally

Atlas setup: create/verify the database user under Database Access and allow the deployed backend's outbound IP under Network Access. Avoid `0.0.0.0/0` except for temporary controlled testing.

## Frontend
Set `VITE_API_BASE_URL` to the deployed backend API base URL including `/api`, then run `npm ci && npm run build`.

## Security and migration notes
- Never commit the real MongoDB URI or passwords. `.env.example` contains placeholders only.
- The backend bootstrap reads `ADMIN_USERNAME` and `ADMIN_PASSWORD` from process environment variables; Spring Boot does not automatically load `.env` files by default.
- Admin/customer-lead management endpoints require a bearer token. In-memory tokens expire after 8 hours and are invalidated by backend restarts.
- Customer submissions remain public. Apply rate limiting / spam protection before public production launch.
- The old H2 file database is not automatically copied to Atlas. Import/export records separately if previous records must be retained.
- Mongo IDs are strings/ObjectIds, not previous numeric SQL IDs.

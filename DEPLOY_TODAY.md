# Publication checklist

## Backend environment
Set these before starting Spring Boot:
- `SPRING_PROFILES_ACTIVE=prod`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD` (10+ characters)
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `CORS_ALLOWED_ORIGINS` = exact frontend origin

The backend no longer creates a hardcoded `admin/Admin@123` account.

## Frontend
Set `VITE_API_BASE_URL` to the deployed backend `/api` URL, then run `npm ci && npm run build`.

## Security
- Admin login is backend-authenticated and returns an 8-hour bearer token.
- Admin/customer-lead management endpoints require the bearer token.
- Customer submissions remain public.
- Gold valuation uses the latest server-side gold rate; the client cannot choose the authoritative rate.
- H2 console is disabled.

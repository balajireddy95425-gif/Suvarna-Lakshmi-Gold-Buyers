# Source review and MongoDB Atlas migration notes

## What was reviewed

The uploaded archive contained the React/Vite frontend, Spring Boot backend, Java models/services/controllers, build files, environment examples, `.git`, `node_modules`, and a built backend `target` directory. The deliverable source archive omits `.git`, `node_modules`, generated `target`/`dist` files, and local data.

## Migration changes included

- Replaced `spring-boot-starter-data-jpa`, H2, and MySQL JDBC dependencies with `spring-boot-starter-data-mongodb`.
- Converted all seven models (`Admin`, `Appointment`, `Blog`, `Branch`, `Enquiry`, `GoldCalculation`, `GoldRate`) from JPA entities to MongoDB documents/collections.
- Changed record IDs and controller/service ID path parameters from `Long` to `String` for MongoDB IDs. The frontend API routes use IDs as opaque values and had no numeric-ID assumptions in the static search.
- Converted all seven repositories from `JpaRepository` to `MongoRepository`.
- Added Mongo auditing for created/updated timestamps, unique indexes for admin usernames and blog slugs, and default states in service methods where JPA lifecycle callbacks used to set them.
- Switched `application.properties` and the production profile to use `MONGODB_URI`; SQL datasource/JPA/H2 configuration was removed.
- Replaced a predictable example admin password with placeholders and updated stale MySQL/e-commerce boilerplate deployment instructions.

## Important limitations and next verification

1. **Build verification is incomplete.** XML and Java source-structure checks passed; 37 frontend JS/JSX source files passed syntax parsing. Full Maven compilation/runtime and Vite production build were not run here. Use `BUILD_VERIFICATION.md` on Windows before replacing the working project or pushing.
2. **H2 records are not copied automatically.** The new Atlas database starts separately; the initializer will create the admin from environment variables and a default branch if the appropriate records are missing. Re-enter/import gold rates, blogs, enquiries, appointments, and other legacy records if they must be retained.
3. **Configure Atlas access.** Create/verify the database user, add your current IP under Network Access for local verification, and set the `MONGODB_URI` environment variable. Percent-encode reserved characters in the password. Do not put real credentials in source files or Git.
4. The app expects `MONGODB_URI` to be set; without it, backend startup is expected to fail. This prevents silently falling back to the old H2 database.
5. Existing admin sessions are held in memory, so backend restart clears tokens; logging in again creates a new token. A production deployment with multiple backend instances should replace this with persistent/shared session storage or a properly configured token strategy.
6. Public enquiry, appointment, and valuation endpoints need rate limiting/spam protection before a public production launch.
7. `Ecommerce-Frontend/vite.config.js` allows arbitrary dev-server host headers for tunnel-based demos (`allowedHosts: true`). Do not expose Vite's development server as the production site; deploy the built `dist` output instead.
8. `Ecommerce-Frontend/src/axios.jsx` is a duplicate-looking API client; actual page imports use `src/services/api.js`. It was left in place to avoid removing possibly intentional code.

## Environment example

`Ecommerce-Backend/.env.example` is a template only. Spring Boot does not automatically load `.env` files. Set the values in PowerShell or in the hosting provider's environment settings. Never upload the actual Atlas URI/password.

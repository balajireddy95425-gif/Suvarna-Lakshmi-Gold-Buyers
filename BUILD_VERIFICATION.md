# Migration validation status

The source archive has been statically reviewed for the MongoDB migration. XML parsing passed; all seven backend models are MongoDB documents, all seven repositories use `MongoRepository`, no JPA/H2 datasource configuration remains, and a source-syntax scan found no Java parse diagnostics. All 37 frontend JS/JSX modules passed a parser syntax check.

**A full Maven compile/test and Vite production build have not been run in this environment.** Maven is not installed here, and the ZIP's included `node_modules` contains Windows-native dependencies that cannot be used for a Linux build. Run these checks on the project computer before deploying.

## Windows PowerShell checks

```powershell
cd Ecommerce-Backend
.\mvnw.cmd clean package -DskipTests

cd ..\Ecommerce-Frontend
npm ci
npm run build
```

For backend runtime verification, first set `MONGODB_URI`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `CORS_ALLOWED_ORIGINS` in the same PowerShell session, then run `.\mvnw.cmd spring-boot:run`. Look for `Tomcat started on port ...` and `Started SriLakshmiGoldApplication`; then test login and every CRUD flow.

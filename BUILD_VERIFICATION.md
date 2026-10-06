# Build verification

The source was statically checked and the publication-critical security/configuration fixes were applied.

This archive was prepared in an environment without system Maven and without registry/network access, so a full Maven/Node build could not be executed here.

Before deployment:

```bash
cd Ecommerce-Backend
./mvnw clean package -DskipTests

cd ../Ecommerce-Frontend
npm ci
npm run build
```

The Maven wrapper is now complete with `.mvn/wrapper/maven-wrapper.properties`.

# NodeJS + Fastify
## Single Sign On System

### Installing

1. Clone repository: ``` git clone https://github.com/NikkoDevelop/nodejs-fastify-single-sign-on-system.git ```

2. Unstall dependencies ``` yarn ```

3. Describe your environment variables in the .env file ``` See the section below ```

4. Check Swagger configs, you need to write your host in line 7

5. Start project with command ``` yarn dev ``` or ``` yarn build & yarn start ```

### Environment variables (.env)
PORT= * - Service port

SERVER_HOST= * - Service hostname

SERVICE_NAME= * - Service name (for logging)

DB_USER= * - Database username

DB_USER_PASS= * - Database user password

DB_HOST= * - Database hostname

DB_PORT= * - Database port

DB_NAME= * - Database name

DB_DIALECT= * - Database dialect (postgres / mysql / and other... )

DATABASE_URL= * - Database full url (postgres://admin:admin@database_host:port/database_name)

HASH_SALT= * - Some number for hashing user password

JWT_SECRET= * - Some string for create JWT token

JWT_REFRESH_SECRET= * - Some string for create JWT refresh token

COOKIE_SECRET= * - Some string for cookies

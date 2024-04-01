FROM node:latest

WORKDIR /app/next-app

COPY package.json ./

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y wait-for-it

# Wait until the Postgre DB container is heathly and ready, then start the migration and run the application
CMD wait-for-it -t 60 postgres:5432 -- npx prisma migrate deploy && npx prisma generate && npm run dev
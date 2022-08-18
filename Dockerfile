FROM node:17

WORKDIR /app

# INSTALL APP DEPENDENCIES
COPY package*.json ./
RUN npm install
RUN npm install --location=global prisma
COPY prisma/*.prisma /app/prisma/
RUN npx prisma db push
RUN npx prisma generate

# BUNDLE APP SOURCE
COPY . .
RUN npm run build

EXPOSE 3000

# START SYSTEM
CMD ["npm", "start"]
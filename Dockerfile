# Build frontend
FROM node:20-alpine AS build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Run backend (serves the React build)
FROM node:20-alpine
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --omit=dev
COPY backend/ ./
COPY --from=build /app/frontend/dist /app/frontend/dist
ENV PORT=5000
EXPOSE 5000
CMD ["node", "server.js"]

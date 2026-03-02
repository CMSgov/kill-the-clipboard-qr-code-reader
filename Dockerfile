FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000

CMD ["node", "server.js"]

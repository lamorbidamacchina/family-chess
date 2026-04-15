# Scegliamo una versione di Node stabile
FROM node:20-slim

# Creiamo la cartella di lavoro
WORKDIR /app

# Copiamo i file delle dipendenze per sfruttare la cache di Docker
COPY package*.json ./

# Installiamo le dipendenze
RUN npm install

# Copiamo tutto il resto del codice della scacchiera
COPY . .

# Fly.io di solito usa la porta 8080 di default
ENV PORT=8080
EXPOSE 8080

# Avviamo l'app (assicurati di avere "start" nel package.json)
CMD [ "npm", "start" ]
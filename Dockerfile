# Primera etapa: Construir la aplicación React
FROM node:22-alpine AS builder
WORKDIR /usr/src/app

# Copiar package.json de ambas aplicaciones
COPY package*.json ./
COPY react/package*.json ./react/

# Instalar dependencias (incluidas las de desarrollo para construir React)
RUN npm install --only=production
RUN cd react && npm install

# Copiar todo el código fuente
COPY . .

# Generar el build de React (que copia los assets a los directorios de Express)
RUN cd react && npm run build

# Eliminar directorios y archivos que ya no son necesarios
RUN rm -rf react
RUN rm -rf node_modules/.cache



# Segunda etapa: Crear la imagen final optimizada
FROM node:22-alpine
WORKDIR /usr/src/app

# Copiar solo package.json para instalar dependencias de producción
COPY package*.json ./
RUN npm install --only=production

# Copiar el código y los assets compilados desde la etapa de construcción
COPY --from=builder /usr/src/app/app ./app
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/index.js ./index.js

# Exponer el puerto
EXPOSE 8000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]
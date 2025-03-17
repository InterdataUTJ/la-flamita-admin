FROM node:22-alpine

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json de la aplicación principal y de React
COPY package*.json ./
COPY react/package*.json ./react/

# Instalar dependencias de la aplicación principal
RUN npm install --only=production

# Instalar dependencias de React
RUN cd react && npm install

# Copiar todo el código fuente
COPY . .

# Generar el build de React
RUN cd react && npm run build

# Eliminar la carpeta de React después del build
RUN rm -rf react

# Exponer el puerto 8000
EXPOSE 8000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]
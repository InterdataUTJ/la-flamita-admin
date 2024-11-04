# Etapa 1: Imagen base de PHP con dependencias de Laravel
FROM php:8.1-fpm-alpine

RUN apk add --no-cache \
    bash \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Instala Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Define el directorio de trabajo
WORKDIR /var/www/html

# Copia los archivos de la aplicación y ejecuta Composer
COPY . .
ENV APP_ENV=production
RUN composer install --optimize-autoloader --no-dev

# Etapa 2: Compilación de assets de Node.js
FROM node:18-alpine as node
WORKDIR /var/www/html
COPY . .
RUN npm install && npm run build

# Copia los assets compilados a la imagen final de PHP-FPM
COPY --from=node /var/www/html/public /var/www/html/public

# Cambia permisos de almacenamiento y caché
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Exponer el puerto de PHP-FPM y establecer el comando de inicio
EXPOSE 9000
CMD ["php-fpm"]

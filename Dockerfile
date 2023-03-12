# Configuración de la imagen base
FROM node:14-alpine AS build

# Configuración de la ubicación de la app en el contenedor
WORKDIR /app

# Copia de los archivos necesarios a la imagen del contenedor
COPY package*.json ./
COPY yarn.lock ./

# Instalación de las dependencias
RUN yarn install --frozen-lockfile

# Copia del código fuente al contenedor
COPY . .

# Compilación del proyecto
RUN yarn build

# Configuración de la imagen base para producción
FROM nginx:stable-alpine

# Copia del archivo de configuración personalizado
COPY nginx.conf /etc/nginx/nginx.conf

# Copia de los archivos de construcción a la imagen del contenedor
COPY --from=build /app/build /usr/share/nginx/html

# Exposición del puerto 80 para el servidor web
EXPOSE 80

# Inicio del servidor web de nginx
CMD ["nginx", "-g", "daemon off;"]
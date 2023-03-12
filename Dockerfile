# Configuración de la imagen base
FROM node:16

# Configuración de la ubicación de la app en el contenedor
WORKDIR /app

# Copia de los archivos necesarios a la imagen del contenedor
COPY package*.json ./
COPY yarn.lock ./

# Instalación de las dependencias
RUN yarn install

# Copia del código fuente al contenedor
COPY . .

# Compilación del proyecto
RUN yarn build

# Instalar cualquier dependencia necesaria
RUN npm install -g serve

# Exponer el puerto 5000 para que pueda ser accesible desde fuera del contenedor
EXPOSE 80

# Iniciar el servidor
CMD ["serve", "-s", "/app/build"]
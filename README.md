# Descripción

## Correr en dev

1. Clonar el repositorio
2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las
variables de entorno.
3. Instalar dependencias ```npm install```
4. Levantar la base de datos ```docker compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
7. Correr el proyecto ```npm run dev```

## Instalación de Prisma

1. Instalar ```npm install prisma --save-dev```
2. Instalar PostgreSQL ```npx prisma init --datasource-provider PostgreSQL```
3. Para realizar una migración de una tabla ejecutamos ```npx prisma migrate dev --name ProductCategory```


## Correr en producción

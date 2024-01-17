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

## Ejecutar el archivo del seed-database.ts

1. Instalar dependencias ```npm i -D ts-node```  ejecutar directamente codigo de typescript en node.
2. Creamos un nnuevo script en el archivo de pakage.json ```"seed": "ts-node src/seed/seed-database.ts"```
3. Creamos el archivo tsconfig.json, en consola ir a la direccion ```cd src/seed``` y ejecutamos el siguiente comando ```npx tsc --init```
4. Ejecutar el comanndo ```npm run seed```

## Crear el Cliente de Prisma

1. Ejecutamos el comando ```npx prisma generate```



## Correr en producción

// funcion anonima autoinvocada asincrona

import { initialData } from "./seed";
import prisma from '../lib/prisma';

async function main() {

    // 1. Borrar registros previos
    await Promise.all([
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
    ]);

    const {categories, products } = initialData;

    // Categorias
    const categoriesData = categories.map( category => ({
        name: category
    }));
    //const categoriesData = categories.map( (name) => ({ name }));

    await prisma.category.createMany({
        data: categoriesData
    });

    // Obtener las categorias de BD
    const categoriesDB = await prisma.category.findMany();

    // Pasar de un arreglo a un objeto donde la llave sea el name: 'shirts' y me devuelva el id
    const categoriesMap = categoriesDB.reduce( (map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>); //<string=shirt, string=categoryID>

    console.log(categoriesMap);




    console.log('Seed ejecutado correctamente');
}

(() => {
    main();
})();
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


    console.log('Seed ejecutado correctamente');
}

(() => {
    main();
})();
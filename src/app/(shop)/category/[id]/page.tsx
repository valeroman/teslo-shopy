import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  }
}



export default function({ params }: Props) {

  const { id } = params;
  const seedProducts = initialData.products;

  const labels: Record<Category, string> = {
    'men': 'hombres',
    'women': 'mujeres',
    'kid': 'niños',
    'unisex': 'todos'
  }

  // if ( id === 'kids' ) {
  //   notFound();
  // }

  const products = seedProducts.filter( product => product.gender === id );

  return (
    <>
      <Title 
        title={`Artículos para ${ labels[id] }`}
        subtitle="Todos los productos"
        className="mb-2"
      />
     <ProductGrid  products={ products }/>
    </>
  );
}

import { ProductSlideshow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  }
}

export default function({ params }: Props) {

  const { slug } = params;
  const product = initialData.products.find( product => product.slug === slug );

  if ( !product ) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 mb-20">

      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        <ProductSlideshow 
          title={ product.title }
          images={ product.images }
          className=""
        />
      </div>


      {/* Detalles */}
      <div className="col-span-1 px-5">
        <h1 className={`${ titleFont.className } antialiased font-bold text-xl`}>
          { product.title }
        </h1>

        <p className="text-lg mb-5">
          ${ product.price }
        </p>

        {/* Selector tallas */}
        <SizeSelector 
          selectedSize={ product.sizes[0] }
          availableSizes={ product.sizes }
        />

        {/* Selector cantidad */}
        <QuantitySelector quantity={ 2 }/>

        {/* Boton */}
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          { product.description }
        </p>
      </div>


    </div>
  );
}

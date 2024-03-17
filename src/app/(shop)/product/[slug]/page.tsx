export const revalidate = 604800; // 7 dias

import { Metadata, ResolvingMetadata } from "next";
import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";

import { notFound } from "next/navigation";
import { StockLabel } from '../../../../components/product/stock-label/StockLabel';
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const product = await getProductBySlug(slug);
 
  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [`/products/${ product?.images[1]}`],
    },
  }
}

export default async function ProductBySlugPage({ params }: Props) {

  const { slug } = params;
  const product = await getProductBySlug(slug);
  console.log(product)

  if (!product) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 mb-20">

      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">

        {/* Desktop Slideeshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />

        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
      </div>


      {/* Detalles */}
      <div className="col-span-1 px-5">

        <StockLabel slug={ slug } />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">
          ${product.price}
        </p>

        <AddToCart product={ product } />

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          {product.description}
        </p>
      </div>


    </div>
  );
}

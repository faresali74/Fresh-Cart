import { getAllProducts, Product } from "@/Services/Products/getAllProducts";
import ProductCard from "./ProductCard";

interface ProductsProps {
  products?: Product[];
}

export default async function Products({
  products: propProducts,
}: ProductsProps = {}) {
  const products = propProducts ?? (await getAllProducts());

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

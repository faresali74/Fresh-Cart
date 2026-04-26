// src/app/products/[id]/page.tsx
import { getSpecificProduct } from "@/Services/Products/getSpacificProduct";
import ProductInfo from "@/app/_components/ProductInfo";
import ProductTabs from "@/app/_components/ProductTabs";
import RelatedProducts from "@/app/_components/RelatedProducts";
import SingleProductSlider from "@/app/_components/SingleProductSlider";

// تأكد إن النوع (Type) مكتوب صح كـ Promise
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  const product = await getSpecificProduct(productId);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <SingleProductSlider product={product} />
        </div>

        <div className="lg:w-2/3">
          <ProductInfo product={product} />
        </div>
      </div>

      <div className="mt-8">
        <ProductTabs product={product} />
      </div>

      <div className="mt-8">
        <RelatedProducts
          categoryId={product.category?._id}
          currentProductId={product._id}
        />
      </div>
    </div>
  );
}

import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

export default async function ProductPage({
  params,
}: {
  params: { storeId: string; productId: string };
}) {
  const product = await prismadb.product.findFirst({
    include: {
      images: true,
    },
    where: {
      storeId: params.storeId,
      id: params.productId,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: { storeId: params.storeId },
  });

  const colors = await prismadb.color.findMany({
    where: { storeId: params.storeId },
  });

  return (
    <div className="flex-col">
      <div className="flex-col-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
}

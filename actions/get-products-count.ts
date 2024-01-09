import prismadb from "@/lib/prismadb";

export default async function getProductsCount(
  storeId: string
): Promise<number> {
  const products = await prismadb.product.findMany({
    where: { storeId, isArchived: false },
  });
  return products.length;
}

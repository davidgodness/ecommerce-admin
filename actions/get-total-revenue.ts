import prismadb from "@/lib/prismadb";

export default async function getTotalRevenue(
  storeId: string
): Promise<number> {
  const orders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      products: true,
    },
  });

  return orders.reduce(
    (prev, cur) =>
      prev + cur.products.reduce((prev, cur) => prev + cur.price.toNumber(), 0),
    0
  );
}

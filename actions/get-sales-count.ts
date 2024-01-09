import prismadb from "@/lib/prismadb";

export default async function getSalesCount(storeId: string): Promise<number> {
  return await prismadb.order.count({
    where: { storeId, isPaid: true },
  });
}

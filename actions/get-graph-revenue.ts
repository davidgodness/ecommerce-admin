import { OverviewChart } from "@/components/overview";
import prismadb from "@/lib/prismadb";

export default async function getGraphRevenue(
  storeId: string
): Promise<OverviewChart[]> {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      products: true,
    },
  });

  const monthlyRevenue = new Map<number, number>();

  paidOrders.forEach((order) => {
    const month = order.createdAt.getMonth();
    const revenue = order.products.reduce(
      (prev, cur) => prev + cur.price.toNumber(),
      0
    );

    monthlyRevenue.set(month, revenue + (monthlyRevenue.get(month) ?? 0));
  });

  const graphRevenue: OverviewChart[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  monthlyRevenue.forEach((v, k) => {
    graphRevenue[k].total = v;
  });

  return graphRevenue;
}

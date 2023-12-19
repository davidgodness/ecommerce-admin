import prismadb from "@/lib/prismadb";
import { OrderClient } from "./components/client";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { OrderColumn } from "./components/columns";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      products: true,
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    products: order.products.map((product) => product.name).join(","),
    phone: order.phone,
    address: order.address,
    totalPrice: formatter.format(
      order.products.reduce((prev, cur) => prev + cur.price.toNumber(), 0)
    ),
    paid: order.isPaid,
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};
export default OrdersPage;

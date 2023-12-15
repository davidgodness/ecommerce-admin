import prismadb from "@/lib/prismadb";
import BillboardsClient from "./components/client";
import { format } from "date-fns";
import { BillboardColumn } from "./components/columns";

export default async function BillboardsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((v) => ({
    id: v.id,
    label: v.label,
    createdAt: format(v.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsClient data={formattedBillboards} />
      </div>
    </div>
  );
}

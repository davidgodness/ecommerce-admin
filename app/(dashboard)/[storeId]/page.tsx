import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  params,
}: {
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const id = parseInt(params.storeId);

  if (Number.isNaN(id)) {
    redirect("/");
  }

  const store = await prismadb.store.findFirst({
    where: { id, userId },
  });

  if (!store) {
    redirect("/");
  }

  return <div>This is dashboard {store.name}</div>;
}

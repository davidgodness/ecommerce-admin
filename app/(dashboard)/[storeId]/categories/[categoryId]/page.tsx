import CategoryForm from "./components/category-form";
import prismadb from "@/lib/prismadb";

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) {
  const category = await prismadb.category.findFirst({
    include: {
      billboard: true,
    },
    where: { id: params.categoryId },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
}

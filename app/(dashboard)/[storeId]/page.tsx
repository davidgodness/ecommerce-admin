export default async function DashboardPage({
  params,
}: {
  params: { storeId: string };
}) {
  return <div>This is dashboard storeId: {params.storeId}</div>;
}

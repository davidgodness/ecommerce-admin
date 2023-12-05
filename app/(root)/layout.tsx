export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-4">{children}</div>;
}

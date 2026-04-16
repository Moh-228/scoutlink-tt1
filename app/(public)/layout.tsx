export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-cyan-50">{children}</div>;
}

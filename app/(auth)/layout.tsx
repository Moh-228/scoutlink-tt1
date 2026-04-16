export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#cffafe,_#f8fafc_60%)] px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-3xl">{children}</div>
    </div>
  );
}

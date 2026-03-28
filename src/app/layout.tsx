import "./globals.css";

export const metadata = {
  title: "Budget Tracker",
  description: "Weekly Budget and Monthly Savings Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
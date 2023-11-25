import "../sass/global.scss";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  metadataBase:
    process.env.VERCEL_ENV === "production"
      ? new URL("https://is-windows-on-arm-ready.vercel.app")
      : process.env.VERCEL_ENV === "preview"
      ? new URL(`https://${process.env.VERCEL_URL}`)
      : new URL(`http://localhost:${process.env.PORT || 3000}`),
};

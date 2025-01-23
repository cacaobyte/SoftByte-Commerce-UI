export const metadata = {
  title: "SoftByte Commerce",
  description: "A modern e-commerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

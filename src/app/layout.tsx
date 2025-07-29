import "../style/globals.css";
import Navbar from '../componets/ui/navbar/navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mt-[26vh]"
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}

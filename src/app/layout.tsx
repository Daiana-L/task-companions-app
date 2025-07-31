import Navbar from "../componets/ui/navbar/navbar";
import Footer from "../componets/ui/footer/footer";
import "../style/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "TaskCompanions",
    description: "App para organizar tus tareas o metas",
};
export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <head>
                <link rel="icon" href="/assets/img/gatoIcon.png" />
            </head>
            <body className="flex flex-col bg-gray-100 text-black min-h-screen xs:w-full overflow-x-hidden">
                <Navbar />
                <main className=" mt-[20vh] lg:mb-16 xs:mb-6 flex-grow lg:max-w-5xl xs:max-w-xl mx-auto lg:px-6 xs:px-2">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}

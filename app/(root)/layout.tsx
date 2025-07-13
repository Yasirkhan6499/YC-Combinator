import NavBar from "@/components/NavBar";
import { Toaster } from 'sonner';

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return(
        <main className="font-work-sans">
            <NavBar />
            {children}
            <Toaster />
        </main>    
    )
}
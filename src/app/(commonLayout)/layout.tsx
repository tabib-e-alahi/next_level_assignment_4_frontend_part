import Footer from "@/components/ui/shared/Footer";
import Navbar from "@/components/ui/shared/Navbar"


export default function CommonLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <main className="flex-1 bg-linear-to-b from-orange-50 via-orage-50 to-white ">
        {children}
      </main>
      <Footer></Footer>
    </div>
  );
}
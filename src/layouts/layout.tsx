import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Outlet, useLocation } from "react-router";


const Layout = () => {
  const location = useLocation();
  console.log(location.pathname);
  
  return (
    <div className="flex flex-col min-h-[100vh] justify-between gap-16">
      <div>
        <Header />
        {location.pathname === '/' && <Hero />}
        <div className="container mx-auto flex-1 py-10">
          <Outlet />
        </div>
      </div>


      <div>
        <Footer />
      </div>

    </div>
  );
};

export default Layout;

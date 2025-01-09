// app/template.js
'use client'

import { usePathname } from "next/navigation";
import Navbar from "./components/home/navbar";
import { Footer } from "./components/home/footer";

export default function Template({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
  {!isAdmin && <Navbar/>}
      {children}
      {!isDashboard && !isAdmin && <Footer />}
    </>
  );
}
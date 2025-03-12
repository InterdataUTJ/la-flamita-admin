import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface TemplateProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function Template({ children, title, className }: TemplateProps) {
  
  useEffect(() => {
    if (title) document.title = `La Flamita | ${title}`;
    else document.title = "La Flamita";
  }, [title]);

  return (
    <>
      <Navbar />
      <main className={`grow w-11/12 max-w-screen-lg lg:max-w-screen-xl mx-auto p-5 box-border ${className}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
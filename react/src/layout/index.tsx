import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";

interface TemplateProps {
  children: React.ReactNode;
  title?: string;
}

export default function Template({ children, title }: TemplateProps) {
  
  useEffect(() => {
    if (title) document.title = `La Flamita | ${title}`;
    else document.title = "La Flamita";
  }, [title]);

  return (
    <>
      <Navbar />
      <main className="grow w-11/12 max-w-screen-lg lg:max-w-screen-xl mx-auto p-5 box-border">
        {children}
      </main>
      <Footer />
    </>
  );
}
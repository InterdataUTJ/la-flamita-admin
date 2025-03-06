import { Navbar as FlowNavbar } from "flowbite-react";
import AuthNavbar from "./Auth";
import { useAuthContext } from "@/hooks/AuthContext";

const navTheme = {
  root: {
    base: "bg-white px-2 py-2.5 sm:px-4 shadow border-b-2 border-gray-200"
  },
  brand: {
    base: "flex items-center justify-center flex-1"
  }
}

export default function Navbar() {
  const auth = useAuthContext();
  if (!!auth.token) return <AuthNavbar />;
  
  return (
    <FlowNavbar fluid rounded theme={navTheme}>
      <FlowNavbar.Brand>
        <img src="/favicon.png" className="h-8 mr-2" alt="La Flamita logo" />
        <span className="self-center text-2xl font-extrabold whitespace-nowrap">La Flamita</span>
      </FlowNavbar.Brand>
    </FlowNavbar>
  );
}
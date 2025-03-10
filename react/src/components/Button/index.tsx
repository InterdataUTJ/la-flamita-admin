import React from "react";
import { Link } from "react-router";

interface ButtonProps {
  children: React.ReactNode | React.ReactNode[];

  // Button
  type?: "button" | "submit" | "reset";
  onClick?: () => void;

  // Link
  as?: "button" | typeof Link;
  to?: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({ children, type = "button", onClick, as = "button", to, disabled, loading }: ButtonProps) {
  if (as === Link && to) {
    return (
      <Link
        to={to}
        className="w-full font-bold rounded-lg text-sm px-5 py-2 text-center flex items-center justify-center gap-2 hover:bg-gray-100 active:bg-gray-200 text-white bg-primary-600 hover:bg-primary-500 active:bg-primary-700"
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={
        `${disabled || loading ? "bg-primary-300" : "bg-primary-600 hover:bg-primary-500 active:bg-primary-700"} 
        ${loading ? "cursor-wait" : ""} 
        w-full font-bold rounded-lg text-sm px-5 py-2 text-center flex items-center justify-center gap-2 text-white`
      }
    >
      {children}
    </button>
  );
}

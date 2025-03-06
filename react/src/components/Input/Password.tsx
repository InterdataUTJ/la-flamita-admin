import { useState } from "react";
import { InputProps } from "./types";
import { Eye, EyeOff } from "../Icon";

export default function PasswordInput(props: InputProps) {

  const [type, setType] = useState("password");
  const handleTogglePassword = () => setType(currentType => currentType === "password" ? "text" : "password");

  return (
    <div className="flex">
      <input 
        onBlur={props.onBlur}
        ref={props.ref}
        type={type}
        name={props.name}
        id={`${props.name}-password-${props.placeholder}`}
        placeholder={props.placeholder}
        required={props.required}
        maxLength={props.maxLength}
        minLength={props.minLength}
        pattern={props.pattern}
        className={`rounded-l-lg rounded-r-none ${props.className}`} 
      />
      <button 
        type="button" 
        onClick={handleTogglePassword}
        className="text-white bg-tertiary-700 hover:bg-tertiary-600 active:bg-tertiary-800 px-4 rounded-r-lg"
      >
        { type === "password" ? <Eye /> : <EyeOff /> }
      </button>
    </div>
  );
}
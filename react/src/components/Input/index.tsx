import { useState } from "react";
import PasswordInput from "./Password";
import { InputProps } from "./types";

export default function Input({ type = "text", ...props }: InputProps) {
  
  const InputType = type === "password" ? PasswordInput : "input";
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.validity.badInput && type === "number") return setErrorMsg("Este campo debe ser un número");
    if (!value) return setErrorMsg(null);
    if (props.required && value === "") return setErrorMsg("Este campo es requerido");
    if (props.minLength && value.length < props.minLength) return setErrorMsg(`Este campo debe tener al menos ${props.minLength} caracteres`);
    if (props.maxLength && value.length > props.maxLength) return setErrorMsg(`Este campo debe tener máximo ${props.maxLength} caracteres`);
    if (props.pattern && !new RegExp(props.pattern).test(value)) return setErrorMsg("Este campo no cumple con el formato requerido");
    if (e.target.validity.typeMismatch && type === "email") return setErrorMsg("Este campo debe ser un correo electrónico válido");
    if (e.target.validity.typeMismatch && type === "url") return setErrorMsg("Este campo debe ser una URL válida");
    if (props.min !== undefined && Number(value) < props.min) return setErrorMsg(`Este campo debe ser mayor o igual a ${props.min}`);
    if (props.max !== undefined && Number(value) > props.max) return setErrorMsg(`Este campo debe ser menor o igual a ${props.max}`);
    setErrorMsg(null);
  };
  
  return (
    <div className="mb-5">
      <label
        htmlFor={`${props.name}-${type}-${props.placeholder}`}
        className="block mb-2 text-sm font-semibold text-gray-900"
      >
        {props.label}
        { props.required && <span className="ml-1 text-red-600">*</span> }
      </label>
      <InputType
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={props.onChange}
        onBlur={handleOnBlur}
        disabled={props.disabled}
        ref={props.ref}
        type={type}
        name={props.name}
        className={`${props.disabled ? "bg-gray-100 text-gray-600" : "rounded-lg bg-gray-50 text-gray-900"} shadow-sm border ${ errorMsg ? "border-red-600 focus:ring-red-600 focus:border-red-600" : "border-gray-300 focus:ring-primary-500 focus:border-primary-500" } text-sm rounded-l-lg block w-full p-2.5`}
        placeholder={props.placeholder}
        required={props.required}
        maxLength={props.maxLength}
        minLength={props.minLength}
        pattern={props.pattern}
        min={props.min}
        max={props.max}
        step={props.step}
      />
      <span className="block text-red-600 text-sm font-semibold mt-1">{errorMsg}</span>
    </div>
  );
}
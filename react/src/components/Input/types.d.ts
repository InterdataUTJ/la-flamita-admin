export interface InputProps {
  label?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;

  // For password input
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
}
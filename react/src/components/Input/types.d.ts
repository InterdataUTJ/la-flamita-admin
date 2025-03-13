export interface InputProps {
  label?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  
  required?: boolean;
  step?: number;
  max?: number;
  maxLength?: number;
  min?: number;
  minLength?: number;
  pattern?: string;

  // For password input
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface FileInputProps {
  label?: string;
  description?: string;
  name?: string;
  accept?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
}